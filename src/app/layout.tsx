import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthContextProvider from "./contexts/AuthContextProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo List",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider session={session}>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
