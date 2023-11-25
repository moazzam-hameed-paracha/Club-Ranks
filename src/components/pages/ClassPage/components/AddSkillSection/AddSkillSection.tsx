import React, { useEffect, useState } from "react";
import { Form, Button, Accordion } from "react-bootstrap";
import styles from "./styles.module.scss";
import { debounce } from "lodash";
import { Class as ClassSchema } from "@prisma/client";
import { APIS } from "@src/constants/api";

type AddSkillSectionProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setClasses: React.Dispatch<React.SetStateAction<ClassSchema[]>>;
};

const AddSkillSection = ({
  setIsLoading,
  setClasses,
}: AddSkillSectionProps) => {
  const [resume, setResume] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleDebouncedSubmit = debounce(() => {
    if (!resume.length) {
      alert("Please paste your resume.");
      return;
    }

    setDisabled(true);
    setIsLoading(true);
    fetch(APIS.CLASSES, {
      method: "POST",
      body: JSON.stringify({
        resume,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data.classes);
      })
      .catch(() => alert("An error occurred. Please try again."))
      .finally(() => {
        setDisabled(false);
        setIsLoading(false);
      });
  }, 1000);

  const handleTextAreaChange =
    (type: "resume" | "interest") =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (type === "resume") {
        setResume(e.target.value);
        localStorage.setItem("resume", e.target.value);
      }
      if (type === "interest") {
        setInterests(e.target.value);
        localStorage.setItem("interests", e.target.value);
      }
    };

  useEffect(() => {
    if (!resume.length) {
      const resume = localStorage.getItem("resume") || "";
      setResume(resume);
    }

    if (!interests.length) {
      const interests = localStorage.getItem("interests") || "";
      setInterests(interests);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Accordion defaultActiveKey={"resume_desc"} id={"resume_desc"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Paste your resume <span className={styles.required}>*</span>{" "}
          </Accordion.Header>
          <Accordion.Body>
            <Form.Control
              as="textarea"
              id="resume"
              className={styles.textarea}
              value={resume}
              onChange={handleTextAreaChange("resume")}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey={"resume_desc"} id={"resume_desc"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Write your interests</Accordion.Header>
          <Accordion.Body>
            <Form.Control
              as="textarea"
              id="interests"
              className={styles.textarea}
              value={interests}
              onChange={handleTextAreaChange("interest")}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Submit Button */}
      <Button
        type="button"
        className="w-100 bg-transparent border-white"
        onClick={handleDebouncedSubmit}
        disabled={disabled}
      >
        Recommend Classes
      </Button>
    </>
  );
};

export default AddSkillSection;
