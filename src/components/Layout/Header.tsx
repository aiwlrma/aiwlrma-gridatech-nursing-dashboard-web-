import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const notifications = [
    { id: 1, message: '박지훈 학생이 근육주사 술기영상을 제출했습니다.', time: '2시간 전', unread: true },
    { id: 2, message: '이서연 학생이 OSCE 스테이션 3에 대해 이의를 제기했습니다.', time: '1일 전', unread: true },
    { id: 3, message: '김민지 학생의 임상로그가 승인되었습니다.', time: '2일 전', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="학생/로테이션/병동 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </form>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">알림</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                      notification.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200">
                <button className="text-sm text-primary hover:underline">
                  모든 알림 보기
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
              김
            </div>
            <span className="font-medium">김교수</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-2">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  프로필
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  설정
                </button>
                <hr className="my-2" />
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
