import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

function handleCheckLogin(req:NextRequest) {
	const value = req.cookies.get('token');
	return value;
}


export function middleware(req:NextRequest) {
	if (
		req.nextUrl.pathname.startsWith('/admin') 
	) {
		const accessToken = handleCheckLogin(req);
		if (accessToken) {
			return NextResponse.next();
		}
		return NextResponse.redirect(new URL('/', req.nextUrl));
	}
}

export const config = {
	matcher: ['/admin/:path*'],
};
