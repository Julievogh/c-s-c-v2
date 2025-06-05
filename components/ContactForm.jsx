"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "", // 👈 VIGTIGT!
    message: "",
    event_type: "Private",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sender...");

    try {
      const res = await fetch("http://localhost:1337/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: form }),
      });

      if (res.ok) {
        setStatus("Besked sendt!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        const error = await res.json();
        console.error("Strapi-fejl:", error);
        setStatus("Noget gik galt 😓");
      }
    } catch (err) {
      console.error("Fetch-fejl:", err);
      setStatus("Serverfejl 😭");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="event_type"
        value={form.event_type}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="Private">Private</option>
        <option value="Business">Business</option>
      </select>

      <textarea
        name="message"
        placeholder="Message - Any details we need to know?"
        value={form.message}
        onChange={handleChange}
        className="w-full border p-2 rounded min-h-[150px]"
        required
      />
      <button type="submit" className="btn btn-outline">
        Send
      </button>

      {status && <p className="text-sm text-gray-600 mt-2">{status}</p>}
    </form>
  );
}
