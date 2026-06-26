export interface CreatePairInput {
  teacherId: string;
  disciplineId: string;
  groupId: string;
  audience: string;
  hours: number;
}

export interface ActionResult {
  success?: boolean;
  error?: string;
  message?: string;
}

export interface Pair {
  id: string;
  teacherId: string;
  disciplineId: string;
  audience: string;
  hours: number;
  groupId: string;
  remaingHours: number;
  createdAt: string;
  updatedAt: string;
  teacher: Teacher;
  discipline: Discipline;
  group: Group;
}

export interface Teacher {
  id: string;
  name: string;
  department: string;
  createdAt: string;
  updatedAt: string;
}

export interface Discipline {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  department: string;
  shift: string;
  createdAt: string;
  updatedAt: string;
}
