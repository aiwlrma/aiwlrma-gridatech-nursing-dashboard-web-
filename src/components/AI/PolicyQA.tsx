import React, { useState } from 'react';
import { Search, FileText, ExternalLink, AlertCircle } from 'lucide-react';
import { AIEvaluationService, PolicyQAResult } from '../../services/AIEvaluationService';

interface PolicyQAProps {
  onAnswer: (result: PolicyQAResult) => void;
}

const PolicyQA: React.FC<PolicyQAProps> = ({ onAnswer }) => {
  const [question, setQuestion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<PolicyQAResult | null>(null);

  // 샘플 정책 문서 (실제로는 검색 API에서 가져옴)
  const sampleDocs = [
    {
      source: '간호학과 평가 규정',
      title: '제3장 평가 기준',
      section: '3.2 컴피턴시 평가',
      content: '컴피턴시 평가는 80% 이상 달성 시 통과로 하며, 크리티컬 실패 항목이 있는 경우 자동 불합격 처리한다.',
      relevanceScore: 0.9
    },
    {
      source: '대학 학사 규정',
      title: '제5장 성적 관리',
      section: '5.1 성적 공개',
      content: '성적 공개는 학기 종료 후 7일 이내에 완료하여야 하며, 학생은 공개 후 14일 이내에 이의를 제기할 수 있다.',
      relevanceScore: 0.7
    },
    {
      source: 'OSCE 평가 가이드라인',
      title: '제2장 평가 절차',
      section: '2.3 재평가',
      content: 'OSCE 재평가는 원래 평가자와 다른 평가자가 수행하며, 재평가 결과가 원래 결과와 10점 이상 차이나는 경우 추가 검토가 필요하다.',
      relevanceScore: 0.8
    }
  ];

  const handleSearch = async () => {
    if (!question.trim()) return;
    
    setIsSearching(true);
    try {
      const answer = await AIEvaluationService.answerPolicyQuestion(question, sampleDocs);
      setResult(answer);
      onAnswer(answer);
    } catch (error) {
      console.error('정책 검색 중 오류:', error);
    } finally {
      setIsSearching(false);
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
        <FileText className="w-6 h-6 text-primary mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">정책 Q&A</h3>
        <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
          AI 검색
        </span>
      </div>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="정책 관련 질문을 입력하세요 (예: 컴피턴시 통과 기준은?)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={isSearching || !question.trim()}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSearching ? (
              <Search className="w-4 h-4 animate-pulse" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="border-t border-gray-200 pt-4">
          {/* 답변 */}
          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-900 mb-2">AI 답변</h4>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-800">{result.answerKorean}</p>
              {result.confidence && (
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-gray-600 mr-2">신뢰도:</span>
                  <span className={`text-xs px-2 py-1 rounded ${getConfidenceColor(result.confidence)}`}>
                    {getConfidenceText(result.confidence)} ({Math.round(result.confidence * 100)}%)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 참조 문서 */}
          {result.citations && result.citations.length > 0 && (
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3">참조 문서</h4>
              <div className="space-y-2">
                {result.citations.map((citation, index) => (
                  <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{citation.source}</div>
                        {citation.section && (
                          <div className="text-sm text-gray-600">{citation.section}</div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          관련도: {Math.round(citation.relevance * 100)}%
                        </div>
                      </div>
                      {citation.url && (
                        <button className="ml-2 p-1 text-gray-400 hover:text-gray-600">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 관련도가 낮은 경우 경고 */}
          {result.confidence && result.confidence < 0.6 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">주의사항</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                AI 신뢰도가 낮습니다. 추가 확인이 필요할 수 있습니다.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 샘플 질문들 */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">자주 묻는 질문</h4>
        <div className="space-y-2">
          {[
            '컴피턴시 통과 기준은 무엇인가요?',
            'OSCE 재평가 절차는 어떻게 되나요?',
            '성적 공개 기한은 언제인가요?',
            '크리티컬 실패 시 어떻게 처리되나요?'
          ].map((sampleQ, index) => (
            <button
              key={index}
              onClick={() => setQuestion(sampleQ)}
              className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {sampleQ}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyQA;
