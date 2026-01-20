
import React, { useState, useRef } from 'react';
import { ResumeData, Education, WorkExperience } from '../types';
import { improveDeclaration, suggestLanguages } from '../services/geminiService';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm: React.FC<Props> = ({ data, onChange }) => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updatePersonal = (field: keyof ResumeData['personalDetails'], value: string) => {
    onChange({
      ...data,
      personalDetails: { ...data.personalDetails, [field]: value }
    });
  };

  const updateEdu = (index: number, field: keyof Education, value: string) => {
    const newEdu = [...data.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    onChange({ ...data, education: newEdu });
  };

  const addEdu = () => {
    onChange({
      ...data,
      education: [...data.education, { id: Date.now().toString(), qualification: '', board: '', year: '', division: '' }]
    });
  };

  const removeEdu = (index: number) => {
    const newEdu = data.education.filter((_, i) => i !== index);
    onChange({ ...data, education: newEdu });
  };

  const addSkill = () => {
    updateField('skills', [...data.skills, '']);
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = value;
    updateField('skills', newSkills);
  };

  const removeSkill = (index: number) => {
    const newSkills = data.skills.filter((_, i) => i !== index);
    updateField('skills', newSkills);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('photoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updateField('photoUrl', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Bio-Data</h2>
          <p className="text-slate-500 text-xs font-medium">Fill in your details to auto-generate</p>
        </div>
        <button 
          onClick={handleAiImprove}
          disabled={isAiLoading}
          className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all font-bold text-xs shadow-xl shadow-slate-200"
        >
          {isAiLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
          AI Polish
        </button>
      </div>

      {/* Section Wrapper Style */}
      <div className="space-y-6">
        
        {/* Profile Card */}
        <section className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <i className="fas fa-camera text-indigo-500"></i> Profile Image
          </h3>
          <div className="flex items-center gap-6">
            <div className="relative group">
              {data.photoUrl ? (
                <img src={data.photoUrl} alt="Preview" className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-xl group-hover:brightness-90 transition-all" />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-white border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                  <i className="fas fa-user-plus text-2xl"></i>
                </div>
              )}
              {data.photoUrl && (
                <button 
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <i className="fas fa-times text-[10px]"></i>
                </button>
              )}
            </div>
            <div className="flex-1">
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" id="photo-upload" />
              <label htmlFor="photo-upload" className="block w-full text-center py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors text-xs font-black uppercase shadow-sm">
                Pick Image
              </label>
              <p className="text-[10px] text-slate-400 mt-2 text-center font-bold">Square or Portrait works best</p>
            </div>
          </div>
        </section>

        {/* Basic Info */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-address-card text-indigo-500"></i> Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Full Name</label>
              <input 
                type="text" 
                value={data.name} 
                onChange={(e) => updateField('name', e.target.value)}
                className="block w-full bg-slate-50 rounded-xl border-transparent p-3 text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                placeholder="Raj Kumar"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Phone</label>
                <input 
                  type="text" 
                  value={data.contact} 
                  onChange={(e) => updateField('contact', e.target.value)}
                  className="block w-full bg-slate-50 rounded-xl border-transparent p-3 text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                  placeholder="+91..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Email</label>
                <input 
                  type="email" 
                  value={data.personalDetails.email} 
                  onChange={(e) => updatePersonal('email', e.target.value)}
                  className="block w-full bg-slate-50 rounded-xl border-transparent p-3 text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                  placeholder="raj@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Address</label>
              <textarea 
                value={data.address} 
                onChange={(e) => updateField('address', e.target.value)}
                className="block w-full bg-slate-50 rounded-xl border-transparent p-3 text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                rows={2}
                placeholder="123 Street, City..."
              />
            </div>
          </div>
        </section>

        {/* Professional Details */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-tools text-indigo-500"></i> Skills & Capabilities
            </h3>
            <button onClick={addSkill} className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase">+ Add New</button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {data.skills.map((skill, idx) => (
              <div key={idx} className="flex gap-2 group">
                <input 
                  value={skill} 
                  onChange={(e) => updateSkill(idx, e.target.value)}
                  className="flex-1 bg-slate-50 rounded-xl border-transparent p-2 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500/10 outline-none"
                  placeholder="Photoshop, Team Lead..."
                />
                <button onClick={() => removeSkill(idx)} className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"><i className="fas fa-trash-alt"></i></button>
              </div>
            ))}
            {data.skills.length === 0 && <p className="text-[10px] text-slate-400 font-bold italic text-center py-2">No skills added yet</p>}
          </div>
        </section>

        {/* Educational Qualifications */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
           <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-graduation-cap text-indigo-500"></i> Education
            </h3>
            <button onClick={addEdu} className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase">+ Add Qualification</button>
          </div>
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={edu.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                <button onClick={() => removeEdu(idx)} className="absolute -top-2 -right-2 bg-white text-rose-500 w-6 h-6 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><i className="fas fa-times"></i></button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input placeholder="Qual. (e.g. B.Sc)" value={edu.qualification} onChange={(e) => updateEdu(idx, 'qualification', e.target.value)} className="p-2 text-xs font-bold border-transparent bg-white rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none shadow-sm" />
                  <input placeholder="Year" value={edu.year} onChange={(e) => updateEdu(idx, 'year', e.target.value)} className="p-2 text-xs font-bold border-transparent bg-white rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none shadow-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Board/University" value={edu.board} onChange={(e) => updateEdu(idx, 'board', e.target.value)} className="p-2 text-xs font-bold border-transparent bg-white rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none shadow-sm" />
                  <input placeholder="Percentage/Grade" value={edu.division} onChange={(e) => updateEdu(idx, 'division', e.target.value)} className="p-2 text-xs font-bold border-transparent bg-white rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Details */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-fingerprint text-indigo-500"></i> Bio-Data Facts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Father's Name</label>
              <input value={data.personalDetails.fatherName} onChange={(e) => updatePersonal('fatherName', e.target.value)} className="w-full bg-slate-50 rounded-xl p-3 text-sm font-semibold focus:bg-white outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Date of Birth</label>
              <input value={data.personalDetails.dob} onChange={(e) => updatePersonal('dob', e.target.value)} className="w-full bg-slate-50 rounded-xl p-3 text-sm font-semibold focus:bg-white outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Marital Status</label>
              <select 
                value={data.personalDetails.maritalStatus} 
                onChange={(e) => updatePersonal('maritalStatus', e.target.value)} 
                className="w-full bg-slate-50 rounded-xl p-3 text-sm font-semibold focus:bg-white outline-none"
              >
                <option value="">Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Place/City</label>
              <input value={data.personalDetails.jobLocation} onChange={(e) => updatePersonal('jobLocation', e.target.value)} className="w-full bg-slate-50 rounded-xl p-3 text-sm font-semibold focus:bg-white outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Hobbies</label>
              <input value={data.personalDetails.hobbies} onChange={(e) => updatePersonal('hobbies', e.target.value)} className="w-full bg-slate-50 rounded-xl p-3 text-sm font-semibold focus:bg-white outline-none" />
            </div>
          </div>
        </section>

        {/* Footer & Declaration */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-file-contract text-indigo-500"></i> Declaration & Date
          </h3>
          <div className="space-y-4">
             <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Footer Date</label>
              <input 
                type="text" 
                value={data.date} 
                onChange={(e) => updateField('date', e.target.value)}
                className="block w-full bg-slate-50 rounded-xl p-3 text-sm font-semibold focus:bg-white outline-none"
                placeholder="20/01/2026"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Declaration Statement</label>
              <textarea 
                value={data.declaration} 
                onChange={(e) => updateField('declaration', e.target.value)}
                className="block w-full bg-slate-50 rounded-xl p-3 text-sm font-semibold focus:bg-white outline-none"
                rows={3}
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ResumeForm;
