import { StudentResponseData } from "@src/pages/api/students";
import Link from "next/link";
import React from "react";
import { Accordion } from "react-bootstrap";
import { StarRating } from "../StarRating";
import { getXpToRating } from "@src/utils/helpers";

export type StudentBoxProps = {
  id: string;
  index: number;
  student: StudentResponseData["studentList"][0];
};

const StudentBox = ({ id, index, student }: StudentBoxProps) => {
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
            <div>
              <p>{student.name}</p>
              <p
                style={{
                  fontSize: "0.8em",
                  marginTop: "5px",
                  color: "#666",
                }}
              >
                {student.major} at {student.school}
              </p>
            </div>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Match Index: <b>{student.matchIndex}</b>
            </span>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <blockquote className="mb-0">
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              Software Development:{" "}
              <span>
                <StarRating
                  staticRating
                  initialRating={getXpToRating(student.softwareDevelopmentLvl)}
                />
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              Artificial Intelligence:{" "}
              <span>
                <StarRating
                  staticRating
                  initialRating={getXpToRating(student.AILvl)}
                />
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              Problem Solving:{" "}
              <span>
                <StarRating
                  staticRating
                  initialRating={getXpToRating(student.problemSolving)}
                />
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              Cloud Computing:{" "}
              <span>
                <StarRating
                  staticRating
                  initialRating={getXpToRating(student.cloudComputingLvl)}
                />
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              Time Management:{" "}
              <span>
                <StarRating
                  staticRating
                  initialRating={getXpToRating(student.timeManagement)}
                />
              </span>
            </div>
            <Link
              href={`resume_${index + 1}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              PDF Overview
            </Link>
          </blockquote>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default StudentBox;
