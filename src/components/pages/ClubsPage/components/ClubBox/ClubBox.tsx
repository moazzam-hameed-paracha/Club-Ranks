import React from "react";
import { Accordion } from "react-bootstrap";
import { Club as ClubSchema } from "@prisma/client";

export type ClubBoxProps = {
  id: string;
  index: number;
  club: ClubSchema;
};

const ClubBox = ({ id, index, club }: ClubBoxProps) => {
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
              <p>{club.name}</p>
            </div>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                gap: "10px",
              }}
            >
              Match Index: <b>{Math.floor(Math.random() * 10) + index * 10}</b>
            </span>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <blockquote className="mb-0">
            <b>Club Description:</b>
            <p>{club.explanation}</p>
            {club.prompt && (
              <>
                <b>Why you fit:</b>
                <p>{club.prompt}</p>
              </>
            )}
          </blockquote>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ClubBox;
