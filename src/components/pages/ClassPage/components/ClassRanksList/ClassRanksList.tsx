import React from "react";
import { Class as ClassSchema } from "@prisma/client";
import { Spinner } from "react-bootstrap";
import { ClassBox } from "../ClassBox";
import Image from "next/image";
import { PAGES } from "@src/constants/pages";
import Link from "next/link";

type ClassRanksListProps = {
  isLoading: boolean;
  classes: ClassSchema[];
};

const ClassRanksList = ({ classes, isLoading }: ClassRanksListProps) => {
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

      {!isLoggedIn && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem",
        }}>
          <Image src="/images/lock.svg" alt="lock" width={50} height={50}/>
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

export default ClassRanksList;
