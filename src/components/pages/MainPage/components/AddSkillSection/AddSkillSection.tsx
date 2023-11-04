import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddSkillModal } from "../AddSkillModal";

const AddSkillSection = () => {
  const [skills, setSkills] = useState([
    { name: "Software Development", value: "Beginner" },
    { name: "Artificial Intelligence", value: "Beginner" },
    { name: "Cloud Computing", value: "Beginner" },
    { name: "Problem Solving", value: "Beginner" },
    { name: "Time Management", value: "Beginner" },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addSkill = (newSkill: string) => {
    setSkills([...skills, { name: newSkill, value: "Beginner" }]);
    setShowModal(false);
  };

  return (
    <section
      className="mt-3"
      style={{
        margin: "0px 200px",
        height: "calc(100vh - 70px)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        {/* Job Description */}
        <div
          style={{
            width: "50%",
          }}
        >
          <h2
            style={{
              padding: "10px",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "1.5em",
              color: "white",
            }}
          >
            Upload Job Description
          </h2>
          <Form.Group>
            <Form.Control
              as="textarea"
              id="jobDescription"
              style={{
                width: "100%",
                height: "260px",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                resize: "vertical",
              }}
            />
          </Form.Group>
        </div>

        {/* Skill Levels */}
        <div
          style={{
            width: "50%",
          }}
        >
          <h2
            style={{
              padding: "10px",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "1.5em",
              color: "white",
            }}
          >
            Select Skill Levels
          </h2>
          {skills.map((skill, index) => (
            <InputGroup
              key={index}
              className="mb-3"
              style={{
                width: "100%",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <InputGroup.Text
                id={`basic-addon${index}`}
                style={{ width: "70%", backgroundColor: "white" }}
              >
                {skill.name}
              </InputGroup.Text>
              <Form.Select
                aria-label="Skill Level"
                style={{ float: "right", border: "none" }}
                value={skill.value}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index].value = e.target.value;
                  setSkills(newSkills);
                }}
              >
                <option>Beginner</option>
                <option>Advanced</option>
                <option>Exposed</option>
                <option>Adequate</option>
                <option>Expert</option>
              </Form.Select>
            </InputGroup>
          ))}
        </div>
      </div>

      {/* Skill Add Modal Button */}
      <Button
        className="w-100 bg-transparent border-white"
        onClick={handleShowModal}
      >
        Add Skill
      </Button>

      <AddSkillModal
        showModal={showModal}
        onHide={handleCloseModal}
        onSubmit={addSkill}
      />
    </section>
  );
};

export default AddSkillSection;
