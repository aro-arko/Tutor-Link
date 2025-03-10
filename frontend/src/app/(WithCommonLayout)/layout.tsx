import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="pt-16 md:pt-16 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
