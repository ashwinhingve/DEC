// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from './AuthProvider';

// type ProtectedRouteProps = {
//   children: React.ReactNode;
//   requiredRole?: 'admin' | 'user';
// };

// export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.replace('/login');
//     } else if (requiredRole && user.role !== requiredRole) {
//       router.replace('/unauthorized');
//     }
//   }, [user, requiredRole, router]);

//   if (!user || (requiredRole && user.role !== requiredRole)) {
//     return null;
//   }

//   return children;
// }


'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/');
    }
  }, [router]);

  return children;
}