export interface User {
  id: number;
  name: string;
  email: string;
  roles: { name: string }[];
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