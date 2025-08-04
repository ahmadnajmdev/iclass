import React from 'react';
import { OTHER_GRADES_LIST } from '../constants';
import { ChevronLeft } from 'lucide-react';

interface OtherGradeSubjectsProps {
    grade: (typeof OTHER_GRADES_LIST)[number];
    onSelectSubject: (subject: { id: string; name: string, icon: React.ComponentType<{ className?: string }> }) => void;
    onBack: () => void;
}

export const OtherGradeSubjects: React.FC<OtherGradeSubjectsProps> = ({ grade, onSelectSubject, onBack }) => {
    return (
        <div className="p-4 md:p-8">
            <button onClick={onBack} className="mb-8 bg-slate-800/80 px-4 py-2 rounded-md hover:bg-slate-700 transition-colors ring-1 ring-slate-700">گەڕانەوە</button>
            <div className="text-center mb-12">
                 <div className="inline-block bg-slate-800 p-4 rounded-full mb-4 ring-1 ring-slate-700">
                     <grade.icon className="w-16 h-16 text-sky-400" />
                </div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">{grade.name}</h2>
                <p className="text-slate-400 mt-2">یەکێک لە وانەکانی خوارەوە هەڵبژێرە</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {grade.subjects.map((subject) => (
                    <button
                        key={subject.id}
                        onClick={() => onSelectSubject(subject)}
                        className="group relative bg-slate-800 p-5 rounded-xl shadow-lg transition-all duration-300 overflow-hidden text-center
                                   hover:bg-slate-700/60 hover:shadow-sky-500/10 ring-1 ring-slate-700 hover:ring-sky-500 transform hover:-translate-y-1"
                    >
                        <div className="absolute -top-1 -right-1 bg-sky-500/10 blur-xl w-14 h-14 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative flex flex-col items-center gap-3">
                            <subject.icon className="w-10 h-10 text-sky-400 group-hover:text-sky-300 transition-colors" />
                            <h3 className="text-base font-semibold text-white leading-tight">{subject.name}</h3>
                        </div>
                        <ChevronLeft className="absolute top-1/2 -right-6 h-5 w-5 text-slate-500 group-hover:right-3 group-hover:text-white transition-all duration-300 -translate-y-1/2" />
                    </button>
                ))}
            </div>
        </div>
    );
};
