import { getXpToRating } from "@src/utils/helpers";
import type { NextApiRequest, NextApiResponse } from "next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import qs from "qs";

export type ExperienceLevel =
  | "Beginner"
  | "Advanced"
  | "Exposed"
  | "Adequate"
  | "Expert";

export type StudentResponseData = {
  studentList: Array<{
    name: string;
    matchIndex: number;
    school: string;
    major: string;
    AILvl: ExperienceLevel;
    softwareDevelopmentLvl: ExperienceLevel;
    cloudComputingLvl: ExperienceLevel;
    problemSolving: ExperienceLevel;
    timeManagement: ExperienceLevel;
  }>;
};


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StudentResponseData>
) {
  
let studentList: StudentResponseData["studentList"] = [
  {
    name: "Student 1",
    AILvl: "Beginner",
    matchIndex: 90,
    softwareDevelopmentLvl: "Advanced",
    cloudComputingLvl: "Exposed",
    problemSolving: "Adequate",
    timeManagement: "Expert",
    major: "Computer Science",
    school: "University of Toronto",
  },
  {
    name: "Student 2",
    AILvl: "Exposed",
    matchIndex: 90,
    softwareDevelopmentLvl: "Beginner",
    cloudComputingLvl: "Advanced",
    problemSolving: "Expert",
    timeManagement: "Adequate",
    major: "Computer Science",
    school: "University of Toronto",
  },
  {
    name: "Student 3",
    AILvl: "Advanced",
    matchIndex: 90,
    softwareDevelopmentLvl: "Exposed",
    cloudComputingLvl: "Adequate",
    problemSolving: "Advanced",
    timeManagement: "Exposed",
    major: "Computer Science",
    school: "University of Toronto",
  },
  {
    name: "Student 4",
    AILvl: "Adequate",
    matchIndex: 90,
    softwareDevelopmentLvl: "Adequate",
    cloudComputingLvl: "Exposed",
    problemSolving: "Advanced",
    timeManagement: "Beginner",
    major: "Computer Science",
    school: "University of Toronto",
  },
  {
    name: "Student 5",
    AILvl: "Expert",
    matchIndex: 90,
    softwareDevelopmentLvl: "Expert",
    cloudComputingLvl: "Advanced",
    problemSolving: "Advanced",
    timeManagement: "Expert",
    major: "Computer Science",
    school: "University of Toronto",
  },
  {
    name: "Student 6",
    AILvl: "Beginner",
    matchIndex: 90,
    softwareDevelopmentLvl: "Exposed",
    cloudComputingLvl: "Beginner",
    problemSolving: "Beginner",
    timeManagement: "Adequate",
    major: "Computer Science",
    school: "University of Toronto",
  },
  {
    name: "Student 7",
    AILvl: "Exposed",
    matchIndex: 90,
    softwareDevelopmentLvl: "Adequate",
    cloudComputingLvl: "Exposed",
    problemSolving: "Exposed",
    timeManagement: "Advanced",
    major: "Computer Science",
    school: "University of Toronto",
  },
  {
    name: "Student 8",
    AILvl: "Advanced",
    matchIndex: 90,
    softwareDevelopmentLvl: "Expert",
    cloudComputingLvl: "Expert",
    problemSolving: "Advanced",
    timeManagement: "Exposed",
    major: "Computer Science",
    school: "University of Toronto",
  },
  {
    name: "Student 9",
    AILvl: "Adequate",
    matchIndex: 90,
    softwareDevelopmentLvl: "Beginner",
    cloudComputingLvl: "Adequate",
    problemSolving: "Exposed",
    timeManagement: "Beginner",
    major: "Computer Science",
    school: "University of Toronto",
  },
  {
    name: "Student 10",
    AILvl: "Expert",
    matchIndex: 90,
    softwareDevelopmentLvl: "Advanced",
    cloudComputingLvl: "Advanced",
    problemSolving: "Advanced",
    timeManagement: "Expert",
    major: "Computer Science",
    school: "University of Toronto",
  },
];
  if (req.method === "GET") {
    const filters = qs.parse(req.url?.split("?")[1] || "{}") as {
      filterStr?: string | undefined;
      filterType?: "name";
      skillFilter?: {
        [key: string]: ExperienceLevel | undefined;
      };
    };

    console.log({ filters });

    if (filters?.filterStr?.length) {
      if (filters.filterType === "name") {
        studentList = studentList.filter((student) =>
          student.name
            .toLowerCase()
            .includes(filters?.filterStr?.toLowerCase() || "")
        );
      }
    }

    if (filters?.skillFilter) {
      studentList = studentList.filter((student) => {
        let isMatch = true;
        Object.entries(filters?.skillFilter || {}).forEach(([skill, level]) => {
          const filterRating = getXpToRating(level as ExperienceLevel);
          const studentRating = getXpToRating(
            student[skill as keyof typeof student] as ExperienceLevel
          );

          if (studentRating < filterRating) {
            isMatch = false;
            return;
          }
        });
        return isMatch;
      });
    }

    res.status(200).json({ studentList });
  }
}
