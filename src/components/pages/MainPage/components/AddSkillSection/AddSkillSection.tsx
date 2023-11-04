import React, { useCallback, useState } from "react";
import { Form, Button, Accordion } from "react-bootstrap";
import styles from "./styles.module.scss";
import { debounce } from "lodash";

const AddSkillSection = () => {
  const [resume, setResume] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [essay, setEssay] = useState<string>("");

  const handleDebouncedSubmit = useCallback(
    debounce(() => {
      fetch("/api/professors", {
        method: "POST",
        body: JSON.stringify({
          resume,
          interests,
          essay,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }, 1000),
    [resume, interests, essay]
  );

  return (
    <>
      <Accordion defaultActiveKey={"resume_desc"} id={"resume_desc"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Paste your resume</Accordion.Header>
          <Accordion.Body>
            <Form.Control
              as="textarea"
              id="jobDescription"
              className={styles.textarea}
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey={"interests"} id={"interests"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Your interests</Accordion.Header>
          <Accordion.Body>
            <Form.Control
              as="textarea"
              id="jobDescription"
              className={styles.textarea}
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey={"resume_desc"} id={"resume_desc"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Draft Essay</Accordion.Header>
          <Accordion.Body>
            <Form.Control
              as="textarea"
              id="jobDescription"
              className={styles.textarea}
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Submit Button */}
      <Button
        type="button"
        className="w-100 bg-transparent border-white"
        onClick={handleDebouncedSubmit}
      >
        Find Clubs
      </Button>
    </>
  );
};

export default AddSkillSection;
