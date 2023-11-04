import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

type AddSkillModalProps = {
  showModal: boolean;
  onHide: () => void;
  onSubmit: (newSkill: string) => void;
};

const AddSkillModal = ({ onHide, onSubmit, showModal }: AddSkillModalProps) => {
  const [newSkill, setNewSkill] = useState("");

  return (
    <Modal show={showModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Enter Skill Name"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
          style={{
            color: "gray",
            border: "1px solid gray",
            backgroundColor: "white",
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => onSubmit(newSkill)}
          style={{
            color: "rgba(240, 117, 173, 1)",
            border: "1px solid rgba(240, 117, 173, 1)",
            backgroundColor: "white",
          }}
        >
          Add Skill
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSkillModal;
