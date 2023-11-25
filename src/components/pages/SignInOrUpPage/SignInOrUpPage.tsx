import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { PAGES } from "@src/constants/pages";
import { APIS } from "@src/constants/api";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const pathname = usePathname();

  React.useEffect(() => {
    const isLoggedIn = Boolean(
      JSON.parse(localStorage.getItem("loggedIn") || "false")
    );

    if (isLoggedIn) {
      router.push(PAGES.DASHBOARD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const map: {
    [key: string]: {
      title: string;
      api: string;
      txt: string;
      linkTxt: string;
      link: string;
    };
  } = {
    "/sign-in": {
      title: "Sign in",
      api: APIS.SIGN_IN,
      txt: "Not signed up yet?",
      linkTxt: "Sign up",
      link: PAGES.SIGN_UP,
    },
    "/sign-up": {
      title: "Sign up",
      api: APIS.SIGN_UP,
      txt: "Already signed up?",
      linkTxt: "Sign in",
      link: PAGES.SIGN_IN,
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return alert("Please fill out all fields");

    setLoading(true);
    fetch(map[pathname].api, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          localStorage.setItem("loggedIn", "true");
          router.push(PAGES.DASHBOARD);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className="text-center mb-4 text-white">{map[pathname].title}</h1>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label className="text-white mt-4">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              className="p-2"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label className="text-white mt-4">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              className="p-2"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-5 bg-transparent border-white"
          >
            {!loading ? map[pathname].title : <Spinner animation="border" />}
          </Button>
        </Form>

        <div className="d-flex mt-4 justify-content-center gap-2">
          <p>{map[pathname].txt}</p>
          <a href={map[pathname].link} className="text-white">
            {map[pathname].linkTxt}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
