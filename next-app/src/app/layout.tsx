import type { Metadata } from "next";

import "@/styles/globals.css";

import "rsuite/dist/rsuite-no-reset.min.css";
// import "rsuite/dist/rsuite.min.css";
// import "rsuite/Button/styles/index.css";
import { CustomProvider } from "rsuite";
import { MyHeader } from "@/sections/layouts/MyHeader";
import { ToolsProvider } from "@/context/tools";

export const metadata: Metadata = {
  title: "Ô Fil de la Durance",
  description: "Lovely appartments in the south of France",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={""}>
        <CustomProvider>
          <ToolsProvider>
            {children}
            <MyHeader />
          </ToolsProvider>
        </CustomProvider>
      </body>
    </html>
  );
}
