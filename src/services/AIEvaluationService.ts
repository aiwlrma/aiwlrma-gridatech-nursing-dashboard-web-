// AI 기반 학생 평가 서비스
// 루브릭 기반 점수 산출, 이의제기 분석, 정책 Q&A 기능

export interface RubricCriterion {
  name: string;
  levels: {
    level: 5 | 4 | 3 | 2 | 1;
    description: string;
    isCritical?: boolean;
  }[];
}

export interface Rubric {
  itemName: string;
  criteria: RubricCriterion[];
}

export interface ObservationEvidence {
  ts: [number, number]; // [start, end] in seconds
  note: string;
}

export interface Observations {
  summary: string;
  evidence?: ObservationEvidence[];
}

export interface CriterionScore {
  criterion: string;
  level: 5 | 4 | 3 | 2 | 1;
  score: number;
  evidence: string;
  confidence: number;
}

export interface CriticalViolation {
  criterion: string;
  reason: string;
}

export interface GradeDraftResult {
  draftScore: number;
  confidence: number;
  criterionScores: CriterionScore[];
  criticalViolations: CriticalViolation[];
  feedbackKorean: string;
  needsManualReview: boolean;
  notes?: string;
}

export interface AppealAnalysisResult {
  summaryKorean: string;
  disputeType: 'rubric_interpretation' | 'missing_score' | 'calculation' | 'other';
  priority: 'high' | 'medium' | 'low';
  options: {
    action: 'regrade' | 'request_info' | 'reject';
    probability: number;
    rationaleKorean: string;
    steps: string[];
  }[];
  slaHintDays?: number;
}

export interface PolicyQAResult {
  answerKorean: string;
  citations?: {
    source: string;
    section: string;
    url?: string;
    relevance: number;
  }[];
  confidence?: number;
}

export class AIEvaluationService {
  // 모드 1: 루브릭 기반 초안 점수 생성
  static async generateGradeDraft(
    rubric: Rubric,
    observations: Observations
  ): Promise<GradeDraftResult> {
    // 실제 구현에서는 AI API 호출
    // 여기서는 시뮬레이션된 로직 제공
    
    const criterionScores: CriterionScore[] = [];
    const criticalViolations: CriticalViolation[] = [];
    let totalScore = 0;
    let totalConfidence = 0;
    let needsManualReview = false;

    // 각 기준에 대해 점수 계산
    for (const criterion of rubric.criteria) {
      const evidence = this.findEvidenceForCriterion(criterion.name, observations);
      const level = this.determineLevel(criterion, evidence);
      const score = (level / 5) * 100;
      const confidence = this.calculateConfidence(evidence, level);
      
      criterionScores.push({
        criterion: criterion.name,
        level: level as 5 | 4 | 3 | 2 | 1,
        score,
        evidence: evidence || '관찰 근거 부족',
        confidence
      });

      totalScore += score;
      totalConfidence += confidence;

      // 크리티컬 실패 확인
      if (level <= 2 && criterion.levels.find(l => l.level === level)?.isCritical) {
        criticalViolations.push({
          criterion: criterion.name,
          reason: `크리티컬 기준 미달 (레벨 ${level})`
        });
      }

      // 신뢰도가 낮으면 수동 검토 필요
      if (confidence < 0.7) {
        needsManualReview = true;
      }
    }

    const averageScore = totalScore / rubric.criteria.length;
    const averageConfidence = totalConfidence / rubric.criteria.length;

    return {
      draftScore: Math.round(averageScore),
      confidence: averageConfidence,
      criterionScores,
      criticalViolations,
      feedbackKorean: this.generateFeedbackKorean(criterionScores, criticalViolations),
      needsManualReview,
      notes: needsManualReview ? 'AI 신뢰도가 낮아 수동 검토가 필요합니다.' : undefined
    };
  }

  // 모드 2: 이의제기 분석 및 해결 방안 제시
  static async analyzeAppeal(
    appealText: string,
    currentScore: number,
    rubric: Rubric,
    evidence?: string[]
  ): Promise<AppealAnalysisResult> {
    // 이의제기 유형 분석
    const disputeType = this.classifyDisputeType(appealText);
    const priority = this.determinePriority(appealText, currentScore);
    
    // 해결 방안 생성
    const options = this.generateResolutionOptions(disputeType, currentScore, evidence);

    return {
      summaryKorean: this.summarizeAppeal(appealText),
      disputeType,
      priority,
      options,
      slaHintDays: this.calculateSLAHint(priority)
    };
  }

  // 모드 3: 정책 Q&A
  static async answerPolicyQuestion(
    question: string,
    retrievedDocs: Array<{
      source: string;
      title?: string;
      section?: string;
      content: string;
      relevanceScore: number;
    }>
  ): Promise<PolicyQAResult> {
    const relevantDocs = retrievedDocs.filter(doc => doc.relevanceScore > 0.5);
    
    if (relevantDocs.length === 0) {
      return {
        answerKorean: '해당 규정을 찾을 수 없습니다'
      };
    }

    const answer = this.generatePolicyAnswer(question, relevantDocs);
    const citations = relevantDocs.map(doc => ({
      source: doc.source,
      section: doc.section || '',
      url: undefined,
      relevance: doc.relevanceScore
    }));

    return {
      answerKorean: answer,
      citations,
      confidence: Math.max(...relevantDocs.map(doc => doc.relevanceScore))
    };
  }

