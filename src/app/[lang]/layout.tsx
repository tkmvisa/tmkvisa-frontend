import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/lib/auth-providers";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/redux/theme-providers";


const manrope = Manrope({ subsets: ["latin"] });

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
      <body className={manrope.className}>
        <ThemeProvider>
          <AuthProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
