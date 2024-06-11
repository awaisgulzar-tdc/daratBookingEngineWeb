"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AdminPannel from "./_components/AdminPannel";
import { useRouter } from "next/navigation";

function Page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Change 1: Conditional return to prevent server-side rendering issues
  if (typeof window === 'undefined') {
    return null;
  }

  useEffect(() => {
    // Change 2: Ensure this runs only on the client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (token && role === "Admin") {
        router.push("/adminpanel");
      } else {
        router.push("/");
      }

      setLoading(false);
    }
  }, [router]);

  return (
    <Box>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box sx={{ width: "950px", overflowY: "auto" }}>
          <AdminPannel />
        </Box>
      )}
    </Box>
  );
}

export default Page;
