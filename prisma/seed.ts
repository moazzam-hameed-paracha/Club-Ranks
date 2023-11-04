import { PrismaClient } from '@prisma/client';
import Papa from 'papaparse';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
	const csvFilePath = './prisma/data.csv'; // Replace with the path to your CSV file

	const results: any[] = [];

	fs.createReadStream(csvFilePath)
		.pipe(csv())
		.on('data', (data) => {
			// Process each row of the CSV file here
			results.push(data);
		})
		.on('end', () => {
			prisma.professor
				.createMany({
					data: results,
				})
				.then(() => {
					console.log('Success :>!');
				})
				.catch(() => {
					console.log('Error :<!');
				});
		});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
