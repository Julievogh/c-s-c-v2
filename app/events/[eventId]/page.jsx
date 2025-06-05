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
      <section className="px-6 py-12 text-center text-[color:var(--color-dark-espresso)] font-karla">
        <h1 className="text-2xl font-bold">Event Not Found</h1>
        <p className="mt-4">Sorry, we couldn’t find that event.</p>
        <Link href="/calendar" className="btn btn-outline">
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
    <section className="px-6 py-12 max-w-3xl mx-auto space-y-8 text-[color:var(--color-dark-espresso)] font-karla">
      <Link
        href="/calendar"
        className="text-sm text-[color:var(--color-dark-green)]  hover:underline"
      >
        ← Back to Calendar
      </Link>

      <h1 className="text-4xl font-hero-family">{event.title}</h1>
      <p className="text-sm text-[color:var(--color-dark-green)]">
        {eventDate}
      </p>

      <div className="relative w-full h-64 rounded-xl overflow-hidden shadow">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      <p className="leading-relaxed">{event.description}</p>

      {signupComplete ? (
        <div className="text-center text-[color:var(--color-dark-green)] font-display-family text-lg">
          Thank you for signing up — you'll receive a confirmation email soon.
        </div>
      ) : event.status === "sold out" ? (
        <div className="flex justify-center">
          <button
            disabled
            className="px-5 py-2 rounded-full text-sm bg-gray-300 text-gray-600 font-display-family cursor-not-allowed"
          >
            Sold Out
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            type="button"
            className="btn btn-primary px-5 py-2 text-sm rounded-full cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Sign Up
          </button>
        </div>
      )}

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
