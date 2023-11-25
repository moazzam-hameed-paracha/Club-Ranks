import { ProfessorBox } from "@src/components/common";
import React from "react";
import { Professor as ProfessorSchema } from "@prisma/client";
import { Spinner } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { PAGES } from "@src/constants/pages";

type ProfessorRanksListProps = {
  isLoading: boolean;
  professors: ProfessorSchema[];
};

const ProfessorRanksList = ({
  professors,
  isLoading,
}: ProfessorRanksListProps) => {
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

export default ProfessorRanksList;
