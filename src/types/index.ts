export interface User {
    id: number;
    username: string;
    roles: { id: number; name: string }[];
  }
  
  export interface Student {
    id: number;
    name: string;
    age: number;
    schoolUnit: string;
    identityFilePath: string;
    attendanceFilePath: string;
    approved: boolean;
    user: User;
  }