"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event_type: "Private",
    event_date: "",
    event_time: "",
    participants: "",
    location: "",
    budget: "",
    how_found: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sender...");

    try {
      const res = await fetch("https://formspree.io/f/meokedgl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("Besked sendt! ✨");
        setForm({
          name: "",
          email: "",
          phone: "",
          event_type: "Private",
          event_date: "",
          event_time: "",
          participants: "",
          location: "",
          budget: "",
          how_found: "",
          message: "",
        });
      } else {
        const error = await res.json();
        console.error("Formspree-fejl:", JSON.stringify(error, null, 2));
        setStatus("Noget gik galt 😓");
      }
    } catch (err) {
      console.error("Netværksfejl:", err);
      setStatus("Serverfejl 😭");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <p className="text-center max-w-xl mx-auto text-[var(--color-muted)] mb-6">
        Whether you're planning a private dinner, a cozy pop-up, or a creative
        event, Cozy Social Club would love to hear from you. Send us your ideas
        or questions – we'll get back to you as soon as possible to help bring
        your vision to life.
      </p>

      <input
        name="name"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <select
        name="event_type"
        value={form.event_type}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      >
        <option value="Private">Private</option>
        <option value="Business">Business</option>
        <option value="Custom Event">Custom Event</option>
      </select>

      <input
        name="event_date"
        type="date"
        value={form.event_date}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="event_time"
        type="time"
        value={form.event_time}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="participants"
        type="number"
        placeholder="Number of participants"
        value={form.participants}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="location"
        type="text"
        placeholder="Event location"
        value={form.location}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="budget"
        value={form.budget}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Budget (optional)</option>
        <option value="Under 5000 DKK">Under 5.000 DKK</option>
        <option value="5000-10000 DKK">5.000–10.000 DKK</option>
        <option value="Over 10000 DKK">Over 10.000 DKK</option>
      </select>

      <select
        name="how_found"
        value={form.how_found}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">How did you find us?</option>
        <option value="Instagram">Instagram</option>
        <option value="Friend">Friend</option>
        <option value="Google">Google</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        name="message"
        placeholder="Tell us about your event – food, vibe, style, wishes..."
        value={form.message}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded min-h-[150px]"
      />

      <div className="flex justify-center">
        <button type="submit" className="btn btn-outline">
          Send Booking Request
        </button>
      </div>

      {status && <p className="text-sm text-gray-600 mt-2">{status}</p>}
    </form>
  );
}
