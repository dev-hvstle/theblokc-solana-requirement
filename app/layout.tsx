import SolanaProvider from "@/provider/SolanaProvider";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solana Test",
  description: "Solana Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SolanaProvider>{children}</SolanaProvider>
      </body>
    </html>
  );
}
