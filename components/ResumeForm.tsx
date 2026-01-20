
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
    <div className="bg-white p-8 rounded-2xl shadow-xl space-y-10 overflow-y-auto max-h-[85vh]">
      <div className="flex justify-between items-center border-b pb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bio-Data Details</h2>
        <button 
          onClick={handleAiImprove}
          disabled={isAiLoading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all font-bold shadow-md"
        >
          {isAiLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
          AI Polish
        </button>
      </div>

      {/* Profile Photo Section */}
      <section className="space-y-5">
        <h3 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
          <i className="fas fa-camera"></i> Profile Photo
        </h3>
        <div className="flex items-center gap-8">
          <div className="relative group">
            {data.photoUrl ? (
              <img src={data.photoUrl} alt="Preview" className="w-28 h-28 rounded-xl object-cover border-4 border-indigo-50 shadow-md" />
            ) : (
              <div className="w-28 h-28 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <i className="fas fa-user-circle text-4xl text-gray-300"></i>
              </div>
            )}
            {data.photoUrl && (
              <button 
                onClick={removePhoto}
                className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Upload Profile Picture</label>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
              id="photo-upload"
            />
            <label 
              htmlFor="photo-upload"
              className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-50 text-indigo-700 rounded-xl cursor-pointer hover:bg-indigo-100 transition-colors border-2 border-indigo-100 text-sm font-bold"
            >
              <i className="fas fa-upload"></i>
              Choose Image
            </label>
            <p className="text-xs text-gray-500 mt-3 font-medium">Recommended: Portrait/Passport size (JPG or PNG)</p>
          </div>
        </div>
      </section>

      {/* Header Info */}
      <section className="space-y-5">
        <h3 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
          <i className="fas fa-user"></i> Header Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              value={data.name} 
              onChange={(e) => updateField('name', e.target.value)}
              className="block w-full rounded-xl border-gray-200 p-3 border-2 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={data.personalDetails.email} 
              onChange={(e) => updatePersonal('email', e.target.value)}
              className="block w-full rounded-xl border-gray-200 p-3 border-2 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
              placeholder="example@mail.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Address</label>
            <textarea 
              value={data.address} 
              onChange={(e) => updateField('address', e.target.value)}
              className="block w-full rounded-xl border-gray-200 p-3 border-2 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
            <input 
              type="text" 
              value={data.contact} 
              onChange={(e) => updateField('contact', e.target.value)}
              className="block w-full rounded-xl border-gray-200 p-3 border-2 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Aadhar No.</label>
            <input 
              type="text" 
              value={data.personalDetails.aadhar} 
              onChange={(e) => updatePersonal('aadhar', e.target.value)}
              className="block w-full rounded-xl border-gray-200 p-3 border-2 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Current Date (for footer)</label>
            <input 
              type="text" 
              value={data.date} 
              onChange={(e) => updateField('date', e.target.value)}
              placeholder="e.g. 20/01/2026"
              className="block w-full rounded-xl border-gray-200 p-3 border-2 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Career Objective</label>
            <textarea 
              value={data.personalDetails.careerObjective} 
              onChange={(e) => updatePersonal('careerObjective', e.target.value)}
              className="block w-full rounded-xl border-gray-200 p-3 border-2 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
              rows={2}
            />
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
            <i className="fas fa-tools"></i> Technical Skills
          </h3>
          <button onClick={addSkill} className="text-indigo-600 text-sm font-bold hover:text-indigo-800 transition-colors bg-indigo-50 px-3 py-1 rounded-lg">+ Add Skill</button>
        </div>
        <div className="space-y-3">
          {data.skills.map((skill, idx) => (
            <div key={idx} className="flex gap-3">
              <input 
                value={skill} 
                onChange={(e) => updateSkill(idx, e.target.value)}
                className="flex-1 rounded-xl border-gray-200 p-3 border-2 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                placeholder="e.g. Photoshop, HTML, CSS"
              />
              <button onClick={() => removeSkill(idx)} className="text-red-500 hover:text-red-700 transition-colors p-2"><i className="fas fa-trash"></i></button>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
            <i className="fas fa-graduation-cap"></i> Educational Qualifications
          </h3>
          <button onClick={addEdu} className="text-indigo-600 text-sm font-bold hover:text-indigo-800 transition-colors bg-indigo-50 px-3 py-1 rounded-lg">+ Add Edu</button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu, idx) => (
            <div key={edu.id} className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-2xl border-2 border-gray-100 relative group">
              <input placeholder="Qual." value={edu.qualification} onChange={(e) => updateEdu(idx, 'qualification', e.target.value)} className="p-3 text-sm border-2 rounded-xl focus:border-indigo-500 outline-none" />
              <input placeholder="Year" value={edu.year} onChange={(e) => updateEdu(idx, 'year', e.target.value)} className="p-3 text-sm border-2 rounded-xl focus:border-indigo-500 outline-none" />
              <input placeholder="Board" value={edu.board} onChange={(e) => updateEdu(idx, 'board', e.target.value)} className="p-3 text-sm border-2 rounded-xl focus:border-indigo-500 outline-none" />
              <div className="flex gap-2">
                <input placeholder="%" value={edu.division} onChange={(e) => updateEdu(idx, 'division', e.target.value)} className="p-3 text-sm border-2 rounded-xl w-full focus:border-indigo-500 outline-none" />
                <button onClick={() => removeEdu(idx)} className="text-red-500 hover:scale-110 transition-transform"><i className="fas fa-times-circle text-lg"></i></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Section */}
      <section className="space-y-5">
        <h3 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
          <i className="fas fa-info-circle"></i> Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Father's Name</label>
            <input placeholder="Father's Name" value={data.personalDetails.fatherName} onChange={(e) => updatePersonal('fatherName', e.target.value)} className="w-full p-3 border-2 rounded-xl focus:border-indigo-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">DOB</label>
            <input placeholder="Date of Birth" value={data.personalDetails.dob} onChange={(e) => updatePersonal('dob', e.target.value)} className="w-full p-3 border-2 rounded-xl focus:border-indigo-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Marital Status</label>
            <select 
              value={data.personalDetails.maritalStatus} 
              onChange={(e) => updatePersonal('maritalStatus', e.target.value)} 
              className="w-full p-3 border-2 rounded-xl focus:border-indigo-500 outline-none bg-white font-medium"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Languages Known</label>
            <input placeholder="Languages Known" value={data.personalDetails.languages} onChange={(e) => updatePersonal('languages', e.target.value)} className="w-full p-3 border-2 rounded-xl focus:border-indigo-500 outline-none" />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Place (City, State)</label>
            <input placeholder="Place (e.g. Supaul, Bihar)" value={data.personalDetails.jobLocation} onChange={(e) => updatePersonal('jobLocation', e.target.value)} className="w-full p-3 border-2 rounded-xl focus:border-indigo-500 outline-none" />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Hobbies</label>
            <textarea placeholder="Hobbies (e.g. Designing, Coding)" value={data.personalDetails.hobbies} onChange={(e) => updatePersonal('hobbies', e.target.value)} className="w-full p-3 border-2 rounded-xl focus:border-indigo-500 outline-none" rows={2} />
          </div>
        </div>
      </section>

      {/* Declaration */}
      <section className="space-y-5">
        <h3 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
          <i className="fas fa-file-contract"></i> Declaration
        </h3>
        <textarea 
          value={data.declaration} 
          onChange={(e) => updateField('declaration', e.target.value)}
          className="w-full rounded-xl border-gray-200 p-4 border-2 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
          rows={3}
          placeholder="I hereby declare that the details provided above are true..."
        />
      </section>
    </div>
  );
};

export default ResumeForm;
