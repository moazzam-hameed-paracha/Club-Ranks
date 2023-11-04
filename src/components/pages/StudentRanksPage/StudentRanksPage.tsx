import { CustomHeader } from "@src/components/common";
import React from "react";
import { SkillCard, StudentRanksList } from "./components";
import { ExperienceLevel } from "@src/pages/api/students";

const StudentRanksPage = () => {
  const [filter, setFilter] = React.useState<{
    filterStr?: string;
    filterType?: "name";
    skillFilter?: {
      [key: string]: ExperienceLevel | undefined;
    };
  }>({
    filterStr: "",
    filterType: "name",
    skillFilter: {},
  });

  return (
    <>
      <CustomHeader setFilter={setFilter} />
      <section
        style={{
          margin: "0px 200px",
          marginTop: "20px",
          display: "flex",
          gap: "20px",
        }}
      >
        <SkillCard setFilter={setFilter} />
        <StudentRanksList filter={filter} />
      </section>
    </>
  );
};

export default StudentRanksPage;
