import React from "react";
import { Class as ClassSchema } from "@prisma/client";
import { Spinner } from "react-bootstrap";
import { ClassBox } from "../ClassBox";

type ClassRanksListProps = {
  isLoading: boolean;
  classes: ClassSchema[];
};

const ClassRanksList = ({
  classes,
  isLoading,
}: ClassRanksListProps) => {
  if (isLoading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center flex-column">
        <Spinner className="mb-2" animation="grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading Classes...</p>
        <p>It might take a few seconds</p>
      </div>
    );
  }

  return (
    <>
      {classes?.map((_class, index) => {
        return (
          <ClassBox
            key={_class.id}
            index={index}
            id={`professor${index + 1}`}
            _class={_class}
          />
        );
      })}
    </>
  );
};

export default ClassRanksList;
