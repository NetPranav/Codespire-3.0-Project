import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const relativePath = searchParams.get('path');

    if (!relativePath) {
      return NextResponse.json({ error: 'File path is required' }, { status: 400 });
    }

    // 1. Construct the full path
    // Assuming 'DataSet' is in your root or inside 'app'. Adjust 'process.cwd()' logic if needed.
    const filePath = path.join(process.cwd(), relativePath);

    // 2. Security: Prevent directory traversal and restrict extensions
    const resolvedPath = path.resolve(filePath);
    const rootPath = process.cwd();
    
    // Ensure the path is inside the project
    if (!resolvedPath.startsWith(rootPath)) {
       return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Ensure we are only downloading code files
    const allowedExtensions = ['.tsx', '.jsx', '.ts', '.js'];
    const ext = path.extname(resolvedPath);
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // 3. Check if file exists
    if (!fs.existsSync(resolvedPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // 4. Read file
    const fileContent = fs.readFileSync(resolvedPath, 'utf8');
    
    // 5. Get filename for download
    const fileName = path.basename(resolvedPath);

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain', // Treats as text so browser doesn't try to execute
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });

  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}