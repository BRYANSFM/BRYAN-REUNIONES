import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked async if using await inside
export function middleware(request: NextRequest) {
  const isLogin = request.nextUrl.pathname ==='/';
  const token = request.cookies.get('token')?.value
  const isRegisterAndValidation = request.nextUrl.pathname.includes('/auth/crear-usuario')
  if (isRegisterAndValidation) {
    return null
  } 
  if(!token && !isLogin ){
    return NextResponse.redirect(new URL('/', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|/favicon.ico).*)"],
}