import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Navbar />

      <Header />

      <main className="">{children}</main>
    </div>
  );
}
