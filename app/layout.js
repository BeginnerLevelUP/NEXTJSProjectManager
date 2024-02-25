
import { Inter } from "next/font/google";
import "./globals.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import AuthProvider from "./components/provider";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <StoreProvider>
                    {children}
          </StoreProvider>
        </AuthProvider> 
        </body>
    </html>
  );
}