import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Navbar, Container, Nav } from "react-bootstrap";
import { PAGES } from "@src/constants/pages";
import { FaRegUser } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";
import Link from "next/link";
import { useRouter } from "next/router";
import { APIS } from "@src/constants/api";

function Header() {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("loggedIn") || "false");
    setLoggedIn(storedData);
  }, []);

  const handleSignOut = () => {
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(false);
    router.push(APIS.SIGN_OUT);
  };

  return (
    <Navbar expand="lg" className={styles.nav}>
      <Container className="justify-content-start">
        <Navbar.Brand href="/">
          <Image src="/images/logo.png" alt="" width={75} height={60} />
        </Navbar.Brand>
        <Nav className="d-flex justify-space-between">
          <Link href={PAGES.PROFESSORS}>Professor Matches</Link>
          <Link href={PAGES.CLASS}>Class Matches</Link>
          <Link href={PAGES.CLUBS}>Club Matches</Link>
        </Nav>
        <Nav className="mx-auto">
          <Image
            src="/images/universities/thumb_UPenn-Logo.png"
            alt="UPenn"
            width={100}
            height={60}
          />
        </Nav>
        <Nav className="ms-auto">
          {!isLoggedIn ? (
            <Nav.Link
              href={PAGES.SIGN_IN}
              className="d-flex justify-content-center align-items-center gap-2"
            >
              <FaRegUser size={20} />
              <span>Sign In</span>
            </Nav.Link>
          ) : (
            <Nav.Link
              className="d-flex justify-content-center align-items-center gap-2"
              onClick={handleSignOut}
            >
              <VscSignOut size={24} />
              <span>Sign Out</span>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
