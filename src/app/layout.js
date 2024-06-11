"use client";
import React, { useEffect, useState } from "react";
import Header from "./home/_components/Header";
import Navbar from "./home/_components/Navbar";
import Footer from "./home/_components/Footer";
import Providers from "../../lib/redux/Providers";
import { usePathname, useRouter } from "next/navigation";
import { Box } from "@mui/material";
import Drawer from "../app/utilities/_components/Drawer";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const notShowNavbarFooterRoutes = [
    "/adminpanel",
    "/doctors",
    "/patientdata",
    "/services-provided",
    "/admin-products",
    "/schedule",
    "/discount",
    "/schedule/doctor-schedule",
    "/products",
    "/login",
    "/signup",
    `/schedule/doctor-schedule?id=`,
  ];

  const shouldNotShowNavbarFooter = notShowNavbarFooterRoutes.includes(pathname);

  // State to manage client-side rendering and role check
  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect to set the state to true when the component is mounted
  useEffect(() => {
    setIsClient(true);

    // Check for role only on client side
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("role");
      setIsAdmin(role === "Admin");
    }
  }, []);

  if (!isClient) {
    // Return null or a loading indicator if the component is not yet mounted on the client side
    return null;
  }

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Providers>
          {!shouldNotShowNavbarFooter ? (
            <Box>
              <Header />
              <Navbar />
              {children}
              <Footer />
            </Box>
          ) : (
            <Box>
              {pathname === "/login" || pathname === "/signup" ? (
                <Box>{children}</Box>
              ) : (
                <Box>
                  {isAdmin ? (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        gap: 1,
                        height: "100vh",
                      }}
                    >
                      <Box sx={{ width: "25%", flex: 1, overflowY: "auto" }}>
                        <Drawer />
                      </Box>
                      {children}
                    </Box>
                  ) : (
                    <Box onClick={() => router.back()}></Box>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Providers>
      </body>
    </html>
  );
}

RootLayout.getLayout = (page) => <RootLayout>{page}</RootLayout>;
