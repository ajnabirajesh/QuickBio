
import React from 'react';
import { ResumeData } from '../types';

interface Props {
  data: ResumeData;
}

const ResumePreview: React.FC<Props> = ({ data }) => {
  // Define currentDate as a fallback if data.date is not provided
  const currentDate = new Date().toLocaleDateString('en-GB');

  // Common wrapper styles
  const wrapperClass = "bg-white shadow-2xl mx-auto w-[210mm] h-[296.5mm] print-container border font-sans text-gray-900 overflow-hidden box-border flex flex-col";

  // --- TEMPLATE 1: ELEGANT ---
  const ElegantTemplate = () => (
    <div className={`${wrapperClass} p-12`}>
      {(data.name || data.address || data.contact || data.personalDetails.email || data.photoUrl) && (
        <header className="flex justify-between items-start mb-8 border-b-2 border-blue-800 pb-4">
          <div className="flex-1">
            {data.name && <h1 className="text-4xl font-bold text-blue-900 mb-6">{data.name}</h1>}
            <div className="space-y-1 text-[13px] text-gray-800">
              {data.address && <p className="whitespace-pre-wrap">{data.address}</p>}
              {(data.contact || data.personalDetails.email) && (
                <p>
                  {data.contact && `Phone: ${data.contact}`}
                  {data.contact && data.personalDetails.email && ' | '}
                  {data.personalDetails.email && `Email: ${data.personalDetails.email}`}
                </p>
              )}
              {data.personalDetails.dob && <p>Date of Birth: {data.personalDetails.dob}</p>}
              {data.personalDetails.aadhar && <p>Aadhar No.- {data.personalDetails.aadhar}</p>}
            </div>
          </div>
          {data.photoUrl && (
            <div className="w-32 h-40 border-2 border-gray-200 shadow-[8px_8px_0px_rgba(30,58,138,0.2)] ml-4 flex-shrink-0">
              <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
        </header>
      )}

      <div className="flex-1 overflow-hidden">
        {data.personalDetails.careerObjective && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-800 mb-1 uppercase tracking-tight">Career Objective</h3>
            <p className="text-[14px] leading-relaxed text-gray-800">{data.personalDetails.careerObjective}</p>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-800 mb-3 uppercase tracking-tight">Educational Qualifications</h3>
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="border border-blue-100 bg-blue-50 text-blue-900">
                  <th className="p-2 text-left border border-blue-100">Qualification</th>
                  <th className="p-2 text-left border border-blue-100 w-20">Year</th>
                  <th className="p-2 text-left border border-blue-100">Board/University</th>
                  <th className="p-2 text-left border border-blue-100 w-24">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {data.education.map((edu) => (
                  <tr key={edu.id} className="border border-blue-100">
                    <td className="p-2 font-bold border border-blue-100">{edu.qualification}</td>
                    <td className="p-2 border border-blue-100">{edu.year}</td>
                    <td className="p-2 border border-blue-100">{edu.board}</td>
                    <td className="p-2 border border-blue-100">{edu.division}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-800 mb-2 uppercase tracking-tight">Technical Skills</h3>
            <ul className="list-disc list-outside ml-6 space-y-1 text-[13px]">
              {data.skills.filter(s => s.trim()).map((skill, idx) => (
                <li key={idx} className="font-semibold text-gray-800">
                  {skill.includes(':') ? (
                    <span>
                      <span className="font-bold text-blue-900">{skill.split(':')[0]}:</span> 
                      {skill.split(':')[1]}
                    </span>
                  ) : skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8 mb-6">
          {data.personalDetails.languages && (
            <section>
              <h3 className="text-lg font-bold text-blue-800 mb-1 uppercase tracking-tight">Languages Known</h3>
              <div className="text-[13px] space-y-0.5 ml-2">
                {data.personalDetails.languages.split(',').filter(l => l.trim()).map(l => (
                  <p key={l}>- {l.trim()}</p>
                ))}
              </div>
            </section>
          )}
          {data.personalDetails.hobbies && (
            <section>
              <h3 className="text-lg font-bold text-blue-800 mb-1 uppercase tracking-tight">Hobbies & Interests</h3>
              <div className="text-[13px] space-y-0.5 ml-2">
                {data.personalDetails.hobbies.split(',').filter(h => h.trim()).map(h => (
                  <p key={h}>- {h.trim()}</p>
                ))}
              </div>
            </section>
          )}
        </div>

        {(data.personalDetails.fatherName || data.personalDetails.dob || data.personalDetails.maritalStatus) && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-800 mb-2 uppercase tracking-tight">Personal Details</h3>
            <div className="text-[13px] space-y-1">
              {data.personalDetails.fatherName && <p><span className="font-bold">Father's Name:</span> {data.personalDetails.fatherName}</p>}
              {data.personalDetails.dob && <p><span className="font-bold">Date of Birth:</span> {data.personalDetails.dob}</p>}
              {data.personalDetails.maritalStatus && <p><span className="font-bold">Marital Status:</span> {data.personalDetails.maritalStatus}</p>}
            </div>
          </section>
        )}

        {data.declaration && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-800 mb-1 uppercase tracking-tight">Declaration</h3>
            <p className="text-[13px] leading-relaxed text-gray-800 italic">{data.declaration}</p>
          </section>
        )}
      </div>

      {(data.name || data.personalDetails.jobLocation || data.date) && (
        <footer className="mt-auto pt-4 flex justify-between items-end text-[13px]">
          <div className="space-y-1">
            {data.date && <p><span className="font-bold">Date:</span> {data.date}</p>}
            {data.personalDetails.jobLocation && <p><span className="font-bold">Place:</span> {data.personalDetails.jobLocation}</p>}
          </div>
          <div className="text-right">
            <p className="font-bold text-lg mb-1">{data.name}</p>
            <div className="w-32 h-px bg-blue-900"></div>
            <p className="text-[10px] mt-1 text-blue-900 font-bold uppercase">Signature</p>
          </div>
        </footer>
      )}
    </div>
  );

  // --- TEMPLATE 2: CLASSIC ---
  const ClassicTemplate = () => (
    <div className={`${wrapperClass} p-10 font-serif`}>
      {(data.name || data.address || data.contact) && (
        <div className="text-center mb-8 border-b-2 border-black pb-2">
          <h1 className="text-3xl font-bold uppercase tracking-widest">Resume / Bio-Data</h1>
        </div>
      )}
      
      <div className="flex justify-between mb-8">
        <div>
          {data.name && <h2 className="text-2xl font-bold uppercase mb-4">{data.name}</h2>}
          <div className="space-y-1 text-sm">
            {data.address && <p><strong>Address:</strong> {data.address}</p>}
            {data.contact && <p><strong>Contact No:</strong> {data.contact}</p>}
            {data.personalDetails.email && <p><strong>Email:</strong> {data.personalDetails.email}</p>}
          </div>
        </div>
        {data.photoUrl && (
          <div className="w-28 h-36 border border-black p-1">
            <img src={data.photoUrl} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden space-y-6">
        {data.education.length > 0 && (
          <section>
            <h3 className="text-lg font-bold underline mb-2">Academic Qualification:</h3>
            <table className="w-full border border-black text-sm text-center">
              <thead>
                <tr className="bg-gray-100 font-bold">
                  <th className="border border-black p-1">Qual.</th>
                  <th className="border border-black p-1">Board/Uni</th>
                  <th className="border border-black p-1">Year</th>
                  <th className="border border-black p-1">Div/%.</th>
                </tr>
              </thead>
              <tbody>
                {data.education.map(edu => (
                  <tr key={edu.id}>
                    <td className="border border-black p-1">{edu.qualification}</td>
                    <td className="border border-black p-1">{edu.board}</td>
                    <td className="border border-black p-1">{edu.year}</td>
                    <td className="border border-black p-1">{edu.division}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <h3 className="text-lg font-bold underline mb-2">Technical Skills:</h3>
            <ul className="list-disc ml-8 text-sm">
              {data.skills.filter(s => s.trim()).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </section>
        )}

        {(data.personalDetails.fatherName || data.personalDetails.dob || data.personalDetails.aadhar || data.personalDetails.languages) && (
          <section>
            <h3 className="text-lg font-bold underline mb-2">Personal Details:</h3>
            <div className="grid grid-cols-1 gap-1 text-sm ml-4">
               {data.personalDetails.fatherName && <p><strong>Father's Name:</strong> {data.personalDetails.fatherName}</p>}
               {data.personalDetails.dob && <p><strong>Date of Birth:</strong> {data.personalDetails.dob}</p>}
               {data.personalDetails.maritalStatus && <p><strong>Marital Status:</strong> {data.personalDetails.maritalStatus}</p>}
               {data.personalDetails.aadhar && <p><strong>Aadhar No:</strong> {data.personalDetails.aadhar}</p>}
               {data.personalDetails.languages && <p><strong>Languages:</strong> {data.personalDetails.languages}</p>}
            </div>
          </section>
        )}

        {data.declaration && (
          <section>
            <h3 className="text-lg font-bold underline mb-2">Declaration:</h3>
            <p className="text-sm italic ml-4">{data.declaration}</p>
          </section>
        )}
      </div>

      {(data.name || data.personalDetails.jobLocation || data.date) && (
        <footer className="mt-auto pt-10 flex justify-between text-sm">
          <div className="space-y-1">
            {data.date && <p><strong>Date:</strong> {data.date}</p>}
            {data.personalDetails.jobLocation && <p><strong>Place:</strong> {data.personalDetails.jobLocation}</p>}
          </div>
          <div className="text-center">
            <div className="w-32 border-b border-black mb-1"></div>
            <p className="font-bold">Signature</p>
          </div>
        </footer>
      )}
    </div>
  );

  // --- TEMPLATE 3: MODERN ---
  const ModernTemplate = () => (
    <div className="bg-white mx-auto w-[210mm] h-[296.5mm] print-container shadow-2xl flex font-sans text-gray-800 overflow-hidden box-border">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-900 text-slate-100 p-8 flex flex-col gap-8">
        {(data.name || data.photoUrl) && (
          <div className="text-center">
            {data.photoUrl ? (
              <img src={data.photoUrl} className="w-32 h-32 rounded-full border-4 border-slate-700 mx-auto object-cover mb-4 shadow-lg" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 border-2 border-slate-700">
                <i className="fas fa-user text-4xl text-slate-600"></i>
              </div>
            )}
            {data.name && <h2 className="text-xl font-black uppercase tracking-tight">{data.name}</h2>}
            <p className="text-slate-400 text-xs mt-1 uppercase font-bold tracking-widest">Candidate</p>
          </div>
        )}

        {(data.contact || data.personalDetails.email || data.address) && (
          <section>
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-1">Contact Details</h3>
            <div className="space-y-3 text-xs">
              {data.contact && <p className="flex items-center gap-3"><i className="fas fa-phone text-indigo-400"></i> {data.contact}</p>}
              {data.personalDetails.email && <p className="flex items-center gap-3"><i className="fas fa-envelope text-indigo-400"></i> {data.personalDetails.email}</p>}
              {data.address && <p className="flex items-start gap-3"><i className="fas fa-map-marker-alt text-indigo-400 mt-1"></i> {data.address}</p>}
            </div>
          </section>
        )}

        {(data.personalDetails.fatherName || data.personalDetails.dob || data.personalDetails.aadhar) && (
          <section>
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-1">Personal Info</h3>
            <div className="space-y-4 text-xs">
              {data.personalDetails.fatherName && <div><p className="text-slate-500 font-bold uppercase text-[9px]">Father's Name</p><p>{data.personalDetails.fatherName}</p></div>}
              {data.personalDetails.dob && <div><p className="text-slate-500 font-bold uppercase text-[9px]">DOB</p><p>{data.personalDetails.dob}</p></div>}
              {data.personalDetails.aadhar && <div><p className="text-slate-500 font-bold uppercase text-[9px]">Aadhar No</p><p>{data.personalDetails.aadhar}</p></div>}
              {data.personalDetails.maritalStatus && <div><p className="text-slate-500 font-bold uppercase text-[9px]">Status</p><p>{data.personalDetails.maritalStatus}</p></div>}
            </div>
          </section>
        )}

        {data.personalDetails.languages && (
          <section>
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-1">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {data.personalDetails.languages.split(',').filter(l => l.trim()).map((l, i) => (
                <span key={i} className="bg-slate-800 px-2 py-1 rounded text-[10px]">{l.trim()}</span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 bg-white flex flex-col">
        <header className="mb-10">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">BIO-DATA</h1>
          <div className="h-2 w-20 bg-indigo-600 mt-2"></div>
        </header>

        <div className="flex-1 overflow-hidden space-y-8">
          {data.personalDetails.careerObjective && (
            <section>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-indigo-600"></span> Objective
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm ml-11">{data.personalDetails.careerObjective}</p>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-indigo-600"></span> Education
              </h3>
              <div className="ml-11 space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="border-l-2 border-indigo-100 pl-4 py-1">
                    <p className="font-black text-slate-900">{edu.qualification}</p>
                    <p className="text-slate-500 text-xs font-bold uppercase">{edu.board} • {edu.year}</p>
                    <p className="text-indigo-600 text-[10px] font-black mt-1 uppercase">Result: {edu.division}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-indigo-600"></span> Technical Expertise
              </h3>
              <div className="ml-11 flex flex-wrap gap-2">
                {data.skills.filter(s => s.trim()).map((skill, i) => (
                  <span key={i} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.declaration && (
            <section>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-indigo-600"></span> Declaration
              </h3>
              <p className="text-slate-600 italic text-xs ml-11">{data.declaration}</p>
            </section>
          )}
        </div>

        <footer className="mt-auto pt-8 flex justify-between items-end border-t border-slate-100">
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             DATED: {data.date || currentDate}
           </div>
           <div className="text-center">
             <div className="w-24 h-px bg-slate-900 mb-2"></div>
             <p className="text-[10px] font-black uppercase text-slate-900">Signed</p>
           </div>
        </footer>
      </div>
    </div>
  );

  // --- TEMPLATE 4: PROFESSIONAL ---
  const ProfessionalTemplate = () => (
    <div className={`${wrapperClass} p-12 text-slate-800`}>
      {(data.name || data.contact || data.personalDetails.email) && (
        <div className="flex justify-between items-center mb-10 pb-6 border-b-4 border-slate-900">
          <div>
            {data.name && <h1 className="text-4xl font-black tracking-tight leading-none mb-2 uppercase">{data.name}</h1>}
            <div className="flex gap-4 text-xs font-bold text-slate-500 uppercase">
               {data.contact && <span><i className="fas fa-phone-alt mr-1"></i> {data.contact}</span>}
               {data.personalDetails.email && <span><i className="fas fa-envelope mr-1"></i> {data.personalDetails.email}</span>}
            </div>
          </div>
          {data.photoUrl && (
            <img src={data.photoUrl} className="w-24 h-24 object-cover rounded shadow-md border-2 border-white grayscale hover:grayscale-0 transition-all" />
          )}
        </div>
      )}

      <div className="flex-1 grid grid-cols-3 gap-12 overflow-hidden">
        <div className="col-span-2 space-y-8">
          {data.personalDetails.careerObjective && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 bg-slate-100 px-2 py-1 inline-block">Professional Summary</h2>
              <p className="text-sm leading-relaxed text-slate-600">{data.personalDetails.careerObjective}</p>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 bg-slate-100 px-2 py-1 inline-block">Academic Timeline</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-slate-900">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-slate-900">{edu.qualification}</h4>
                      <span className="text-[10px] font-black text-slate-400">{edu.year}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{edu.board}</p>
                    <p className="text-[10px] font-bold text-slate-900 mt-1 uppercase">Grade: {edu.division}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.declaration && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 bg-slate-100 px-2 py-1 inline-block">Declaration Statement</h2>
              <p className="text-sm italic text-slate-600 border-l-4 border-slate-900 pl-4 py-1">{data.declaration}</p>
            </section>
          )}
        </div>

        <div className="space-y-8">
           {data.skills.length > 0 && (
             <section>
                <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 mb-4">Core Skills</h2>
                <ul className="space-y-2">
                  {data.skills.filter(s => s.trim()).map((s, i) => (
                    <li key={i} className="text-xs flex items-center gap-2 font-bold text-slate-700">
                      <span className="w-1.5 h-1.5 bg-slate-400 rotate-45"></span> {s}
                    </li>
                  ))}
                </ul>
             </section>
           )}

           {(data.personalDetails.fatherName || data.personalDetails.dob || data.personalDetails.aadhar) && (
             <section>
                <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 mb-4">Background Info</h2>
                <div className="space-y-3 text-[11px]">
                   {data.personalDetails.fatherName && <div><p className="text-slate-400 font-bold uppercase text-[9px]">Father</p><p className="font-bold">{data.personalDetails.fatherName}</p></div>}
                   {data.personalDetails.dob && <div><p className="text-slate-400 font-bold uppercase text-[9px]">DOB</p><p className="font-bold">{data.personalDetails.dob}</p></div>}
                   {data.personalDetails.aadhar && <div><p className="text-slate-400 font-bold uppercase text-[9px]">Identity</p><p className="font-bold">Aadhar: {data.personalDetails.aadhar}</p></div>}
                   {data.personalDetails.languages && <div><p className="text-slate-400 font-bold uppercase text-[9px]">Languages</p><p className="font-bold">{data.personalDetails.languages}</p></div>}
                </div>
             </section>
           )}

           {data.personalDetails.hobbies && (
             <section>
                <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 mb-4">Interests</h2>
                <p className="text-xs font-bold text-slate-700">{data.personalDetails.hobbies}</p>
             </section>
           )}
        </div>
      </div>

      {(data.name || data.personalDetails.jobLocation || data.date) && (
        <footer className="mt-auto pt-8 flex justify-between items-end">
           <div className="text-[10px] font-bold text-slate-400">
             {data.date || currentDate} {data.personalDetails.jobLocation && `• ${data.personalDetails.jobLocation}`}
           </div>
           <div className="text-right">
              <div className="w-40 h-8 border-b-2 border-slate-900 mb-2"></div>
              <p className="text-[10px] font-black text-slate-900 uppercase">Authorised Signature</p>
           </div>
        </footer>
      )}
    </div>
  );

  switch (data.template) {
    case 'elegant': return <ElegantTemplate />;
    case 'modern': return <ModernTemplate />;
    case 'professional': return <ProfessionalTemplate />;
    case 'classic':
    default: return <ClassicTemplate />;
  }
};

export default ResumePreview;
