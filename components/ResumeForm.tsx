import React, { useState, useRef } from 'react';
import { ResumeData, Education, WorkExperience } from '../types';
import { improveDeclaration, suggestLanguages } from '../services/geminiService';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-widest">
    {children}
  </label>
);

const ResumeForm: React.FC<Props> = ({ data, onChange }) => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof ResumeData, value: any) => onChange({ ...data, [field]: value });
  
  const updatePersonal = (field: keyof ResumeData['personalDetails'], value: string) => {
    onChange({ ...data, personalDetails: { ...data.personalDetails, [field]: value } });
  };

  const updateEdu = (index: number, field: keyof Education, value: string) => {
    const newEdu = [...data.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    onChange({ ...data, education: newEdu });
  };

  const addEdu = () => {
    onChange({ ...data, education: [...data.education, { id: Date.now().toString(), qualification: '', board: '', year: '', division: '' }] });
  };

  const removeEdu = (index: number) => {
    onChange({ ...data, education: data.education.filter((_, i) => i !== index) });
  };

  const updateWork = (index: number, field: keyof WorkExperience, value: string) => {
    const newWork = [...data.workExperience];
    newWork[index] = { ...newWork[index], [field]: value };
    onChange({ ...data, workExperience: newWork });
  };

  const addWork = () => {
    onChange({ ...data, workExperience: [...data.workExperience, { id: Date.now().toString(), jobTitle: '', company: '', duration: '', responsibilities: '' }] });
  };

  const removeWork = (index: number) => {
    onChange({ ...data, workExperience: data.workExperience.filter((_, i) => i !== index) });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateField('photoUrl', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim());
    updateField('skills', skillsArray);
  };

  const handleAiImprove = async () => {
    setIsAiLoading(true);
    try {
      const [newDecl, newLangs] = await Promise.all([
        improveDeclaration(data.declaration),
        suggestLanguages(data.personalDetails.languages)
      ]);
      onChange({
        ...data,
        declaration: newDecl.trim(),
        personalDetails: { ...data.personalDetails, languages: newLangs.trim() }
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const inputStyle = "w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all";

  return (
    <div className="space-y-8 pb-20">
      <div className="border-l-4 border-indigo-600 pl-4">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Bio-Data Builder</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Complete your profile to generate your document.</p>
      </div>

      <div className="space-y-6">
        
        {/* Photo Upload */}
        <section className="simple-card p-6">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-6 mt-2">
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-200 dark:border-slate-700 overflow-hidden bg-gray-50 dark:bg-slate-900 flex items-center justify-center shrink-0">
              {data.photoUrl ? (
                <img src={data.photoUrl} className="w-full h-full object-cover" />
              ) : (
                <i className="fas fa-camera text-gray-300 dark:text-slate-700 text-3xl"></i>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" id="photo-upload" />
              <label htmlFor="photo-upload" className="inline-block px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-black rounded-lg cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
                Upload Photo
              </label>
              {data.photoUrl && (
                <button onClick={() => updateField('photoUrl', null)} className="block text-[10px] text-red-500 font-bold uppercase hover:underline">Remove Photo</button>
              )}
            </div>
          </div>
        </section>

        {/* Identity Section */}
        <section className="simple-card p-6 space-y-5">
          <div>
            <Label>Full Name</Label>
            <input 
              type="text" 
              value={data.name} 
              onChange={(e) => updateField('name', e.target.value)}
              className={inputStyle}
              placeholder="e.g. Rahul Sharma"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Mobile Number</Label>
              <input 
                type="text" 
                value={data.contact} 
                onChange={(e) => updateField('contact', e.target.value)}
                className={inputStyle}
              />
            </div>
            <div>
              <Label>Email Address</Label>
              <input 
                type="email" 
                value={data.personalDetails.email} 
                onChange={(e) => updatePersonal('email', e.target.value)}
                className={inputStyle}
              />
            </div>
          </div>
          <div>
            <Label>Full Address</Label>
            <textarea 
              value={data.address} 
              onChange={(e) => updateField('address', e.target.value)}
              className={inputStyle}
              rows={2}
            />
          </div>
        </section>

        {/* Skills Section */}
        <section className="simple-card p-6">
          <Label>Skills & Expertise</Label>
          <textarea 
            value={data.skills.join(', ')} 
            onChange={handleSkillsChange} 
            className={inputStyle} 
            rows={3}
            placeholder="e.g. MS Office, Photoshop, Communication, Teamwork"
          />
          <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-2 font-medium">Comma separated: HTML, CSS, JavaScript...</p>
        </section>

        {/* Education Section */}
        <section className="simple-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Education</h3>
            <button onClick={addEdu} className="text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:underline">+ Add New</button>
          </div>
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={edu.id} className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-800 relative group">
                <button onClick={() => removeEdu(idx)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"><i className="fas fa-trash-alt text-xs"></i></button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <Label>Qualification</Label>
                    <input value={edu.qualification} onChange={(e) => updateEdu(idx, 'qualification', e.target.value)} className={inputStyle} placeholder="10th, B.Tech" />
                  </div>
                  <div>
                    <Label>Passing Year</Label>
                    <input value={edu.year} onChange={(e) => updateEdu(idx, 'year', e.target.value)} className={inputStyle} placeholder="2020" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <Label>Board / University</Label>
                    <input value={edu.board} onChange={(e) => updateEdu(idx, 'board', e.target.value)} className={inputStyle} placeholder="CBSE, Mumbai University" />
                  </div>
                  <div>
                    <Label>Result / %</Label>
                    <input value={edu.division} onChange={(e) => updateEdu(idx, 'division', e.target.value)} className={inputStyle} placeholder="85%" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="simple-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Experience</h3>
            <button onClick={addWork} className="text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:underline">+ Add New</button>
          </div>
          <div className="space-y-4">
            {data.workExperience.map((work, idx) => (
              <div key={work.id} className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-800 relative group">
                <button onClick={() => removeWork(idx)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500"><i className="fas fa-trash-alt text-xs"></i></button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <Label>Job Title</Label>
                    <input value={work.jobTitle} onChange={(e) => updateWork(idx, 'jobTitle', e.target.value)} className={inputStyle} placeholder="Software Engineer" />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <input value={work.duration} onChange={(e) => updateWork(idx, 'duration', e.target.value)} className={inputStyle} placeholder="2021 - Present" />
                  </div>
                </div>
                <div className="mb-3">
                  <Label>Company Name</Label>
                  <input value={work.company} onChange={(e) => updateWork(idx, 'company', e.target.value)} className={inputStyle} />
                </div>
                <div>
                  <Label>Description</Label>
                  <textarea value={work.responsibilities} onChange={(e) => updateWork(idx, 'responsibilities', e.target.value)} className={inputStyle} rows={2} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Details */}
        <section className="simple-card p-6">
          <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6">Personal Details</h3>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <Label>Career Objective</Label>
              <textarea 
                value={data.personalDetails.careerObjective} 
                onChange={(e) => updatePersonal('careerObjective', e.target.value)} 
                className={inputStyle} 
                rows={3}
              />
            </div>
            <div>
              <Label>Father's Name</Label>
              <input value={data.personalDetails.fatherName} onChange={(e) => updatePersonal('fatherName', e.target.value)} className={inputStyle} />
            </div>
            <div>
              <Label>Date of Birth</Label>
              <input value={data.personalDetails.dob} onChange={(e) => updatePersonal('dob', e.target.value)} className={inputStyle} placeholder="DD/MM/YYYY" />
            </div>
            <div>
              <Label>Aadhar Number</Label>
              <input value={data.personalDetails.aadhar} onChange={(e) => updatePersonal('aadhar', e.target.value)} className={inputStyle} />
            </div>
            <div>
              <Label>Marital Status</Label>
              <select value={data.personalDetails.maritalStatus} onChange={(e) => updatePersonal('maritalStatus', e.target.value)} className={inputStyle}>
                <option value="">Select...</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
            <div className="col-span-2">
              <Label>Languages Known</Label>
              <input value={data.personalDetails.languages} onChange={(e) => updatePersonal('languages', e.target.value)} className={inputStyle} />
            </div>
            <div className="col-span-2">
              <Label>Hobbies</Label>
              <input value={data.personalDetails.hobbies} onChange={(e) => updatePersonal('hobbies', e.target.value)} className={inputStyle} />
            </div>
          </div>
        </section>

        {/* Declaration Section */}
        <section className="simple-card p-6">
          <Label>Declaration Statement</Label>
          <textarea 
            value={data.declaration} 
            onChange={(e) => updateField('declaration', e.target.value)} 
            className={inputStyle} 
            rows={3}
          />
        </section>

        {/* AI Action */}
        <div className="sticky bottom-4 z-10 px-2">
          <button 
            onClick={handleAiImprove} 
            disabled={isAiLoading}
            className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-indigo-500/10"
          >
            {isAiLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sparkles"></i>}
            Refine with AI Magic
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;