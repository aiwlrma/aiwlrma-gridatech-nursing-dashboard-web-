import React from 'react';

const Settings: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        <p className="text-sm text-gray-600 mt-1">
          시스템 설정과 사용자 권한을 관리하세요
        </p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="h-96 flex items-center justify-center text-gray-400">
          설정 인터페이스 (구현 예정)
        </div>
      </div>
    </div>
  );
};

export default Settings;
