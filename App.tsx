
import React, { useState } from 'react';
import { ResumeData, INITIAL_DATA, TemplateType } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA);
  const [showPreview, setShowPreview] = useState(false);

  const handlePrint = () => window.print();

  const handleTemplateChange = (template: TemplateType) => {
    setResumeData(prev => ({ ...prev, template }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fas fa-file-alt text-indigo-600 text-xl"></i>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">QuickBio</h1>
          </div>

          <div className="hidden md:flex bg-gray-100 p-1 rounded-lg">
            {['elegant', 'classic', 'modern', 'professional'].map((t) => (
              <button 
                key={t}
                onClick={() => handleTemplateChange(t as TemplateType)}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${resumeData.template === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handlePrint}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <i className="fas fa-download"></i>
            <span>Save Bio-Data</span>
          </button>
        </div>
      </nav>

      {/* Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-69px)] overflow-hidden print:overflow-visible print:h-auto">
        
        {/* Simple Editor */}
        <aside className={`lg:w-[450px] bg-white overflow-y-auto no-print border-r border-gray-200 ${showPreview ? 'hidden lg:block' : 'w-full block'}`}>
          <div className="p-8">
            <ResumeForm data={resumeData} onChange={setResumeData} />
          </div>
        </aside>

        {/* Preview Area */}
        <section className={`flex-1 preview-area overflow-y-auto p-6 md:p-12 flex justify-center transition-all print:bg-white print:p-0 print:overflow-visible ${showPreview ? 'block w-full' : 'hidden lg:block'}`}>
          <div className="max-w-fit mx-auto print:m-0">
            <div className="print-reset transform transition-all scale-[0.5] sm:scale-[0.7] md:scale-[0.85] xl:scale-95 origin-top print:transform-none">
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Actions */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around lg:hidden no-print z-50">
        <button onClick={() => setShowPreview(false)} className={`flex-1 py-2 flex flex-col items-center gap-1 ${!showPreview ? 'text-indigo-600' : 'text-gray-400'}`}>
          <i className="fas fa-edit"></i>
          <span className="text-[10px] font-bold">Details</span>
        </button>
        <button onClick={() => setShowPreview(true)} className={`flex-1 py-2 flex flex-col items-center gap-1 ${showPreview ? 'text-indigo-600' : 'text-gray-400'}`}>
          <i className="fas fa-eye"></i>
          <span className="text-[10px] font-bold">Preview</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
