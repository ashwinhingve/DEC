import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/nav"
import Footer from "./component/foot"
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
      {/* </SessionWrapper> */}
    </html>
  );
}
