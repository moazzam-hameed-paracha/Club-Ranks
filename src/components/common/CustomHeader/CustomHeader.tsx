import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Form } from "react-bootstrap";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

type HeaderProps = {
  setFilter?: React.Dispatch<
    React.SetStateAction<{
      filterStr?: string;
      filterType?: "name";
    }>
  >;
};

function Header({ setFilter }: HeaderProps) {
  // get current page url
  const router = useRouter();

  // get current page name
  const currentPath = router.pathname.split("/")[1];

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.nav_title}>
        <Image src="/images/logo192.png" alt="" width={50} height={50} />
        <p>Scallop JobRec</p>
      </Link>
      <Link href="/student-ranks" className={styles.nav_title}>
        Ranks
      </Link>

      {currentPath === "student-ranks" && (
        <div className="d-flex" style={{ marginLeft: "auto" }}>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            onChange={(e) =>
              setFilter?.((prev) => ({ ...prev, filterStr: e.target.value }))
            }
          />
          <Form.Select
            onChange={(e) =>
              setFilter?.({
                filterStr: "",
                filterType: e.target.value as "name",
              })
            }
          >
            <option>name</option>
          </Form.Select>
        </div>
      )}
    </nav>
  );
}

export default Header;
