import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Providers from "@/context/Provider";
import Wrapper from "@/componants/Wrapper";

const geistSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});


export const metadata: Metadata = {
  title: "3qare",
  description: "3qary website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const headersList = headers();
  // const fromMiddleware = await headersList.then((e) => {
  //   return e.get("x-pathname") || "";
  // });




  return ( 
    <html lang="en">
      <Providers>
      <body className={`${geistSans.className} antialiased`}>
        <Wrapper>
         {children}
        </Wrapper>
       {/* <PageTransitionProvider> */}
       {/* </PageTransitionProvider> */}
        {/* { fromMiddleware === "" ? <Footer /> : null} */}
      </body>
      </Providers>
    </html>
  );
}
