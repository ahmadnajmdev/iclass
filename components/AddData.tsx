
import React, { useState } from 'react';
import { X, ArrowRight, School, Lightbulb, BookCopy, User, FileText } from 'lucide-react';

const ADD_DATA_CATEGORIES = {
    educational_center: "ناوەندەکانی خوێندن",
    study_methods: "ڕێگاکانی خوێندن",
    teaching_methods: "ڕێگاکانی وانەگوتنەوە",
    private_teacher: "مامۆستای تایبەت",
    notes: "مەلزەمەکان",
};

const EDUCATIONAL_CENTER_TYPES = [
    "باخچەی ساوایان", "قوتابخانەی سەرەتایی", "قوتابخانەی پۆلی ١-٩",
    "قوتابخانەی ناوەندیی", "ئامادەیی", "پەیمانگاکان", "زانکۆکان", "خولەکانی هاوینە"
];

const FormField: React.FC<{ label: string; id: string; type?: string; required?: boolean; children?: React.ReactNode; }> = ({ label, id, type = 'text', required = true, children }) => (
    <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-slate-300">{label}</label>
        {children ? children : <input type={type} id={id} name={id} className="bg-slate-700 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" required={required} />}
    </div>
);

const FormActions: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="flex justify-between pt-4 mt-4 border-t border-slate-700">
        <button type="button" onClick={onBack} className="py-2 px-5 text-sm font-medium text-gray-300 focus:outline-none bg-slate-600 rounded-lg border border-slate-500 hover:bg-slate-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-slate-700">
            گەڕانەوە
        </button>
        <button type="submit" className="text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            زیادکردن
        </button>
    </div>
);

const EducationalCenterForm: React.FC<{ onBack: () => void; onSubmit: (e: React.FormEvent) => void }> = ({ onBack, onSubmit }) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">زیادکردنی ناوەندی خوێندن</h3>
        <FormField label="جۆری ناوەند" id="center_type">
             <select id="center_type" name="center_type" className="bg-slate-700 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
                {EDUCATIONAL_CENTER_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
        </FormField>
        <FormField label="ناوی ناوەند" id="center_name" />
        <FormField label="شار" id="city" />
        <FormField label="ژمارەی مۆبایل" id="phone_number" type="tel" />
        <FormField label="ناوونیشان لەسەر نەخشەی گۆگڵ ماپ" id="map_address" />
        <FormField label="وردەکاریی" id="details">
            <textarea id="details" name="details" rows={3} className="bg-slate-700 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 resize-y"></textarea>
        </FormField>
        <FormField label="ئەپلۆدی وێنەی ناوەند (تا ١٠ وێنە)" id="center_photos">
            <input type="file" id="center_photos" name="center_photos" multiple accept="image/*" className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"/>
        </FormField>
        <FormField label="ئەپلۆدی ڤیدیۆ (١ خولەک)" id="center_video">
             <input type="file" id="center_video" name="center_video" accept="video/*" className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"/>
        </FormField>
        <FormActions onBack={onBack} />
    </form>
);

const StudyOrTeachingMethodForm: React.FC<{ onBack: () => void; category: string; onSubmit: (e: React.FormEvent) => void }> = ({ onBack, category, onSubmit }) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">{`زیادکردنی ${category}`}</h3>
        <FormField label="تایتڵ" id="title" />
        <FormField label="ناوەرۆک" id="content">
            <textarea id="content" name="content" rows={5} className="bg-slate-700 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 resize-y"></textarea>
        </FormField>
         <FormField label="ئەپلۆدی وێنە" id="image">
            <input type="file" id="image" name="image" accept="image/*" className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"/>
        </FormField>
        <FormActions onBack={onBack} />
    </form>
);

