export interface Teacher {
    id: string;
    name: string;
    department: string;
    createdAt: string;
    updatedAt: string;
    mainDisciplines: Discipline[];
    additionalDisciplines: Discipline[];
}


export interface TeacherFormData {
    name: string;
    department: string;
    mainDisciplines: string[];      
    additionalDisciplines: string[];
}

export interface Discipline {
  id: string;
  name: string;
  department: string;
  mainDisciplines?: string[];
  additionalDisciplines?: string[];
}