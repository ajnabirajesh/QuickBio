
import React, { useState } from 'react';
import { ResumeData, INITIAL_DATA, TemplateType } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA);
  const [showPreview, setShowPreview] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleTemplateChange = (template: TemplateType) => {
    setResumeData(prev => ({ ...prev, template }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Professional Navbar */}
      <header className="glass-header text-white px-6 py-3 shadow-2xl no-print sticky top-0 z-50 border-b border-slate-700">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-inner">
              <i className="fas fa-file-contract text-white text-xl"></i>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-extrabold tracking-tight leading-none">QuickBio</h1>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Builder v2.0</span>
            </div>
          </div>

          {/* Center Template Picker */}
          <div className="hidden lg:flex bg-slate-800/50 p-1 rounded-xl border border-slate-700">
            {[
              { id: 'elegant', label: 'Elegant' },
              { id: 'classic', label: 'Classic' },
              { id: 'modern', label: 'Modern' },
              { id: 'professional', label: 'Prof.' }
            ].map((t) => (
              <button 
                key={t.id}
                onClick={() => handleTemplateChange(t.id as TemplateType)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${resumeData.template === t.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800/50 p-1 rounded-xl border border-slate-700 lg:hidden">
               <button onClick={() => setShowPreview(false)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!showPreview ? 'bg-slate-700 text-white' : 'text-slate-400'}`}>Edit</button>
               <button onClick={() => setShowPreview(true)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${showPreview ? 'bg-slate-700 text-white' : 'text-slate-400'}`}>View</button>
            </div>
            
            <button 
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl shadow-lg transition-all active:scale-95 text-sm font-bold flex items-center gap-2"
            >
              <i className="fas fa-print"></i> 
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden print:overflow-visible print:h-auto">
        {/* Left Side: Form Controls */}
        <aside className={`lg:w-[450px] xl:w-[500px] border-r border-slate-200 bg-white overflow-y-auto no-print scroll-smooth ${showPreview ? 'hidden lg:block' : 'w-full block'}`}>
          <div className="p-6">
            <ResumeForm data={resumeData} onChange={setResumeData} />
          </div>
        </aside>

        {/* Right Side: Workbench Preview */}
        <section className={`flex-1 workbench-bg bg-slate-100 overflow-y-auto p-4 md:p-12 transition-all print:bg-white print:p-0 print:overflow-visible ${showPreview ? 'block w-full' : 'hidden lg:block'}`}>
          <div className="max-w-fit mx-auto relative group print:m-0">
            {/* Template Badge Float */}
            <div className="absolute -top-6 left-0 right-0 flex justify-center no-print">
               <span className="bg-slate-900 text-white text-[10px] font-black px-4 py-1 rounded-full shadow-lg uppercase tracking-widest border border-slate-700">
                 Current: {resumeData.template}
               </span>
            </div>
            
            <div className="print-reset transform transition-transform duration-500 scale-[0.65] sm:scale-[0.85] md:scale-[0.95] xl:scale-100 origin-top print:transform-none">
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Template Selector Drawer */}
      {!showPreview && (
        <div className="lg:hidden fixed bottom-20 left-4 right-4 bg-white/80 backdrop-blur-md border border-slate-200 p-3 rounded-2xl shadow-2xl no-print flex justify-between gap-1">
          {['elegant', 'classic', 'modern', 'professional'].map(t => (
            <button 
              key={t}
              onClick={() => handleTemplateChange(t as TemplateType)}
              className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${resumeData.template === t ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 bg-slate-50'}`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Footer Nav */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 flex justify-around lg:hidden no-print z-50">
        <button onClick={() => setShowPreview(false)} className={`flex flex-col items-center gap-1 transition-colors ${!showPreview ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className="fas fa-keyboard text-xl"></i><span className="text-[10px] font-bold uppercase">Editor</span>
        </button>
        <button onClick={() => setShowPreview(true)} className={`flex flex-col items-center gap-1 transition-colors ${showPreview ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className="fas fa-eye text-xl"></i><span className="text-[10px] font-bold uppercase">Preview</span>
        </button>
        <button onClick={handlePrint} className="flex flex-col items-center gap-1 text-emerald-600">
          <i className="fas fa-cloud-download-alt text-xl"></i><span className="text-[10px] font-bold uppercase">Save</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
