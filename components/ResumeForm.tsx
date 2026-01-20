
import React, { useState } from 'react';
import { ResumeData, Education, WorkExperience } from '../types';
import { improveDeclaration, suggestLanguages } from '../services/geminiService';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm: React.FC<Props> = ({ data, onChange }) => {
  const [isAiLoading, setIsAiLoading] = useState(false);

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

  const updateWork = (index: number, field: keyof WorkExperience, value: string) => {
    const newWork = [...data.workExperience];
    newWork[index] = { ...newWork[index], [field]: value };
    onChange({ ...data, workExperience: newWork });
  };

  const addWork = () => {
    onChange({
      ...data,
      workExperience: [...data.workExperience, { id: Date.now().toString(), jobTitle: '', company: '', duration: '', responsibilities: '' }]
    });
  };

  const removeWork = (index: number) => {
    const newWork = data.workExperience.filter((_, i) => i !== index);
    onChange({ ...data, workExperience: newWork });
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
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Fill Details</h2>
        <button 
          onClick={handleAiImprove}
          disabled={isAiLoading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105"
        >
          {isAiLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
          AI Polish
        </button>
      </div>

      {/* Basic Info */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
          <i className="fas fa-user"></i> Basic Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              value={data.name} 
              onChange={(e) => updateField('name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="e.g. SUMIT KUMAR"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input 
              type="text" 
              value={data.contact} 
              onChange={(e) => updateField('contact', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="e.g. 7903430792"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
            <textarea 
              value={data.address} 
              onChange={(e) => updateField('address', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              rows={3}
              placeholder="Village, Post, Dist, Pin..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handlePhotoUpload}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
            <i className="fas fa-briefcase"></i> Work Experience
          </h3>
          <button 
            onClick={addWork}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            + Add Experience
          </button>
        </div>
        <div className="space-y-4">
          {data.workExperience.map((work, idx) => (
            <div key={work.id} className="p-4 bg-indigo-50 rounded-lg relative border border-indigo-100 space-y-3">
               <button 
                  onClick={() => removeWork(idx)} 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                >
                  <i className="fas fa-times"></i>
                </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input 
                  placeholder="Job Title" 
                  value={work.jobTitle} 
                  onChange={(e) => updateWork(idx, 'jobTitle', e.target.value)}
                  className="rounded border-gray-300 p-2 text-sm border bg-white"
                />
                <input 
                  placeholder="Company" 
                  value={work.company} 
                  onChange={(e) => updateWork(idx, 'company', e.target.value)}
                  className="rounded border-gray-300 p-2 text-sm border bg-white"
                />
                <input 
                  placeholder="Duration (e.g. Jan 2020 - Present)" 
                  value={work.duration} 
                  onChange={(e) => updateWork(idx, 'duration', e.target.value)}
                  className="rounded border-gray-300 p-2 text-sm border bg-white md:col-span-2"
                />
              </div>
              <textarea 
                placeholder="Key Responsibilities / Achievements" 
                value={work.responsibilities} 
                onChange={(e) => updateWork(idx, 'responsibilities', e.target.value)}
                className="w-full rounded border-gray-300 p-2 text-sm border bg-white"
                rows={2}
              />
            </div>
          ))}
          {data.workExperience.length === 0 && (
            <p className="text-xs text-gray-400 italic text-center py-2">No work experience added yet.</p>
          )}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
            <i className="fas fa-tools"></i> Skills
          </h3>
          <button 
            onClick={addSkill}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            + Add Skill
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.skills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input 
                placeholder="Skill name (e.g. MS Office, Tally)" 
                value={skill} 
                onChange={(e) => updateSkill(idx, e.target.value)}
                className="flex-1 rounded border-gray-300 p-2 text-sm border bg-white"
              />
              <button onClick={() => removeSkill(idx)} className="text-red-500 hover:text-red-700 p-1">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          ))}
          {data.skills.length === 0 && (
             <p className="text-xs text-gray-400 italic text-center py-2 col-span-full">No skills added yet.</p>
          )}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
            <i className="fas fa-graduation-cap"></i> Education Qualification
          </h3>
          <button 
            onClick={addEdu}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            + Add Education
          </button>
        </div>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={edu.id} className="grid grid-cols-2 md:grid-cols-5 gap-2 p-3 bg-gray-50 rounded-lg relative">
              <input 
                placeholder="Qualif." 
                value={edu.qualification} 
                onChange={(e) => updateEdu(idx, 'qualification', e.target.value)}
                className="rounded border-gray-300 p-2 text-sm border bg-white"
              />
              <input 
                placeholder="Board/Univ." 
                value={edu.board} 
                onChange={(e) => updateEdu(idx, 'board', e.target.value)}
                className="rounded border-gray-300 p-2 text-sm border bg-white md:col-span-2"
              />
              <input 
                placeholder="Year" 
                value={edu.year} 
                onChange={(e) => updateEdu(idx, 'year', e.target.value)}
                className="rounded border-gray-300 p-2 text-sm border bg-white"
              />
              <div className="flex items-center gap-1">
                <input 
                  placeholder="Div." 
                  value={edu.division} 
                  onChange={(e) => updateEdu(idx, 'division', e.target.value)}
                  className="rounded border-gray-300 p-2 text-sm border bg-white w-full"
                />
                <button onClick={() => removeEdu(idx)} className="text-red-500 p-1">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Details */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
          <i className="fas fa-id-card"></i> Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Name</label>
            <input 
              type="text" 
              value={data.personalDetails.fatherName} 
              onChange={(e) => updatePersonal('fatherName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
            <input 
              type="text" 
              value={data.personalDetails.motherName} 
              onChange={(e) => updatePersonal('motherName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input 
              type="text" 
              value={data.personalDetails.dob} 
              onChange={(e) => updatePersonal('dob', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 border"
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
            <select 
              value={data.personalDetails.maritalStatus} 
              onChange={(e) => updatePersonal('maritalStatus', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 border"
            >
              <option value="Unmarried">Unmarried</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Languages Known</label>
            <input 
              type="text" 
              value={data.personalDetails.languages} 
              onChange={(e) => updatePersonal('languages', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 border"
              placeholder="Hindi, English..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Location Preference</label>
            <input 
              type="text" 
              value={data.personalDetails.jobLocation} 
              onChange={(e) => updatePersonal('jobLocation', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 border"
              placeholder="All India"
            />
          </div>
        </div>
      </section>

      {/* Declaration */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-indigo-700">Declaration</h3>
        <textarea 
          value={data.declaration} 
          onChange={(e) => updateField('declaration', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          rows={3}
        />
      </section>
    </div>
  );
};

export default ResumeForm;
