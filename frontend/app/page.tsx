"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import UploadBox from "@/components/UploadBox";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              GrowEasy AI CSV Importer
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Upload any CRM CSV and let AI intelligently map it into GrowEasy CRM format.
            </p>

          </div>

          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="rounded-xl border bg-white p-3 shadow transition hover:scale-105 dark:bg-slate-800 dark:text-white"
          >
            {theme === "dark" ? (
              <Sun size={22} />
            ) : (
              <Moon size={22} />
            )}
          </button>

        </div>

        <UploadBox />

      </div>

    </main>
  );
}