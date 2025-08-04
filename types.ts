export type SubjectId = 'kurdish' | 'arabic' | 'english' | 'math' | 'physics' | 'chemistry' | 'biology' | 'economics' | 'geography' | 'history';

export interface Subject {
  id: SubjectId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type GradeId = '12-science' | '12-arts' | 'other' | 'study-plan';

export interface Grade {
  id: GradeId;
  name: string;
  subjects?: Subject[];
  icon?: React.ComponentType<{ className?: string }>;
}

export type View = 
  | 'home'
  | 'grade'
  | 'subject'
  | 'lesson'
  | 'quiz_setup'
  | 'quiz_active'
  | 'quiz_results'
  | 'admin_add'
  | 'admin_manage'
  | 'other_grades'
  | 'ministerial_exam_flow'
  | 'management'
  | 'other_grade_subjects';


export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: string;
}

export interface QuizResult {
    score: number;
    total: number;
    incorrectQuestions: Question[];
}

export interface TeacherResponse {
    question: string;
    answer: string;
}

export interface StudyDay {
  date: string;
  dayOfWeek: string;
  subjectName: string;
}

export interface ExamDay {
  date: string;
  dayOfWeek: string;
  subjectName: string;
  time: string;
}

export interface Highlight {
  id: string;
  text: string;
}

// Types for managed content
export interface ContentPackage {
  lessonHtml?: string;
  lessonQuiz?: { questions: Question[]; linked: boolean };
  ministerialQuiz?: { questions: Question[]; linked: boolean };
  questionBank?: { questions: Question[]; linked: boolean };
  videoUrl?: string;
}

// A flat structure where the key is a composite of grade and subject ID/name
// e.g., '12-science/physics' or 'g1/Mathematics'
export type ManagedContent = Record<string, ContentPackage>;