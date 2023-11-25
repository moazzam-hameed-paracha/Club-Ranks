import React from "react";
import { Club as ClubSchema } from "@prisma/client";
import { Spinner } from "react-bootstrap";
import { ClubBox } from "../ClubBox";
import Image from "next/image";
import { PAGES } from "@src/constants/pages";
import Link from "next/link";

type ClubRanksListProps = {
  isLoading: boolean;
  clubs: ClubSchema[];
};

const ClubRanksList = ({ clubs, isLoading }: ClubRanksListProps) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoggedIn(
      Boolean(JSON.parse(localStorage.getItem("loggedIn") || "false"))
    );
  }, []);

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

      {!isLoggedIn && (
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
          <h4>
            To see more results, please{" "}
            <Link href={PAGES.SIGN_UP}>sign up</Link> or{" "}
            <Link href={PAGES.SIGN_IN}>sign in</Link>.
          </h4>
        </div>
      )}
    </>
  );
};

export default ClubRanksList;
