import { ExperienceLevel, StudentResponseData } from "@src/pages/api/students";
import React, { useCallback } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import qs from "qs";
import { StudentBox } from "@src/components/common";

type StudentRanksListProps = {
  filter: {
    filterStr?: string | undefined;
    filterType?: "name" | "experience" | undefined;
    skillFilter?: {
      [key: string]: ExperienceLevel | undefined;
    };
  };
};

const StudentRanksList = ({ filter }: StudentRanksListProps) => {
  const [students, setStudents] = React.useState<
    StudentResponseData["studentList"]
  >([]);

  const getStudents = useCallback(async () => {
    const response = await fetch(
      "/api/students?" + qs.stringify({ ...filter })
    );
    const data = (await response.json()) as StudentResponseData;
    return data.studentList;
  }, [filter]);

  React.useEffect(() => {
    getStudents().then((data) => {
      setStudents(data);
    });
  }, [getStudents]);

  return (
    <div className="w-100">
      <h2 className="text-center text-white m-3">Student Ranks</h2>
      {students.map((student, index) => (
        <StudentBox
          key={index}
          index={index}
          id={student.name}
          student={student}
        />
      ))}
    </div>
  );
};

export default StudentRanksList;
