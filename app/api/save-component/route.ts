import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming JSON body
    const body = await req.json();
    const { fileName, content } = body;

    // 2. Validate input
    if (!fileName || !content) {
      return NextResponse.json(
        { error: 'Missing fileName or content fields' }, 
        { status: 400 }
      );
    }

    // 3. Define the destination directory
    // process.cwd() gets the root folder of your Next.js project
    const directoryPath = path.join(process.cwd(), 'generated_page');

    // 4. Ensure the directory exists (create it if it doesn't)
    try {
      await fs.access(directoryPath);
    } catch {
      await fs.mkdir(directoryPath, { recursive: true });
    }

    // 5. Construct the full file path
    const filePath = path.join(directoryPath, fileName);

    // 6. Write the file to disk
    await fs.writeFile(filePath, content, 'utf-8');

    console.log(`✅ File saved successfully at: ${filePath}`);

    // 7. Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'File saved successfully',
      path: filePath 
    });

  } catch (error: any) {
    console.error('❌ Error saving file:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message }, 
      { status: 500 }
    );
  }
}