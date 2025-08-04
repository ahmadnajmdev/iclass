import React, { useState, useEffect } from 'react';
import { type Question, type QuizResult } from '../types';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

type QuizView = 'quiz_setup' | 'quiz_active' | 'quiz_results';

interface QuizProps {
    initialView: QuizView;
    questions: Question[];
    onQuizFinish: (result: QuizResult) => void;
    result: QuizResult | null;
    onBack: () => void;
    onRestart: () => void;
    onRetryIncorrect: () => void;
    quizTitle?: string;
}

const QuizSetup: React.FC<{ onStart: (count: number) => void; onBack: () => void; title?: string }> = ({ onStart, onBack, title }) => {
    const questionCounts = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    return (
        <div className="p-8 text-center">
            <button onClick={onBack} className="absolute top-20 right-8 bg-slate-700 px-4 py-2 rounded-md hover:bg-slate-600 transition-colors">گەڕانەوە</button>
            <h2 className="text-3xl font-bold mb-6 text-white">{title || 'تاقیکردنەوەی وانەکە'}</h2>
            <p className="text-slate-400 mb-8">ژمارەی پرسیارەکان هەڵبژێرە بۆ دەستپێکردنی تاقیکردنەوە.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
                {questionCounts.map(count => (
                    <button key={count} onClick={() => onStart(count)} className="p-4 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-500 transition-transform transform hover:scale-105">
                        {count} پرسیار
                    </button>
                ))}
            </div>
        </div>
    );
};

const QuizActive: React.FC<{ questions: Question[]; onFinish: (answers: Map<number, string>) => void }> = ({ questions, onFinish }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Map<number, string>>(new Map());

    const handleAnswerSelect = (questionId: number, answer: string) => {
        setAnswers(new Map(answers.set(questionId, answer)));
    };

    const currentQuestion = questions[currentQuestionIndex];
    
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                <p className="text-slate-400 mb-2">پرسیاری {currentQuestionIndex + 1} لە {questions.length}</p>
                <h3 className="text-xl font-semibold mb-6 text-white">{currentQuestion.text}</h3>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                            className={`w-full text-right p-4 rounded-lg transition-colors text-white ${answers.get(currentQuestion.id) === option ? 'bg-sky-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex justify-between mt-8">
                <button
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-600 rounded-md disabled:opacity-50 hover:bg-slate-500"
                >
                    <ChevronRight className="w-5 h-5" />
                    پێشوو
                </button>
                {currentQuestionIndex === questions.length - 1 ? (
                    <button onClick={() => onFinish(answers)} className="px-6 py-2 bg-green-600 rounded-md hover:bg-green-500">کۆتایی</button>
                ) : (
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="flex items-center gap-2 px-6 py-2 bg-slate-600 rounded-md hover:bg-slate-500"
                    >
                        دواتر
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

const QuizResults: React.FC<{ result: QuizResult; onRestart: () => void; onRetryIncorrect: () => void }> = ({ result, onRestart, onRetryIncorrect }) => {
    const scorePercentage = (result.score / result.total) * 100;
    return (
        <div className="p-8 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">ئەنجامی تاقیکردنەوە</h2>
            <div className="bg-slate-800 p-8 rounded-xl shadow-lg mb-8">
                <p className="text-2xl text-slate-300 mb-2">نمرەکەت</p>
                <p className={`text-6xl font-bold ${scorePercentage >= 50 ? 'text-green-400' : 'text-red-400'}`}>
                    {scorePercentage.toFixed(1)}%
                </p>
                <p className="text-lg text-slate-400 mt-2">({result.score} وەڵامی ڕاست لە {result.total} پرسیار)</p>
            </div>
            {result.incorrectQuestions.length > 0 && (
                <div className="text-right mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-white">پرسیارە هەڵەکان</h3>
                    <ul className="bg-slate-800 p-4 rounded-lg space-y-4">
                        {result.incorrectQuestions.map(q => (
                            <li key={q.id} className="p-3 bg-slate-700 rounded-md">
                                <p className="font-semibold text-slate-200">{q.text}</p>
                                <p className="text-sm text-green-400 mt-1">وەڵامی ڕاست: {q.correctAnswer}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="flex justify-center gap-4">
                <button onClick={onRestart} className="px-6 py-3 bg-sky-600 rounded-md hover:bg-sky-500">تاقیکردنەوەی نوێ</button>
                {result.incorrectQuestions.length > 0 &&
                    <button onClick={onRetryIncorrect} className="px-6 py-3 bg-yellow-600 rounded-md hover:bg-yellow-500">تاقیکردنەوەی دووەم (هەڵەکان)</button>
                }
            </div>
        </div>
    );
};

export const Quiz: React.FC<QuizProps> = ({ initialView, questions, onQuizFinish, result, onBack, onRestart, onRetryIncorrect, quizTitle }) => {
    const [view, setView] = useState<QuizView>(initialView);
    const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);

    useEffect(() => {
        setView(initialView);
    }, [initialView]);

    const handleStartQuiz = (count: number) => {
        setActiveQuestions(questions.slice(0, count));
        setView('quiz_active');
    };

    const handleFinishQuiz = (answers: Map<number, string>) => {
        let score = 0;
        const incorrectQuestions: Question[] = [];
        activeQuestions.forEach(q => {
            if (answers.get(q.id) === q.correctAnswer) {
                score++;
            } else {
                incorrectQuestions.push(q);
            }
        });
        onQuizFinish({ score, total: activeQuestions.length, incorrectQuestions });
    };

    switch (view) {
        case 'quiz_setup':
            return <QuizSetup onStart={handleStartQuiz} onBack={onBack} title={quizTitle} />;
        case 'quiz_active':
            return <QuizActive questions={activeQuestions} onFinish={handleFinishQuiz} />;
        case 'quiz_results':
            return result ? <QuizResults result={result} onRestart={onRestart} onRetryIncorrect={onRetryIncorrect} /> : <div className="p-8 text-center">هیچ ئەنجامێک نییە.</div>;
        default:
            return null;
    }
};