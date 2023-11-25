import { CustomHeader } from "@src/components/common";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { PAGES } from "@src/constants/pages";

const DashboardPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(
      Boolean(JSON.parse(localStorage.getItem("loggedIn") || "false"))
    );
  }, []);

  return (
    <>
      <CustomHeader />
      <section
        className="p-3 "
        style={{
          height: "calc(100vh - 70px)",
        }}
      >
        <div className="w-50 mx-auto">
          <h2 className="text-center text-white">
            Discover where you belong with EDUNOT!
          </h2>
          <hr />

          {!isLoggedIn && (
            <div className={styles.cardOuter}>
              <div className={styles.cardInner}>
                <h5>Enter your CV/Interests, and see which where you fit!</h5>
                <h5>
                  Clubs to join, which Professors to research, & what Classes to
                  take!
                </h5>

                <Button
                  variant="outline-secondary"
                  onClick={() => router.push(PAGES.SIGN_UP)}
                >
                  SIGN UP!
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
