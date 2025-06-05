"use client";

import { useState, useMemo } from "react";
import { events } from "@/lib/events";
import Popups from "@/components/Events";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CalendarPage() {
  // 1) default to first event’s month (fallback to current month)
  const firstMonth = events.length
    ? new Date(events[0].date).getMonth() + 1
    : new Date().getMonth() + 1;

  const [month, setMonth] = useState(firstMonth);
  const [view, setView] = useState("list"); // or "grid"

  // 2) filter & sort by date
  const filtered = useMemo(() => {
    const list = month
      ? events.filter((e) => new Date(e.date).getMonth() + 1 === month)
      : events;
    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [month]);

  return (
    <section className="col-span-12 py-16 px-6">
      <div>
        <Popups />
      </div>
      <div className="px-6 py-12 max-w-5xl mx-auto space-y-8">
        {/* — Controls — */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-display text-3xl">Calendar</h1>

          <div className="flex items-center gap-4">
            {/* Month selector */}
            <select
              value={month}
              onChange={(e) => setMonth(+e.target.value)}
              className="border p-2 rounded"
            >
              <option value={0}>All months</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>

            {/* View toggles */}
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded ${
                view === "list" ? "bg-green-600 text-white" : "border"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1 rounded ${
                view === "grid" ? "bg-green-600 text-white" : "border"
              }`}
            >
              Grid
            </button>
          </div>
        </div>

        {/* — Content — */}
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
              className="space-y-4"
            >
              {filtered.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border p-4 rounded"
                >
                  <div>
                    <span className="font-semibold">
                      {new Date(e.date).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>{" "}
                    – {e.title}
                  </div>
                  <Link
                    href={`/events/${e.id}`}
                    className={`mt-2 sm:mt-0 px-4 py-1 rounded text-sm ${
                      e.status === "sold out"
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-green-600 text-white"
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
                  className="border rounded-lg overflow-hidden shadow"
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
                    <p className="text-sm text-gray-600">
                      {new Date(e.date).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                    <Link
                      href={`/events/${e.id}`}
                      className="inline-block px-4 py-1 bg-green-600 text-white rounded text-sm"
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
