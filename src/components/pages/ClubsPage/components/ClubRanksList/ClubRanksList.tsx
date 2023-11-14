import React from "react";
import { Club as ClubSchema } from "@prisma/client";
import { Spinner } from "react-bootstrap";
import { ClubBox } from "../ClubBox";

type ClubRanksListProps = {
  isLoading: boolean;
  clubs: ClubSchema[];
};

const ClubRanksList = ({ clubs, isLoading }: ClubRanksListProps) => {
  if (isLoading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center flex-column">
        <Spinner className="mb-2" animation="grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading Clubs...</p>
        <p>It might take a few seconds</p>
      </div>
    );
  }

  return (
    <>
      {clubs?.map((club, index) => {
        return (
          <ClubBox
            key={club.id}
            index={index}
            id={`club${index + 1}`}
            club={club}
          />
        );
      })}
    </>
  );
};

export default ClubRanksList;
