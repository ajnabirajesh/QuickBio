
import React from 'react';
import { ResumeData } from '../types';

interface Props {
  data: ResumeData;
}

const ResumePreview: React.FC<Props> = ({ data }) => {
  const currentDate = new Date().toLocaleDateString('en-GB');

  // --- TEMPLATE 1: CLASSIC ---
  const ClassicTemplate = () => (
    <div className="bg-white p-8 md:p-12 shadow-2xl mx-auto max-w-[210mm] min-h-[297mm] print-container border font-serif text-gray-900">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-widest border-b-2 border-black inline-block px-8 pb-1 uppercase">Resume</h1>
      </div>
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold uppercase mb-4">{data.name || "YOUR NAME"}</h2>
          <div className="space-y-1">
            <h3 className="font-bold underline">Permanent Address:-</h3>
            <p className="whitespace-pre-wrap leading-relaxed max-w-md">{data.address || "Address details..."}</p>
            <p className="font-bold mt-2">Contact No.:- {data.contact}</p>
          </div>
        </div>
        {data.photoUrl && (
          <div className="w-32 h-40 border-2 border-black flex-shrink-0 ml-4">
            <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
      <div className="w-full h-[1px] bg-black mb-8"></div>

      {data.workExperience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-bold underline mb-4">Work Experience:-</h3>
          <div className="space-y-4">
            {data.workExperience.map((work, idx) => (
              <div key={work.id}>
                <p className="font-bold">{String(idx + 1).padStart(2, '0')}. {work.jobTitle} at {work.company}</p>
                <p className="text-sm italic font-semibold ml-6">Duration: {work.duration}</p>
                <p className="ml-6 mt-1 whitespace-pre-wrap leading-tight">{work.responsibilities}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-bold underline mb-4">Professional Skills:-</h3>
          <p className="ml-4 font-medium italic">{data.skills.join(', ')}</p>
        </section>
      )}

      <section className="mb-8">
        <h3 className="text-xl font-bold underline mb-4">Education Qualification:-</h3>
        <table className="w-full border-collapse border border-black text-sm">
          <thead>
            <tr>
              <th className="border border-black p-2 w-12 text-center">S.No</th>
              <th className="border border-black p-2 text-left">Examination Qualification</th>
              <th className="border border-black p-2 text-left">Board/University</th>
              <th className="border border-black p-2 text-center w-20">Year</th>
              <th className="border border-black p-2 text-center w-20">Div.</th>
            </tr>
          </thead>
          <tbody>
            {data.education.map((edu, idx) => (
              <tr key={edu.id}>
                <td className="border border-black p-2 text-center">{idx + 1}</td>
                <td className="border border-black p-2">{edu.qualification}</td>
                <td className="border border-black p-2">{edu.board}</td>
                <td className="border border-black p-2 text-center">{edu.year}</td>
                <td className="border border-black p-2 text-center">{edu.division}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-bold underline mb-4">Personal Details:-</h3>
        <div className="space-y-2">
          {Object.entries({
            "Father's Name": data.personalDetails.fatherName,
            "Mother's Name": data.personalDetails.motherName,
            "Date of Birth": data.personalDetails.dob,
            "Marital Status": data.personalDetails.maritalStatus,
            "Nationality": data.personalDetails.nationality,
            "Language Known": data.personalDetails.languages,
            "Job Location": data.personalDetails.jobLocation
          }).map(([key, val]) => (
            <div className="flex" key={key}>
              <span className="w-40 font-semibold">{key}</span>
              <span className="mr-4">:</span>
              <span>{val}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h3 className="text-xl font-bold underline mb-4">Declaration:-</h3>
        <p className="indent-12 leading-relaxed italic">{data.declaration}</p>
      </section>
      <div className="mt-16 flex justify-between items-end">
        <div className="space-y-4">
          <p>Date: {currentDate}</p>
          <p>Place: .....................</p>
        </div>
        <div className="text-right">
          <div className="w-32 h-px border-b border-black"></div>
          <p className="mt-2 font-bold uppercase">Signature</p>
        </div>
      </div>
    </div>
  );

  // --- TEMPLATE 2: MODERN SIDEBAR ---
  const ModernTemplate = () => (
    <div className="bg-white mx-auto max-w-[210mm] min-h-[297mm] print-container shadow-2xl flex font-sans text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 bg-indigo-900 text-indigo-50 p-8 flex flex-col gap-8">
        <div className="text-center">
          {data.photoUrl ? (
            <img src={data.photoUrl} alt="Profile" className="w-32 h-32 rounded-full border-4 border-indigo-400 mx-auto object-cover mb-4" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-indigo-800 border-2 border-indigo-700 mx-auto flex items-center justify-center mb-4">
              <i className="fas fa-user text-4xl text-indigo-400"></i>
            </div>
          )}
          <h2 className="text-xl font-bold uppercase tracking-wide leading-tight">{data.name || "Name"}</h2>
        </div>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Contact</h3>
            <div className="text-sm space-y-2">
              <p className="flex items-center gap-2"><i className="fas fa-phone text-indigo-400"></i> {data.contact}</p>
              <p className="flex items-start gap-2 leading-tight"><i className="fas fa-map-marker-alt text-indigo-400 mt-1"></i> {data.address}</p>
            </div>
          </section>

          {data.skills.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="bg-indigo-800 text-indigo-100 px-2 py-1 rounded text-[10px] font-bold uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Bio-Details</h3>
            <div className="text-sm space-y-3">
              <div><p className="text-xs text-indigo-400 font-bold uppercase">DOB</p><p>{data.personalDetails.dob}</p></div>
              <div><p className="text-xs text-indigo-400 font-bold uppercase">Status</p><p>{data.personalDetails.maritalStatus}</p></div>
              <div><p className="text-xs text-indigo-400 font-bold uppercase">Languages</p><p>{data.personalDetails.languages}</p></div>
              <div><p className="text-xs text-indigo-400 font-bold uppercase">Nationality</p><p>{data.personalDetails.nationality}</p></div>
            </div>
          </section>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-50 flex flex-col">
        <header className="mb-10 border-b-4 border-indigo-900 pb-4">
          <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">RESUME</h1>
        </header>

        {data.workExperience.length > 0 && (
          <section className="mb-10">
            <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-4 border-l-4 border-indigo-900 pl-3">
              <i className="fas fa-briefcase mr-1"></i> WORK EXPERIENCE
            </h3>
            <div className="space-y-4">
              {data.workExperience.map((work) => (
                <div key={work.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="font-bold text-indigo-900 text-lg">{work.jobTitle}</p>
                  <p className="font-semibold text-gray-700">{work.company}</p>
                  <p className="text-xs text-indigo-600 font-bold mb-2">{work.duration}</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{work.responsibilities}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-10">
          <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-4 border-l-4 border-indigo-900 pl-3">
            <i className="fas fa-graduation-cap mr-1"></i> EDUCATION
          </h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="font-bold text-indigo-900">{edu.qualification}</p>
                <p className="text-sm text-gray-600 font-medium">{edu.board}</p>
                <div className="flex justify-between mt-2 text-xs font-bold text-indigo-600 uppercase">
                  <span>Year: {edu.year}</span>
                  <span>Division: {edu.division}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-4 border-l-4 border-indigo-900 pl-3">
            <i className="fas fa-id-card mr-1"></i> PERSONAL INFO
          </h3>
          <div className="grid grid-cols-1 gap-y-3 text-sm">
            <div className="flex"><span className="w-32 font-bold text-indigo-900 uppercase text-[10px]">Father:</span> <span>{data.personalDetails.fatherName}</span></div>
            <div className="flex"><span className="w-32 font-bold text-indigo-900 uppercase text-[10px]">Mother:</span> <span>{data.personalDetails.motherName}</span></div>
            <div className="flex"><span className="w-32 font-bold text-indigo-900 uppercase text-[10px]">Location:</span> <span>{data.personalDetails.jobLocation}</span></div>
          </div>
        </section>

        <section className="mt-auto">
          <h3 className="text-lg font-bold text-indigo-900 mb-3 border-t pt-4">DECLARATION</h3>
          <p className="text-sm italic text-gray-600 leading-relaxed">
            {data.declaration}
          </p>
        </section>

        <div className="mt-12 flex justify-between items-end text-xs text-gray-500">
           <div>Date: {currentDate}</div>
           <div className="text-center">
              <div className="w-24 h-px border-b-2 border-indigo-900 mb-2 mx-auto"></div>
              <p className="font-bold text-indigo-900 uppercase tracking-widest">Signature</p>
           </div>
        </div>
      </div>
    </div>
  );

  // --- TEMPLATE 3: PROFESSIONAL GRID ---
  const ProfessionalTemplate = () => (
    <div className="bg-white p-12 mx-auto max-w-[210mm] min-h-[297mm] print-container shadow-2xl font-sans text-slate-800">
      <div className="flex items-center justify-between border-b-8 border-slate-800 pb-8 mb-8">
        <div>
          <h1 className="text-5xl font-black text-slate-800 tracking-tighter mb-2 uppercase leading-none">{data.name || "YOUR NAME"}</h1>
          <div className="flex gap-4 text-slate-500 font-bold uppercase text-xs">
             <span><i className="fas fa-phone mr-1"></i> {data.contact}</span>
             <span><i className="fas fa-map-marker-alt mr-1"></i> {data.address}</span>
          </div>
        </div>
        {data.photoUrl && (
          <img src={data.photoUrl} className="w-28 h-28 object-cover rounded-xl shadow-lg border-4 border-slate-100" />
        )}
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-10">
          
          {data.workExperience.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 mb-4 flex items-center gap-2">
                <i className="fas fa-briefcase text-slate-400"></i> Experience
              </h2>
              <div className="space-y-6">
                {data.workExperience.map((work) => (
                  <div key={work.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-black text-lg text-slate-800 uppercase">{work.jobTitle}</h4>
                      <span className="text-xs font-bold text-slate-400 uppercase">{work.duration}</span>
                    </div>
                    <p className="text-slate-500 font-bold mb-2">{work.company}</p>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{work.responsibilities}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 mb-4 flex items-center gap-2">
              <i className="fas fa-graduation-cap text-slate-400"></i> Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-black text-lg text-slate-800 uppercase">{edu.qualification}</h4>
                  <p className="text-slate-600 font-medium">{edu.board}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="bg-slate-800 px-3 py-1 rounded text-[10px] font-black text-white uppercase tracking-wider">Class of {edu.year}</span>
                    <span className="bg-slate-100 px-3 py-1 rounded text-[10px] font-black text-slate-600 uppercase tracking-wider">Div: {edu.division}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 mb-4 flex items-center gap-2">
              <i className="fas fa-bullhorn text-slate-400"></i> Declaration
            </h2>
            <p className="text-slate-600 italic leading-relaxed text-sm p-4 bg-slate-50 rounded-lg">{data.declaration}</p>
          </section>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 mb-4">
              Personal
            </h2>
            <div className="space-y-5 text-sm">
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Parents</p>
                  <p className="font-bold text-slate-700">{data.personalDetails.fatherName} (F)</p>
                  <p className="font-bold text-slate-700">{data.personalDetails.motherName} (M)</p>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Birthday</p>
                  <p className="font-bold text-slate-700">{data.personalDetails.dob}</p>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Languages</p>
                  <p className="font-bold text-slate-700">{data.personalDetails.languages}</p>
               </div>
               {data.skills.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Expertise</p>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
               )}
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Preference</p>
                  <p className="font-bold text-slate-700">{data.personalDetails.jobLocation}</p>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="font-bold text-slate-700">{data.personalDetails.maritalStatus}</p>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nationality</p>
                  <p className="font-bold text-slate-700">{data.personalDetails.nationality}</p>
               </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-20 flex justify-between items-center py-8 border-t-4 border-slate-800">
         <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
            Document ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
         </div>
         <div className="text-right">
            <div className="w-40 h-10 border-b-2 border-slate-800 mb-2 ml-auto"></div>
            <p className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">Authorized Signature</p>
         </div>
      </div>
    </div>
  );

  switch (data.template) {
    case 'modern': return <ModernTemplate />;
    case 'professional': return <ProfessionalTemplate />;
    case 'classic':
    default: return <ClassicTemplate />;
  }
};

export default ResumePreview;
