import React, { useState } from 'react';
import { Bot, Brain, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';
import { AIEvaluationService, Rubric, Observations, GradeDraftResult } from '../../services/AIEvaluationService';

interface AIGradingAssistantProps {
  rubric: Rubric;
  observations: Observations;
  onResult: (result: GradeDraftResult) => void;
}

const AIGradingAssistant: React.FC<AIGradingAssistantProps> = ({
  rubric,
  observations,
  onResult
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<GradeDraftResult | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const analysisResult = await AIEvaluationService.generateGradeDraft(rubric, observations);
      setResult(analysisResult);
      onResult(analysisResult);
    } catch (error) {
      console.error('AI 분석 중 오류:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-50';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return '높음';
    if (confidence >= 0.6) return '보통';
    return '낮음';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Bot className="w-6 h-6 text-primary mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">AI 평가 도우미</h3>
        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
          베타
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-3">
          루브릭과 관찰 자료를 바탕으로 AI가 초안 점수를 생성합니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Target className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">평가 항목</span>
            </div>
            <p className="text-sm text-gray-600">{rubric.itemName}</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Brain className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">관찰 요약</span>
            </div>
            <p className="text-sm text-gray-600 truncate">{observations.summary}</p>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isAnalyzing ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              AI 분석 중...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              AI 평가 시작
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{result.draftScore}점</div>
              <div className="text-sm text-gray-600">초안 점수</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className={`text-lg font-semibold ${getConfidenceColor(result.confidence)}`}>
                {Math.round(result.confidence * 100)}%
              </div>
              <div className="text-sm text-gray-600">AI 신뢰도</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center">
                {result.needsManualReview ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              <div className="text-sm text-gray-600">
                {result.needsManualReview ? '수동 검토 필요' : '자동 처리 가능'}
              </div>
            </div>
          </div>

          {/* 기준별 점수 */}
          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-900 mb-3">기준별 상세 점수</h4>
            <div className="space-y-2">
              {result.criterionScores.map((criterion, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{criterion.criterion}</div>
                    <div className="text-sm text-gray-600">{criterion.evidence}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">레벨 {criterion.level}</div>
                    <div className="text-sm text-gray-600">{criterion.score}점</div>
                    <div className={`text-xs px-2 py-1 rounded ${getConfidenceColor(criterion.confidence)}`}>
                      신뢰도: {getConfidenceText(criterion.confidence)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 크리티컬 실패 */}
          {result.criticalViolations.length > 0 && (
            <div className="mb-4">
              <h4 className="text-md font-semibold text-red-700 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                크리티컬 실패 항목
              </h4>
              <div className="space-y-2">
                {result.criticalViolations.map((violation, index) => (
                  <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="font-medium text-red-800">{violation.criterion}</div>
                    <div className="text-sm text-red-600">{violation.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 피드백 */}
          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-900 mb-3">AI 피드백</h4>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-800">{result.feedbackKorean}</p>
            </div>
          </div>

          {/* 수동 검토 필요 시 노트 */}
          {result.notes && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">주의사항</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">{result.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIGradingAssistant;
