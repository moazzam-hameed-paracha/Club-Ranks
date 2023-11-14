import React, { useCallback, useState } from "react";
import { Form, Button, Accordion } from "react-bootstrap";
import styles from "./styles.module.scss";
import { debounce } from "lodash";
import { Class as ClassSchema } from "@prisma/client";

type AddSkillSectionProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setClasses: React.Dispatch<React.SetStateAction<ClassSchema[]>>;
};

const AddSkillSection = ({
  setIsLoading,
  setClasses,
}: AddSkillSectionProps) => {
  const [resume, setResume] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleDebouncedSubmit = useCallback(
    debounce(() => {
      setIsLoading(true);
      fetch("/api/classes", {
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
    }, 1000),
    [resume]
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
