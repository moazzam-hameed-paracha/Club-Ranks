import React from "react";
import { Accordion } from "react-bootstrap";
import { Professor as ProfessorSchema } from "@prisma/client";
import { generateMatchIndex } from "@src/utils/helpers";

export type ProfessorBoxProps = {
  id: string;
  index: number;
  professor: ProfessorSchema;
};

const ProfessorBox = ({ id, index, professor }: ProfessorBoxProps) => {
  return (
    <Accordion className="mt-1" defaultActiveKey={id} id={id}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div
            style={{
              display: "flex",
              width: "90%",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <div className="w-75">
              <p>{professor.name}</p>
              <p
                style={{
                  fontSize: "0.8em",
                  marginTop: "5px",
                  color: "#666",
                }}
              >
                {professor.title}
              </p>
            </div>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                gap: "10px",
              }}
            >
              Match Index: <b>{generateMatchIndex(index)}</b>
            </span>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <blockquote className="mb-0">
            <div className="d-flex gap-2">
              <b>Title:</b>
              <p>{professor.researchTitle}</p>
            </div>
            <b>Research Description:</b>
            <p>{professor.researchDescription}</p>
            {professor.prompt && (
              <>
                <b>Why you fit:</b>
                <p>{professor.prompt}</p>
              </>
            )}
          </blockquote>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ProfessorBox;
