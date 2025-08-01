"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // check if token exists
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }

  }, []);

  return (
    <div className="font-sans grid  items-center justify-center m-auto justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Loader />
    </div>
  );
}
