import React, { useState, useEffect } from 'react';
import { ResumeData, INITIAL_DATA, TemplateType } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA);
  const [showPreview, setShowPreview] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode class with body for Tailwind 'dark' variants
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handlePrint = () => window.print();

  const handleTemplateChange = (template: TemplateType) => {
    setResumeData(prev => ({ ...prev, template }));
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 sm:px-6 py-3 sticky top-0 z-50 no-print transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <i className="fas fa-file-alt text-white text-lg"></i>
            </div>
            <h1 className="text-lg font-extrabold tracking-tight hidden sm:block">QuickBio</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Template Selector (Desktop) */}
            <div className="hidden lg:flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
              {['elegant', 'classic', 'modern', 'professional'].map((t) => (
                <button 
                  key={t}
                  onClick={() => handleTemplateChange(t as TemplateType)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold capitalize transition-all ${resumeData.template === t ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 hidden sm:block"></div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-300 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <i className="fas fa-sun text-lg"></i> : <i className="fas fa-moon text-lg"></i>}
            </button>

            <button 
              onClick={handlePrint}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <i className="fas fa-print"></i>
              <span className="hidden sm:inline">Print / Save</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-65px)] overflow-hidden print:overflow-visible print:h-auto">
        
        {/* Editor */}
        <aside className={`lg:w-[480px] bg-white dark:bg-slate-900 overflow-y-auto no-print border-r border-gray-200 dark:border-slate-800 transition-colors duration-300 ${showPreview ? 'hidden lg:block' : 'w-full block'}`}>
          <div className="p-6 md:p-8">
            <ResumeForm data={resumeData} onChange={setResumeData} />
          </div>
        </aside>

        {/* Preview Area */}
        <section className={`flex-1 preview-area overflow-y-auto p-4 md:p-12 flex justify-center transition-all print:bg-white print:p-0 print:overflow-visible ${showPreview ? 'block w-full' : 'hidden lg:block'}`}>
          <div className="max-w-fit mx-auto print:m-0">
            <div className="print-reset transform transition-all scale-[0.45] sm:scale-[0.6] md:scale-[0.75] xl:scale-90 2xl:scale-100 origin-top print:transform-none">
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Actions */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 p-2 flex justify-around lg:hidden no-print z-50 shadow-up">
        <button onClick={() => setShowPreview(false)} className={`flex-1 py-2 flex flex-col items-center gap-1 transition-colors ${!showPreview ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
          <i className="fas fa-edit text-lg"></i>
          <span className="text-[10px] font-bold uppercase tracking-wider">Details</span>
        </button>
        <button onClick={() => setShowPreview(true)} className={`flex-1 py-2 flex flex-col items-center gap-1 transition-colors ${showPreview ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
          <i className="fas fa-eye text-lg"></i>
          <span className="text-[10px] font-bold uppercase tracking-wider">Preview</span>
        </button>
      </footer>
    </div>
  );
};

export default App;