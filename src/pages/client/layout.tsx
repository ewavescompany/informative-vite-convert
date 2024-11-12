import i18n from "@/i18n";
import Footer from "@/customComponents/layoutComponents/footer";
import { Outlet } from "react-router-dom";

export default function ClientLayout() {
  const locale = i18n.language;

  return (
    <html lang="en">
      <body
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="antialiased font-[family-name:var(--font-geist-sans)] flex flex-col bg-graywhite bg"
        // className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)] flex flex-col bg-graywhite bg`}
      >
        {/* <Navbar /> */}
        <Outlet />
        <Footer />
      </body>
    </html>
  );
}
