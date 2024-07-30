import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const res = await req.json();
    // Set cookie
    return new NextResponse(
      JSON.stringify({
        message: 'Cookie has been set successfully',
        success: true,
      }),
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${res.token}; Path=/; SameSite=Strict`,
          'Content-Type': 'application/json',
        },
        // HttpOnly
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: 'Failed to set cookie',
        success: false,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
