import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle, FileText, TrendingUp } from 'lucide-react';
import { AIEvaluationService, AppealAnalysisResult } from '../../services/AIEvaluationService';

interface AppealAnalyzerProps {
  appealText: string;
  currentScore: number;
  onAnalysis: (result: AppealAnalysisResult) => void;
}

const AppealAnalyzer: React.FC<AppealAnalyzerProps> = ({
  appealText,
  currentScore,
  onAnalysis
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AppealAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const analysisResult = await AIEvaluationService.analyzeAppeal(
        appealText,
        currentScore,
        { itemName: '평가 항목', criteria: [] } // 실제로는 루브릭 전달
      );
      setResult(analysisResult);
      onAnalysis(analysisResult);
    } catch (error) {
      console.error('이의제기 분석 중 오류:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'regrade': return <TrendingUp className="w-4 h-4" />;
      case 'request_info': return <FileText className="w-4 h-4" />;
      case 'reject': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'regrade': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'request_info': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'reject': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <AlertTriangle className="w-6 h-6 text-primary mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">이의제기 AI 분석</h3>
        <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
          분석
        </span>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-1">현재 점수</div>
            <div className="text-lg font-semibold text-gray-900">{currentScore}점</div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-1">이의제기 내용</div>
            <div className="text-sm text-gray-600 line-clamp-2">{appealText}</div>
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
              <AlertTriangle className="w-4 h-4 mr-2" />
              이의제기 분석 시작
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          {/* 요약 */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-2">AI 요약</h4>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-800">{result.summaryKorean}</p>
            </div>
          </div>

          {/* 우선순위 및 유형 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                {getPriorityIcon(result.priority)}
                <span className="text-sm font-medium text-gray-700 ml-2">우선순위</span>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(result.priority)}`}>
                {result.priority === 'high' ? '높음' : 
                 result.priority === 'medium' ? '보통' : '낮음'}
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-2">분쟁 유형</div>
              <div className="text-sm text-gray-600">
                {result.disputeType === 'rubric_interpretation' ? '루브릭 해석 차이' :
                 result.disputeType === 'missing_score' ? '점수 누락' :
                 result.disputeType === 'calculation' ? '계산 오류' : '기타'}
              </div>
            </div>
          </div>

          {/* 해결 방안 */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">권장 해결 방안</h4>
            <div className="space-y-3">
              {result.options.map((option, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {getActionIcon(option.action)}
                      <span className="ml-2 font-medium text-gray-900">
                        {option.action === 'regrade' ? '재채점' :
                         option.action === 'request_info' ? '추가 정보 요청' : '거부'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      추천도: {Math.round(option.probability * 100)}%
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{option.rationaleKorean}</p>
                  
                  <div>
                    <div className="text-xs font-medium text-gray-600 mb-1">처리 단계:</div>
                    <ol className="text-xs text-gray-600 space-y-1">
                      {option.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <span className="mr-2">{stepIndex + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SLA 힌트 */}
          {result.slaHintDays && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">처리 기한</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                권장 처리 기한: {result.slaHintDays}일 이내
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppealAnalyzer;
