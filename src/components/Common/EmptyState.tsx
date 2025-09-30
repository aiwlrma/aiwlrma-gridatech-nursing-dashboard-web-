import React from 'react';
import { FileText, Calculator, Upload, UserPlus } from 'lucide-react';

interface EmptyStateProps {
  type: 'submissions' | 'grades';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  if (type === 'submissions') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <FileText size={64} className="text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          아직 제출물이 없습니다
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6 max-w-md">
          학생들의 술기 영상, 임상로그, OSCE 제출물을 수집하세요.
          엑셀로 일괄 등록하거나 학생을 개별 초대할 수 있습니다.
        </p>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Upload size={18} />
            엑셀 업로드
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            <UserPlus size={18} />
            학생 불러오기
          </button>
        </div>
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 max-w-md">
          <p className="text-xs text-gray-600 mb-2">💡 <strong>예시 데이터 구조</strong></p>
          <code className="text-xs">
            학번, 이름, 로테이션, 병동<br/>
            20210001, 김철수, 내과, 7병동
          </code>
        </div>
      </div>
    );
  }

  if (type === 'grades') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <Calculator size={64} className="text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          성적을 계산할 준비가 되지 않았습니다
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6 max-w-md">
          먼저 평가 항목을 설계하고 학생들의 제출물을 채점하세요.
          모든 항목의 채점이 완료되면 최종 성적을 산출할 수 있습니다.
        </p>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            평가 설계로 이동
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            채점 페이지로 이동
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default EmptyState;
