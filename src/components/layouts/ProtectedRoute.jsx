import { useEffect } from "react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/auth/login");
    }
  }, [router]);

  return children;
};

export default ProtectedRoute;
