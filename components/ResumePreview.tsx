
import React from 'react';
import { ResumeData } from '../types';

interface Props {
  data: ResumeData;
}

const ResumePreview: React.FC<Props> = ({ data }) => {
  const currentDate = new Date().toLocaleDateString('en-GB');

  // Common wrapper styles
  const wrapperClass = "bg-white shadow-2xl mx-auto w-[210mm] h-[296.5mm] print-container border font-sans text-gray-900 overflow-hidden box-border flex flex-col";

  // --- TEMPLATE 1: ELEGANT ---
  const ElegantTemplate = () => (
    <div className={`${wrapperClass} p-12`}>
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
            {data.personalDetails.aadhar && <p>Aadhar No: {data.personalDetails.aadhar}</p>}
          </div>
        </div>
        {data.photoUrl && (
          <div className="w-32 h-40 border-2 border-gray-200 shadow-[8px_8px_0px_rgba(30,58,138,0.2)] ml-4 flex-shrink-0">
            <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="flex-1 overflow-hidden">
        {data.personalDetails.careerObjective && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-800 mb-1 uppercase tracking-tight border-b border-blue-100">Career Objective</h3>
            <p className="text-[14px] leading-relaxed text-gray-800 py-2">{data.personalDetails.careerObjective}</p>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-800 mb-2 uppercase tracking-tight border-b border-blue-100">Technical Skills</h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {data.skills.filter(s => s.trim()).map((skill, idx) => (
                <span key={idx} className="bg-blue-50 text-blue-800 px-3 py-1 rounded text-[12px] font-bold border border-blue-100">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {data.workExperience.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-800 mb-3 uppercase tracking-tight border-b border-blue-100">Work Experience</h3>
            <div className="space-y-4 pt-1">
              {data.workExperience.map((work) => (
                <div key={work.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-[14px] text-blue-900">{work.jobTitle}</h4>
                    <span className="text-[12px] italic text-gray-600 font-medium">{work.duration}</span>
                  </div>
                  <p className="text-[13px] font-bold text-gray-700">{work.company}</p>
                  <p className="text-[12px] text-gray-600 mt-1 whitespace-pre-wrap">{work.responsibilities}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-800 mb-3 uppercase tracking-tight border-b border-blue-100">Education</h3>
            <table className="w-full border-collapse text-[13px] mt-2">
              <thead>
                <tr className="border border-blue-100 bg-blue-50 text-blue-900">
                  <th className="p-2 text-left border border-blue-100">Qualification</th>
                  <th className="p-2 text-left border border-blue-100 w-20">Year</th>
                  <th className="p-2 text-left border border-blue-100">Board/University</th>
                  <th className="p-2 text-left border border-blue-100 w-24">Result</th>
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

        <div className="grid grid-cols-2 gap-8 mb-6">
          {(data.personalDetails.fatherName || data.personalDetails.dob || data.personalDetails.maritalStatus || data.personalDetails.languages || data.personalDetails.hobbies) && (
            <section className="col-span-2">
              <h3 className="text-lg font-bold text-blue-800 mb-2 uppercase tracking-tight border-b border-blue-100">Personal Info</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[13px] pt-1">
                {data.personalDetails.fatherName && <p><span className="font-bold">Father:</span> {data.personalDetails.fatherName}</p>}
                {data.personalDetails.dob && <p><span className="font-bold">DOB:</span> {data.personalDetails.dob}</p>}
                {data.personalDetails.maritalStatus && <p><span className="font-bold">Status:</span> {data.personalDetails.maritalStatus}</p>}
                {data.personalDetails.aadhar && <p><span className="font-bold">Aadhar:</span> {data.personalDetails.aadhar}</p>}
                {data.personalDetails.languages && <p className="col-span-2"><span className="font-bold">Languages:</span> {data.personalDetails.languages}</p>}
                {data.personalDetails.hobbies && <p className="col-span-2"><span className="font-bold">Hobbies:</span> {data.personalDetails.hobbies}</p>}
              </div>
            </section>
          )}
        </div>

        {data.declaration && (
          <section className="mt-4 mb-6">
            <h3 className="text-lg font-bold text-blue-800 mb-1 uppercase tracking-tight border-b border-blue-100">Declaration</h3>
            <p className="text-[13px] leading-relaxed text-gray-700 italic pt-2">{data.declaration}</p>
          </section>
        )}
      </div>

      <footer className="mt-auto pt-4 flex justify-between items-end text-[13px]">
        <div className="space-y-1">
          <p><span className="font-bold">Date:</span> {data.date || currentDate}</p>
          {data.personalDetails.jobLocation && <p><span className="font-bold">Place:</span> {data.personalDetails.jobLocation}</p>}
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">{data.name}</p>
          <div className="w-32 h-px bg-blue-900 ml-auto mt-6"></div>
          <p className="text-[10px] mt-1 text-blue-900 font-bold uppercase">Signature</p>
        </div>
      </footer>
    </div>
  );

  // --- TEMPLATE 2: CLASSIC ---
  const ClassicTemplate = () => (
    <div className={`${wrapperClass} p-10 font-serif`}>
      <div className="text-center mb-8 border-b-2 border-black pb-2">
        <h1 className="text-3xl font-bold uppercase tracking-widest">BIO-DATA</h1>
      </div>
      
      <div className="flex justify-between mb-8">
        <div>
          {data.name && <h2 className="text-2xl font-bold uppercase mb-4">{data.name}</h2>}
          <div className="space-y-1 text-sm">
            {data.address && <p><strong>Address:</strong> {data.address}</p>}
            {data.contact && <p><strong>Contact:</strong> {data.contact}</p>}
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
        {data.personalDetails.careerObjective && (
          <section>
            <h3 className="text-lg font-bold underline mb-1 uppercase">Objective:</h3>
            <p className="text-sm leading-relaxed text-gray-800">{data.personalDetails.careerObjective}</p>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <h3 className="text-lg font-bold underline mb-2 uppercase">Key Skills:</h3>
            <ul className="list-disc ml-8 text-sm">
              {data.skills.filter(s => s.trim()).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </section>
        )}

        {data.workExperience.length > 0 && (
          <section>
            <h3 className="text-lg font-bold underline mb-2 uppercase">Professional Experience:</h3>
            <div className="space-y-3">
              {data.workExperience.map(work => (
                <div key={work.id}>
                  <p className="text-sm"><strong>{work.jobTitle}</strong> at <strong>{work.company}</strong> ({work.duration})</p>
                  <p className="text-xs italic text-gray-700 ml-2">{work.responsibilities}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <h3 className="text-lg font-bold underline mb-2 uppercase">Education:</h3>
            <table className="w-full border border-black text-sm text-center">
              <thead>
                <tr className="bg-gray-100 font-bold">
                  <th className="border border-black p-1">Qualification</th>
                  <th className="border border-black p-1">Board/Uni</th>
                  <th className="border border-black p-1">Year</th>
                  <th className="border border-black p-1">%.</th>
                </tr>
              </thead>
              <tbody>
                {data.education.map(edu => (
                  <tr key={edu.id}>
                    <td className="border border-black p-1 font-bold">{edu.qualification}</td>
                    <td className="border border-black p-1">{edu.board}</td>
                    <td className="border border-black p-1">{edu.year}</td>
                    <td className="border border-black p-1">{edu.division}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {(data.personalDetails.fatherName || data.personalDetails.dob || data.personalDetails.aadhar || data.personalDetails.languages || data.personalDetails.hobbies) && (
          <section>
            <h3 className="text-lg font-bold underline mb-2 uppercase">Personal Details:</h3>
            <div className="space-y-1 text-sm ml-4">
               {data.personalDetails.fatherName && <p><strong>Father's Name:</strong> {data.personalDetails.fatherName}</p>}
               {data.personalDetails.dob && <p><strong>Date of Birth:</strong> {data.personalDetails.dob}</p>}
               {data.personalDetails.maritalStatus && <p><strong>Marital Status:</strong> {data.personalDetails.maritalStatus}</p>}
               {data.personalDetails.aadhar && <p><strong>Aadhar No:</strong> {data.personalDetails.aadhar}</p>}
               {data.personalDetails.languages && <p><strong>Languages:</strong> {data.personalDetails.languages}</p>}
               {data.personalDetails.hobbies && <p><strong>Hobbies:</strong> {data.personalDetails.hobbies}</p>}
            </div>
          </section>
        )}

        {data.declaration && (
          <section>
            <h3 className="text-lg font-bold underline mb-2 uppercase">Declaration:</h3>
            <p className="text-sm italic ml-4">{data.declaration}</p>
          </section>
        )}
      </div>

      <footer className="mt-auto pt-10 flex justify-between text-sm">
        <div className="space-y-1">
          <p><strong>Date:</strong> {data.date || currentDate}</p>
          <p><strong>Place:</strong> {data.personalDetails.jobLocation || "N/A"}</p>
        </div>
        <div className="text-center">
          <div className="w-32 border-b border-black mb-1"></div>
          <p className="font-bold uppercase">Signature</p>
        </div>
      </footer>
    </div>
  );

  // --- TEMPLATE 3: MODERN ---
  const ModernTemplate = () => (
    <div className="bg-white mx-auto w-[210mm] h-[296.5mm] print-container shadow-2xl flex font-sans text-gray-800 overflow-hidden box-border">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-900 text-slate-100 p-8 flex flex-col gap-8">
        <div className="text-center">
          {data.photoUrl ? (
            <img src={data.photoUrl} className="w-32 h-32 rounded-full border-4 border-slate-700 mx-auto object-cover mb-4" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 border-2 border-slate-700 text-4xl text-slate-600">
              <i className="fas fa-user"></i>
            </div>
          )}
          <h2 className="text-xl font-black uppercase tracking-tight">{data.name || "Candidate Name"}</h2>
          <p className="text-slate-400 text-xs mt-1 uppercase font-bold tracking-widest">Professional</p>
        </div>

        <section>
          <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-1">Contact</h3>
          <div className="space-y-3 text-xs">
            {data.contact && <p className="flex items-center gap-3"><i className="fas fa-phone text-indigo-400"></i> {data.contact}</p>}
            {data.personalDetails.email && <p className="flex items-center gap-3"><i className="fas fa-envelope text-indigo-400"></i> {data.personalDetails.email}</p>}
            {data.address && <p className="flex items-start gap-3"><i className="fas fa-map-marker-alt text-indigo-400 mt-1"></i> {data.address}</p>}
          </div>
        </section>

        {data.skills.length > 0 && (
          <section>
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-1">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.filter(s => s.trim()).map((s, i) => (
                <span key={i} className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-[10px] font-bold border border-slate-700">{s}</span>
              ))}
            </div>
          </section>
        )}

        {(data.personalDetails.fatherName || data.personalDetails.dob || data.personalDetails.aadhar || data.personalDetails.languages) && (
          <section>
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-1">Personal</h3>
            <div className="space-y-3 text-xs">
              {data.personalDetails.fatherName && <div><p className="text-slate-500 uppercase text-[9px]">Father</p><p>{data.personalDetails.fatherName}</p></div>}
              {data.personalDetails.dob && <div><p className="text-slate-500 uppercase text-[9px]">DOB</p><p>{data.personalDetails.dob}</p></div>}
              {data.personalDetails.aadhar && <div><p className="text-slate-500 uppercase text-[9px]">Aadhar No</p><p>{data.personalDetails.aadhar}</p></div>}
              {data.personalDetails.maritalStatus && <div><p className="text-slate-500 uppercase text-[9px]">Status</p><p>{data.personalDetails.maritalStatus}</p></div>}
              {data.personalDetails.languages && <div><p className="text-slate-500 uppercase text-[9px]">Languages</p><p>{data.personalDetails.languages}</p></div>}
            </div>
          </section>
        )}

        {data.personalDetails.hobbies && (
          <section>
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-1">Interests</h3>
            <p className="text-xs text-slate-300">{data.personalDetails.hobbies}</p>
          </section>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 bg-white flex flex-col">
        <header className="mb-8">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">RESUME</h1>
          <div className="h-2 w-16 bg-indigo-600 mt-2"></div>
        </header>

        <div className="flex-1 overflow-hidden space-y-8">
          {data.personalDetails.careerObjective && (
            <section>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-3">
                <span className="w-6 h-px bg-indigo-600"></span> Profile
              </h3>
              <p className="text-slate-600 text-sm ml-9">{data.personalDetails.careerObjective}</p>
            </section>
          )}

          {data.workExperience.length > 0 && (
            <section>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-3">
                <span className="w-6 h-px bg-indigo-600"></span> Experience
              </h3>
              <div className="ml-9 space-y-4">
                {data.workExperience.map(work => (
                  <div key={work.id} className="relative before:absolute before:-left-4 before:top-2 before:w-1.5 before:h-1.5 before:bg-indigo-600 before:rounded-full">
                    <div className="flex justify-between items-baseline">
                      <p className="font-black text-slate-900">{work.jobTitle}</p>
                      <span className="text-[10px] font-bold text-slate-400">{work.duration}</span>
                    </div>
                    <p className="text-slate-500 text-xs font-bold">{work.company}</p>
                    <p className="text-slate-600 text-xs mt-1">{work.responsibilities}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-3">
                <span className="w-6 h-px bg-indigo-600"></span> Education
              </h3>
              <div className="ml-9 space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="border-l-2 border-indigo-100 pl-4">
                    <p className="font-black text-slate-900">{edu.qualification}</p>
                    <p className="text-slate-500 text-xs">{edu.board} • {edu.year}</p>
                    <p className="text-indigo-600 text-[10px] font-bold mt-1">Result: {edu.division}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.declaration && (
            <section>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-3">
                <span className="w-6 h-px bg-indigo-600"></span> Declaration
              </h3>
              <p className="text-slate-600 italic text-xs ml-9 leading-relaxed">{data.declaration}</p>
            </section>
          )}
        </div>

        <footer className="mt-auto pt-6 flex justify-between items-end border-t border-slate-100">
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             DATE: {data.date || currentDate}
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
      <div className="flex justify-between items-center mb-10 pb-6 border-b-4 border-slate-900">
        <div>
          {data.name && <h1 className="text-4xl font-black tracking-tight leading-none mb-2 uppercase">{data.name}</h1>}
          <div className="flex gap-4 text-xs font-bold text-slate-500 uppercase">
             {data.contact && <span><i className="fas fa-phone-alt mr-1"></i> {data.contact}</span>}
             {data.personalDetails.email && <span><i className="fas fa-envelope mr-1"></i> {data.personalDetails.email}</span>}
          </div>
        </div>
        {data.photoUrl && (
          <img src={data.photoUrl} className="w-24 h-24 object-cover rounded shadow-md border-2 border-white" />
        )}
      </div>

      <div className="flex-1 grid grid-cols-3 gap-12 overflow-hidden">
        <div className="col-span-2 space-y-8">
          {data.personalDetails.careerObjective && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-3 bg-slate-100 px-2 py-1 inline-block">Objective</h2>
              <p className="text-sm leading-relaxed text-slate-600">{data.personalDetails.careerObjective}</p>
            </section>
          )}

          {data.workExperience.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 bg-slate-100 px-2 py-1 inline-block">Experience</h2>
              <div className="space-y-6">
                {data.workExperience.map(work => (
                  <div key={work.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-slate-900 uppercase text-sm">{work.jobTitle}</h4>
                      <span className="text-[10px] font-black text-slate-400">{work.duration}</span>
                    </div>
                    <p className="text-xs text-indigo-600 font-bold mb-1">{work.company}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{work.responsibilities}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 bg-slate-100 px-2 py-1 inline-block">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="relative pl-6 border-l-2 border-slate-200">
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
        </div>

        <div className="space-y-8">
           {(data.personalDetails.fatherName || data.personalDetails.dob || data.personalDetails.aadhar || data.personalDetails.languages) && (
             <section>
                <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 mb-4">Background</h2>
                <div className="space-y-3 text-[11px]">
                   {data.personalDetails.fatherName && <div><p className="text-slate-400 font-bold uppercase text-[9px]">Father</p><p className="font-bold">{data.personalDetails.fatherName}</p></div>}
                   {data.personalDetails.dob && <div><p className="text-slate-400 font-bold uppercase text-[9px]">DOB</p><p className="font-bold">{data.personalDetails.dob}</p></div>}
                   {data.personalDetails.aadhar && <div><p className="text-slate-400 font-bold uppercase text-[9px]">Aadhar No</p><p className="font-bold">{data.personalDetails.aadhar}</p></div>}
                   {data.personalDetails.maritalStatus && <div><p className="text-slate-400 font-bold uppercase text-[9px]">Status</p><p className="font-bold">{data.personalDetails.maritalStatus}</p></div>}
                   {data.personalDetails.languages && <div><p className="text-slate-400 font-bold uppercase text-[9px]">Languages</p><p className="font-bold">{data.personalDetails.languages}</p></div>}
                </div>
             </section>
           )}

           {data.skills.length > 0 && (
             <section>
                <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 mb-4">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.filter(s => s.trim()).map((s, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-900 text-white font-bold uppercase tracking-tighter rounded">{s}</span>
                  ))}
                </div>
             </section>
           )}

           {data.personalDetails.hobbies && (
             <section>
                <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 mb-4">Hobbies</h2>
                <p className="text-[11px] font-bold text-slate-700">{data.personalDetails.hobbies}</p>
             </section>
           )}
        </div>
      </div>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <h2 className="text-xs font-black uppercase text-slate-900 mb-2">Declaration</h2>
        <p className="text-xs italic text-slate-600 leading-relaxed">{data.declaration || "I hereby declare that all the information given above is true and correct to the best of my knowledge and belief."}</p>
      </div>

      <footer className="mt-auto pt-8 flex justify-between items-end">
         <div className="text-[10px] font-bold text-slate-400">
           {data.date || currentDate} {data.personalDetails.jobLocation && `• ${data.personalDetails.jobLocation}`}
         </div>
         <div className="text-right">
            <div className="w-40 h-px bg-slate-900 mb-2"></div>
            <p className="text-[10px] font-black text-slate-900 uppercase">Authorised Signatory</p>
         </div>
      </footer>
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
