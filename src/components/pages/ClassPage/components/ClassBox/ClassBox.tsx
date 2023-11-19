import React from "react";
import { Accordion } from "react-bootstrap";
import { Class as ClassSchema } from "@prisma/client";
import { generateMatchIndex } from "@src/utils/helpers";

export type ClassBoxProps = {
  id: string;
  index: number;
  _class: ClassSchema;
};

const ClassBox = ({ id, index, _class }: ClassBoxProps) => {
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
              <p>{_class.className}</p>
              <p
                style={{
                  fontSize: "0.8em",
                  marginTop: "5px",
                  color: "#666",
                }}
              >
                {_class.className}
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
              <b>Professor Name:</b>
              <p>{_class.professorName}</p>
            </div>
            <b>Class Description:</b>
            <p>{_class.classExplanation}</p>
            {_class.prompt && (
              <>
                <b>Why you fit:</b>
                <p>{_class.prompt}</p>
              </>
            )}
          </blockquote>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ClassBox;
