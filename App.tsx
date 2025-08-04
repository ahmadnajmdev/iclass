
import React, { useState, useCallback } from 'react';
import { type View, type GradeId, type SubjectId, type QuizResult, type TeacherResponse, type ManagedContent, type ContentPackage, type Subject, type Highlight } from './types';
import { GRADES, MOCK_QUESTIONS, SUBJECT_MENU_ITEMS, OTHER_GRADES_LIST } from './constants';
import { HomeIcon, Menu, Plus, X, GraduationCap, Settings } from 'lucide-react';
import { Lesson } from './components/Lesson';
import { Quiz } from './components/Quiz';
import { OtherGrades } from './components/OtherGrades';
import AddData from './components/AddData';
import { MinisterialExam } from './components/MinisterialExam';
import { Management } from './components/Management';
import { OtherGradeSubjects } from './components/OtherGradeSubjects';

// Pre-populated data for demonstration purposes
const initialManagedContent: ManagedContent = {
  // G12 Science
  '12-science/physics': {
    lessonHtml: `
      <h1 style="color: #38bdf8; font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">فیزیا - بەندی یەکەم: میکانیک</h1>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">میکانیک ئەو لقەی فیزیایە کە تایبەتە بە لێکۆڵینەوە لە جووڵەی تەنەکان و ئەو هێزانەی دەبنە هۆی جووڵەیان. ئەم بەشە خۆی دابەش دەبێت بۆ دوو بەشی سەرەکی: کاینێماتیک و داینامیک.</p>
      <h2 style="color: #7dd3fc; font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 0.5rem;">کاینێماتیک (Kinematics)</h2>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">لێرەدا تەنها باسی جووڵەی تەنەکان دەکەین بەبێ لەبەرچاوگرتنی هۆکاری جووڵەکە. چەمکەکانی وەک شوێن، خێرایی، و تاودان لێرەدا تاوتوێ دەکرێن.</p>
      <h2 style="color: #7dd3fc; font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 0.5rem;">داینامیک (Dynamics)</h2>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">لەم بەشەدا، هۆکاری جووڵە (هێز) لەبەرچاو دەگرین. یاساکانی نیوتن بۆ جووڵە بنچینەی ئەم بەشەن.</p>
      `,
    lessonQuiz: {
      questions: [
        { id: 101, text: 'یەکەی پێوانەی هێز لە سیستەمی نێودەوڵەتیدا چییە؟', options: ['پاسکال', 'نیوتن', 'وات', 'جوول'], correctAnswer: 'نیوتن' },
        { id: 102, text: 'کام لەمانە بە نموونەی وزەی نوێبووەوە دانانرێت؟', options: ['وزەی خۆر', 'وزەی با', 'نەوت', 'وزەی ئاو'], correctAnswer: 'نەوت' },
      ],
      linked: true,
    },
  },
  '12-science/chemistry': {
    lessonHtml: `
      <h1 style="color: #2dd4bf; font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">کیمیا - هاوسەنگیی کیمیایی</h1>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">هاوسەنگیی کیمیایی ئەو دۆخەیە کە تێیدا خێرایی کارلێکی پێشەوە و کارلێکی پێچەوانە یەکسان دەبن. لەم دۆخەدا، خەستیی کارلێککەرەکان و بەرهەمەکان جێگیر دەمێننەوە.</p>
      <h2 style="color: #5eead4; font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 0.5rem;">بنەمای لۆشاتلیێ (Le Chatelier's Principle)</h2>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">ئەگەر گۆڕانکارییەک (وەک گۆڕینی خەستی، پەستان، یان پلەی گەرمی) بەسەر سیستەمێکی هاوسەنگدا بهێنرێت، ئەوا سیستەمەکە بەو ئاڕاستەیە دەجووڵێت کە کاریگەریی گۆڕانکارییەکە کەم بکاتەوە.</p>
      `,
     lessonQuiz: {
        questions: [
            { id: 201, text: 'ژمارەی ئەڤۆگادرۆ بریتییە لە:', options: ['6.022 x 10^23', '3.14159', '9.81 m/s²', '1.602 x 10^-19 C'], correctAnswer: '6.022 x 10^23' },
            { id: 202, text: 'pHی گیراوەیەکی تفتە بەهێز چییە؟', options: ['زیاتر لە ٧', 'یەکسانە بە ٧', 'کەمتر لە ٧', 'صفر'], correctAnswer: 'زیاتر لە ٧' },
        ],
        linked: true,
    }
  },
  // G12 Arts
  '12-arts/history': {
    lessonHtml: `
      <h1 style="color: #facc15; font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">مێژوو - شۆڕشی فەرەنسی</h1>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">شۆڕشی فەرەنسی (١٧٨٩-١٧٩٩) قۆناغێکی پڕ گۆڕانکاریی کۆمەڵایەتی و سیاسی بوو لە مێژووی فەرەنسادا. ئەم شۆڕشە بووە هۆی ڕووخانی دەسەڵاتی پاشایەتی و دامەزراندنی کۆمار.</p>
      `
  },
  '12-arts/economics': {
      lessonHtml: `
      <h1 style="color: #4ade80; font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">ئابووری - بنەماکانی داوا و خستنەڕوو</h1>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">داوا (Demand) بریتییە لەو بڕەی کاڵا یان خزمەتگوزاری کە بەکارهێنەران ئامادەن و توانایان هەیە بیکڕن لە نرخە جیاوازەکاندا. خستنەڕوو (Supply) بریتییە لەو بڕەی کە بەرهەمهێنەران ئامادەن بیفرۆشن.</p>
      `
  },
  // Other Grades
  'other/g3/کوردی': {
    lessonHtml: `
      <h1 style="color: #f472b6; font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">زمانی کوردی بۆ پۆلی سێیەم</h1>
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 0.5rem;">بابەت: پیتەکان</h2>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">ئەمڕۆ فێری پیتی "ب" دەبین. وەک لە وشەکانی: <strong style="font-weight: bold;">باران</strong>، <strong style="font-weight: bold;">نان</strong>، <strong style="font-weight: bold;">کتێب</strong>.</p>
      `
  },
  'other/g7/ئینگلیزی': {
    lessonHtml: `
      <h1 style="color: #818cf8; font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">English for Grade 7</h1>
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 0.5rem;">Unit 1: Greetings</h2>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">In this lesson, we learn how to greet people and introduce ourselves.</p>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;"><strong>Examples:</strong></p>
      <ul style="list-style-type: disc; margin-left: 2rem;">
        <li>Hello, my name is Zana.</li>
        <li>Good morning, teacher.</li>
        <li>How are you? I'm fine, thank you.</li>
      </ul>
      `
  },
  'other/g8/فیزیا': {
    lessonHtml: `
      <h1 style="color: #38bdf8; font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">فیزیا بۆ پۆلی هەشتەم</h1>
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 0.5rem;">بابەت: کارەبا</h2>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">لەم وانەیەدا باس لە چەمکی کارەبا و چۆنیەتی دروستبوونی سووڕێکی کارەبایی سادە دەکەین. سووڕی کارەبایی پێویستی بە سەرچاوەی وزە (پاتری)، گەیەنەر (وایەر)، و بار (گڵۆپ) هەیە.</p>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">لەم ڤیدیۆیەدا بە کرداری چۆنیەتی دروستکردنی سووڕێکی کارەبایی دەبینیت.</p>
      `,
    videoUrl: 'https://www.youtube.com/embed/voc0Jb3pG1c'
  },
   'other/g9/بیرکاری': {
      lessonHtml: `
      <h1 style="color: #a3e635; font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">بیرکاری - ئەندازە</h1>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">ئەندازە لقێکی بیرکارییە کە لە شێوە، قەبارە، و تایبەتمەندییەکانی بۆشایی دەکۆڵێتەوە.</p>
      <h2 style="color: #bef264; font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 0.5rem;">تیۆریی فیساگۆرس</h2>
      <p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: 1rem;">لە سێگۆشەی گۆشەوەstaودا، دووجای ژێ (hypotenuse) یەکسانە بە کۆی دووجای هەردوو لایەکەی تر. (a² + b² = c²)</p>
      `
  }
};


