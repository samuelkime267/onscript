import Providers from "@/components/Providers";
import { generateMetadata } from "@/data/generateMetadata.data";
import { viewport } from "@/data/viewport.data";
import { fonts } from "@/data/fonts.data";
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
      <body className={`bg-white ${fonts}`}>
        <Providers>
          <div className="max-w-xl mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
