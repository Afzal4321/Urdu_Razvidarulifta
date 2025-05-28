// src/app/auth/error.tsx
"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  useEffect(() => {
    if (error) {
      console.error("Authentication error:", error);
    }
  }, [error]);

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>An error occurred during the authentication process.</p>
      <p>Error: {error}</p>
    </div>
  );
};

export default ErrorPage;
