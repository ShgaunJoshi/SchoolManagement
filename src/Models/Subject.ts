export interface Subject {
    id: number;
    name: string;
    class: string;
    languages: string[];
   
  }
  
  export interface TeacherSubject {
    teacherId: number;
    teacher: Teacher;
    subjectId: number;
    subject: Subject;
  }
  
  export interface Teacher {
    id: number;
    name: string;
    image: string;
    age: number;
    sex: string;
  }
  