
import React, { useState, useEffect, useRef } from 'react';
import { type TeacherResponse, type Highlight } from '../types';
import { Highlighter, Mic, Printer, BrainCircuit, MessageSquare, BookOpen, Trash2, Bookmark, Volume2 } from 'lucide-react';
import { askTeacher } from '../services/geminiService';

const Notepad: React.FC<{
    activeTab: string;
    setActiveTab: (tab: string) => void;
    teacherResponses: TeacherResponse[];
    highlightedNotes: Highlight[];
    isTeacherLoading: boolean;
}> = ({ activeTab, setActiveTab, teacherResponses, highlightedNotes, isTeacherLoading }) => {
    const tabs = [
        { id: 'notes', name: 'تێبینییەکانم', icon: BookOpen },
        { id: 'highlights', name: 'تێبینییە ڕەنگکراوەکان', icon: Highlighter },
        { id: 'teacher', name: 'مامۆستای ئامادە', icon: BrainCircuit }
    ];

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [teacherResponses]);

    return (
        <div className="bg-slate-800 rounded-lg flex flex-col h-full">
            <div className="flex border-b border-slate-700">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 p-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === tab.id ? 'bg-slate-700 text-sky-400' : 'text-slate-400 hover:bg-slate-700/50'}`}
                    >
                        <tab.icon className="w-5 h-5" />
                        {tab.name}
                    </button>
                ))}
            </div>
            <div ref={contentRef} className="p-4 flex-grow overflow-y-auto">
                {activeTab === 'notes' && <textarea className="w-full h-full bg-transparent text-slate-300 resize-none focus:outline-none" placeholder="تێبینییەکانت لێرە بنووسە..."></textarea>}
                {activeTab === 'highlights' && (
                    <ul className="space-y-3">
                        {highlightedNotes.length > 0 ? highlightedNotes.map((note) => (
                            <li key={note.id} className="p-3 bg-yellow-400/20 text-yellow-300 rounded-md text-sm leading-relaxed">{note.text}</li>
                        )) : <p className="text-slate-500 text-center mt-8">هیچ تێبینییەکی ڕەنگکراو نییە.</p>}
                    </ul>
                )}
                {activeTab === 'teacher' && (
                    <div className="space-y-4">
                        {teacherResponses.map((res, i) => (
                            <div key={i}>
                                <div className="p-2 bg-slate-700 rounded-t-lg text-slate-300 text-sm flex gap-2 items-start">
                                    <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <p>{res.question}</p>
                                </div>
                                <div className="p-3 bg-sky-500/10 rounded-b-lg text-slate-200 text-sm whitespace-pre-wrap">{res.answer}</div>
                            </div>
                        ))}
                        {isTeacherLoading && <div className="text-center text-slate-400 animate-pulse">مامۆستای ئامادە بیردەکاتەوە...</div>}
                         {teacherResponses.length === 0 && !isTeacherLoading && <p className="text-slate-500 text-center mt-8">دەقێک دیاری بکە و پرسیار لە مامۆستای ئامادە بکە.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};


export const Lesson: React.FC<{
    subjectName: string;
    onBack: () => void;
    teacherResponses: TeacherResponse[];
    setTeacherResponses: React.Dispatch<React.SetStateAction<TeacherResponse[]>>;
    highlightedNotes: Highlight[];
    setHighlightedNotes: React.Dispatch<React.SetStateAction<Highlight[]>>;
    htmlContent?: string;
    videoUrl?: string;
}> = ({ subjectName, onBack, teacherResponses, setTeacherResponses, highlightedNotes, setHighlightedNotes, htmlContent, videoUrl }) => {
    const [activeNotepadTab, setActiveNotepadTab] = useState('notes');
    const [isHighlightingMode, setIsHighlightingMode] = useState(false);
    const [contextMenu, setContextMenu] = useState<{ target: HTMLElement; x: number; y: number } | null>(null);
    const [isTeacherLoading, setIsTeacherLoading] = useState(false);
    const lessonContentRef = useRef<HTMLDivElement>(null);

    const highlightSelection = (selection: Selection) => {
        const range = selection.getRangeAt(0);
        const highlightId = `highlight-${Date.now()}-${Math.random()}`;
        
        const mark = document.createElement('mark');
        mark.style.backgroundColor = 'rgba(250, 204, 21, 0.5)';
        mark.style.color = 'inherit';
        mark.style.borderRadius = '3px';
        mark.style.cursor = 'pointer';
        mark.dataset.highlightId = highlightId;

        try {
            range.surroundContents(mark);
        } catch (e) {
            console.error("Highlighting failed", e);
            alert("ناتوانرێت ئەم بەشە ڕەنگ بکرێت. تکایە هەوڵبدە دەقێکی سادەتر دیاری بکەیت.");
        }
        
        selection.removeAllRanges();
    };

    const handleMouseUp = () => {
        if (!isHighlightingMode) return;
        
        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 0) {
            highlightSelection(selection);
            setIsHighlightingMode(false); // Deactivate after one use
        }
    };
    
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (contextMenu) {
            setContextMenu(null);
        }
        const target = e.target as HTMLElement;
        if (target.tagName === 'MARK' && target.dataset.highlightId) {
            e.preventDefault();
            e.stopPropagation();

            const rect = target.getBoundingClientRect();
            const containerRect = lessonContentRef.current?.getBoundingClientRect();
            const top = rect.top - (containerRect?.top ?? 0) + (lessonContentRef.current?.scrollTop ?? 0);
            const left = rect.left - (containerRect?.left ?? 0) + rect.width / 2;

            setContextMenu({
                target: target,
                x: left,
                y: top + rect.height,
            });
        }
    };

    const handleSaveNote = (target: HTMLElement) => {
        const text = target.textContent;
        const id = target.dataset.highlightId;
        if (id && text && !highlightedNotes.some(note => note.id === id)) {
            setHighlightedNotes(prev => [...prev, { id, text }]);
        }
        setContextMenu(null);
    };

    const handleReadHighlight = (target: HTMLElement) => {
        const textToSpeak = target.textContent;
        if (textToSpeak && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'ku-IQ';
            window.speechSynthesis.speak(utterance);
        } else {
             alert('خزمەتگوزاری خوێندنەوەی دەنگ لەسەر ئەم وێبگەڕە بەردەست نییە.');
        }
        setContextMenu(null);
    };

    const handleAskAboutHighlight = async (target: HTMLElement) => {
        const question = target.textContent;
        if (!question) return;

        setActiveNotepadTab('teacher');
        setIsTeacherLoading(true);
        const answer = await askTeacher(question, subjectName);
        setTeacherResponses(prev => [...prev, { question, answer }]);
        setIsTeacherLoading(false);
        setContextMenu(null);
    };

    const handleRemoveHighlight = (target: HTMLElement) => {
        const idToRemove = target.dataset.highlightId;
        const parent = target.parentNode;

        if (parent) {
            while (target.firstChild) {
                parent.insertBefore(target.firstChild, target);
            }
            parent.removeChild(target);
            parent.normalize();
        }

        if (idToRemove) {
             setHighlightedNotes(prev => prev.filter(note => note.id !== idToRemove));
        }
        setContextMenu(null);
    };
    
    const speakLessonText = () => {
        const textToSpeak = lessonContentRef.current?.innerText;
        if (textToSpeak && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'ku-IQ';
            window.speechSynthesis.speak(utterance);
        } else {
            alert('خزمەتگوزاری خوێندنەوەی دەنگ لەسەر ئەم وێبگەڕە بەردەست نییە.');
        }
    };

    const LessonContent = () => {
        if (htmlContent) {
            return <div className="prose prose-invert max-w-none prose-p:leading-relaxed" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
        }
        return (
            <>
                <h3 className="text-sky-400">پەڕتووکی وانە (نموونە)</h3>
                <p>ئەمە دەقێکی نموونەییە بۆ نیشاندانی پەڕتووکی وانەکە. لێرەدا دەتوانیت دەقەکان بخوێنیتەوە و هایلایتیان بکەیت یان پرسیاریان لەسەر بکەیت. تکایە هەوڵبدە بەشێک لەم دەقە دیاری بکەیت بۆ ئەوەی بژاردەکان ببینیت. کاتێک تێکستێک ڕەنگ دەکەیت، دەتوانیت لە بەشی "تێبینییە ڕەنگکراوەکان" هەڵیبگریت، یان بیکەیتە پرسیارێک و بۆ "مامۆستای ئامادە"ی بنێریت.</p>
                <p>فیزیا زانستی لێکۆڵینەوەیە لە ماددە و وزە و کارلێکی نێوانیان. ئەم زانستە هەوڵدەدات تێبگات لە بنەماکانی گەردوون، لە بچووکترین تەنۆلکەی ژێر-گەردیلەییەوە تا گەورەترین گەلەئەستێرەکان. یاساکانی فیزیا، وەک یاساکانی نیوتن بۆ جووڵە و یاسای پاراستنی وزە، بنچینەی زۆربەی تەکنەلۆژیاکانی ئەمڕۆن.</p>
                <p>لەلایەکی ترەوە، کیمیا زانستی لێکۆڵینەوەیە لە پێکهاتە و تایبەتمەندی و گۆڕانکارییەکانی ماددە. کیمیازانەکان لێکۆڵینەوە لە گەردیلە و گەردیلەکان دەکەن و چۆنیەتی بەستنیان بەیەکەوە بۆ دروستکردنی ئاوێتەی نوێ. ئەم زانستە زۆر گرنگە بۆ پزیشکی، کشتوکاڵ، و پیشەسازی.</p>
            </>
        );
    };
    
    const contentHeight = videoUrl ? 'calc(100vh - 120px - 350px)' : 'calc(100vh - 120px)';

    return (
        <div className="p-2 md:p-4">
            <div className="flex justify-between items-center mb-4">
                <button onClick={onBack} className="bg-slate-700 px-4 py-2 rounded-md hover:bg-slate-600 transition-colors">گەڕانەوە</button>
                <h2 className="text-2xl font-bold text-white text-center">{`وانەی ${subjectName}`}</h2>
                <div className="flex gap-2">
                     <button 
                        onClick={() => setIsHighlightingMode(!isHighlightingMode)} 
                        title="قەڵەمی هایلایت" 
                        className={`p-2 rounded-md transition-all duration-200 ${isHighlightingMode ? 'bg-yellow-500/20 ring-2 ring-yellow-400 scale-110' : 'bg-slate-700 hover:bg-slate-600'}`}>
                        <Highlighter className="w-5 h-5 text-yellow-400" />
                    </button>
                    <button onClick={speakLessonText} title="خوێندنەوەی دەق" className="p-2 bg-slate-700 rounded-md hover:bg-slate-600"><Mic className="w-5 h-5 text-sky-400" /></button>
                    <button onClick={() => window.print()} title="پرێنت" className="p-2 bg-slate-700 rounded-md hover:bg-slate-600"><Printer className="w-5 h-5 text-sky-400" /></button>
                </div>
            </div>
                         
             {videoUrl && (
                <div className="mb-4 aspect-video">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={videoUrl} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="rounded-lg"
                    ></iframe>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6" style={{ height: contentHeight }}>
                {/* Panel 1: Lesson Content */}
                <div
                    ref={lessonContentRef}
                    onMouseUp={handleMouseUp}
                    onClick={handleContentClick}
                    className={`relative lg:w-1/2 bg-slate-800/50 p-6 rounded-lg overflow-y-auto prose prose-invert prose-p:text-slate-300 max-w-none h-full ${isHighlightingMode ? 'cursor-crosshair' : ''}`}
                >
                   <LessonContent />

                   {contextMenu && (
                        <div
                            className="absolute z-10 flex flex-col w-48 bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg shadow-2xl ring-1 ring-black/5"
                            style={{ top: contextMenu.y, left: contextMenu.x, transform: 'translateX(-50%)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => handleSaveNote(contextMenu.target)} className="w-full px-3 py-2 text-sm text-right text-slate-200 rounded-t-lg hover:bg-slate-700 flex items-center justify-start gap-3"><Bookmark size={16}/> هەڵگرتن</button>
                            <button onClick={() => handleReadHighlight(contextMenu.target)} className="w-full px-3 py-2 text-sm text-right text-slate-200 hover:bg-slate-700 flex items-center justify-start gap-3"><Volume2 size={16}/> خوێندنەوەی دەنگی</button>
                            <button onClick={() => handleAskAboutHighlight(contextMenu.target)} className="w-full px-3 py-2 text-sm text-right text-slate-200 hover:bg-slate-700 flex items-center justify-start gap-3"><BrainCircuit size={16}/> پرسیار لە مامۆستا</button>
                            <div className="my-1 border-t border-slate-700"></div>
                            <button onClick={() => handleRemoveHighlight(contextMenu.target)} className="w-full px-3 py-2 text-sm text-red-400 rounded-b-lg hover:bg-red-500/10 flex items-center justify-start gap-3"><Trash2 size={16}/> سڕینەوەی ڕەنگ</button>
                        </div>
                    )}
                </div>
                {/* Panel 2: Notepad */}
                <div className="lg:w-1/2 h-full">
                     <Notepad 
                        activeTab={activeNotepadTab} 
                        setActiveTab={setActiveNotepadTab} 
                        teacherResponses={teacherResponses}
                        highlightedNotes={highlightedNotes}
                        isTeacherLoading={isTeacherLoading}
                     />
                </div>
            </div>
        </div>
    );
};