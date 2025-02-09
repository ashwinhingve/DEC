import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from '../contexts/AuthContext';
import "./globals.css";
import Navbar from "./component/nav"
import Footer from "./component/foot"
import { Toaster } from 'react-hot-toast';
// import SessionWrapper from "./authcom/SessionWrapper"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DIVY EMPLOYMENT CORNER PRIVATE LIMITED",
  description: "EMPLOYMENT website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <SessionWrapper> */}
      <AuthProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#fff',
              color: '#363636',
              padding: '16px',
              borderRadius: '8px',
            }
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
      </AuthProvider>
      {/* </SessionWrapper> */}
    </html>
  );
}
