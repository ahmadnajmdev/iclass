import React, { useState } from 'react';
import { GRADES, OTHER_GRADES_LIST } from '../constants';
import { type GradeId, type SubjectId, type ManagedContent, type ContentPackage, type Question } from '../types';
import { ArrowLeft, Upload, Type, Link as LinkIcon, Video } from 'lucide-react';

interface ManagementProps {
    onBack: () => void;
    onUpdateContent: (key: string, content: ContentPackage) => void;
    currentContent: ManagedContent;
}

const G12_CONTENT_TYPES = [
    { id: 'lessonHtml', name: 'وانەکە (HTML)'},
    { id: 'lessonQuiz', name: 'پرسیارەکانی وانەکە'},
    { id: 'ministerialQuiz', name: 'پرسیارەکانی وزاری ساڵانی پێشوو'},
    { id: 'questionBank', name: 'بانکی پرسیار'},
    { id: 'videoUrl', name: 'ڤیدیۆی وانەکە (URL)'},
];

// Helper to parse text into quiz questions
const parseQuizText = (text: string): Question[] => {
    const questions: Question[] = [];
    const blocks = text.split(/پرسیار:/).map(b => b.trim()).filter(Boolean);

    blocks.forEach((block, index) => {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length < 2) return;

        const questionText = lines[0];
        const options = lines.slice(1);
        const correctAnswer = options.find(o => o.startsWith('*'))?.substring(1).trim() || '';
        
        if (questionText && options.length > 0 && correctAnswer) {
            questions.push({
                id: Date.now() + index,
                text: questionText,
                options: options.map(o => o.replace(/^\*/, '').trim()),
                correctAnswer: correctAnswer,
            });
        }
    });
    return questions;
};


const ContentUploader: React.FC<{
    contentKey: string;
    contentType: string;
    currentData: any;
    onUpdateContent: (key: string, content: ContentPackage) => void;
    onBack: () => void;
}> = ({ contentKey, contentType, currentData, onUpdateContent, onBack }) => {

    const [htmlFileContent, setHtmlFileContent] = useState('');
    const [quizText, setQuizText] = useState('');
    const [isLinked, setIsLinked] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');

    const handleFileRead = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "text/html") {
            const text = await file.text();
            setHtmlFileContent(text);
        } else {
            alert("تکایە تەنها فایلی HTML هەڵبژێرە.");
        }
    };

    const handleSubmit = () => {
        let newContent: ContentPackage = {};
        switch(contentType) {
            case 'lessonHtml':
                if (htmlFileContent) newContent.lessonHtml = htmlFileContent;
                break;
            case 'lessonQuiz':
            case 'ministerialQuiz':
            case 'questionBank':
                const questions = parseQuizText(quizText);
                if (questions.length > 0) {
                    newContent[contentType] = { questions, linked: isLinked };
                } else if (quizText) {
                    alert('هیچ پرسیارێکی دروست نەدۆزرایەوە. تکایە فۆرماتەکە دڵنیابکەرەوە.');
                    return;
                }
                break;
            case 'videoUrl':
                if (videoUrl) newContent.videoUrl = videoUrl;
                break;
        }
        onUpdateContent(contentKey, newContent);
        onBack();
    }

    const renderForm = () => {
        switch(contentType) {
            case 'lessonHtml':
                return (
                    <div>
                        <label htmlFor="htmlUpload" className="block mb-2 text-sm font-medium text-slate-300">ئەپلۆدی فایلی HTML</label>
                        <input id="htmlUpload" type="file" accept=".html" onChange={handleFileRead} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"/>
                        {htmlFileContent && <div className="mt-4 p-2 bg-slate-700 rounded-md text-xs text-slate-300">پێشبینی: {htmlFileContent.substring(0, 100)}...</div>}
                    </div>
                );
            case 'lessonQuiz':
            case 'ministerialQuiz':
            case 'questionBank':
                return (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-400">پرسیارەکان بەم شێوەیە بنووسە: <br/> `پرسیار: پرسیاری یەکەم` <br/> `*وەڵامی ڕاست` <br/> `وەڵامی دووەم` <br/> `...`</p>
                        <textarea value={quizText} onChange={(e) => setQuizText(e.target.value)} rows={10} className="w-full p-2 bg-slate-900 rounded-md text-slate-200" placeholder="پرسیارەکانت لێرە بنووسە..."></textarea>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="linkExams" checked={isLinked} onChange={e => setIsLinked(e.target.checked)} className="w-4 h-4 text-sky-600 bg-gray-700 border-gray-600 rounded focus:ring-sky-600" />
                            <label htmlFor="linkExams" className="text-sm text-slate-300">گرێدانەوە بە تاقیکردنەوەی وانەکە و تاقیکردنەوەی وزاری ئەزموونی</label>
                        </div>
                    </div>
                );
             case 'videoUrl':
                 return <input type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="w-full p-2 bg-slate-900 rounded-md text-slate-200" placeholder="لینک (URL)ی ڤیدیۆکە بنووسە"/>;
            default:
                return <p>جۆری ناوەڕۆک نەدۆزرایەوە.</p>;
        }
    }

    return (
        <div className="space-y-6">
            {renderForm()}
             <div className="flex justify-between pt-4 mt-4 border-t border-slate-700">
                <button onClick={onBack} className="py-2 px-5 text-sm font-medium text-gray-300 bg-slate-600 rounded-lg hover:bg-slate-500">گەڕانەوە</button>
                <button onClick={handleSubmit} className="text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5">پاشەکەوتکردن</button>
            </div>
        </div>
    )
}

