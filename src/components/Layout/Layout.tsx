import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, ClipboardCheck, Calendar, 
  Sparkles, FileText, MessageSquare, Settings, 
  Bell, Search, Menu, X 
} from 'lucide-react';
import useStore from '../../store/useStore';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { currentUser, alerts, unreadAlertCount } = useStore();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: '대시보드', group: '학습관리' },
    { path: '/students', icon: Users, label: '학습자 관리', group: '학습관리' },
    { path: '/evaluation', icon: ClipboardCheck, label: '평가 관리', group: '학습관리' },
    { path: '/attendance', icon: Calendar, label: '출석 관리', group: '학습관리' },
    { path: '/ai-studio', icon: Sparkles, label: 'AI Studio', group: 'AI 기능', badge: 'NEW' },
    { path: '/reports', icon: FileText, label: '리포트', group: '분석' },
    { path: '/messages', icon: MessageSquare, label: '메시지', group: '소통' },
    { path: '/settings', icon: Settings, label: '설정', group: '관리', disabled: true }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8EBF0' }}>
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[220px] lg:flex-col" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-4 pb-4">
          <div className="flex h-16 shrink-0 items-center border-b border-gray-200">
            <h1 className="text-lg font-bold text-blue-600">GRIDATECH</h1>
          </div>
          <nav className="flex flex-1 flex-col py-4">
            {/* Group by category */}
            {['학습관리', 'AI 기능', '분석', '소통', '관리'].map((group) => (
              <div key={group} className="mb-6">
                <div className="px-4 mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {group}
                  </span>
                </div>
                <ul className="space-y-1">
                  {menuItems
                    .filter(item => item.group === group)
                    .map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={`
                              flex items-center gap-3 px-4 py-2 text-sm font-medium
                              ${isActive(item.path)
                                ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600'
                                : item.disabled
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                              }
                            `}
                          >
                            <Icon className="w-5 h-5 shrink-0" />
                            <span className={isActive(item.path) ? 'font-medium' : ''}>{item.label}</span>
                            {item.badge && (
                              <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                {item.badge}
                              </span>
                            )}
                            {item.disabled && (
                              <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                                준비중
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <h1 className="text-xl font-bold text-purple-600">SchoolHub</h1>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {menuItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <li key={item.path}>
                              <Link
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                  group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                  ${isActive(item.path)
                                    ? 'bg-purple-50 text-purple-600'
                                    : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                                  }
                                `}
                              >
                                <Icon className="h-6 w-6 shrink-0" />
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-[220px]">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-x-4 border-b bg-white px-6 flex items-center justify-end gap-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 items-center">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="학생, 로테이션, 병동 검색..."
                className="block w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <select className="rounded-lg border border-gray-300 text-sm py-2 px-3">
                <option>2025-1학기</option>
                <option>2024-2학기</option>
                <option>2024-1학기</option>
              </select>
              
              <button className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <Bell className="h-5 w-5" />
                {unreadAlertCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

              <div className="flex items-center gap-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">
                    {currentUser?.role === 'instructor' ? '교수' : '관리자'}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">
                    {currentUser?.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
