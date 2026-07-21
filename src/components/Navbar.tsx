import React from "react";
import { motion } from "motion/react";
import { Code2, Bookmark, Sparkles, Star } from "lucide-react";

interface NavbarProps {
  onHomeClick: () => void;
  onBookmarksClick: () => void;
  onRandomClick: () => void;
  bookmarkCount: number;
  currentView: "home" | "results" | "bookmarks";
}

export default function Navbar({
  onHomeClick,
  onBookmarksClick,
  onRandomClick,
  bookmarkCount,
  currentView
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <button
          onClick={onHomeClick}
          className="group flex items-center gap-2.5 bg-transparent p-0 text-left cursor-pointer transition-transform duration-150 active:scale-95 border-0 focus:outline-none"
          aria-label="Mr. Git Home"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black text-zinc-100 shadow-md group-hover:border-zinc-700 group-hover:text-blue-400 transition-colors">
            <Code2 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            <div className="absolute inset-0 rounded-lg bg-blue-500/10 opacity-0 blur group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-zinc-200">
              Mr. Git
            </span>
            <span className="hidden sm:block font-sans text-[10px] text-zinc-500 tracking-wider font-medium">
              FIND YOUR NEXT CONTRIBUTION
            </span>
          </div>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onHomeClick}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
              currentView === "home"
                ? "text-blue-400 bg-blue-500/10"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            Find Issues
          </button>

          <button
            onClick={onRandomClick}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg cursor-pointer transition-colors"
            title="Generate a random search of opportunities"
          >
            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>Random Match</span>
          </button>

          <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block" />

          {/* Bookmarks Trigger */}
          <button
            onClick={onBookmarksClick}
            className={`relative flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg cursor-pointer transition-all ${
              currentView === "bookmarks"
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${currentView === "bookmarks" ? "fill-blue-400/20" : ""}`} />
            <span>Bookmarks</span>
            {bookmarkCount > 0 && (
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                key={bookmarkCount}
                className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1.5 text-[10px] font-bold text-white shadow-lg shadow-blue-500/20"
              >
                {bookmarkCount}
              </motion.span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
