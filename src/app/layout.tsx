import type { Metadata } from "next";
import Progressbar from "@/components/Progressbar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from '@/components/ThemeProvider';
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Historia",
  description: "Learn about the history of the world",
  icons: {
    icon: "/logo1.svg",}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Progressbar />
        <ThemeProvider>
        <Navbar/>
        {children}
        <Footer />
        </ThemeProvider>
        <Toaster
          position="top-right"
          visibleToasts={1}
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
