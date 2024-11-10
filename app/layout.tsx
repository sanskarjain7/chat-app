import { Nunito_Sans } from "next/font/google"
import "./globals.css";

const nunito = Nunito_Sans({ weight: "400", subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={nunito.className}
      >
        {children}
      </body>
    </html>
  );
}
