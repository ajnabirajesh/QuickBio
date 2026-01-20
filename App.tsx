
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
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-indigo-900 text-white p-6 shadow-md no-print sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <i className="fas fa-file-invoice text-indigo-900 text-2xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold">QuickBio</h1>
              <p className="text-indigo-200 text-xs">Professional Bio-Data Builder</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center bg-indigo-800 rounded-full p-1 border border-indigo-700">
               {[
                 { id: 'elegant', label: 'Elegant' },
                 { id: 'classic', label: 'Classic' },
                 { id: 'modern', label: 'Modern' },
                 { id: 'professional', label: 'Professional' }
               ].map((t) => (
                 <button 
                  key={t.id}
                  onClick={() => handleTemplateChange(t.id as TemplateType)}
                  className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap ${resumeData.template === t.id ? 'bg-white text-indigo-900 font-bold shadow-sm' : 'text-indigo-200 hover:text-white'}`}
                >
                  {t.label}
                </button>
               ))}
            </div>

            <nav className="flex items-center gap-2">
              <button 
                onClick={() => setShowPreview(false)}
                className={`px-4 py-2 rounded-full transition-all text-sm ${!showPreview ? 'bg-white text-indigo-900 font-bold shadow-sm' : 'hover:bg-indigo-800'}`}
              >
                <i className="fas fa-edit mr-2"></i> Edit
              </button>
              <button 
                onClick={() => setShowPreview(true)}
                className={`px-4 py-2 rounded-full transition-all text-sm ${showPreview ? 'bg-white text-indigo-900 font-bold shadow-sm' : 'hover:bg-indigo-800'}`}
              >
                <i className="fas fa-eye mr-2"></i> Preview
              </button>
              <button 
                onClick={handlePrint}
                className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 text-sm font-bold ml-2"
              >
                <i className="fas fa-download mr-2"></i> Export
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8">
        <div className={`flex-1 ${showPreview ? 'hidden lg:block' : 'block'}`}>
          <div className="sticky top-28">
            <ResumeForm data={resumeData} onChange={setResumeData} />
          </div>
        </div>

        <div className={`flex-1 ${showPreview ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white shadow-xl rounded-xl overflow-hidden mb-8 no-print lg:block hidden">
             <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
                <span className="text-xs font-mono uppercase tracking-widest">
                  Live View - {resumeData.template.toUpperCase()} Style
                </span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
             </div>
          </div>
          <ResumePreview data={resumeData} />
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-around md:hidden no-print z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => setShowPreview(false)} className={`flex flex-col items-center gap-1 ${!showPreview ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>
          <i className="fas fa-edit text-lg"></i><span className="text-[10px]">Form</span>
        </button>
        <button onClick={() => setShowPreview(true)} className={`flex flex-col items-center gap-1 ${showPreview ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>
          <i className="fas fa-eye text-lg"></i><span className="text-[10px]">View</span>
        </button>
        <button onClick={handlePrint} className="flex flex-col items-center gap-1 text-green-600">
          <i className="fas fa-download text-lg"></i><span className="text-[10px]">Print</span>
        </button>
      </div>
    </div>
  );
};

export default App;
