import { NextRequest, NextResponse } from "next/server";
import { getUrl } from './lib/get-url';

export function middleware(request: NextRequest) {
   const token = request.cookies.get('authjs.session-token');
   const pathname = request.nextUrl.pathname;

   // console.log({
   //    token: token?.value,
   //    pathname: pathname
   // })

   if (pathname === '/auth' && token) {
      return NextResponse.redirect(new URL(getUrl('/app')));
   }

   //Qualquer page criada na rota app agora esta protegida. Ja que toda rota la começaria com /app
   if (pathname.includes('/app') && !token) {
      return NextResponse.redirect(new URL(getUrl('/auth')));
   }
}

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
