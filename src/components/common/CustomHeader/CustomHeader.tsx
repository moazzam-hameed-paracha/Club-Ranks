import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";

function Header() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.nav_title}>
        <Image src="/images/logo192.png" alt="" width={50} height={50} />
        <p>Club Ranks</p>
      </Link>
    </nav>
  );
}

export default Header;
