import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muay Try - Top Muay Thai Experiences",
  description: "Your Muay Thai journey starts here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="https://npwekmkmdvrwcnuyueam.supabase.co/storage/v1/object/sign/logos/logo%20idea%20muaytry%203.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NmZjNiYjBkLTNhMmQtNDBjOS04ZWI2LWI5ZTk1NzcxYTJjNiJ9.eyJ1cmwiOiJsb2dvcy9sb2dvIGlkZWEgbXVheXRyeSAzLnBuZyIsImlhdCI6MTc0NjQxMjMyNSwiZXhwIjoxNzc3OTQ4MzI1fQ.eRwIhMyGq34EOxYlyoix9MJgzJ1XNWJqwgvMZ_npezs" />
      </head>
      <body className={`${inter.className} bg-sky-950 text-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