  // 헬퍼 메서드들
  private static findEvidenceForCriterion(criterionName: string, observations: Observations): string | null {
    // 기준에 맞는 관찰 근거 찾기
    const summary = observations.summary.toLowerCase();
    const criterion = criterionName.toLowerCase();
    
    if (summary.includes(criterion)) {
      return `관찰된 ${criterionName} 수행`;
    }
    
    if (observations.evidence) {
      const relevantEvidence = observations.evidence.find(ev => 
        ev.note.toLowerCase().includes(criterion)
      );
      if (relevantEvidence) {
        return `${relevantEvidence.ts[0]}초-${relevantEvidence.ts[1]}초: ${relevantEvidence.note}`;
      }
    }
    
    return null;
  }

  private static determineLevel(criterion: RubricCriterion, evidence: string | null): number {
    if (!evidence) return 3; // 근거 없으면 중간값
    
    // 간단한 키워드 기반 레벨 결정 (실제로는 더 정교한 AI 모델 사용)
    const evidenceLower = evidence.toLowerCase();
    
    if (evidenceLower.includes('완벽') || evidenceLower.includes('우수')) return 5;
    if (evidenceLower.includes('양호') || evidenceLower.includes('적절')) return 4;
    if (evidenceLower.includes('보통') || evidenceLower.includes('일반')) return 3;
    if (evidenceLower.includes('미흡') || evidenceLower.includes('부족')) return 2;
    if (evidenceLower.includes('실패') || evidenceLower.includes('위반')) return 1;
    
    return 3; // 기본값
  }

  private static calculateConfidence(evidence: string | null, level: number): number {
    if (!evidence) return 0.3; // 근거 없으면 낮은 신뢰도
    
    let confidence = 0.7; // 기본 신뢰도
    
    // 근거의 구체성에 따라 신뢰도 조정
    if (evidence.includes('초')) confidence += 0.1; // 타임스탬프 있음
    if (evidence.includes('확인') || evidence.includes('관찰')) confidence += 0.1; // 구체적 관찰
    
    return Math.min(confidence, 1.0);
  }

  private static generateFeedbackKorean(
    criterionScores: CriterionScore[],
    criticalViolations: CriticalViolation[]
  ): string {
    const lowScores = criterionScores.filter(cs => cs.level <= 2);
    const highScores = criterionScores.filter(cs => cs.level >= 4);
    
    let feedback = '';
    
    if (criticalViolations.length > 0) {
      feedback += `크리티컬 실패 항목이 발견되었습니다: ${criticalViolations.map(cv => cv.criterion).join(', ')}. `;
    }
    
    if (lowScores.length > 0) {
      feedback += `개선이 필요한 항목: ${lowScores.map(cs => cs.criterion).join(', ')}. `;
    }
    
    if (highScores.length > 0) {
      feedback += `우수한 수행 항목: ${highScores.map(cs => cs.criterion).join(', ')}. `;
    }
    
    if (feedback === '') {
      feedback = '전반적으로 적절한 수행을 보였습니다. 지속적인 연습을 권장합니다.';
    }
    
    return feedback;
  }

  private static classifyDisputeType(appealText: string): 'rubric_interpretation' | 'missing_score' | 'calculation' | 'other' {
    const text = appealText.toLowerCase();
    
    if (text.includes('루브릭') || text.includes('기준') || text.includes('해석')) {
      return 'rubric_interpretation';
    }
    if (text.includes('점수') || text.includes('누락') || text.includes('빠진')) {
      return 'missing_score';
    }
    if (text.includes('계산') || text.includes('합계') || text.includes('가중치')) {
      return 'calculation';
    }
    
    return 'other';
  }

  private static determinePriority(appealText: string, currentScore: number): 'high' | 'medium' | 'low' {
    const text = appealText.toLowerCase();
    
    if (text.includes('크리티컬') || text.includes('불합격') || currentScore < 60) {
      return 'high';
    }
    if (text.includes('급함') || text.includes('빠른') || currentScore < 80) {
      return 'medium';
    }
    
    return 'low';
  }

  private static generateResolutionOptions(
    disputeType: string,
    currentScore: number,
    evidence?: string[]
  ) {
    const options = [];
    
    if (disputeType === 'rubric_interpretation') {
      options.push({
        action: 'regrade' as const,
        probability: 0.7,
        rationaleKorean: '루브릭 해석 차이로 인한 재채점이 적절합니다.',
        steps: ['기존 루브릭 재검토', '동일 기준으로 재채점', '결과 통보']
      });
    }
    
    if (disputeType === 'missing_score') {
      options.push({
        action: 'request_info' as const,
        probability: 0.8,
        rationaleKorean: '추가 정보가 필요합니다.',
        steps: ['학생에게 구체적 근거 요청', '제출물 재검토', '결정 통보']
      });
    }
    
    if (currentScore < 70) {
      options.push({
        action: 'regrade' as const,
        probability: 0.6,
        rationaleKorean: '낮은 점수로 인한 재검토가 필요합니다.',
        steps: ['전체 평가 재검토', '기준 재적용', '결과 조정']
      });
    }
    
    return options;
  }

  private static summarizeAppeal(appealText: string): string {
    // 간단한 요약 (실제로는 더 정교한 텍스트 요약 사용)
    const sentences = appealText.split('.').filter(s => s.trim().length > 0);
    return sentences.slice(0, 2).join('. ') + '.';
  }

  private static calculateSLAHint(priority: string): number {
    switch (priority) {
      case 'high': return 1;
      case 'medium': return 3;
      case 'low': return 7;
      default: return 5;
    }
  }

  private static generatePolicyAnswer(question: string, docs: any[]): string {
    // 가장 관련성 높은 문서 기반 답변 생성
    const bestDoc = docs.reduce((best, current) => 
      current.relevanceScore > best.relevanceScore ? current : best
    );
    
    return `관련 규정에 따르면, ${bestDoc.content.slice(0, 200)}...`;
  }
}
