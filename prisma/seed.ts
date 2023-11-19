import { PrismaClient } from "@prisma/client";
import { getEmbeddings } from "@src/utils/helpers";
import OpenAI from "openai";
import professorData from "./data - professor.json";
import classData from "./data - class.json";
import clubData from "./data - club.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

async function main() {
  const jsonData = [
    {
      data: professorData,
      name: "professor",
    },
    {
      data: classData,
      name: "class",
    },
    {
      data: clubData,
      name: "club",
    },
  ];

  await jsonData.forEach(({ data, name }) => {
    const embeddedData = data.map(async (_row) => {
      let embedding: number[] = [];

      if (name === "professor") {
        const row = _row as (typeof professorData)[0];
        embedding = (
          await getEmbeddings(row.name + " " + row.researchDescription, openai)
        ).data[0].embedding;
      } else if (name === "class") {
        const row = _row as (typeof classData)[0];
        embedding = (
          await getEmbeddings(
            row.className + " " + row.classExplanation,
            openai
          )
        ).data[0].embedding;
      } else if (name === "club") {
        const row = _row as (typeof clubData)[0];
        embedding = (
          await getEmbeddings(row.name + " " + row.explanation, openai)
        ).data[0].embedding;
      }

      return {
        ..._row,
        embedding,
      };
    });

    Promise.all(embeddedData).then(async (embeddedData) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await prisma[name].createMany({
        data: embeddedData,
      });
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect().then(() => console.log("Success :>!"));
  })
  .catch(async (e) => {
    console.log("Error :<!");
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
