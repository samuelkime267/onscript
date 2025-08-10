import Providers from "@/components/Providers";
import { generateMetadata } from "@/data/generateMetadata.data";
import { viewport } from "@/data/viewport.data";

import "@coinbase/onchainkit/styles.css";
import "@/styles/globals.css";

export { generateMetadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
