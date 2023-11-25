import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { PAGES } from "@src/constants/pages";

function Header() {
  return (
    <Navbar expand="lg" className={styles.nav}>
      <Container className="justify-content-start">
        <Navbar.Brand href="/">
          <Image src="/images/logo.png" alt="" width={75} height={60} />
        </Navbar.Brand>
        <Nav className="">
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
      </Container>
    </Navbar>
  );
}

export default Header;
