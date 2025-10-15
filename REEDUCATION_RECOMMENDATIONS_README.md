# 재교육 권장 시스템 (Re-education Recommendations)

## 개요

재교육 권장 시스템은 간호학생들의 학습 성과를 개선하기 위한 맞춤형 재교육 모듈을 제공하는 전문적이고 신뢰할 수 있는 UI 컴포넌트입니다. 기존의 밝고 경고적인 색상 대신 의료/교육 환경에 적합한 세련되고 전문적인 디자인을 적용했습니다.

## 주요 개선사항

### 🎨 디자인 시스템 개선
- **전문적인 색상 팔레트**: 밝은 빨강/노랑 대신 Coral/Rose, Amber/Gold, Blue, Emerald 톤 사용
- **카드 기반 레이아웃**: 미묘한 그림자와 둥근 모서리로 현대적인 느낌
- **타이포그래피**: 일관된 폰트 시스템과 명확한 계층 구조
- **간격 시스템**: 16-24px의 적절한 여백으로 가독성 향상

### 📊 데이터 시각화
- **진행률 바**: 오류율을 직관적으로 표현하는 그라데이션 진행률 바
- **우선순위 표시**: 색상과 아이콘을 통한 명확한 우선순위 구분
- **학생 수 표시**: 영향받는 학생 수를 시각적 배지로 표현

### 🎯 사용자 경험 개선
- **필터링 시스템**: 우선순위별, 전체 항목 필터링
- **정렬 기능**: 우선순위, 오류율, 영향 학생 수 기준 정렬
- **호버 효과**: 부드러운 전환과 시각적 피드백
- **반응형 디자인**: 모바일부터 데스크톱까지 최적화

### ♿ 접근성 고려
- **색상 대비**: WCAG 가이드라인 준수
- **키보드 네비게이션**: 모든 인터랙션 요소 접근 가능
- **스크린 리더**: 의미있는 HTML 구조와 ARIA 라벨

## 컴포넌트 구조

```
ReeducationRecommendations/
├── RecommendationItem (인터페이스)
├── PriorityConfig (우선순위 설정)
├── CategoryIcons (카테고리 아이콘)
├── ProgressBar (진행률 바)
├── RecommendationCard (개별 카드)
└── ReeducationRecommendations (메인 컴포넌트)
```

## 사용법

### 기본 사용법

```tsx
import ReeducationRecommendations from './components/Evaluation/ReeducationRecommendations';

function App() {
  const handleAnalyze = (item) => {
    console.log('Analyzing:', item.title);
  };

  const handleAssignModule = (item) => {
    console.log('Assigning module for:', item.title);
  };

  return (
    <ReeducationRecommendations
      onAnalyze={handleAnalyze}
      onAssignModule={handleAssignModule}
    />
  );
}
```

### 커스텀 데이터 사용

```tsx
const customItems = [
  {
    id: '1',
    title: '약물 투여',
    category: 'Medication Administration',
    errorRate: 35,
    affectedStudents: 15,
    priority: 'urgent',
    description: '안전한 약물 투여 절차와 부작용 관리',
    lastUpdated: '2024-01-15'
  }
];

<ReeducationRecommendations
  items={customItems}
  onAnalyze={handleAnalyze}
  onAssignModule={handleAssignModule}
/>
```

## 우선순위 시스템

| 우선순위 | 색상 | 아이콘 | 설명 |
|---------|------|--------|------|
| 긴급 (urgent) | Rose/Coral | 🚨 | 즉시 조치 필요 |
| 높음 (high) | Amber/Gold | ⚠️ | 빠른 조치 권장 |
| 보통 (medium) | Blue | ℹ️ | 계획적 조치 |
| 낮음 (low) | Emerald | ✅ | 참고사항 |

## 카테고리 아이콘

- 🩺 무균술 (Aseptic Technique)
- 💉 IV 삽입 (IV Insertion)
- 🧼 손위생 (Hand Hygiene)
- 💊 약물 투여 (Medication Administration)
- 📋 환자 사정 (Patient Assessment)
- 🚑 응급처치 (Emergency Care)

## 스타일 가이드

### 색상 시스템
```css
/* 우선순위별 색상 */
.urgent { @apply bg-rose-500 text-rose-700 bg-rose-50 border-rose-200; }
.high { @apply bg-amber-500 text-amber-700 bg-amber-50 border-amber-200; }
.medium { @apply bg-blue-500 text-blue-700 bg-blue-50 border-blue-200; }
.low { @apply bg-emerald-500 text-emerald-700 bg-emerald-50 border-emerald-200; }
```

### 간격 시스템
- 카드 간격: 24px (space-y-6)
- 카드 내부 패딩: 24px (p-6)
- 요소 간 간격: 16px (space-y-4)
- 버튼 간격: 8px (space-x-2)

### 그림자 시스템
- 기본 카드: `shadow-sm`
- 호버 상태: `shadow-xl`
- 강조 카드: `shadow-lg`

## 반응형 디자인

### 브레이크포인트
- 모바일: < 640px (단일 컬럼)
- 태블릿: 640px - 1024px (2 컬럼)
- 데스크톱: > 1024px (2-3 컬럼)

### 레이아웃 변화
```tsx
// 반응형 그리드
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
  {items.map(item => (
    <RecommendationCard key={item.id} item={item} />
  ))}
</div>
```

## 성능 최적화

- **메모이제이션**: React.memo를 통한 불필요한 리렌더링 방지
- **가상화**: 대량 데이터 처리 시 react-window 고려
- **지연 로딩**: 이미지와 아이콘의 지연 로딩
- **번들 최적화**: Tree shaking을 통한 불필요한 코드 제거

## 테스트

### 단위 테스트
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ReeducationRecommendations from './ReeducationRecommendations';

test('renders recommendation items', () => {
  render(<ReeducationRecommendations />);
  expect(screen.getByText('무균술')).toBeInTheDocument();
});

test('handles filter change', () => {
  const onFilterChange = jest.fn();
  render(<ReeducationRecommendations onFilterChange={onFilterChange} />);
  
  fireEvent.click(screen.getByText('긴급'));
  expect(onFilterChange).toHaveBeenCalledWith('urgent');
});
```

### 접근성 테스트
- axe-core를 통한 자동화된 접근성 검사
- 키보드 네비게이션 테스트
- 스크린 리더 호환성 검증

## 브라우저 지원

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 라이선스

MIT License

## 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 변경 이력

### v1.0.0 (2024-01-15)
- 초기 릴리스
- 전문적인 디자인 시스템 적용
- 반응형 레이아웃 구현
- 접근성 개선
- 데이터 시각화 추가

