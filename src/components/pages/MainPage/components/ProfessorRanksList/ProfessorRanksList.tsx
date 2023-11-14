import { ProfessorBox } from "@src/components/common";
import React from "react";
import { Professor as ProfessorSchema } from "@prisma/client";
import { Spinner } from "react-bootstrap";

type ProfessorRanksListProps = {
  isLoading: boolean;
  professors: ProfessorSchema[];
};

const ProfessorRanksList = ({
  professors,
  isLoading,
}: ProfessorRanksListProps) => {
  if (isLoading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center flex-column">
        <Spinner className="mb-2" animation="grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading Professors...</p>
        <p>It might take a few seconds</p>
      </div>
    );
  }

  return (
    <>
      {professors?.map((professor, index) => {
        return (
          <ProfessorBox
            key={professor.id}
            index={index}
            id={`professor${index + 1}`}
            professor={professor}
          />
        );
      })}
    </>
  );
};

export default ProfessorRanksList;
