import { Book, Atom, Calculator, FlaskConical, TestTube2, Dna, Landmark, Map, History, GraduationCap, CalendarCheck, BookOpenCheck, Library, PencilRuler, Users, Languages, Microscope, Globe, Palette, Music, HeartPulse, Brain, ChevronLeft } from 'lucide-react';
import { type Grade, type Subject } from './types';

const SCIENCE_SUBJECTS: Subject[] = [
  { id: 'kurdish', name: 'کوردی', icon: Languages },
  { id: 'arabic', name: 'عەرەبی', icon: Languages },
  { id: 'english', name: 'ئینگلیزی', icon: Languages },
  { id: 'math', name: 'بیرکاری', icon: Calculator },
  { id: 'physics', name: 'فیزیا', icon: Atom },
  { id: 'chemistry', name: 'کیمیا', icon: FlaskConical },
  { id: 'biology', name: 'زیندەزانی', icon: Dna },
];

const ARTS_SUBJECTS: Subject[] = [
  { id: 'kurdish', name: 'کوردی', icon: Languages },
  { id: 'arabic', name: 'عەرەبی', icon: Languages },
  { id: 'english', name: 'ئینگلیزی', icon: Languages },
  { id: 'math', name: 'بیرکاری', icon: Calculator },
  { id: 'economics', name: 'ئابووری', icon: Landmark },
  { id: 'geography', name: 'جوگرافیا', icon: Map },
  { id: 'history', name: 'مێژوو', icon: History },
];

export const GRADES: Grade[] = [
  { id: '12-science', name: 'پۆلی ١٢ـی زانستیی', subjects: SCIENCE_SUBJECTS, icon: Dna },
  { id: '12-arts', name: 'پۆلی ١٢ ــی وێژەیی', subjects: ARTS_SUBJECTS, icon: History },
  { id: 'study-plan', name: 'پلانی خوێندن و تاقیکردنەوەی وزاری ئەزموونیی', icon: PencilRuler },
  { id: 'other', name: 'پۆلەکانی تر', icon: Library },
];

