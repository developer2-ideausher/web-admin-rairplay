import { Nunito_Sans, Quicksand } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});
export const metadata = {
  title: "Rairplay_Admin",
  description: "Created by Robin",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full bg-black text-white" lang="en">
      <body
        className={` h-full  ${quicksand.variable}
          ${nunitoSans.variable} antialiased`}
      >
        {children}
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}
