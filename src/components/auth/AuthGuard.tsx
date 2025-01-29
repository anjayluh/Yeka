"use client";

import { useEffect, useState } from "react";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import Spinner from "@/components/shared/Spinner";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setUser(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <Spinner />;

  return user ? <>{children}</> : null;
};

export default AuthGuard;
