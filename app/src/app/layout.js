import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/mainComps/Sidebar";
import "@/app/css/sidebar.css"
import NavBar from "./components/mainComps/NavBar";
import "@/app/css/navbar.css"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Aqua track",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <div className="bg-[#F3F8FC] overflow-x-hidden">
          <nav className="navbar">
            <NavBar />
          </nav>
          <div className="flex">
            <aside className="sidebar overflow-x-hidden">
              <Sidebar />
            </aside>
            <main className="w-full overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
