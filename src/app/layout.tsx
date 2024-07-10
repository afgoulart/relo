import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Analyzer Mock UI",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 font-sans`}>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
