
export type TemplateType = 'classic' | 'modern' | 'professional' | 'elegant';

export interface Education {
  id: string;
  qualification: string;
  board: string;
  year: string;
  division: string; // Used for "Percentage" in some templates
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  duration: string;
  responsibilities: string;
}

export interface PersonalDetails {
  fatherName: string;
  motherName: string;
  dob: string;
  maritalStatus: string;
  nationality: string;
  languages: string;
  jobLocation: string;
  aadhar: string;
  email: string;
  hobbies: string;
  careerObjective: string;
}

export interface ResumeData {
  name: string;
  address: string;
  contact: string;
  date: string;
  photoUrl: string | null;
  education: Education[];
  workExperience: WorkExperience[];
  skills: string[];
  personalDetails: PersonalDetails;
  declaration: string;
  template: TemplateType;
}

export const INITIAL_DATA: ResumeData = {
  name: "",
  address: "",
  contact: "",
  date: new Date().toLocaleDateString('en-GB'),
  photoUrl: null,
  template: 'elegant',
  education: [],
  workExperience: [],
  skills: [],
  personalDetails: {
    fatherName: "",
    motherName: "",
    dob: "",
    maritalStatus: "",
    nationality: "Indian",
    languages: "",
    jobLocation: "",
    aadhar: "",
    email: "",
    hobbies: "",
    careerObjective: ""
  },
  declaration: ""
};