export const Management: React.FC<ManagementProps> = ({ onBack, onUpdateContent, currentContent }) => {
    const [step, setStep] = useState<'main' | 'g12' | 'other' | 'upload'>('main');
    // G12 states
    const [selectedG12Grade, setSelectedG12Grade] = useState<GradeId | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);
    const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
    
    // Other grades states
    const [selectedOtherGrade, setSelectedOtherGrade] = useState<string | null>(null);
    const [selectedOtherSubject, setSelectedOtherSubject] = useState<string | null>(null);
    const [otherLessonHtml, setOtherLessonHtml] = useState<string | null>(null);
    const [otherVideoUrl, setOtherVideoUrl] = useState<string>('');

    const handleBack = () => {
        if (step === 'upload') {
            setSelectedContentType(null);
            setStep('g12');
        } else if (step === 'g12' || step === 'other') {
            // Reset all selections when going back to main
            setSelectedG12Grade(null);
            setSelectedSubject(null);
            setSelectedOtherGrade(null);
            setSelectedOtherSubject(null);
            setOtherLessonHtml(null);
            setOtherVideoUrl('');
            setStep('main');
        } else {
            onBack();
        }
    };
    
    const g12ContentKey = selectedG12Grade && selectedSubject ? `${selectedG12Grade}/${selectedSubject}` : '';

    const handleOtherFileRead = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "text/html") {
            const text = await file.text();
            setOtherLessonHtml(text);
             e.target.value = ''; // Allow re-uploading the same file
        } else {
            alert("تکایە تەنها فایلی HTML هەڵبژێرە.");
        }
    };

    const handleSaveOtherContent = () => {
        if (!selectedOtherGrade || !selectedOtherSubject) return;

        const contentKey = `other/${selectedOtherGrade}/${selectedOtherSubject}`;
        const newContent: ContentPackage = {};
        if (otherLessonHtml) {
            newContent.lessonHtml = otherLessonHtml;
        }
        if (otherVideoUrl) {
            newContent.videoUrl = otherVideoUrl;
        }

        if (Object.keys(newContent).length > 0) {
            onUpdateContent(contentKey, newContent);
            alert('ناوەڕۆک بۆ پۆلی تر بە سەرکەوتوویی پاشەکەوتکرا!');
            // Reset fields for next entry
            setOtherLessonHtml(null);
            setOtherVideoUrl('');
        } else {
            alert('هیچ ناوەڕۆکێک بۆ پاشەکەوتکردن زیادنەکراوە.');
        }
    };


    const renderCurrentStep = () => {
        switch(step) {
            case 'main':
                return (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-6">بەشێک هەڵبژێرە بۆ بەڕێوەبردن</h3>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button onClick={() => setStep('g12')} className="p-6 bg-slate-700 rounded-lg hover:bg-slate-600 w-full md:w-60 transition-colors">پۆلەکانی ١٢</button>
                            <button onClick={() => setStep('other')} className="p-6 bg-slate-700 rounded-lg hover:bg-slate-600 w-full md:w-60 transition-colors">پۆلەکانی تر</button>
                        </div>
                    </div>
                );
            case 'g12':
                return (
                     <div className="space-y-4">
                        <h3 className="text-xl font-bold">بەڕێوەبردنی پۆلی ١٢</h3>
                        <select onChange={e => {setSelectedG12Grade(e.target.value as GradeId); setSelectedSubject(null); setSelectedContentType(null);}} value={selectedG12Grade || ''} className="w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:ring-sky-500 focus:border-sky-500">
                            <option value="" disabled>پۆلێک هەڵبژێرە</option>
                            <option value="12-science">پۆلی ١٢ـی زانستیی</option>
                            <option value="12-arts">پۆلی ١٢ـی وێژەیی</option>
                        </select>
                        {selectedG12Grade && (
                            <select onChange={e => {setSelectedSubject(e.target.value as SubjectId); setSelectedContentType(null);}} value={selectedSubject || ''} className="w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:ring-sky-500 focus:border-sky-500">
                                <option value="" disabled>وانەیەک هەڵبژێرە</option>
                                {GRADES.find(g => g.id === selectedG12Grade)?.subjects?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        )}
                        {selectedSubject && (
                            <select onChange={e => {setSelectedContentType(e.target.value); setStep('upload');}} value={''} className="w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:ring-sky-500 focus:border-sky-500">
                                <option value="" disabled>کام بەشی وانەکە؟</option>
                                {G12_CONTENT_TYPES.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
                            </select>
                        )}
                     </div>
                );
             case 'other':
                  const chosenGrade = OTHER_GRADES_LIST.find(g => g.id === selectedOtherGrade);
                  return (
                     <div className="space-y-4">
                        <h3 className="text-xl font-bold">بەڕێوەبردنی پۆلەکانی تر</h3>
                        <select onChange={e => {setSelectedOtherGrade(e.target.value); setSelectedOtherSubject(null);}} value={selectedOtherGrade || ''} className="w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:ring-sky-500 focus:border-sky-500">
                             <option value="" disabled>پۆلێک هەڵبژێرە</option>
                             {OTHER_GRADES_LIST.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                        </select>
                        {chosenGrade && chosenGrade.subjects && (
                            <select onChange={e => setSelectedOtherSubject(e.target.value)} value={selectedOtherSubject || ''} className="w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:ring-sky-500 focus:border-sky-500">
                                <option value="" disabled>وانەیەک هەڵبژێرە</option>
                                {chosenGrade.subjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                            </select>
                        )}
                        {selectedOtherSubject && (
                             <div className="space-y-4 pt-4 mt-4 border-t border-slate-600">
                                <h4 className="font-semibold text-slate-300">ناوەڕۆکی وانەی "{selectedOtherSubject}" زیادبکە</h4>
                                <div>
                                    <label htmlFor="otherHtmlUpload" className="block mb-2 text-sm font-medium text-slate-300">وانەکە (فایلی HTML)</label>
                                    <input id="otherHtmlUpload" type="file" accept=".html" onChange={handleOtherFileRead} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"/>
                                    {otherLessonHtml && <div className="mt-2 text-xs text-green-400">فایلی HTML ئامادەیە بۆ پاشەکەوتکردن.</div>}
                                </div>
                                 <div>
                                    <label htmlFor="otherVideoUrl" className="block mb-2 text-sm font-medium text-slate-300">ڤیدیۆی وانەکە (URL)</label>
                                    <input id="otherVideoUrl" type="url" value={otherVideoUrl} onChange={e => setOtherVideoUrl(e.target.value)} className="w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:ring-sky-500 focus:border-sky-500" placeholder="https://example.com/video.mp4"/>
                                </div>
                                <div className="text-right">
                                    <button onClick={handleSaveOtherContent} className="text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-6 py-2.5">پاشەکەوتکردن</button>
                                </div>
                             </div>
                        )}
                     </div>
                  );
            case 'upload':
                return (
                     <div>
                         <h3 className="text-xl font-bold mb-4">زیادکردنی ناوەڕۆک</h3>
                        <ContentUploader
                            contentKey={g12ContentKey}
                            contentType={selectedContentType!}
                            currentData={currentContent[g12ContentKey]}
                            onUpdateContent={onUpdateContent}
                            onBack={() => {setSelectedContentType(null); setStep('g12');}}
                        />
                     </div>
                );
        }
    }

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
             <button onClick={handleBack} className="absolute top-20 right-4 md:right-8 bg-slate-700 px-4 py-2 rounded-md hover:bg-slate-600 transition-colors flex items-center gap-2 z-10">
                <ArrowLeft size={16}/> {step === 'main' ? 'گەڕانەوە بۆ لاپەڕەی سەرەکی' : 'گەڕانەوەی پێشوو'}
            </button>
            <h2 className="text-3xl font-bold text-center mb-10 text-white">بەڕێوەبردنی ناوەڕۆک</h2>
            <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg">
                {renderCurrentStep()}
            </div>
        </div>
    );
};