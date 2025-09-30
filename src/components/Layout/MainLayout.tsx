import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onPageChange: (page: string) => void;
  onSearch: (query: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activePage, 
  onPageChange, 
  onSearch 
}) => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activePage={activePage} onPageChange={onPageChange} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onSearch={onSearch} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
