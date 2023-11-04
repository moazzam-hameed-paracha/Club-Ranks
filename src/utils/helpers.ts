import { ExperienceLevel } from "@src/pages/api/students";

export const getXpToRating = (level: ExperienceLevel) => {
  switch (level) {
    case "Beginner":
      return 1;
    case "Adequate":
      return 2;
    case "Exposed":
      return 3;
    case "Advanced":
      return 4;
    case "Expert":
      return 5;
  }
};

export const getRatingToXP = (rating: number): ExperienceLevel => {
  switch (rating) {
    case 1:
      return "Beginner";
    case 2:
      return "Adequate";
    case 3:
      return "Exposed";
    case 4:
      return "Advanced";
    case 5:
      return "Expert";
    default:
      return "Beginner";
  }
};