export const OTHER_GRADES_LIST = [
    { id: 'kg', name: 'باخچەی ساوایان', icon: Users, subjects: [ {id: 'games', name: 'یاری و فێربوون', icon: PencilRuler}, {id: 'stories', name: 'چیرۆک', icon: BookOpenCheck} ] },
    { id: 'g1', name: 'پۆلی ١', icon: BookOpenCheck, subjects: [ {id: 'islamic', name: 'پەروەردەی ئیسلامی', icon: Book}, {id: 'kurdish', name: 'کوردی', icon: Languages}, {id: 'math', name: 'بیرکاری', icon: Calculator}, {id: 'science', name: 'زانستەکان', icon: Microscope}, {id: 'art', name: 'ھونەر', icon: Palette}, {id: 'sports', name: 'وەرزش', icon: HeartPulse} ] },
    { id: 'g2', name: 'پۆلی ٢', icon: BookOpenCheck, subjects: [ {id: 'islamic', name: 'پەروەردەی ئیسلامی', icon: Book}, {id: 'kurdish', name: 'کوردی', icon: Languages}, {id: 'math', name: 'بیرکاری', icon: Calculator}, {id: 'science', name: 'زانستەکان', icon: Microscope}, {id: 'art', name: 'ھونەر', icon: Palette}, {id: 'sports', name: 'وەرزش', icon: HeartPulse} ] },
    { id: 'g3', name: 'پۆلی ٣', icon: BookOpenCheck, subjects: [ {id: 'islamic', name: 'پەروەردەی ئیسلامی', icon: Book}, {id: 'kurdish', name: 'کوردی', icon: Languages}, {id: 'math', name: 'بیرکاری', icon: Calculator}, {id: 'science', name: 'زانستەکان', icon: Microscope}, {id: 'art', name: 'ھونەر', icon: Palette}, {id: 'sports', name: 'وەرزش', icon: HeartPulse} ] },
    { id: 'g4', name: 'پۆلی ٤', icon: BookOpenCheck, subjects: [ {id: 'islamic', name: 'پەروەردەی ئیسلامی', icon: Book}, {id: 'kurdish', name: 'کوردی', icon: Languages}, {id: 'math', name: 'بیرکاری', icon: Calculator}, {id: 'science', name: 'زانست', icon: Microscope}, {id: 'social', name: 'کۆمەڵایەتی', icon: Globe}, {id: 'english', name: 'ئینگلیزی', icon: Languages}, {id: 'arabic', name: 'عەرەبی', icon: Languages}, {id: 'art', name: 'ھونەر', icon: Palette}, {id: 'sports', name: 'وەرزش', icon: HeartPulse} ] },
    { id: 'g5', name: 'پۆلی ٥', icon: BookOpenCheck, subjects: [ {id: 'islamic', name: 'پەروەردەی ئیسلامی', icon: Book}, {id: 'kurdish', name: 'کوردی', icon: Languages}, {id: 'math', name: 'بیرکاری', icon: Calculator}, {id: 'science', name: 'زانست', icon: Microscope}, {id: 'social', name: 'کۆمەڵایەتی', icon: Globe}, {id: 'english', name: 'ئینگلیزی', icon: Languages}, {id: 'arabic', name: 'عەرەبی', icon: Languages}, {id: 'art', name: 'ھونەر', icon: Palette}, {id: 'sports', name: 'وەرزش', icon: HeartPulse} ] },
    { id: 'g6', name: 'پۆلی ٦', icon: BookOpenCheck, subjects: [ {id: 'islamic', name: 'پەروەردەی ئیسلامی', icon: Book}, {id: 'kurdish', name: 'کوردی', icon: Languages}, {id: 'math', name: 'بیرکاری', icon: Calculator}, {id: 'science', name: 'زانست', icon: Microscope}, {id: 'social', name: 'کۆمەڵایەتی', icon: Globe}, {id: 'english', name: 'ئینگلیزی', icon: Languages}, {id: 'arabic', name: 'عەرەبی', icon: Languages}, {id: 'art', name: 'ھونەر', icon: Palette}, {id: 'sports', name: 'وەرزش', icon: HeartPulse} ] },
    { id: 'g7', name: 'پۆلی ٧', icon: BookOpenCheck, subjects: [ {id: 'islamic', name: 'پەروەردەی ئیسلامی', icon: Book}, {id: 'kurdish', name: 'کوردی', icon: Languages}, {id: 'math', name: 'بیرکاری', icon: Calculator}, {id: 'science', name: 'زانست', icon: Microscope}, {id: 'social', name: 'کۆمەڵایەتی', icon: Globe}, {id: 'english', name: 'ئینگلیزی', icon: Languages}, {id: 'arabic', name: 'عەرەبی', icon: Languages}, {id: 'art', name: 'ھونەر', icon: Palette}, {id: 'sports', name: 'وەرزش', icon: HeartPulse}, {id: 'computer', name: 'کۆمپیوتەر', icon: Brain} ] },
    { id: 'g8', name: 'پۆلی ٨', icon: BookOpenCheck, subjects: [ {id: 'islamic', name: 'پەروەردەی ئیسلامی', icon: Book}, {id: 'kurdish', name: 'کوردی', icon: Languages}, {id: 'math', name: 'بیرکاری', icon: Calculator}, {id: 'science', name: 'زانست', icon: Microscope}, {id: 'social', name: 'کۆمەڵایەتی', icon: Globe}, {id: 'english', name: 'ئینگلیزی', icon: Languages}, {id: 'arabic', name: 'عەرەبی', icon: Languages}, {id: 'art', name: 'ھونەر', icon: Palette}, {id: 'sports', name: 'وەرزش', icon: HeartPulse}, {id: 'computer', name: 'کۆمپیوتەر', icon: Brain} ] },
    { id: 'g9', name: 'پۆلی ٩', icon: BookOpenCheck, subjects: [ {id: 'islamic', name: 'پەروەردەی ئیسلامی', icon: Book}, {id: 'kurdish', name: 'کوردی', icon: Languages}, {id: 'math', name: 'بیرکاری', icon: Calculator}, {id: 'science', name: 'زانست', icon: Microscope}, {id: 'social', name: 'کۆمەڵایەتی', icon: Globe}, {id: 'english', name: 'ئینگلیزی', icon: Languages}, {id: 'arabic', name: 'عەرەبی', icon: Languages}, {id: 'art', name: 'ھونەر', icon: Palette}, {id: 'sports', name: 'وەرزش', icon: HeartPulse}, {id: 'computer', name: 'کۆمپیوتەر', icon: Brain} ] },
    { id: 'g10-sci', name: 'پۆلی ١٠ـی زانستیی', icon: Atom, subjects: SCIENCE_SUBJECTS.slice(0, 5) },
    { id: 'g10-art', name: 'پۆلی ١٠ـی وێژەیی', icon: Map, subjects: ARTS_SUBJECTS.slice(0, 5) },
    { id: 'g11-sci', name: 'پۆلی ١١ـی زانستیی', icon: Atom, subjects: SCIENCE_SUBJECTS },
    { id: 'g11-art', name: 'پۆلی ١١ـی وێژەیی', icon: Map, subjects: ARTS_SUBJECTS },
];

export const MOCK_QUESTIONS: import('./types').Question[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    text: `پرسیاری ژمارە ${i + 1} چیە؟ ئەمە تەنها دەقێکی نموونەییە بۆ پرسیارەکە.`,
    options: [
        `وەڵامی ١ بۆ پرسیاری ${i + 1}`,
        `وەڵامی ٢ بۆ پرسیاری ${i + 1}`,
        `وەڵامی ٣ بۆ پرسیاری ${i + 1}`,
        `وەڵامی ٤ بۆ پرسیاری ${i + 1}`
    ],
    correctAnswer: `وەڵامی ٢ بۆ پرسیاری ${i + 1}`
}));

export const SUBJECT_MENU_ITEMS = [
    { id: 'lesson', name: 'وانەکە', icon: BookOpenCheck },
    { id: 'quiz', name: 'تاقیکردنەوەی وانەکە', icon: TestTube2 },
    { id: 'ministerial_questions', name: 'پرسیاری وزاری', icon: GraduationCap },
    { id: 'question_bank', name: 'بانکی پرسیار', icon: Dna },
    { id: 'video_lesson', name: 'وانەکە بە ڤیدیۆ', icon: CalendarCheck },
];