const PrivateTeacherForm: React.FC<{ onBack: () => void; onSubmit: (e: React.FormEvent) => void }> = ({ onBack, onSubmit }) => (
     <form onSubmit={onSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">زیادکردنی مامۆستای تایبەت</h3>
        <FormField label="ناوی مامۆستا" id="teacher_name" />
        <FormField label="پسپۆڕیی" id="specialty" />
        <FormField label="شوێنی نیشتەجێبوون" id="residence" />
        <FormField label="ژمارەی مۆبایل" id="phone_number" type="tel" />
        <FormField label="وردەکاریی" id="details">
            <textarea id="details" name="details" rows={3} className="bg-slate-700 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 resize-y"></textarea>
        </FormField>
         <FormField label="ئەپلۆدی وێنەی مامۆستا" id="teacher_photo">
            <input type="file" id="teacher_photo" name="teacher_photo" accept="image/*" className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"/>
        </FormField>
         <FormField label="ئەپلۆدی ڤیدیۆی ناساندن (١ خولەک)" id="teacher_video">
             <input type="file" id="teacher_video" name="teacher_video" accept="video/*" className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"/>
        </FormField>
        <FormActions onBack={onBack} />
    </form>
);

const NotesForm: React.FC<{ onBack: () => void; onSubmit: (e: React.FormEvent) => void }> = ({ onBack, onSubmit }) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">زیادکردنی مەلزەمە</h3>
        <FormField label="شوێنی بەردەست" id="location" />
        <FormField label="ژمارەی مۆبایل" id="phone_number" type="tel" />
         <FormField label="ئەپلۆدی وێنەی مەلزەمە" id="note_image">
            <input type="file" id="note_image" name="note_image" accept="image/*" className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"/>
        </FormField>
         <FormActions onBack={onBack} />
    </form>
);

const CategorySelection: React.FC<{ onSelect: (category: keyof typeof ADD_DATA_CATEGORIES) => void; }> = ({ onSelect }) => {
    const categories = [
        { id: 'educational_center' as const, name: 'ناوەندەکانی خوێندن', icon: School },
        { id: 'study_methods' as const, name: 'ڕێگاکانی خوێندن', icon: Lightbulb },
        { id: 'teaching_methods' as const, name: 'ڕێگاکانی وانەگوتنەوە', icon: BookCopy },
        { id: 'private_teacher' as const, name: 'مامۆستای تایبەت', icon: User },
        { id: 'notes' as const, name: 'مەلزەمەکان', icon: FileText }
    ];
    
    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-white">زیادکردنی داتا</h2>
            <p className="text-center text-slate-400 mb-8">کام جۆر داتا دەتەوێت زیاد بکەیت؟</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map(cat => (
                     <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className="group flex items-center justify-between p-4 bg-slate-700/80 rounded-lg hover:bg-sky-600 hover:text-white transition-all duration-200 border border-slate-600"
                    >
                        <div className="flex items-center gap-3">
                            <cat.icon className="w-6 h-6 text-sky-400 group-hover:text-white" />
                            <span className="font-semibold">{cat.name}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transform transition-transform group-hover:translate-x-1" />
                    </button>
                ))}
            </div>
        </div>
    );
};

const AddData: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState<keyof typeof ADD_DATA_CATEGORIES | 'initial'>('initial');

    if (!isOpen) {
        return null;
    }
    
    const handleClose = () => {
        setStep('initial');
        onClose();
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('داتاکە بە سەرکەوتوویی زیادکرا! (تێبینی: ئەمە تەنها کاراییەکی نموونەییە و داتاکە لە هیچ شوێنێک پاشەکەوت نەکراوە)');
        handleClose();
    }

    const renderContent = () => {
        const reset = () => setStep('initial');
        switch (step) {
            case 'initial':
                return <CategorySelection onSelect={setStep} />;
            case 'educational_center':
                return <EducationalCenterForm onBack={reset} onSubmit={handleSubmit} />;
            case 'study_methods':
                return <StudyOrTeachingMethodForm onBack={reset} category={ADD_DATA_CATEGORIES.study_methods} onSubmit={handleSubmit} />;
            case 'teaching_methods':
                return <StudyOrTeachingMethodForm onBack={reset} category={ADD_DATA_CATEGORIES.teaching_methods} onSubmit={handleSubmit} />;
            case 'private_teacher':
                return <PrivateTeacherForm onBack={reset} onSubmit={handleSubmit} />;
            case 'notes':
                return <NotesForm onBack={reset} onSubmit={handleSubmit} />;
            default:
                return null;
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300" 
            onClick={handleClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 relative">
                     <button onClick={handleClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-700 transition-colors" aria-label="داخستن">
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AddData;
