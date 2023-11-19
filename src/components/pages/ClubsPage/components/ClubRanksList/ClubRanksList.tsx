import React from "react";
import { Club as ClubSchema } from "@prisma/client";
import { Spinner } from "react-bootstrap";
import { ClubBox } from "../ClubBox";
import Image from "next/image";

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

      {clubs?.[0].prompt?.length && (
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

export default ClubRanksList;
