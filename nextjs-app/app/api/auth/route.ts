import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const CORRECT_PASSWORD = 'faith2025';
const MAX_DAYS = 3; // Session expires after 3 days

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === CORRECT_PASSWORD) {
      const cookieStore = await cookies();

      // Set HTTP-only cookie that expires in 3 days
      cookieStore.set('pitch_authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: MAX_DAYS * 24 * 60 * 60, // 3 days in seconds
        path: '/',
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Incorrect password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}

// Verify authentication status
export async function GET() {
  try {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('pitch_authenticated');

    return NextResponse.json({
      authenticated: isAuthenticated?.value === 'true',
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}

// Logout endpoint
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('pitch_authenticated');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to logout' },
      { status: 500 }
    );
  }
}
