import React, { useState } from 'react';
import { Student, StudentListFilters } from '../types/student';
import { generateSampleStudents } from '../data/studentData';
import StudentListTable from '../components/Students/StudentListTable';
import StudentDetailDrawer from '../components/Students/StudentDetailDrawer';

const Students: React.FC = () => {
  const [students] = useState<Student[]>(generateSampleStudents(20));
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [filters, setFilters] = useState<StudentListFilters>({
    search: '',
    vrStatus: 'all',
    attendanceRate: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedStudent(null);
  };

  const handleFiltersChange = (newFilters: Partial<StudentListFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">학습자 관리</h1>
        <p className="text-sm text-gray-600 mt-1">
          학생들의 VR 학습 현황과 성과를 관리하세요
        </p>
      </div>

      <StudentListTable
        students={students}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onStudentSelect={handleStudentSelect}
      />

      <StudentDetailDrawer
        student={selectedStudent}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </div>
  );
};

export default Students;
