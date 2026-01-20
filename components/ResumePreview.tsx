
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
          <p className="mt-2 font-bold">Signature</p>
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
          <h2 className="text-xl font-bold uppercase tracking-wide">{data.name || "Name"}</h2>
        </div>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Contact</h3>
            <div className="text-sm space-y-2">
              <p className="flex items-center gap-2"><i className="fas fa-phone text-indigo-400"></i> {data.contact}</p>
              <p className="flex items-start gap-2 leading-tight"><i className="fas fa-map-marker-alt text-indigo-400 mt-1"></i> {data.address}</p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Bio-Details</h3>
            <div className="text-sm space-y-3">
              <div><p className="text-xs text-indigo-400">DOB</p><p>{data.personalDetails.dob}</p></div>
              <div><p className="text-xs text-indigo-400">Status</p><p>{data.personalDetails.maritalStatus}</p></div>
              <div><p className="text-xs text-indigo-400">Languages</p><p>{data.personalDetails.languages}</p></div>
              <div><p className="text-xs text-indigo-400">Nationality</p><p>{data.personalDetails.nationality}</p></div>
            </div>
          </section>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-50">
        <header className="mb-10 border-b-4 border-indigo-900 pb-4">
          <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">RESUME</h1>
        </header>

        <section className="mb-10">
          <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-4 border-l-4 border-indigo-900 pl-3">
            EDUCATION
          </h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="font-bold text-indigo-900">{edu.qualification}</p>
                <p className="text-sm text-gray-600">{edu.board}</p>
                <div className="flex justify-between mt-2 text-xs font-medium text-indigo-600 uppercase">
                  <span>Year: {edu.year}</span>
                  <span>Division: {edu.division}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-4 border-l-4 border-indigo-900 pl-3">
            PERSONAL INFO
          </h3>
          <div className="grid grid-cols-1 gap-y-3 text-sm">
            <div className="flex"><span className="w-32 font-semibold">Father's Name:</span> <span>{data.personalDetails.fatherName}</span></div>
            <div className="flex"><span className="w-32 font-semibold">Mother's Name:</span> <span>{data.personalDetails.motherName}</span></div>
            <div className="flex"><span className="w-32 font-semibold">Preferred Location:</span> <span>{data.personalDetails.jobLocation}</span></div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-indigo-900 mb-3">DECLARATION</h3>
          <p className="text-sm italic text-gray-600 leading-relaxed border-t pt-3">
            {data.declaration}
          </p>
        </section>

        <div className="mt-12 flex justify-between items-end text-xs text-gray-500">
           <div>Date: {currentDate}</div>
           <div className="text-center">
              <div className="w-24 h-px border-b border-indigo-900 mb-2 mx-auto"></div>
              <p className="font-bold text-indigo-900 uppercase">Signature</p>
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
          <h1 className="text-5xl font-black text-slate-800 tracking-tighter mb-2">{data.name || "YOUR NAME"}</h1>
          <div className="flex gap-4 text-slate-500 font-medium">
             <span><i className="fas fa-phone mr-1"></i> {data.contact}</span>
             <span><i className="fas fa-map-marker-alt mr-1"></i> {data.address}</span>
          </div>
        </div>
        {data.photoUrl && (
          <img src={data.photoUrl} className="w-28 h-28 object-cover rounded-xl shadow-lg border-2 border-slate-100" />
        )}
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 mb-4 flex items-center gap-2">
              <i className="fas fa-graduation-cap text-slate-400"></i> Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-bold text-lg text-slate-800">{edu.qualification}</h4>
                  <p className="text-slate-600">{edu.board}</p>
                  <div className="flex gap-4 mt-1">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold text-slate-500 uppercase">Class of {edu.year}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold text-slate-500 uppercase">Grade: {edu.division}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 mb-4 flex items-center gap-2">
              <i className="fas fa-bullhorn text-slate-400"></i> Declaration
            </h2>
            <p className="text-slate-600 italic leading-relaxed">{data.declaration}</p>
          </section>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 mb-4">
              Personal
            </h2>
            <div className="space-y-4 text-sm">
               <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Parents</p>
                  <p className="font-medium">{data.personalDetails.fatherName} (F)</p>
                  <p className="font-medium">{data.personalDetails.motherName} (M)</p>
               </div>
               <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Birthday</p>
                  <p className="font-medium">{data.personalDetails.dob}</p>
               </div>
               <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Languages</p>
                  <p className="font-medium">{data.personalDetails.languages}</p>
               </div>
               <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Preference</p>
                  <p className="font-medium">{data.personalDetails.jobLocation}</p>
               </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-20 flex justify-between items-center py-8 border-t-2 border-slate-100">
         <div className="text-slate-400 text-sm">
            Generated on {currentDate}
         </div>
         <div className="text-center">
            <div className="w-32 h-10 border-b border-slate-800 mb-2"></div>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-widest">Signed Confirmation</p>
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
