import "./styles.css";
import type { ReactNode } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PWARegister } from "@/components/PWARegister";

export const metadata = {
  title: "Kriya Catalog",
  description: "Product catalog + media library PWA",
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1rem", display: "flex", justifyContent: "space-between" }}>
          <strong>Kriya</strong>
          <LanguageSwitcher />
        </header>
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
