import { NextRequest, NextResponse } from "next/server";
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

function extractJsonFromString(inputString: string) {
    try {
        const jsonStart = inputString.indexOf('{');
        const jsonEnd = inputString.lastIndexOf('}');

        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
            const potentialJson = inputString.slice(jsonStart, jsonEnd + 1);
            const parsedJson = JSON.parse(potentialJson);

            // Format birth_date to "YYYY-MM-DD"
            if (parsedJson.birth_date) {
                parsedJson.birth_date = parsedJson.birth_date.replace(/\./g, '-');
            }

            // Translate Arabic gender to English
            if (parsedJson.gender) {
                parsedJson.gender = parsedJson.gender === "ذكر" ? "male" : "أنثى" ? "female" : parsedJson.gender;
            }

            return JSON.stringify(parsedJson, null, 2); // Pretty-print the JSON
        } else {
            throw new Error("No valid JSON found in the string");
        }
    } catch (error: any) {
        return `Invalid JSON: ${error.message}`;
    }
}


export async function POST(req: NextRequest) {
    try {
        const imageBlob = await req.blob();

        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;
        if (!apiKey) {
            throw new Error('Google AI API Key not set in environment variables.');
        }

        const fileManager = new GoogleAIFileManager(apiKey);

        // Convert the imageBlob to a Buffer
        const buffer = Buffer.from(await imageBlob.arrayBuffer());

        // Write the buffer to a temporary file
        const tempFilePath = join(tmpdir(), 'captured-image.jpg');
        await fs.writeFile(tempFilePath, buffer);

        // Upload the file
        const uploadResult = await fileManager.uploadFile(tempFilePath, {
            mimeType: 'image/jpeg',
            displayName: 'captured-image.jpg',
        });

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent([
            'extract just details of id card with index and value as json file for only those information: National Identification Number as "nin", first and last names (make sure to put all the names if they have more than one) as "first_name", last name as "last_name", date of birth as "birth_date", place of birth as "birth_place", gender as "gender" .. if the image doesn\'t have any id card, return empty json file',
            {
                fileData: {
                    fileUri: uploadResult.file.uri,
                    mimeType: uploadResult.file.mimeType,
                },
            },
        ]);

        const cleanedResponseText = extractJsonFromString(result.response.text());
        
        const jsonResponse = JSON.parse(cleanedResponseText);
        return NextResponse.json({ success: true, data: jsonResponse }, { status: 200 });
    } catch (error: any) {
        console.error('Error processing image:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}