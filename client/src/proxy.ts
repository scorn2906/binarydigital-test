import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export default function proxy(request: NextRequest){
//     const cookiesStore = cookies()
//     const token = await cookiesStore.get('binary:user')
//     console.log('cookies: ', request.cookies.get('binary:user'))
//     let isAuthenticated = false
//     console.log('token: ', token)
//     if(token){
//         try {
//             const userData = JSON.parse(token)
//             console.log('userData: ', userData)
//             isAuthenticated = !!userData?.state?.access_token
//         } catch (error) {
//             console.error('Failed parse token: ', token)
//         }
//     }

//     const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')

//     if(isAuthenticated && isAuthPage) return NextResponse.redirect(new URL('/', request.url))
//     if(!isAuthenticated && !isAuthPage) return NextResponse.redirect(new URL('/login', request.url))

    
//     return NextResponse.next()
// }

// export const config = {
//     matcher: [
//     /*
//      * Match all request paths except:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
}