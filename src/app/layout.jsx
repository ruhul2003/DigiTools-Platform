import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { CurrencyProvider } from "../context/CurrencyContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import CartDrawer from "../Components/CartDrawer";
import CheckoutModal from "../Components/CheckoutModal";
import CommandPalette from "../Components/CommandPalette";
import CompareFloatingBar from "../Components/CompareFloatingBar";

export const metadata = {
  title: "DigiTools Platform — Premium Digital Assets, AI Tools & Templates",
  description: "Accelerate your creative workflow with our curated catalog of AI writing assistants, automation toolkits, premium design templates, and productivity tools.",
  keywords: ["digital tools", "AI tools", "templates", "automation", "freelancer tools", "design assets"],
  authors: [{ name: "DigiTools Team" }],
  openGraph: {
    title: "DigiTools Platform — Premium Digital Assets & AI Tools",
    description: "Accelerate your creative workflow with our curated catalog of premium digital tools.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased selection:bg-purple-500 selection:text-white">
        <ThemeProvider>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <CommandPalette />
                <CompareFloatingBar />
                <CartDrawer />
                <CheckoutModal />
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
