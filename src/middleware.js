import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Protected Routes ,apply when user is already signIn
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/dashboard(.*)"
])

export default clerkMiddleware(async(auth, req)=>{
  const { userId } = await auth();

  if(!userId && isProtectedRoute(req)) {
   const { redirectToSignIn } = await auth();

   return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};