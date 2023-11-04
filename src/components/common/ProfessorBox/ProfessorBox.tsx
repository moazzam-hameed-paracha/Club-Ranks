import { StudentResponseData } from "@src/pages/api/students";
import Link from "next/link";
import React from "react";
import { Accordion } from "react-bootstrap";
import { StarRating } from "../StarRating";
import { getXpToRating } from "@src/utils/helpers";
import { Professor as ProfessorSchema } from "@prisma/client";

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
              Match Index: <b>{Math.floor(Math.random() * 100) + 1}</b>
            </span>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <blockquote className="mb-0">
            <div className="d-flex gap-2">
              <b>Title:</b>
              <p>{professor.researchTitle}</p>
            </div>

            <div className="d-flex gap-2">
              <b>Overview:</b>
              <Link
                href={`resume_${index + 1}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                PDF Overview
              </Link>
            </div>

            <b>Research Description:</b>
            <p>{professor.researchDescription}</p>
          </blockquote>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ProfessorBox;
