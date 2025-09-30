import React from 'react';
import { useParams } from 'react-router-dom';

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">학생 상세 정보</h1>
        <p className="text-sm text-gray-600 mt-1">
          학생 ID: {id}의 상세 정보와 VR 학습 현황
        </p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="h-96 flex items-center justify-center text-gray-400">
          학생 상세 정보 패널 (구현 예정)
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
