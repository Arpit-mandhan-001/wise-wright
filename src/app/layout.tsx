import "./globals.css";
import { Poppins } from "next/font/google";
import NavBar from "@/components/NavBar"; // Adjust the import path if needed

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <NavBar />
        {children}
      </body>
    </html>
  );
}