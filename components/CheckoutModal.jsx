// components/CheckoutModal.jsx
"use client";

import { useState } from "react";

export default function CheckoutModal({ title, price, slug, onClose }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const placeOrder = async () => {
    setLoading(true);
    const res = await fetch("/api/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, name, address, email }),
    });
    const { orderId } = await res.json();
    setOrderId(orderId);
    setStep(3);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[color:var(--color-soft-beige)] bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md shadow-xl relative border border-[color:var(--color-dark-espresso)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[color:var(--color-dark-espresso)] text-xl hover:text-[color:var(--color-deep-wine)] cursor-pointer"
        >
          ✕
        </button>

        {step === 1 && (
          <>
            <h2 className="text-2xl font-display-family font-bold mb-2 text-[color:var(--color-dark-espresso)]">
              Reserve Your Piece
            </h2>
            <p className="mb-4">
              <strong>{title}</strong> — <strong>{price} DKK</strong>
            </p>
            <p className="text-sm text-[color:var(--color-dark-espresso)] mb-6">
              This item is <strong>made to order</strong> and part of a
              <strong> limited edition</strong> run. You’re signing up to
              reserve your piece — confirmation will be sent via email.
            </p>
            <button
              onClick={() => setStep(2)}
              className="btn btn-primary w-full cursor-pointer"
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-display-family font-semibold mb-4">
              Your Information
            </h2>
            <label className="block mb-3">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 border border-[color:var(--color-dark-espresso)] w-full p-2 rounded bg-white"
                placeholder="Full name"
              />
            </label>
            <label className="block mb-3">
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 border border-[color:var(--color-dark-espresso)] w-full p-2 rounded bg-white"
                placeholder="you@example.com"
              />
            </label>
            <label className="block mb-4">
              Shipping Address
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 border border-[color:var(--color-dark-espresso)] w-full p-2 rounded bg-white"
                placeholder="Street, City, Postal Code"
              />
            </label>
            <button
              onClick={placeOrder}
              disabled={!name || !email || !address || loading}
              className="btn btn-secondary w-full disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Submitting..." : "Reserve Now"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-display-family font-bold mb-2 text-[color:var(--color-dark-green)]">
              You're In!
            </h2>
            <p className="mb-4 text-[color:var(--color-dark-espresso)]">
              You've reserved your limited edition piece. A confirmation will be
              sent to your email shortly.
            </p>
            <p className="text-sm text-[color:var(--color-dark-espresso)] mb-6">
              (Mock Order ID: <strong>{orderId}</strong>)
            </p>
            <button
              onClick={onClose}
              className="btn btn-primary w-full cursor-pointer"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
