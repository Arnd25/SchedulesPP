export interface Group {
  id: string;
  name: string;
  shift: string;
  department: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGroupInput {
  name: string;
  shift: string;
  department: string;
}

export interface ActionResult {
  success?: boolean;
  error?: string;
  message?: string;
}