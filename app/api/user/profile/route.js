import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';

async function handler(req) {
  // Both admin and regular users can access this route
  return NextResponse.json({
    success: true,
    message: 'User profile data',
    data: {
      // Your user profile data here
    }
  });
}

// export const GET = authMiddleware(handler);


// // In any protected page component
// import { useAuth } from '@/contexts/AuthContext';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const ProtectedPage = () => {
//   const { isAuthenticated, user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/auth');
//     }
//   }, [isAuthenticated]);

//   if (!isAuthenticated) {
//     return null;
//   }

//   return (
//     // Your protected page content
//   );
// };