import React, { useState, useMemo } from 'react';
import { GRADES } from '../constants';
import { type Subject, type GradeId, type StudyDay, type ExamDay } from '../types';
import { ArrowLeft, BookOpen, Calendar, Check, Clock } from 'lucide-react';

const generateSchedules = (subjects: Subject[]) => {
    const studyPlan: StudyDay[] = [];
    const examSchedule: ExamDay[] = [];
    const today = new Date();
    const year = today.getFullYear();
    
    let currentDate = new Date(year, 5, 15); // June is month 5 (0-indexed)
    const endDate = new Date(year, 8, 15); // 3 months later

    const dayNames = ["یەکشەممە", "دووشەممە", "سێشەممە", "چوارشەممە", "پێنجشەممە", "هەینی", "شەممە"];

    let subjectIndex = 0;
    while(currentDate < endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 5 && dayOfWeek !== 6) { // Not Friday or Saturday
            studyPlan.push({
                date: currentDate.toLocaleDateString('ku', { day: 'numeric', month: 'long', year: 'numeric' }),
                dayOfWeek: dayNames[dayOfWeek],
                subjectName: subjects[subjectIndex].name,
            });
            subjectIndex = (subjectIndex + 1) % subjects.length;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    let examDate = currentDate; // Start exams after study plan
    subjects.forEach(subject => {
        // Find next available day (not Fri/Sat)
        while(examDate.getDay() === 5 || examDate.getDay() === 6) {
            examDate.setDate(examDate.getDate() + 1);
        }
        examSchedule.push({
            date: examDate.toLocaleDateString('ku', { day: 'numeric', month: 'long', year: 'numeric' }),
            dayOfWeek: dayNames[examDate.getDay()],
            subjectName: subject.name,
            time: '٩:٠٠ بەیانی - ١١:٠٠ بەیانی'
        });
        examDate.setDate(examDate.getDate() + 2); // Every other day
    });

    return { studyPlan, examSchedule };
};


export const MinisterialExam: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [step, setStep] = useState<'grade_select' | 'subject_select' | 'plan_display'>('grade_select');
    const [selectedGradeId, setSelectedGradeId] = useState<GradeId | null>(null);
    const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);

    const grade = useMemo(() => GRADES.find(g => g.id === selectedGradeId), [selectedGradeId]);

    const toggleSubject = (subject: Subject) => {
        setSelectedSubjects(prev => {
            if (prev.find(s => s.id === subject.id)) {
                return prev.filter(s => s.id !== subject.id);
            } else {
                if (prev.length < 4) {
                    return [...prev, subject];
                }
                return prev;
            }
        });
    };

    const handleGradeSelect = (gradeId: GradeId) => {
        setSelectedGradeId(gradeId);
        setStep('subject_select');
    };

    const handleConfirmSubjects = () => {
        if (selectedSubjects.length > 0) {
            setStep('plan_display');
        }
    };

    const { studyPlan, examSchedule } = useMemo(() => {
        if (step === 'plan_display' && selectedSubjects.length > 0) {
            return generateSchedules(selectedSubjects);
        }
        return { studyPlan: [], examSchedule: [] };
    }, [step, selectedSubjects]);

    const renderContent = () => {
        switch (step) {
            case 'grade_select':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4 text-white">تاقیکردنەوەی وزاری ئەزموونیی</h2>
                        <p className="text-slate-400 mb-8">تکایە پۆلەکەت هەڵبژێرە.</p>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <button onClick={() => handleGradeSelect('12-science')} className="bg-sky-600 text-white font-bold p-8 rounded-lg hover:bg-sky-500 w-full md:w-64 text-xl transition-all duration-300 transform hover:scale-105">پۆلی ١٢ـی زانستیی</button>
                            <button onClick={() => handleGradeSelect('12-arts')} className="bg-purple-600 text-white font-bold p-8 rounded-lg hover:bg-purple-500 w-full md:w-64 text-xl transition-all duration-300 transform hover:scale-105">پۆلی ١٢ـی وێژەیی</button>
                        </div>
                    </div>
                );
            case 'subject_select':
                if (!grade || !grade.subjects) return null;
                return (
                    <div>
                        <button onClick={() => { setSelectedSubjects([]); setStep('grade_select'); }} className="flex items-center gap-2 mb-6 text-slate-400 hover:text-white"> <ArrowLeft size={16} /> گەڕانەوە بۆ هەڵبژاردنی پۆل </button>
                        <h2 className="text-3xl font-bold mb-2 text-center text-white">وانەکانت هەڵبژێرە</h2>
                         <p className="text-slate-400 mb-8 text-center">دەتوانیت لە نێوان ١ بۆ ٤ وانە هەڵبژێریت.</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {grade.subjects.map(subject => {
                                const isSelected = !!selectedSubjects.find(s => s.id === subject.id);
                                return (
                                    <button key={subject.id} onClick={() => toggleSubject(subject)} className={`relative p-4 rounded-lg border-2 transition-all ${isSelected ? 'border-sky-500 bg-sky-500/10' : 'border-slate-700 bg-slate-800 hover:border-slate-500'}`}>
                                        {isSelected && <div className="absolute top-2 right-2 bg-sky-500 text-white rounded-full p-1"><Check size={14} /></div>}
                                        <div className="flex flex-col items-center gap-2">
                                            <subject.icon className="w-10 h-10 text-slate-300"/>
                                            <span className="font-semibold text-white text-center">{subject.name}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                         <div className="text-center mt-8">
                            <button onClick={handleConfirmSubjects} disabled={selectedSubjects.length === 0 || selectedSubjects.length > 4} className="bg-green-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all">
                                دروستکردنی پلان ({selectedSubjects.length})
                            </button>
                        </div>
                    </div>
                );
            case 'plan_display':
                return (
                    <div>
                        <button onClick={() => setStep('subject_select')} className="flex items-center gap-2 mb-6 text-slate-400 hover:text-white"> <ArrowLeft size={16} /> گەڕانەوە بۆ هەڵبژاردنی وانە </button>
                        <h2 className="text-3xl font-bold mb-8 text-center text-white">پلانی خوێندن و خشتەی تاقیکردنەوە</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-sky-400 mb-4 flex items-center gap-2"><Calendar size={20}/> پلانی خوێندنی ٣ مانگە</h3>
                                <div className="bg-slate-800 p-4 rounded-lg max-h-96 overflow-y-auto border border-slate-700">
                                    <ul className="space-y-2">
                                        {studyPlan.map((day, i) => (
                                            <li key={i} className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                                                <div>
                                                    <p className="font-semibold text-slate-200">{day.date}</p>
                                                    <p className="text-sm text-slate-400">{day.dayOfWeek}</p>
                                                </div>
                                                <p className="text-sky-300 font-medium">{day.subjectName}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                 <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2"><Clock size={20}/> خشتەی تاقیکردنەوەی کۆتایی</h3>
                                 <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                    <ul className="space-y-2">
                                        {examSchedule.map((exam, i) => (
                                             <li key={i} className="p-3 bg-slate-700/50 rounded">
                                                 <p className="font-semibold text-slate-200">{exam.date} - <span className="text-slate-400">{exam.dayOfWeek}</span></p>
                                                 <p className="text-purple-300 mt-1 font-bold">{exam.subjectName}</p>
                                                 <p className="text-xs text-slate-400 mt-1">{exam.time}</p>
                                             </li>
                                        ))}
                                    </ul>
                                 </div>
                                 <div className="mt-8">
                                    <h3 className="text-xl font-semibold text-yellow-400 mb-4">ڕیزبەندی ئەنجامەکان</h3>
                                    <div className="bg-slate-800 p-8 rounded-lg text-center border border-slate-700">
                                        <p className="text-slate-400">ئەنجامەکان دوای تەواوبوونی هەموو تاقیکردنەوەکان لێرە بڵاودەکرێنەوە.</p>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="p-4 md:p-8 w-full">
            <button onClick={onBack} className="absolute top-20 right-4 md:right-8 bg-slate-700 px-4 py-2 rounded-md hover:bg-slate-600 transition-colors z-10">گەڕانەوە</button>
            <div className="relative">
                {renderContent()}
            </div>
        </div>
    );
};
