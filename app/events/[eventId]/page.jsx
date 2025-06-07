"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { events } from "@/lib/events";
import EventSignupModal from "@/components/EventSignupModal";

export default function EventPage() {
  const params = useParams();
  const eventId = params?.eventId;
  const [showModal, setShowModal] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);

  const event = events.find((e) => e.id === eventId);

  if (!eventId || !event) {
    return (
      <section className="px-6 py-12 text-center text-[color:var(--color-dark-espresso)] font-karla bg-[var(--color-warm-white)]">
        <h1 className="text-2xl font-hero-family">Event Not Found</h1>
        <p className="mt-4">Sorry, we couldn’t find that event.</p>
        <Link href="/calendar" className="btn btn-outline mt-6">
          ← Back to Calendar
        </Link>
      </section>
    );
  }

  const eventDate = new Date(event.date).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="px-6 py-12 max-w-3xl mx-auto space-y-8 font-karla text-[color:var(--color-dark-espresso)] bg-[var(--color-warm-white)]">
      {/* Back button in CSC style */}
      <Link href="/calendar" className="btn btn-outline w-fit">
        ← Back to Calendar
      </Link>

      {/* Event title and date */}
      <div>
        <h1 className="text-4xl font-hero-family">{event.title}</h1>
        <p className="text-sm text-[color:var(--color-dark-green)] mt-1">
          {eventDate}
        </p>
      </div>

      {/* Event image */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden shadow">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Event description */}
      <p className="leading-relaxed text-[color:var(--color-dark-espresso)]">
        {event.description}
      </p>

      {/* Extra info section */}
      <div className="space-y-2 text-sm text-[color:var(--color-dark-espresso)]">
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Price:</strong> {event.price}
        </p>
        <p>
          <strong>Capacity:</strong> {event.capacity} guests
        </p>
        <p>
          <strong>Hosts:</strong> {event.hosts?.join(", ")}
        </p>
        <p>
          <strong>Dress Code:</strong> {event.dressCode}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {event.tags?.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-[var(--color-sage-green)] text-xs text-white rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Signup status */}
      {signupComplete ? (
        <div className="text-center justify-center items-center text-[color:var(--color-dark-green)] font-display-family text-lg">
          Thank you for signing up — you'll receive a confirmation email soon.
        </div>
      ) : event.status === "sold out" ? (
        <div className="flex justify-center items-center">
          <button
            disabled
            className="btn bg-gray-300 text-gray-600 justify-center items-center font-display-family cursor-not-allowed"
          >
            Sold Out
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="btn btn-primary  rounded-full"
            onClick={() => setShowModal(true)}
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Modal logic */}
      {showModal && (
        <EventSignupModal
          eventTitle={event.title}
          eventId={event.id}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            setSignupComplete(true);
          }}
        />
      )}
    </section>
  );
}
