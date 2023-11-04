import { StarRating } from "@src/components/common";
import { ExperienceLevel } from "@src/pages/api/students";
import { getRatingToXP } from "@src/utils/helpers";
import React, { useCallback } from "react";

type SkillCardProps = {
  setFilter: React.Dispatch<
    React.SetStateAction<{
      skillFilter?:
        | {
            [key: string]: ExperienceLevel | undefined;
          }
        | undefined;
    }>
  >;
};

const SkillCard = ({ setFilter }: SkillCardProps) => {
  const handleStarRatingChange = useCallback(
    (profession: string) => (rating: number) => {
      setFilter((prev) => ({
        ...prev,
        skillFilter: {
          ...prev.skillFilter,
          [profession]: getRatingToXP(rating),
        },
      }));
    },
    [setFilter]
  );

  return (
    <div
      style={{
        height: "340px",
        padding: "10px",
        width: "300px",
        marginTop: "70px",
        borderRadius: "8px",
        border: "4px solid #ccc",
        color: "white",
      }}
    >
      <h4 className="card-title mb-2">Skill Filter</h4>
      <hr />
      <div className="card-text">
        <div>AI: </div>
        <StarRating onChange={handleStarRatingChange("AILvl")} />
      </div>
      <div className="card-text">
        <div>Software Development: </div>
        <StarRating
          onChange={handleStarRatingChange("softwareDevelopmentLvl")}
        />
      </div>
      <div className="card-text">
        <div>Cloud Computing: </div>
        <StarRating onChange={handleStarRatingChange("cloudComputingLvl")} />
      </div>
      <div className="card-text">
        <div>Problem Solving: </div>
        <StarRating onChange={handleStarRatingChange("problemSolving")} />
      </div>
      <div className="card-text">
        <div>Time Management: </div>
        <StarRating onChange={handleStarRatingChange("timeManagement")} />
      </div>
    </div>
  );
};

export default SkillCard;
