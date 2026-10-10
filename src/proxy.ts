
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;


  if (pathname === "/signin" || pathname === "/signup") {
    return NextResponse.next();
  }

 
  const session = await auth.api.getSession({
    headers: request.headers,
  });


  if (!session?.user) {
    const signInUrl = new URL("/signin", request.url);

    signInUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(signInUrl);
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
