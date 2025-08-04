
import React from 'react';
import { OTHER_GRADES_LIST } from '../constants';
import { ManagedContent } from '../types';

interface OtherGradesProps {
    onBack: () => void;
    onSelectGrade: (grade: (typeof OTHER_GRADES_LIST)[number]) => void;
}

export const OtherGrades: React.FC<OtherGradesProps> = ({ onBack, onSelectGrade }) => {
    return (
        <div className="p-8">
            <button onClick={onBack} className="mb-6 bg-slate-700 px-4 py-2 rounded-md hover:bg-slate-600 transition-colors">گەڕانەوە</button>
            <h2 className="text-3xl font-bold text-center mb-10 text-white">پۆلەکانی تر</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {OTHER_GRADES_LIST.map((grade) => (
                    <button
                        key={grade.id}
                        onClick={() => onSelectGrade(grade)}
                        className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-sky-500/20 hover:bg-slate-700/80 transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4 text-center"
                    >
                        <grade.icon className="w-12 h-12 text-sky-400" />
                        <h3 className="text-lg font-semibold text-white">{grade.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    );
};
