import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat with Resume",
  description: "1st tool by Krisper.ai",
};

export default function RootLayout({ children }) {
  return (

      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
            {children}
          </ThemeProvider>
        </body>
      </html>

  );
}
