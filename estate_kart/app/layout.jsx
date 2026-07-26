import "@/assets/styles/global.css";
import "@/components/navbar.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext"; // or your layout's path
import AuthProvider from "@/components/AuthProvider";
import "photoswipe/dist/photoswipe.css";
import EKChatbot from "@/components/EKChatbot";

export const metadata = {
  title: "Estate Kart | Find The Perfect Rentals",
  description:
    "Find Your Dream Rental Property — Browse, bookmark and contact owners for apartments, houses, condos and more.",
  keywords:
    "rental, find rentals, find properties, find property, room for rent, apartments, condos, houses",
};

const Mainlayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50">
        <AuthProvider>
          <GlobalProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <EKChatbot />
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3500}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Mainlayout;
