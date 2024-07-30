import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear cookie
    return new NextResponse(
      JSON.stringify({
        message: 'Cookie has been cleared successfully',
        success: true,
      }),
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=; Path=/; SameSite=Strict; Max-Age=0`,
          'Content-Type': 'application/json',
        },
        // HttpOnly
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: 'Failed to clear cookie',
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
