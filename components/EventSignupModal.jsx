"use client";
import { useState } from "react";

export default function EventSignupModal({ eventTitle, eventId, onClose }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const res = await fetch("/api/events/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, name, email, message }),
    });
    if (res.ok) {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[color:var(--color-soft-beige)] p-8 rounded-2xl max-w-md w-full relative border border-[color:var(--color-dark-espresso)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl hover:text-[color:var(--color-deep-wine)] cursor-pointer"
        >
          ✕
        </button>

        {success ? (
          <>
            <h2 className="text-2xl font-bold text-[color:var(--color-dark-green)] mb-4">
              You're signed up!
            </h2>
            <p className="text-[color:var(--color-dark-espresso)]">
              We'll be in touch soon via email.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Sign up for{" "}
              <span className="text-[color:var(--color-dark-green)]">
                {eventTitle}
              </span>
            </h2>
            <label className="block mb-3">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full rounded border"
              />
            </label>
            <label className="block mb-3">
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full rounded border"
              />
            </label>
            <label className="block mb-4">
              Message (optional)
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 p-2 w-full rounded border"
              />
            </label>
            <button
              onClick={handleSignup}
              className="btn btn-primary w-full disabled:opacity-50 cursor-pointer"
              disabled={!name || !email || loading}
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
