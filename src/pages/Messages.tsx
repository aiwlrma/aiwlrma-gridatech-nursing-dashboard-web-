import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Star, 
  Search, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video, 
  User, 
  Check, 
  CheckCheck, 
  MessageCircle, 
  Bell, 
  Target, 
  Activity, 
  Award, 
  FileText,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  type: 'text' | 'file' | 'feedback';
  attachments?: string[];
}

interface Conversation {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  isImportant: boolean;
  status: 'active' | 'archived' | 'blocked';
}

interface StudentProfile {
  id: string;
  name: string;
  studentId: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
  achievementRate: number;
  recentScore: number;
  attendanceRate: number;
  vrSessions: number;
  currentModule: string;
  progress: number;
}

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'important' | 'recent'>('all');
  const [newMessage, setNewMessage] = useState('');
  const [showStudentProfile, setShowStudentProfile] = useState(false);

  // Sample data
  const conversations: Conversation[] = [
    {
      id: '1',
      studentId: '20210001',
      studentName: '김철수',
      studentAvatar: 'KC',
      lastMessage: '교수님, VR 실습에서 어려움이 있어서 도움이 필요합니다.',
      lastMessageTime: '2분 전',
      unreadCount: 2,
      isOnline: true,
      isImportant: true,
      status: 'active'
    },
    {
      id: '2',
      studentId: '20210002',
      studentName: '이영희',
      studentAvatar: 'LY',
      lastMessage: '중간고사 피드백 감사합니다. 더 열심히 하겠습니다.',
      lastMessageTime: '1시간 전',
      unreadCount: 0,
      isOnline: false,
      isImportant: false,
      status: 'active'
    },
    {
      id: '3',
      studentId: '20210003',
      studentName: '박민수',
      studentAvatar: 'PM',
      lastMessage: '출석 관련 문의드립니다.',
      lastMessageTime: '3시간 전',
      unreadCount: 1,
      isOnline: true,
      isImportant: false,
      status: 'active'
    },
    {
      id: '4',
      studentId: '20210004',
      studentName: '정수진',
      studentAvatar: 'JS',
      lastMessage: 'VR 모듈 추천해주세요.',
      lastMessageTime: '1일 전',
      unreadCount: 0,
      isOnline: false,
      isImportant: true,
      status: 'active'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: 'student',
      senderName: '김철수',
      senderAvatar: 'KC',
      content: '교수님, VR 실습에서 어려움이 있어서 도움이 필요합니다.',
      timestamp: '14:32',
      isRead: true,
      isImportant: false,
      type: 'text'
    },
    {
      id: '2',
      senderId: 'professor',
      senderName: '김교수',
      senderAvatar: '김',
      content: '어떤 부분에서 어려움을 겪고 있나요? 구체적으로 설명해주세요.',
      timestamp: '14:35',
      isRead: true,
      isImportant: false,
      type: 'text'
    },
    {
      id: '3',
      senderId: 'student',
      senderName: '김철수',
      senderAvatar: 'KC',
      content: '무균술 프로토콜에서 손 위생 단계를 놓치는 경우가 많습니다.',
      timestamp: '14:38',
      isRead: true,
      isImportant: false,
      type: 'text'
    },
    {
      id: '4',
      senderId: 'professor',
      senderName: '김교수',
      senderAvatar: '김',
      content: '그렇다면 추가 VR 모듈을 배정해드리겠습니다. 손위생 프로토콜 모듈을 추천합니다.',
      timestamp: '14:40',
      isRead: false,
      isImportant: true,
      type: 'text'
    }
  ];

  const studentProfile: StudentProfile = {
    id: '20210001',
    name: '김철수',
    studentId: '20210001',
    avatar: 'KC',
    isOnline: true,
    lastSeen: '2분 전',
    achievementRate: 78.5,
    recentScore: 85,
    attendanceRate: 92.3,
    vrSessions: 15,
    currentModule: '무균술 프로토콜',
    progress: 65
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.studentId.includes(searchQuery);
    
    switch (filterType) {
      case 'unread':
        return matchesSearch && conv.unreadCount > 0;
      case 'important':
        return matchesSearch && conv.isImportant;
      case 'recent':
        return matchesSearch && (conv.lastMessageTime.includes('분 전') || conv.lastMessageTime.includes('시간 전'));
      default:
        return matchesSearch;
    }
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Simulate sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              메시지
            </h1>
            <p className="text-sm text-gray-600 mt-1">학생들과의 소통과 피드백을 관리하세요</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="학생명 또는 학번 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체</option>
              <option value="unread">읽지 않음</option>
              <option value="important">중요</option>
              <option value="recent">최근</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Conversation List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">받은 메시지</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {conversations.filter(c => c.unreadCount > 0).length}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg">
                받은 메시지
              </button>
              <button className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">
                보낸 메시지
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                whileHover={{ backgroundColor: '#F9FAFB' }}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                      {conversation.studentAvatar}
                    </div>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.studentName}</h3>
                      <div className="flex items-center gap-2">
                        {conversation.isImportant && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 truncate mb-2">{conversation.lastMessage}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{conversation.studentId}</span>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center - Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                      {studentProfile.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{studentProfile.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{studentProfile.studentId}</span>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${studentProfile.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <span className="text-xs text-gray-500">
                            {studentProfile.isOnline ? '온라인' : studentProfile.lastSeen}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowStudentProfile(!showStudentProfile)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <User size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Phone size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Video size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.senderId === 'professor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-xs lg:max-w-md ${message.senderId === 'professor' ? 'flex-row-reverse' : ''}`}>
                        <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {message.senderAvatar}
                        </div>
                        <div className="flex flex-col">
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              message.senderId === 'professor'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            {message.isImportant && (
                              <Star className="w-4 h-4 text-yellow-400 fill-current mt-1" />
                            )}
                          </div>
                          <div className={`flex items-center gap-1 mt-1 ${message.senderId === 'professor' ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                            {message.senderId === 'professor' && (
                              <div className="flex items-center gap-1">
                                {message.isRead ? (
                                  <CheckCheck className="w-3 h-3 text-blue-500" />
                                ) : (
                                  <Check className="w-3 h-3 text-gray-400" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Paperclip size={18} />
                  </button>
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="메시지를 입력하세요..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={1}
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                      <Smile size={18} />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">대화를 선택하세요</h3>
                <p className="text-gray-600">좌측에서 학생과의 대화를 선택하여 메시지를 확인하세요.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Student Profile & Actions */}
        {showStudentProfile && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-80 bg-white border-l border-gray-200 flex flex-col"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">학생 정보</h3>
                <button 
                  onClick={() => setShowStudentProfile(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Student Profile */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  {studentProfile.avatar}
                </div>
                <h4 className="font-semibold text-gray-900">{studentProfile.name}</h4>
                <p className="text-sm text-gray-500">{studentProfile.studentId}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className={`w-2 h-2 rounded-full ${studentProfile.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-xs text-gray-500">
                    {studentProfile.isOnline ? '온라인' : studentProfile.lastSeen}
                  </span>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-900">성과 요약</h5>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">성취율</span>
                    <span className="text-lg font-bold text-blue-600">{studentProfile.achievementRate}%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${studentProfile.achievementRate}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-600">최근 점수</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{studentProfile.recentScore}점</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-purple-600" />
                      <span className="text-xs text-gray-600">출석률</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{studentProfile.attendanceRate}%</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-orange-600" />
                    <span className="text-xs text-gray-600">VR 세션</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{studentProfile.vrSessions}회</p>
                </div>
              </div>

              {/* Current Module */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">현재 학습 모듈</h5>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{studentProfile.currentModule}</span>
                    <span className="text-sm font-bold text-gray-900">{studentProfile.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${studentProfile.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FileText size={18} />
                  피드백 남기기
                </button>
                
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Target size={18} />
                  재교육 모듈 배정
                </button>
                
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Bell size={18} />
                  알림 전송
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Messages;