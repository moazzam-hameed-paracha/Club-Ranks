import React from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.scss";
import { usePathname, useRouter } from "next/navigation";

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const pathname = usePathname();

  const map: {
    [key: string]: {
      title: string;
      api: string;
    };
  } = {
    "/sign-in": {
      title: "Sign in",
      api: "/api/auth/sign-in",
    },
    "/sign-up": {
      title: "Sign up",
      api: "/api/auth/sign-up",
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return alert("Please fill out all fields");

    fetch(map[pathname].api, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert("Success!");
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className="text-center mb-4 text-white">{map[pathname].title}</h1>
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
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
