import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { AuthProvider } from "@/lib/auth-providers";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/redux/theme-providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TMK Visa",
  description: "TMK Visa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
