"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccessPage() {
  const [guestCode, setGuestCode] = useState("");
  const router = useRouter();

  const handleGuestAccess = () => {
    if (guestCode === "cozy2025") {
      router.push("/your-event/summer-party"); // Or dynamic slug
    } else {
      alert("Wrong code 😓");
    }
  };

  const handleHostLogin = () => {
    const password = prompt("Enter host password:");
    if (password === "superhost") {
      router.push("/your-event/summer-party"); // Host sees same page or a special one later
    } else {
      alert("Wrong password 😬");
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-6 space-y-6 text-center">
      <h1 className="text-3xl font-bold">Enter Your Event</h1>
      <p>Type your access code or login as host:</p>

      <input
        type="text"
        placeholder="Guest Code"
        value={guestCode}
        onChange={(e) => setGuestCode(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <button onClick={handleGuestAccess} className="btn btn-outline w-full">
        Enter as Guest
      </button>

      <p>
        Host?{" "}
        <button onClick={handleHostLogin} className="underline text-blue-500">
          Login here
        </button>
      </p>
    </div>
  );
}
