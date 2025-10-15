import React from 'react';
import { 
  BarChart3, 
  FileText, 
  FolderOpen, 
  Calculator, 
  Megaphone, 
  AlertTriangle, 
  TrendingUp, 
  Settings,
  Bot,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: BarChart3 },
    { id: 'evaluation', label: '평가 설계', icon: FileText },
    { id: 'submissions', label: '제출/실습기록', icon: FolderOpen },
    { id: 'grades', label: '성적/컴피턴시', icon: Calculator },
    { id: 'ai-evaluation', label: 'AI 평가 도우미', icon: Bot },
    { id: 'reeducation-demo', label: '재교육 권장', icon: GraduationCap },
    { id: 'results', label: '결과 발표', icon: Megaphone },
    { id: 'appeals', label: '이의/재평가', icon: AlertTriangle },
    { id: 'reports', label: '보고서', icon: TrendingUp },
    { id: 'settings', label: '설정', icon: Settings }
  ];

  return (
    <div className="w-60 bg-white shadow-lg h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary">간호학생 평가시스템</h1>
        <p className="text-sm text-gray-600 mt-1">Nursing Student Evaluation</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'ai-evaluation' && (
                    <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      베타
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
            김
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">김교수</p>
            <p className="text-xs text-gray-500">교수</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
