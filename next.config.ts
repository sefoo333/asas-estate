import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   
  images:{
    remotePatterns:[
      {
         protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
         protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
         protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        port: "",
        pathname: "/**",
      },
      
    ]
  },
  compiler:{
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
};

export default nextConfig;
