
import React, { useState, useRef } from 'react';
import { ResumeData, Education, WorkExperience } from '../types';
import { improveDeclaration, suggestLanguages } from '../services/geminiService';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
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

  const inputStyle = "w-full bg-white border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all";

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Resume Builder</h2>
        <p className="text-sm text-gray-500 mt-1">Fill in the sections below to complete your bio-data.</p>
      </div>

      <div className="space-y-6">
        
        {/* Photo Upload */}
        <section className="simple-card p-6">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-20 h-20 rounded-md border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center shrink-0">
              {data.photoUrl ? (
                <img src={data.photoUrl} className="w-full h-full object-cover" />
              ) : (
                <i className="fas fa-user text-gray-300 text-3xl"></i>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" id="photo-upload" />
              <label htmlFor="photo-upload" className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded cursor-pointer transition-colors">
                Change Photo
              </label>
              {data.photoUrl && (
                <button onClick={() => updateField('photoUrl', null)} className="ml-2 text-xs text-red-600 font-bold hover:underline">Remove</button>
              )}
            </div>
          </div>
        </section>

        {/* Identity Section */}
        <section className="simple-card p-6 space-y-4">
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
            placeholder="e.g. MS Office, Photoshop, Communication, Teamwork (separate by commas)"
          />
          <p className="text-[10px] text-gray-400 mt-2">Enter your skills separated by commas.</p>
        </section>

        {/* Education Section */}
        <section className="simple-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Education</h3>
            <button onClick={addEdu} className="text-indigo-600 text-xs font-bold hover:underline">+ Add Education</button>
          </div>
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={edu.id} className="p-4 bg-gray-50 rounded-md border border-gray-200 relative group">
                <button onClick={() => removeEdu(idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-600"><i className="fas fa-trash-alt text-xs"></i></button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <Label>Qualification</Label>
                    <input value={edu.qualification} onChange={(e) => updateEdu(idx, 'qualification', e.target.value)} className={inputStyle} placeholder="e.g. 10th, B.Tech" />
                  </div>
                  <div>
                    <Label>Passing Year</Label>
                    <input value={edu.year} onChange={(e) => updateEdu(idx, 'year', e.target.value)} className={inputStyle} placeholder="e.g. 2020" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <Label>Board / University</Label>
                    <input value={edu.board} onChange={(e) => updateEdu(idx, 'board', e.target.value)} className={inputStyle} placeholder="e.g. CBSE, Mumbai University" />
                  </div>
                  <div>
                    <Label>Percentage / Grade</Label>
                    <input value={edu.division} onChange={(e) => updateEdu(idx, 'division', e.target.value)} className={inputStyle} placeholder="e.g. 85%" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="simple-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Work Experience</h3>
            <button onClick={addWork} className="text-indigo-600 text-xs font-bold hover:underline">+ Add Work</button>
          </div>
          <div className="space-y-4">
            {data.workExperience.map((work, idx) => (
              <div key={work.id} className="p-4 bg-gray-50 rounded-md border border-gray-200 relative group">
                <button onClick={() => removeWork(idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-600"><i className="fas fa-trash-alt text-xs"></i></button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <Label>Job Title</Label>
                    <input value={work.jobTitle} onChange={(e) => updateWork(idx, 'jobTitle', e.target.value)} className={inputStyle} placeholder="e.g. Software Engineer" />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <input value={work.duration} onChange={(e) => updateWork(idx, 'duration', e.target.value)} className={inputStyle} placeholder="e.g. 2021 - Present" />
                  </div>
                </div>
                <div className="mb-3">
                  <Label>Company Name</Label>
                  <input value={work.company} onChange={(e) => updateWork(idx, 'company', e.target.value)} className={inputStyle} placeholder="e.g. Tech Solutions Pvt Ltd" />
                </div>
                <div>
                  <Label>Responsibilities</Label>
                  <textarea value={work.responsibilities} onChange={(e) => updateWork(idx, 'responsibilities', e.target.value)} className={inputStyle} rows={2} placeholder="Describe your key tasks..." />
                </div>
              </div>
            ))}
            {data.workExperience.length === 0 && <p className="text-xs text-gray-400 italic text-center py-2">No work experience added.</p>}
          </div>
        </section>

        {/* Bio Details */}
        <section className="simple-card p-6 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Personal Details</h3>
          </div>
          <div className="col-span-2">
            <Label>Career Objective</Label>
            <textarea 
              value={data.personalDetails.careerObjective} 
              onChange={(e) => updatePersonal('careerObjective', e.target.value)} 
              className={inputStyle} 
              rows={3}
              placeholder="State your professional goals..."
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
            <input value={data.personalDetails.aadhar} onChange={(e) => updatePersonal('aadhar', e.target.value)} className={inputStyle} placeholder="12 Digit No." />
          </div>
          <div>
            <Label>Marital Status</Label>
            <select value={data.personalDetails.maritalStatus} onChange={(e) => updatePersonal('maritalStatus', e.target.value)} className={inputStyle}>
              <option value="">Select...</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </select>
          </div>
          <div className="col-span-2">
            <Label>Languages Known</Label>
            <input value={data.personalDetails.languages} onChange={(e) => updatePersonal('languages', e.target.value)} className={inputStyle} placeholder="Hindi, English, etc." />
          </div>
          <div className="col-span-2">
            <Label>Hobbies</Label>
            <input value={data.personalDetails.hobbies} onChange={(e) => updatePersonal('hobbies', e.target.value)} className={inputStyle} placeholder="Reading, Cricket, Music, etc." />
          </div>
          <div>
            <Label>Place / Location</Label>
            <input value={data.personalDetails.jobLocation} onChange={(e) => updatePersonal('jobLocation', e.target.value)} className={inputStyle} />
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
            placeholder="I hereby declare that the information provided is true to the best of my knowledge..."
          />
        </section>

        {/* Document Date */}
        <section className="simple-card p-6">
          <Label>Document Date (Footer)</Label>
          <input 
            value={data.date} 
            onChange={(e) => updateField('date', e.target.value)} 
            className={inputStyle} 
            placeholder="e.g. 25/05/2024"
          />
        </section>

        {/* AI Action */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleAiImprove} 
            disabled={isAiLoading}
            className="w-full py-3 bg-gray-900 text-white rounded-md text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isAiLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
            Improve with AI
          </button>
          <p className="text-[10px] text-gray-400 text-center">Uses AI to refine your declaration and languages.</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
