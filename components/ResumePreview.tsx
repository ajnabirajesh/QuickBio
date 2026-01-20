
import React from 'react';
import { ResumeData } from '../types';

interface Props {
  data: ResumeData;
}

const ResumePreview: React.FC<Props> = ({ data }) => {
  const currentDate = new Date().toLocaleDateString('en-GB');

  // --- TEMPLATE 1: CLASSIC ---
  const ClassicTemplate = () => (
    <div className="bg-white p-6 md:p-10 shadow-2xl mx-auto w-[210mm] min-h-[296mm] print-container border font-serif text-gray-900 overflow-hidden box-border">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-widest border-b-2 border-black inline-block px-6 pb-1 uppercase">Resume</h1>
      </div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold uppercase mb-2">{data.name || "YOUR NAME"}</h2>
          <div className="space-y-1 text-sm">
            <h3 className="font-bold underline">Permanent Address:-</h3>
            <p className="whitespace-pre-wrap leading-tight max-w-md">{data.address || "Address details..."}</p>
            <p className="font-bold mt-1">Contact No.:- {data.contact}</p>
          </div>
        </div>
        {data.photoUrl && (
          <div className="w-28 h-36 border-2 border-black flex-shrink-0 ml-4 overflow-hidden">
            <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
      <div className="w-full h-[1px] bg-black mb-6"></div>

      {data.workExperience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold underline mb-3">Work Experience:-</h3>
          <div className="space-y-3">
            {data.workExperience.map((work, idx) => (
              <div key={work.id} className="text-sm">
                <p className="font-bold">{String(idx + 1).padStart(2, '0')}. {work.jobTitle} at {work.company}</p>
                <p className="italic font-semibold ml-6 text-[12px]">Duration: {work.duration}</p>
                <p className="ml-6 mt-0.5 whitespace-pre-wrap leading-tight">{work.responsibilities}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold underline mb-2">Professional Skills:-</h3>
          <p className="ml-4 font-medium italic text-sm">{data.skills.join(', ')}</p>
        </section>
      )}

      <section className="mb-6">
        <h3 className="text-lg font-bold underline mb-3">Education Qualification:-</h3>
        <table className="w-full border-collapse border border-black text-[12px]">
          <thead>
            <tr>
              <th className="border border-black p-1.5 w-10 text-center">S.No</th>
              <th className="border border-black p-1.5 text-left">Examination Qualification</th>
              <th className="border border-black p-1.5 text-left">Board/University</th>
              <th className="border border-black p-1.5 text-center w-16">Year</th>
              <th className="border border-black p-1.5 text-center w-16">Div.</th>
            </tr>
          </thead>
          <tbody>
            {data.education.map((edu, idx) => (
              <tr key={edu.id}>
                <td className="border border-black p-1.5 text-center">{idx + 1}</td>
                <td className="border border-black p-1.5">{edu.qualification}</td>
                <td className="border border-black p-1.5">{edu.board}</td>
                <td className="border border-black p-1.5 text-center">{edu.year}</td>
                <td className="border border-black p-1.5 text-center">{edu.division}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      <section className="mb-6">
        <h3 className="text-lg font-bold underline mb-3">Personal Details:-</h3>
        <div className="space-y-1.5 text-sm">
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
              <span className="w-36 font-semibold">{key}</span>
              <span className="mr-3">:</span>
              <span>{val}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-8">
        <h3 className="text-lg font-bold underline mb-3">Declaration:-</h3>
        <p className="indent-8 leading-snug italic text-sm">{data.declaration}</p>
      </section>
      <div className="mt-auto pt-10 flex justify-between items-end text-sm">
        <div className="space-y-3">
          <p>Date: {currentDate}</p>
          <p>Place: .....................</p>
        </div>
        <div className="text-right">
          <div className="w-28 h-px border-b border-black"></div>
          <p className="mt-1 font-bold uppercase text-xs">Signature</p>
        </div>
      </div>
    </div>
  );

  // --- TEMPLATE 2: MODERN SIDEBAR ---
  const ModernTemplate = () => (
    <div className="bg-white mx-auto w-[210mm] min-h-[296mm] print-container shadow-2xl flex font-sans text-gray-800 overflow-hidden box-border">
      {/* Sidebar */}
      <div className="w-1/3 bg-indigo-900 text-indigo-50 p-6 flex flex-col gap-6">
        <div className="text-center">
          {data.photoUrl ? (
            <img src={data.photoUrl} alt="Profile" className="w-28 h-28 rounded-full border-4 border-indigo-400 mx-auto object-cover mb-3" />
          ) : (
            <div className="w-28 h-28 rounded-full bg-indigo-800 border-2 border-indigo-700 mx-auto flex items-center justify-center mb-3">
              <i className="fas fa-user text-3xl text-indigo-400"></i>
            </div>
          )}
          <h2 className="text-lg font-bold uppercase tracking-wide leading-tight px-1">{data.name || "Name"}</h2>
        </div>
        
        <div className="space-y-5">
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2 border-b border-indigo-800 pb-1">Contact</h3>
            <div className="text-[12px] space-y-1.5">
              <p className="flex items-center gap-2"><i className="fas fa-phone text-indigo-400 w-3"></i> {data.contact}</p>
              <p className="flex items-start gap-2 leading-tight"><i className="fas fa-map-marker-alt text-indigo-400 w-3 mt-1"></i> {data.address}</p>
            </div>
          </section>

          {data.skills.length > 0 && (
            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2 border-b border-indigo-800 pb-1">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="bg-indigo-800 text-indigo-100 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2 border-b border-indigo-800 pb-1">Bio-Details</h3>
            <div className="text-[11px] space-y-2.5">
              <div><p className="text-[9px] text-indigo-400 font-bold uppercase">DOB</p><p>{data.personalDetails.dob}</p></div>
              <div><p className="text-[9px] text-indigo-400 font-bold uppercase">Status</p><p>{data.personalDetails.maritalStatus}</p></div>
              <div><p className="text-[9px] text-indigo-400 font-bold uppercase">Nationality</p><p>{data.personalDetails.nationality}</p></div>
              <div><p className="text-[9px] text-indigo-400 font-bold uppercase">Languages</p><p>{data.personalDetails.languages}</p></div>
            </div>
          </section>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50 flex flex-col box-border">
        <header className="mb-6 border-b-2 border-indigo-900 pb-2">
          <h1 className="text-3xl font-black text-indigo-900 tracking-tight">RESUME</h1>
        </header>

        {data.workExperience.length > 0 && (
          <section className="mb-6">
            <h3 className="text-md font-bold text-indigo-900 flex items-center gap-2 mb-3 border-l-4 border-indigo-900 pl-2">
              <i className="fas fa-briefcase text-[12px]"></i> WORK EXPERIENCE
            </h3>
            <div className="space-y-3">
              {data.workExperience.map((work) => (
                <div key={work.id} className="bg-white p-3 rounded shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-indigo-900 text-[14px]">{work.jobTitle}</p>
                    <p className="text-[10px] text-indigo-600 font-bold">{work.duration}</p>
                  </div>
                  <p className="font-semibold text-gray-700 text-[12px]">{work.company}</p>
                  <p className="text-[11px] text-gray-600 whitespace-pre-wrap mt-1 leading-tight">{work.responsibilities}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-6">
          <h3 className="text-md font-bold text-indigo-900 flex items-center gap-2 mb-3 border-l-4 border-indigo-900 pl-2">
            <i className="fas fa-graduation-cap text-[12px]"></i> EDUCATION
          </h3>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-white p-3 rounded shadow-sm border border-gray-100">
                <p className="font-bold text-indigo-900 text-[13px]">{edu.qualification}</p>
                <p className="text-[11px] text-gray-600 font-medium">{edu.board}</p>
                <div className="flex justify-between mt-1 text-[10px] font-bold text-indigo-600 uppercase">
                  <span>Year: {edu.year}</span>
                  <span>Division: {edu.division}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h3 className="text-md font-bold text-indigo-900 flex items-center gap-2 mb-3 border-l-4 border-indigo-900 pl-2">
            <i className="fas fa-id-card text-[12px]"></i> PERSONAL INFO
          </h3>
          <div className="grid grid-cols-1 gap-y-2 text-[12px]">
            <div className="flex"><span className="w-24 font-bold text-indigo-900 uppercase text-[9px]">Father:</span> <span>{data.personalDetails.fatherName}</span></div>
            <div className="flex"><span className="w-24 font-bold text-indigo-900 uppercase text-[9px]">Mother:</span> <span>{data.personalDetails.motherName}</span></div>
            <div className="flex"><span className="w-24 font-bold text-indigo-900 uppercase text-[9px]">Location:</span> <span>{data.personalDetails.jobLocation}</span></div>
          </div>
        </section>

        <section className="mt-auto border-t pt-4">
          <h3 className="text-xs font-bold text-indigo-900 mb-1.5">DECLARATION</h3>
          <p className="text-[11px] italic text-gray-600 leading-tight">
            {data.declaration}
          </p>
        </section>

        <div className="mt-6 flex justify-between items-end text-[10px] text-gray-500">
           <div>Date: {currentDate}</div>
           <div className="text-center">
              <div className="w-20 h-px border-b border-indigo-900 mb-1 mx-auto"></div>
              <p className="font-bold text-indigo-900 uppercase tracking-widest text-[9px]">Signature</p>
           </div>
        </div>
      </div>
    </div>
  );

  // --- TEMPLATE 3: PROFESSIONAL GRID ---
  const ProfessionalTemplate = () => (
    <div className="bg-white p-10 mx-auto w-[210mm] min-h-[296mm] print-container shadow-2xl font-sans text-slate-800 overflow-hidden box-border">
      <div className="flex items-center justify-between border-b-4 border-slate-800 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter mb-1 uppercase leading-none">{data.name || "YOUR NAME"}</h1>
          <div className="flex gap-4 text-slate-500 font-bold uppercase text-[10px]">
             <span><i className="fas fa-phone mr-1"></i> {data.contact}</span>
             <span><i className="fas fa-map-marker-alt mr-1"></i> {data.address}</span>
          </div>
        </div>
        {data.photoUrl && (
          <img src={data.photoUrl} className="w-24 h-24 object-cover rounded shadow-md border-2 border-slate-100" />
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          
          {data.workExperience.length > 0 && (
            <section>
              <h2 className="text-md font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 mb-3 flex items-center gap-2">
                <i className="fas fa-briefcase text-slate-400 text-xs"></i> Experience
              </h2>
              <div className="space-y-4">
                {data.workExperience.map((work) => (
                  <div key={work.id}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-black text-[14px] text-slate-800 uppercase">{work.jobTitle}</h4>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">{work.duration}</span>
                    </div>
                    <p className="text-slate-500 font-bold text-[11px] mb-1">{work.company}</p>
                    <p className="text-slate-600 leading-tight whitespace-pre-wrap text-[11px]">{work.responsibilities}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-md font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 mb-3 flex items-center gap-2">
              <i className="fas fa-graduation-cap text-slate-400 text-xs"></i> Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-black text-[13px] text-slate-800 uppercase">{edu.qualification}</h4>
                  <p className="text-slate-600 font-medium text-[11px]">{edu.board}</p>
                  <div className="flex gap-3 mt-1.5">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[8px] font-black text-white uppercase">Class of {edu.year}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[8px] font-black text-slate-600 uppercase">Div: {edu.division}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-md font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 mb-3 flex items-center gap-2">
              <i className="fas fa-bullhorn text-slate-400 text-xs"></i> Declaration
            </h2>
            <p className="text-slate-600 italic leading-tight text-[11px] p-3 bg-slate-50 rounded">{data.declaration}</p>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 mb-3">
              Personal
            </h2>
            <div className="space-y-4 text-[11px]">
               <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Parents</p>
                  <p className="font-bold text-slate-700">{data.personalDetails.fatherName} (F)</p>
                  <p className="font-bold text-slate-700">{data.personalDetails.motherName} (M)</p>
               </div>
               <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Birthday</p>
                  <p className="font-bold text-slate-700">{data.personalDetails.dob}</p>
               </div>
               {data.skills.length > 0 && (
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-700 border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
               )}
               <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Details</p>
                  <p className="font-bold text-slate-700">Lang: {data.personalDetails.languages}</p>
                  <p className="font-bold text-slate-700">Loc: {data.personalDetails.jobLocation}</p>
                  <p className="font-bold text-slate-700">Status: {data.personalDetails.maritalStatus}</p>
               </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center py-4 border-t-2 border-slate-800">
         <div className="text-slate-400 text-[8px] font-black uppercase tracking-widest">
            Date: {currentDate}
         </div>
         <div className="text-right">
            <div className="w-32 h-6 border-b border-slate-800 mb-1 ml-auto"></div>
            <p className="text-[8px] font-black text-slate-800 uppercase tracking-tighter">Signature</p>
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
