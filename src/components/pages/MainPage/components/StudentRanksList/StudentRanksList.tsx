import { StudentBox } from "@src/components/common";
import { StudentResponseData } from "@src/pages/api/students";
import React from "react";

const StudentRanksList = () => {
  const [students, setStudents] = React.useState<StudentResponseData["studentList"]>([]);

  const getStudents = async () => {
    const response = await fetch("/api/students");
    const data = (await response.json()) as StudentResponseData;
    return data.studentList;
  };

  React.useEffect(() => {
    getStudents().then((data) => {
      setStudents(data);
    });
  }, []);

  return (
    <section
      className="mb-3"
      style={{
        margin: "0px 200px",
      }}
    >
      <h2 className="text-center text-white">Student Ranks</h2>
      {students.map((student, index) => {
        return (
          <StudentBox
            key={student.name}
            index={index}
            id={`student${index + 1}`}
            student={student}
          />
        );
      })}
    </section>
  );
};

export default StudentRanksList;
