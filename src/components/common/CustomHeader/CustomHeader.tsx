import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";

function Header() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.nav_title}>
        <Image src="/images/logo.png" alt="" width={60} height={45} />
      </Link>
      <div>
        <Link href="/professors">
          <p>Professor Ranks</p>
        </Link>
        <Link href="/clubs">
          <p>Club Ranks</p>
        </Link>
        <Link href="/classes">
          <p>Class Ranks</p>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
