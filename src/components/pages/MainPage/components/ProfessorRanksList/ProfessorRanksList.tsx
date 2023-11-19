import { ProfessorBox } from "@src/components/common";
import React from "react";
import { Professor as ProfessorSchema } from "@prisma/client";
import { Spinner } from "react-bootstrap";
import Image from "next/image";

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

      {professors?.[0].prompt?.length && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <Image src="/images/lock.svg" alt="lock" width={50} height={50} />
          <h4>To see more results, please sign up.</h4>
        </div>
      )}
    </>
  );
};

export default ProfessorRanksList;
