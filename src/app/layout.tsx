import type { Metadata } from "next";
import Progressbar from "@/components/Progressbar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from '@/components/ThemeProvider';
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';
import { ScrollToTop } from '@/components/ScrollToTop';

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
      <body className="flex min-h-screen flex-col">
        <Progressbar />
        <ThemeProvider>
        <Navbar/>
        <ScrollToTop />
        <main className="flex-grow">
          {children}
        </main>
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
