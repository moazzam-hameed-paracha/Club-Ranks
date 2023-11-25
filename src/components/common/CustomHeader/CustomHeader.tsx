import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { PAGES } from "@src/constants/pages";
import { FaRegUser } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";
function Header() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("loggedIn") || "false");
    setLoggedIn(storedData);
  }, []);

  const handleSignout = () => {
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(false);
    window.location.href = "/api/auth/sign-out";
  };

  return (
    <Navbar expand="lg" className={styles.nav}>
      <Container className="justify-content-start">
        <Navbar.Brand href="/">
          <Image src="/images/logo.png" alt="" width={75} height={60} />
        </Navbar.Brand>
        {isLoggedIn && (
          <Nav className="d-flex justify-space-between">
            <NavDropdown title="Rank Lists" id="basic-nav-dropdown">
              <NavDropdown.Item href={PAGES.PROFESSORS}>
                Professors
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={PAGES.CLASS}>Classes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={PAGES.CLUBS}>Clubs</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
        <Nav className="ms-auto">
          {!isLoggedIn ? <Nav.Link href={PAGES.SIGN_IN} className="d-flex justify-content-center align-items-center gap-2"><FaRegUser size={20}/><span>Sign In</span></Nav.Link> : <Nav.Link className="d-flex justify-content-center align-items-center gap-2" onClick={handleSignout}><VscSignOut size={24}/><span>Sign Out</span></Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