const Header: React.FC<{ onMenuClick: () => void; onHomeClick: () => void; onAddClick: () => void }> = ({ onMenuClick, onHomeClick, onAddClick }) => (
  <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-slate-700">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="p-2 rounded-md hover:bg-slate-700 transition-colors">
          <Menu className="w-6 h-6 text-sky-400" />
        </button>
        <h1 className="text-xl font-bold text-white tracking-wider">I CLASS - ئای کڵاس</h1>
      </div>
      <div className="flex items-center gap-2">
         <button onClick={onHomeClick} className="p-2 rounded-md hover:bg-slate-700 transition-colors">
          <HomeIcon className="w-6 h-6 text-sky-400" />
        </button>
        <button onClick={onAddClick} className="p-2 rounded-md hover:bg-slate-700 transition-colors">
          <Plus className="w-6 h-6 text-sky-400" />
        </button>
      </div>
    </div>
  </header>
);

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void; onManageContent: () => void }> = ({ isOpen, onClose, onManageContent }) => {
    const menuItems = [
        "باخچەی ساوایان", "قوتابخانەی سەرەتایی", "قوتابخانەی پۆلی ١-٩",
        "قوتابخانەی ناوەندیی", "ئامادەیی", "پەیمانگاکان", "زانکۆکان",
        "خولەکانی هاوینە", "ڕێگاکانی خوێندن", "ڕێگاکانی وانەگوتنەوە",
        "مامۆستای تایبەت", "مەلزەمەکان"
    ];
    return (
        <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'bg-black/60' : 'pointer-events-none'}`} onClick={onClose}>
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-slate-800 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-slate-700">
                    <h2 className="text-lg font-semibold text-white">لیست</h2>
                    <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-700">
                        <X className="w-6 h-6 text-sky-400" />
                    </button>
                </div>
                <nav className="p-4">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a href="#" className="block py-2 px-3 rounded-md text-slate-300 hover:bg-sky-500/20 hover:text-white transition-colors">
                                    {item}
                                </a>
                            </li>
                        ))}
                        <li className="mt-4 pt-4 border-t border-slate-700">
                           <button onClick={onManageContent} className="w-full flex items-center gap-3 py-2 px-3 rounded-md text-slate-300 hover:bg-sky-500/20 hover:text-white transition-colors">
                                <Settings className="w-5 h-5" />
                                بەڕێوەبردنی ناوەڕۆک
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

const Home: React.FC<{ onSelectGrade: (id: GradeId) => void }> = ({ onSelectGrade }) => (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-8rem)]">
        <div className="w-full max-w-4xl">
            <div className="text-center mb-12">
                <div className="inline-block bg-sky-500/10 p-4 rounded-full mb-4">
                    <div className="inline-block bg-sky-500/20 p-3 rounded-full">
                        <GraduationCap className="w-12 h-12 text-sky-400" />
                    </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    بەخێربێن بۆ ئای کڵاس
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                    پلاتفۆرمی زیرەکی تۆ بۆ سەرکەوتن لە خوێندن. وانەکان، تاقیکردنەوە، و یارمەتی زیرەک لە یەک شوێن.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GRADES.map((grade) => (
                    <button
                        key={grade.id}
                        onClick={() => onSelectGrade(grade.id)}
                        className="group bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-sky-500/20 ring-1 ring-slate-700 hover:ring-sky-500 hover:bg-slate-700/70 transform hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center"
                    >
                        {grade.icon && <grade.icon className="w-14 h-14 mb-4 text-sky-400 group-hover:text-sky-300 transition-colors" />}
                        <h3 className="text-xl font-bold text-white">{grade.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const GradeSubjects: React.FC<{ gradeId: GradeId; onSelectSubject: (id: SubjectId) => void; onBack: () => void; }> = ({ gradeId, onSelectSubject, onBack }) => {
    const grade = GRADES.find(g => g.id === gradeId);

    if (!grade || !grade.subjects) {
        return <div className="p-8 text-center">ببورە، ئەم بەشە وانەی بۆ دانەنراوە.</div>;
    }

    return (
        <div className="p-8">
            <button onClick={onBack} className="mb-6 bg-slate-700 px-4 py-2 rounded-md hover:bg-slate-600 transition-colors">گەڕانەوە</button>
            <h2 className="text-3xl font-bold text-center mb-10 text-white">{grade.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {grade.subjects.map((subject) => (
                    <button
                        key={subject.id}
                        onClick={() => onSelectSubject(subject.id)}
                        className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-sky-500/20 hover:bg-slate-700/80 transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4"
                    >
                        <subject.icon className="w-12 h-12 text-sky-400" />
                        <h3 className="text-lg font-semibold text-white">{subject.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    );
};

const SubjectMenu: React.FC<{ subjectId: SubjectId; gradeId: GradeId; onSelectMenuItem: (item: 'lesson' | 'quiz') => void; onBack: () => void; }> = ({ subjectId, gradeId, onSelectMenuItem, onBack }) => {
    const grade = GRADES.find(g => g.id === gradeId);
    const subject = grade?.subjects?.find(s => s.id === subjectId);

    if (!subject) {
        return <div className="p-8 text-center">وانەکە نەدۆزرایەوە.</div>;
    }
    
    return (
        <div className="p-8">
            <button onClick={onBack} className="mb-6 bg-slate-700 px-4 py-2 rounded-md hover:bg-slate-600 transition-colors">گەڕانەوە</button>
            <h2 className="text-3xl font-bold text-center mb-10 text-white">{subject.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {SUBJECT_MENU_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            if (item.id === 'lesson' || item.id === 'quiz') {
                                onSelectMenuItem(item.id);
                            } else {
                                alert(`خزمەتگوزاری "${item.name}" لە ئێستادا بەردەست نییە.`);
                            }
                        }}
                        className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-sky-500/20 hover:bg-slate-700/80 transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4"
                    >
                        <item.icon className="w-10 h-10 text-sky-400" />
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default function App() {
    const [view, setView] = useState<View>('home');
    // G12 state
    const [selectedGradeId, setSelectedGradeId] = useState<GradeId | null>(null);
    const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
    // Other Grades state
    const [selectedOtherGrade, setSelectedOtherGrade] = useState<(typeof OTHER_GRADES_LIST)[number] | null>(null);
    const [selectedOtherSubject, setSelectedOtherSubject] = useState<{id: string, name: string} | null>(null);
    
    // Shared state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAddDataModalOpen, setIsAddDataModalOpen] = useState(false);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
    const [teacherResponses, setTeacherResponses] = useState<TeacherResponse[]>([]);
    const [highlightedNotes, setHighlightedNotes] = useState<Highlight[]>([]);
    const [managedContent, setManagedContent] = useState<ManagedContent>(initialManagedContent);
    
    const handleUpdateContent = useCallback((key: string, newContent: ContentPackage) => {
        setManagedContent(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                ...newContent
            }
        }));
        alert('ناوەڕۆک بە سەرکەوتوویی نوێکرایەوە!');
    }, []);

    const handleSelectGrade = (id: GradeId) => {
        setSelectedGradeId(id);
        setSelectedOtherGrade(null); // Reset other grade selection
        if (id === 'other') {
            setView('other_grades');
        } else if (id === 'study-plan') {
            setView('ministerial_exam_flow');
        } else {
            setView('grade');
        }
    };
    
    const handleSelectOtherGrade = (grade: (typeof OTHER_GRADES_LIST)[number]) => {
        setSelectedOtherGrade(grade);
        setView('other_grade_subjects');
    };
    
    const handleSelectOtherSubject = (subject: {id: string, name: string}) => {
        setSelectedOtherSubject(subject);
        setView('lesson');
    }

    const handleSelectSubject = (id: SubjectId) => {
        setSelectedSubjectId(id);
        setView('subject');
    };
    
    const handleSelectSubjectMenu = (item: 'lesson' | 'quiz') => {
        if (item === 'lesson') {
            setView('lesson');
        } else {
            setView('quiz_setup');
        }
    };
    
    const handleQuizFinish = useCallback((result: QuizResult) => {
        setQuizResult(result);
        setView('quiz_results');
    }, []);

    const handleNavigateBack = () => {
        if (view === 'lesson') {
            if (selectedOtherGrade) {
                setView('other_grade_subjects');
                setSelectedOtherSubject(null);
            } else {
                setView('subject');
            }
        }
        else if (view === 'quiz_setup') setView('subject');
        else if (view === 'subject') setView('grade');
        else if (view === 'other_grade_subjects') {
             setView('other_grades');
             setSelectedOtherGrade(null);
        }
        else if (view === 'grade' || view === 'other_grades' || view === 'ministerial_exam_flow' || view === 'management') setView('home');
        else if (view === 'quiz_active' || view === 'quiz_results') setView('quiz_setup');
    };
    
    const renderView = () => {
        let contentKey = null;
        let subjectName: string | undefined = undefined;
        let videoUrl: string | undefined = undefined;

        if (selectedGradeId && selectedSubjectId) {
            contentKey = `${selectedGradeId}/${selectedSubjectId}`;
            const grade = GRADES.find(g => g.id === selectedGradeId);
            subjectName = grade?.subjects?.find(s => s.id === selectedSubjectId)?.name;
        } else if (selectedOtherGrade && selectedOtherSubject) {
            contentKey = `other/${selectedOtherGrade.id}/${selectedOtherSubject.name}`;
            subjectName = selectedOtherSubject.name;
        }

        const currentContent = contentKey ? managedContent[contentKey] : null;
        if (currentContent?.videoUrl) {
            videoUrl = currentContent.videoUrl;
        }


        switch (view) {
            case 'home':
                return <Home onSelectGrade={handleSelectGrade} />;
            case 'grade':
                return <GradeSubjects gradeId={selectedGradeId!} onSelectSubject={handleSelectSubject} onBack={() => setView('home')} />;
            case 'subject':
                return <SubjectMenu gradeId={selectedGradeId!} subjectId={selectedSubjectId!} onSelectMenuItem={handleSelectSubjectMenu} onBack={() => setView('grade')} />;
            case 'lesson':
                 if (!subjectName) return <div className="p-8 text-center">ببورە، وانەکە نەدۆزرایەوە.</div>;
                return <Lesson 
                    subjectName={subjectName}
                    htmlContent={currentContent?.lessonHtml}
                    videoUrl={videoUrl}
                    onBack={handleNavigateBack}
                    teacherResponses={teacherResponses}
                    setTeacherResponses={setTeacherResponses}
                    highlightedNotes={highlightedNotes}
                    setHighlightedNotes={setHighlightedNotes}
                />;
            case 'quiz_setup':
            case 'quiz_active':
            case 'quiz_results':
                const quizQuestions = currentContent?.lessonQuiz?.questions || MOCK_QUESTIONS;
                return <Quiz 
                    initialView={view}
                    questions={quizQuestions}
                    onQuizFinish={handleQuizFinish}
                    result={quizResult}
                    onBack={handleNavigateBack}
                    onRestart={() => setView('quiz_setup')}
                    onRetryIncorrect={() => {
                        alert('تاقیکردنەوەی دووەم دەستپێدەکات');
                        setView('quiz_active');
                    }}
                />;
            case 'other_grades':
                return <OtherGrades onBack={() => setView('home')} onSelectGrade={handleSelectOtherGrade} />;
            case 'other_grade_subjects':
                if (!selectedOtherGrade) return null;
                return <OtherGradeSubjects grade={selectedOtherGrade} onSelectSubject={handleSelectOtherSubject} onBack={handleNavigateBack} />
            case 'ministerial_exam_flow':
                return <MinisterialExam onBack={() => setView('home')} />;
            case 'management':
                return <Management onBack={handleNavigateBack} onUpdateContent={handleUpdateContent} currentContent={managedContent}/>;
            default:
                return <Home onSelectGrade={handleSelectGrade} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <Header
                onMenuClick={() => setIsSidebarOpen(true)}
                onHomeClick={() => {
                    setView('home');
                    setSelectedGradeId(null);
                    setSelectedSubjectId(null);
                    setSelectedOtherGrade(null);
                    setSelectedOtherSubject(null);
                }}
                onAddClick={() => setIsAddDataModalOpen(true)}
            />
            <Sidebar 
              isOpen={isSidebarOpen} 
              onClose={() => setIsSidebarOpen(false)} 
              onManageContent={() => {
                setView('management');
                setIsSidebarOpen(false);
              }}
            />
            <main className="container mx-auto px-4">
                {renderView()}
            </main>
            <AddData isOpen={isAddDataModalOpen} onClose={() => setIsAddDataModalOpen(false)} />
        </div>
    );
}