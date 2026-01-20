
export type TemplateType = 'classic' | 'modern' | 'professional';

export interface Education {
  id: string;
  qualification: string;
  board: string;
  year: string;
  division: string;
}

export interface PersonalDetails {
  fatherName: string;
  motherName: string;
  dob: string;
  maritalStatus: string;
  nationality: string;
  languages: string;
  jobLocation: string;
}

export interface ResumeData {
  name: string;
  address: string;
  contact: string;
  photoUrl: string | null;
  education: Education[];
  personalDetails: PersonalDetails;
  declaration: string;
  template: TemplateType;
}

export const INITIAL_DATA: ResumeData = {
  name: "",
  address: "",
  contact: "",
  photoUrl: null,
  template: 'classic',
  education: [
    { id: '1', qualification: 'Matriculation', board: '', year: '', division: '' },
    { id: '2', qualification: 'Intermediate', board: '', year: '', division: '' }
  ],
  personalDetails: {
    fatherName: "",
    motherName: "",
    dob: "",
    maritalStatus: "Unmarried",
    nationality: "Indian",
    languages: "Hindi & English",
    jobLocation: "All India"
  },
  declaration: "I hereby declare that all the information given above by me is true to the best of my Knowledge."
};
