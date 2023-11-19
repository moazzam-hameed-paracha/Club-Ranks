import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csv from "csv-parser";
import { getEmbeddings } from "@src/utils/helpers";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

async function main() {
  const csvPaths = [
    // "./prisma/data - club.csv",
    // "./prisma/data - class.csv",
    "./prisma/data - professor.csv",
  ];

  csvPaths.forEach((filePath) => {
    // get name from file path which comes after -
    const name = filePath.split("-")[1].split(".")[0].trim() as
      | "professor"
      | "class"
      | "club";

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (data) => {
        // Process each row of the CSV file here
        let embedding: number[] = [];
        if (name === "professor") {
          embedding = (
            await getEmbeddings(
              data.name + " " + data.researchDescription,
              openai
            )
          ).data[0].embedding;
        } else if (name === "class") {
          embedding = (
            await getEmbeddings(
              data.className + " " + data.classExplanation,
              openai
            )
          ).data[0].embedding;
        } else if (name === "club") {
          embedding = (
            await getEmbeddings(data.name + " " + data.explanation, openai)
          ).data[0].embedding;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await prisma[name].create({
          data: {
            ...data,
            embedding,
          },
        });
      });
  });
}

console.log(
  "Seeding data. This may take a few minutes depending on your internet speed."
);

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
