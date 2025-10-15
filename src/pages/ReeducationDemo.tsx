import React from 'react';
import ReeducationRecommendations from '../components/Evaluation/ReeducationRecommendations';

const ReeducationDemo: React.FC = () => {
  const handleAnalyze = (item: any) => {
    alert(`상세 분석을 시작합니다: ${item.title}`);
  };

  const handleAssignModule = (item: any) => {
    alert(`모듈 배정을 시작합니다: ${item.title}`);
  };

  const handleFilterChange = (filter: string) => {
    console.log('Filter changed to:', filter);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            재교육 권장 시스템
          </h1>
          <p className="text-gray-600">
            전문적이고 신뢰할 수 있는 재교육 권장 항목 관리 시스템
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="text-3xl mb-3 opacity-70">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">우선순위 기반</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                긴급도에 따른 체계적인 분류와 관리
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="text-3xl mb-3 opacity-70">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">데이터 시각화</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                오류율과 영향 학생 수의 직관적 표현
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="text-3xl mb-3 opacity-70">🎨</div>
              <h3 className="font-semibold text-gray-900 mb-2">전문적 디자인</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                의료/교육 환경에 적합한 신뢰할 수 있는 UI
              </p>
            </div>
          </div>
        </div>

        {/* Main Component */}
        <ReeducationRecommendations
          onAnalyze={handleAnalyze}
          onAssignModule={handleAssignModule}
          onFilterChange={handleFilterChange}
        />

        {/* Design System Info */}
        <div className="mt-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">디자인 시스템 특징</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">그레이스케일 색상 시스템</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 긴급: 진한 회색 (#E5E7EB) 배경으로 강조</li>
                  <li>• 중요: 중간 회색 (#F3F4F6) 배경으로 주의</li>
                  <li>• 주의: 연한 회색 (#F9FAFB) 배경으로 정보</li>
                  <li>• 낮음: 화이트 배경으로 안정성 표현</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">UX 개선사항</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 미묘한 그림자와 부드러운 호버 효과</li>
                  <li>• 회색 톤의 명도 차이로 우선순위 표현</li>
                  <li>• 전문적이고 신뢰할 수 있는 디자인</li>
                  <li>• 의료/교육 환경에 적합한 차분한 느낌</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReeducationDemo;
