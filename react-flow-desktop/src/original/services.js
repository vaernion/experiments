// @flow

import { pool } from './mysql_pool';

export class Student {
  id: number = 0;
  name: string = '';
  email: string = '';
}

class StudentService {
  getStudents(success: (Student[]) => mixed) {
    pool.query('SELECT * FROM Students', (error, results: Student[]) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id: number, success: Student => mixed) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results: Student[]) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(student: Student, success: () => mixed) {
    pool.query(
      'UPDATE Students SET name=?, email=? WHERE id=?',
      [student.name, student.email, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}
export let studentService = new StudentService();
