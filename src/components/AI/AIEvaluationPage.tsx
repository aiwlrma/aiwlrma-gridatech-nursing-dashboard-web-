import React, { useState } from 'react';
import { Bot, FileText, AlertTriangle, Brain } from 'lucide-react';
import PageHeader from '../Common/PageHeader';
import AIGradingAssistant from './AIGradingAssistant';
import AppealAnalyzer from './AppealAnalyzer';
import PolicyQA from './PolicyQA';
import { Rubric, Observations, GradeDraftResult, AppealAnalysisResult, PolicyQAResult } from '../../services/AIEvaluationService';

const AIEvaluationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'grading' | 'appeal' | 'policy'>('grading');
  const [gradingResult, setGradingResult] = useState<GradeDraftResult | null>(null);
  const [appealResult, setAppealResult] = useState<AppealAnalysisResult | null>(null);
  const [policyResult, setPolicyResult] = useState<PolicyQAResult | null>(null);

  // 샘플 데이터
  const sampleRubric: Rubric = {
    itemName: '근육주사(IM) 술기',
    criteria: [
      {
        name: '무균술',
        levels: [
          { level: 5, description: '완벽한 무균술 수행', isCritical: false },
          { level: 4, description: '양호한 무균술', isCritical: false },
          { level: 3, description: '보통 수준의 무균술', isCritical: false },
          { level: 2, description: '미흡한 무균술', isCritical: false },
          { level: 1, description: '무균술 위반', isCritical: true }
        ]
      },
      {
        name: '5-Rights 확인',
        levels: [
          { level: 5, description: '5-Rights 완벽 확인', isCritical: false },
          { level: 4, description: '4/5 Rights 확인', isCritical: false },
          { level: 3, description: '3/5 Rights 확인', isCritical: false },
          { level: 2, description: '2/5 Rights 확인', isCritical: false },
          { level: 1, description: '환자/약물 식별 오류', isCritical: true }
        ]
      },
      {
        name: '통증 관리',
        levels: [
          { level: 5, description: '완벽한 통증 관리', isCritical: false },
          { level: 4, description: '양호한 통증 관리', isCritical: false },
          { level: 3, description: '보통 수준의 통증 관리', isCritical: false },
          { level: 2, description: '미흡한 통증 관리', isCritical: false },
          { level: 1, description: '통증 관리 실패', isCritical: false }
        ]
      }
    ]
  };

  const sampleObservations: Observations = {
    summary: '00:15 손 위생 시작, 00:40 5-Rights 확인 완료, 01:20 무균술 수행, 01:45 주사 완료, 02:00 통증 관리 설명',
    evidence: [
      { ts: [15, 25], note: '손 위생 적절히 수행' },
      { ts: [40, 50], note: '5-Rights 확인 완료' },
      { ts: [80, 90], note: '무균술 정확히 수행' },
      { ts: [105, 120], note: '주사 부위 소독 및 주사 완료' },
      { ts: [120, 130], note: '통증 관리 설명 제공' }
    ]
  };

  const sampleAppealText = '무균술 항목에서 부분점수가 누락되었습니다. 00:20초에 무균술을 정확히 수행했는데 2점만 받았습니다. 루브릭에 따르면 4점을 받아야 합니다.';

  const tabs = [
    { id: 'grading', label: 'AI 채점 도우미', icon: Bot },
    { id: 'appeal', label: '이의제기 분석', icon: AlertTriangle },
    { id: 'policy', label: '정책 Q&A', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="AI 평가 도우미" 
        subtitle="인공지능을 활용한 효율적이고 공정한 학생 평가를 지원합니다" 
      />

      {/* AI 기능 개요 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center mb-4">
          <Brain className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">AI 평가 도우미 기능</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Bot className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">자동 채점</h4>
            <p className="text-sm text-gray-600">루브릭 기반 초안 점수 생성</p>
          </div>
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">이의제기 분석</h4>
            <p className="text-sm text-gray-600">학생 이의제기 자동 분석 및 해결방안 제시</p>
          </div>
          <div className="text-center">
            <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">정책 검색</h4>
            <p className="text-sm text-gray-600">평가 정책 관련 질문 답변</p>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 탭 콘텐츠 */}
      <div>
        {activeTab === 'grading' && (
          <AIGradingAssistant
            rubric={sampleRubric}
            observations={sampleObservations}
            onResult={setGradingResult}
          />
        )}

        {activeTab === 'appeal' && (
          <AppealAnalyzer
            appealText={sampleAppealText}
            currentScore={78}
            onAnalysis={setAppealResult}
          />
        )}

        {activeTab === 'policy' && (
          <PolicyQA onAnswer={setPolicyResult} />
        )}
      </div>

      {/* 결과 요약 */}
      {(gradingResult || appealResult || policyResult) && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI 분석 결과 요약</h3>
          
          {gradingResult && (
            <div className="mb-4 p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">채점 결과</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">초안 점수:</span>
                  <span className="ml-2 font-semibold">{gradingResult.draftScore}점</span>
                </div>
                <div>
                  <span className="text-gray-600">신뢰도:</span>
                  <span className="ml-2 font-semibold">{Math.round(gradingResult.confidence * 100)}%</span>
                </div>
                <div>
                  <span className="text-gray-600">크리티컬 실패:</span>
                  <span className="ml-2 font-semibold">{gradingResult.criticalViolations.length}건</span>
                </div>
                <div>
                  <span className="text-gray-600">수동 검토:</span>
                  <span className="ml-2 font-semibold">{gradingResult.needsManualReview ? '필요' : '불필요'}</span>
                </div>
              </div>
            </div>
          )}

          {appealResult && (
            <div className="mb-4 p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">이의제기 분석</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">우선순위:</span>
                  <span className="ml-2 font-semibold">
                    {appealResult.priority === 'high' ? '높음' : 
                     appealResult.priority === 'medium' ? '보통' : '낮음'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">분쟁 유형:</span>
                  <span className="ml-2 font-semibold">
                    {appealResult.disputeType === 'rubric_interpretation' ? '루브릭 해석' :
                     appealResult.disputeType === 'missing_score' ? '점수 누락' :
                     appealResult.disputeType === 'calculation' ? '계산 오류' : '기타'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">권장 방안:</span>
                  <span className="ml-2 font-semibold">{appealResult.options.length}개</span>
                </div>
              </div>
            </div>
          )}

          {policyResult && (
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">정책 답변</h4>
              <div className="text-sm">
                <div className="mb-2">
                  <span className="text-gray-600">답변:</span>
                  <span className="ml-2">{policyResult.answerKorean}</span>
                </div>
                {policyResult.confidence && (
                  <div>
                    <span className="text-gray-600">신뢰도:</span>
                    <span className="ml-2 font-semibold">{Math.round(policyResult.confidence * 100)}%</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIEvaluationPage;
