import { CustomHeader } from "@src/components/common";
import React from "react";
import { AddSkillSection, ProfessorRanksList } from "./components";
import { Professor as ProfessorSchema } from "@prisma/client";

const ProfessorsPage = () => {
  const [professors, setProfessors] = React.useState([] as ProfessorSchema[]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfessors = async () => {
      const response = await fetch("/api/professors");
      const professors = (await response.json())
        .professors as ProfessorSchema[];

      setIsLoading(false);
      setProfessors(professors);
    };
    fetchProfessors();
  }, []);

  return (
    <>
      <CustomHeader />

      <section className="p-3 d-flex gap-3">
        <div
          className="w-25 d-flex flex-column gap-3"
          style={{ marginTop: "88px" }}
        >
          <AddSkillSection
            setIsLoading={setIsLoading}
            setProfessors={setProfessors}
          />
        </div>
        <div className="w-75">
          <h2 className="m-3 text-center text-white">Professors List</h2>

          <hr className="mx-3" />
          <ProfessorRanksList professors={professors} isLoading={isLoading} />
        </div>
      </section>
    </>
  );
};

export default ProfessorsPage;
