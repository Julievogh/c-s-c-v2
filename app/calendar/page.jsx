"use client";

import { useState, useMemo } from "react";
import { events } from "@/lib/events";
import Popups from "@/components/Events";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CalendarPage() {
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);
  const [view, setView] = useState("list");

  const filtered = useMemo(() => {
    const list =
      month === 0
        ? events
        : events.filter((e) => new Date(e.date).getMonth() + 1 === month);
    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [month]);

  return (
    <section className="bg-[var(--color-warm-white)] text-[var(--color-dark-espresso)] font-karla py-16 px-6">
      <div>
        <Popups />
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h1 className="font-display text-4xl">Upcoming Events</h1>

          <div className="flex items-center gap-3">
            <select
              value={month}
              onChange={(e) => setMonth(+e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value={0}>All months</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>

            <button
              onClick={() => setView("list")}
              className={`btn ${
                view === "list"
                  ? "btn-primary"
                  : "border border-[var(--color-dark-green)] text-[var(--color-dark-green)]"
              } text-sm px-3 py-1 rounded-full`}
            >
              List
            </button>
            <button
              onClick={() => setView("grid")}
              className={`btn ${
                view === "grid"
                  ? "btn-primary"
                  : "border border-[var(--color-dark-green)] text-[var(--color-dark-green)]"
              } text-sm px-3 py-1 rounded-full`}
            >
              Grid
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p
              key="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500"
            >
              No events in this month.
            </motion.p>
          ) : view === "list" ? (
            <motion.ul
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {filtered.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border border-[var(--color-dark-green)] rounded-lg p-5 bg-white shadow-sm"
                >
                  <div className="font-display text-lg">
                    <span className="text-[var(--color-dark-green)] font-semibold">
                      {new Date(e.date).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>{" "}
                    – {e.title}
                  </div>
                  <Link
                    href={`/events/${e.id}`}
                    className={`mt-2 sm:mt-0 text-sm rounded-full px-4 py-1 ${
                      e.status === "sold out"
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "btn btn-primary"
                    }`}
                  >
                    {e.status === "sold out" ? "Sold Out" : "Read More"}
                  </Link>
                </li>
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((e, i) => (
                <motion.div
                  key={e.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg overflow-hidden shadow border border-[var(--color-dark-green)] bg-white"
                >
                  <div className="relative h-40">
                    <Image
                      src={e.image}
                      alt={e.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-display text-lg">{e.title}</h3>
                    <p className="text-sm text-[var(--color-dark-green)]">
                      {new Date(e.date).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <Link
                      href={`/events/${e.id}`}
                      className={`inline-block px-4 py-1 text-sm rounded-full ${
                        e.status === "sold out"
                          ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                          : "btn btn-primary"
                      }`}
                    >
                      {e.status === "sold out" ? "Sold Out" : "Read More"}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
