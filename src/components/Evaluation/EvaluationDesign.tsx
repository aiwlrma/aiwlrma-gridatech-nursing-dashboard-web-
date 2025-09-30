import React, { useState } from 'react';
import { Plus, Save, Edit, Trash2, Eye } from 'lucide-react';
import { sampleEvaluationItems } from '../../data/sampleData';
import PageHeader from '../Common/PageHeader';
import CriteriaBadge from '../Common/CriteriaBadge';

const EvaluationDesign: React.FC = () => {
  const [evaluationItems, setEvaluationItems] = useState(sampleEvaluationItems);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    type: 'competency' as 'competency' | 'osce' | 'simulation' | 'portfolio' | 'attendance' | 'patient-safety',
    weight: 0,
    passCriteria: '',
    maxScore: 100,
    isCritical: false,
    deadline: ''
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.weight > 0) {
      const item = {
        id: `item_${Date.now()}`,
        ...newItem,
        sessions: newItem.type === 'osce' ? 6 : undefined
      };
      setEvaluationItems([...evaluationItems, item]);
      setNewItem({
        name: '',
        type: 'competency',
        weight: 0,
        passCriteria: '',
        maxScore: 100,
        isCritical: false,
        deadline: ''
      });
      setIsAddingItem(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setEvaluationItems(evaluationItems.filter(item => item.id !== id));
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'competency': '체크리스트',
      'osce': '스테이션 평가',
      'simulation': '팀시뮬+디브리프',
      'portfolio': '포트폴리오',
      'attendance': '출석/근태',
      'patient-safety': '크리티컬패일'
    };
    return labels[type] || type;
  };

  const getCriteriaBadge = (item: any) => {
    if (item.isCritical) {
      return <CriteriaBadge type="critical" value="실패시 불합격" />;
    }
    if (item.passCriteria?.includes('%')) {
      const percentage = item.passCriteria.match(/\d+/)?.[0];
      return <CriteriaBadge type="pass" value={`${percentage}%`} />;
    }
    if (item.weight) {
      return <CriteriaBadge type="weight" value={`${item.weight}%`} />;
    }
    if (item.passCriteria?.includes('h')) {
      const hours = item.passCriteria.match(/\d+/)?.[0];
      return <CriteriaBadge type="hours" value={`${hours}h`} />;
    }
    return <span className="text-gray-500 text-sm">-</span>;
  };

  const getStatusColor = (status: string) => {
    return status === '활성' ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-50';
  };

  // Calculate total weight
  const totalWeight = evaluationItems.reduce((sum, item) => sum + (item.weight || 0), 0);
  const isValid = totalWeight === 100;
  const progressColor = totalWeight === 100 ? 'bg-green-500' : 
                        totalWeight >= 90 && totalWeight <= 110 ? 'bg-yellow-500' : 
                        'bg-red-500';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader 
        title="평가 설계" 
        subtitle="컴피턴시, OSCE, 시뮬레이션 등 평가 항목과 루브릭을 구성하세요" 
      />

      {/* Course Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">강의/로테이션 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">강의명</label>
            <input
              type="text"
              defaultValue="성인간호학 실습(내과병동)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">기간</label>
            <input
              type="text"
              defaultValue="2024-03-01 ~ 2024-06-30"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">실습기관</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>세브란스 내과병동</option>
              <option>삼성서울병원 소아과</option>
              <option>서울대병원 산부인과</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button 
            className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
              isValid 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isValid}
            title={!isValid ? '가중치 합계를 100%로 맞춰주세요' : ''}
          >
            <Save className="w-4 h-4 mr-2" />
            저장
          </button>
        </div>
      </div>

      {/* Evaluation Items */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Weight Progress Banner */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              가중치 합계: {totalWeight}% / 100%
            </span>
            <span className={`text-sm font-medium ${
              totalWeight === 100 ? 'text-green-600' : 
              totalWeight >= 90 && totalWeight <= 110 ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {totalWeight === 100 ? '✓ 완료' : 
               totalWeight >= 90 && totalWeight <= 110 ? '⚠️ 거의 완료' : 
               '❌ 조정 필요'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
              style={{ width: `${Math.min(totalWeight, 100)}%` }}
            />
          </div>
          {!isValid && (
            <p className="text-xs text-red-600 mt-2">
              ⚠️ 총 가중치가 100%가 되어야 저장할 수 있습니다.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">평가 항목 관리</h2>
          <button
            onClick={() => setIsAddingItem(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            새 항목 추가
          </button>
        </div>

        {/* Add New Item Form */}
        {isAddingItem && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-md font-medium text-gray-900 mb-4">새 평가 항목 추가</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">항목명</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="예: 근육주사 술기"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">유형</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({...newItem, type: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="competency">체크리스트</option>
                  <option value="osce">스테이션 평가</option>
                  <option value="simulation">팀시뮬+디브리프</option>
                  <option value="portfolio">포트폴리오</option>
                  <option value="attendance">출석/근태</option>
                  <option value="patient-safety">크리티컬패일</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">가중치 (%)</label>
                <input
                  type="number"
                  value={newItem.weight}
                  onChange={(e) => setNewItem({...newItem, weight: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">통과기준</label>
                <input
                  type="text"
                  value={newItem.passCriteria}
                  onChange={(e) => setNewItem({...newItem, passCriteria: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="예: 통과기준 80%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">만점</label>
                <input
                  type="number"
                  value={newItem.maxScore}
                  onChange={(e) => setNewItem({...newItem, maxScore: parseInt(e.target.value) || 100})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">기한</label>
                <input
                  type="text"
                  value={newItem.deadline}
                  onChange={(e) => setNewItem({...newItem, deadline: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="예: 2024-03-15"
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newItem.isCritical}
                  onChange={(e) => setNewItem({...newItem, isCritical: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">크리티컬 실패 항목</span>
              </label>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleAddItem}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                추가
              </button>
              <button
                onClick={() => setIsAddingItem(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        )}

        {/* Evaluation Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">항목명</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">유형</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">가중치</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">통과기준/크리티컬</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">만점/기준</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">기한/회차</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">상태</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">조작</th>
              </tr>
            </thead>
            <tbody>
              {evaluationItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      {item.isCritical && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium text-white bg-error rounded-full">
                          크리티컬
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{getTypeLabel(item.type)}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.weight ? `${item.weight}%` : '-'}
                  </td>
                  <td className="py-3 px-4">
                    {getCriteriaBadge(item)}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.maxScore ? item.maxScore : '-'}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{item.deadline || '-'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor('활성')}`}>
                      활성
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-primary">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-primary">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-gray-400 hover:text-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rubric Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">루브릭/체크리스트 설정</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">평가 기준</label>
            <select className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>근육주사(IM)</option>
              <option>혈압측정</option>
              <option>IV 삽입</option>
              <option>CPR</option>
              <option>무균술</option>
              <option>투약 5-Rights</option>
            </select>
          </div>
          
          {/* Critical Failure Toggle */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="critical-failure"
                className="w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500"
              />
              <label htmlFor="critical-failure" className="ml-3 text-sm font-medium text-red-800">
                🚨 크리티컬 실패 시 자동 불합격
              </label>
            </div>
            <p className="text-xs text-red-600 mt-2">
              ℹ️ 체크 시 이 항목의 크리티컬 기준 미달 시 전체 불합격 처리됩니다.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">기준</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">우수(5)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">양호(4)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">보통(3)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">미흡(2)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">실패(1/크리티컬)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">무균술</td>
                  <td className="py-3 px-4 text-center text-gray-600">정확/유지</td>
                  <td className="py-3 px-4 text-center text-gray-600">양호</td>
                  <td className="py-3 px-4 text-center text-gray-600">보통</td>
                  <td className="py-3 px-4 text-center text-gray-600">미흡</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium border border-red-200">
                      🚨 바늘 재뚜껑(크리티컬)
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">투약 5-Rights</td>
                  <td className="py-3 px-4 text-center text-gray-600">5/5 준수</td>
                  <td className="py-3 px-4 text-center text-gray-600">4/5 준수</td>
                  <td className="py-3 px-4 text-center text-gray-600">3/5 준수</td>
                  <td className="py-3 px-4 text-center text-gray-600">2/5 준수</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium border border-red-200">
                      🚨 환자/약물 식별 오류(크리티컬)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              저장
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
              미리보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationDesign;
