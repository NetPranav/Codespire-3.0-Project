import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const { code, filename = 'test.tsx' } = await req.json();
    
    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    // Define the path where you want to save the file
    // This will save in the root of your project. Adjust as needed.
    const filePath = join(process.cwd(), filename);

    try {
      // Write the file
      await writeFile(filePath, code, 'utf-8');
      
      console.log(`File saved successfully: ${filePath}`);
      
      return NextResponse.json({ 
        success: true, 
        message: `Code saved to ${filename}`,
        filePath: filePath
      });
      
    } catch (writeError) {
      console.error('Error writing file:', writeError);
      return NextResponse.json({ 
        error: 'Failed to write file',
        details: writeError 
      }, { status: 500 });
    }

  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ 
      error: 'Server error',
      details: err 
    }, { status: 500 });
  }
}