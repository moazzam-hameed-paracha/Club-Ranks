import OpenAI from "openai";

export type ExperienceLevel =
  | "Beginner"
  | "Adequate"
  | "Exposed"
  | "Advanced"
  | "Expert";

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

export const dotProduct = (vecA: number[], vecB: number[]) => {
  return vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
};

export const norm = (vec: number[]) => {
  return Math.sqrt(vec.reduce((acc, val) => acc + val ** 2, 0));
};

export const cosineSimilarity = (vecA: number[], vecB: number[]) => {
  const dotProductValue = dotProduct(vecA, vecB);
  const normA = norm(vecA);
  const normB = norm(vecB);

  if (normA === 0 || normB === 0) {
    return 0; // Avoid division by zero
  }

  return dotProductValue / (normA * normB);
};

export const getEmbeddings = async (
  text: string,
  openai: OpenAI,
  model = "text-embedding-ada-002"
) => {
  const embeddings = await openai.embeddings.create({
    input: text,
    model,
  });

  return embeddings;
};

export type GPTPromptType = Array<{
  content: string;
  name: string;
}>;

export const getGPTPrompt = async (
  data: Array<{ name: string; description: string }>,
  resumeTxt: string,
  type: "professor" | "club" | "class",
  openai: OpenAI
) => {
  const valMap = {
    professor: {
      name: "Professor Name",
      description: "Professor Description",
    },
    club: {
      name: "Club Name",
      description: "Club Description",
    },
    class: {
      name: "Class Name",
      description: "Class Description",
    },
  };

  const prompt = `
  Based on the following student's skills and experiences, provide very concise explanations for why they might fit in each of the five recommended ${type}(do not just list experiences, say how would they be relevant).
  Each explanation should be brief and to the point. Format each explanation as a JSON object.

  Student's Skills and Experiences:
  ${resumeTxt}

  ${type} Recommendations:
  1. ${valMap[type].name}: ${data[0].name}
    ${valMap[type].description}:  ${data[0].description}
  2. ${valMap[type].name}: ${data[1].name}
    ${valMap[type].description}:  ${data[1].description}
  3. ${valMap[type].name}:  ${data[2].name}
    ${valMap[type].description}: ${data[2].description}
  4. ${valMap[type].name}:  ${data[3].name}
    ${valMap[type].description}: ${data[3].description}

  Give the answer as a JSON array of objects, each object should have the following format:
  {
    "name": "<Name of the ${type}>",
    "content": "<Brief explanation in 1-2 sentences>"
  }
  `;

  const response = await openai.completions.create({
    prompt,
    model: "text-davinci-003",
    max_tokens: 500,
    temperature: 0.7,
  });
  
  return JSON.parse(
    response.choices[0].text.split("Answer:")[1]
  ) as GPTPromptType;
};
