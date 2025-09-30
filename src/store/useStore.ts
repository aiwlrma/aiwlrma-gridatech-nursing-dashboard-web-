import { create } from 'zustand';

interface Alert {
  id: string;
  type: 'attendance' | 'performance' | 'deadline' | 'system';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  studentIds?: string[];
  moduleId?: string;
  actions?: Array<{
    label: string;
    action: () => void;
    variant: 'primary' | 'secondary';
  }>;
  isRead: boolean;
  isDismissed: boolean;
}

interface AppState {
  // Current user
  currentUser: {
    id: string;
    name: string;
    role: 'instructor' | 'admin';
  } | null;
  
  // Selected term/class
  selectedTerm: string;
  selectedClass: string | null;
  
  // Students data
  students: any[];
  selectedStudent: any | null;
  
  // VR sessions
  vrSessions: any[];
  
  // Alerts
  alerts: Alert[];
  unreadAlertCount: number;
  
  // Actions
  setSelectedTerm: (term: string) => void;
  setSelectedClass: (classId: string | null) => void;
  setSelectedStudent: (student: any | null) => void;
  addAlert: (alert: Alert) => void;
  dismissAlert: (alertId: string) => void;
  markAlertAsRead: (alertId: string) => void;
}

const useStore = create<AppState>((set) => ({
  currentUser: {
    id: 'instructor-1',
    name: '김교수',
    role: 'instructor'
  },
  selectedTerm: '2025-1',
  selectedClass: null,
  students: [],
  selectedStudent: null,
  vrSessions: [],
  alerts: [],
  unreadAlertCount: 0,
  
  setSelectedTerm: (term) => set({ selectedTerm: term }),
  setSelectedClass: (classId) => set({ selectedClass: classId }),
  setSelectedStudent: (student) => set({ selectedStudent: student }),
  
  addAlert: (alert) => set((state) => ({
    alerts: [alert, ...state.alerts],
    unreadAlertCount: state.unreadAlertCount + 1
  })),
  
  dismissAlert: (alertId) => set((state) => ({
    alerts: state.alerts.filter(a => a.id !== alertId)
  })),
  
  markAlertAsRead: (alertId) => set((state) => ({
    alerts: state.alerts.map(a => 
      a.id === alertId ? { ...a, isRead: true } : a
    ),
    unreadAlertCount: Math.max(0, state.unreadAlertCount - 1)
  }))
}));

export default useStore;
