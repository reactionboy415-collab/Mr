import React from "react";
import { Bookmark, Trash2, ArrowLeft, BookMarked } from "lucide-react";
import { Opportunity } from "../types";
import OpportunityCard from "./OpportunityCard";

interface SavedBookmarksProps {
  bookmarks: Opportunity[];
  onToggleBookmark: (opp: Opportunity) => void;
  onClearAll: () => void;
  onBackToSearch: () => void;
}

export default function SavedBookmarks({
  bookmarks,
  onToggleBookmark,
  onClearAll,
  onBackToSearch
}: SavedBookmarksProps) {
  return (
    <div className="space-y-8 py-4">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div className="space-y-1.5">
          <button
            onClick={onBackToSearch}
            className="group flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Find Opportunities</span>
          </button>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <BookMarked className="h-6 w-6 text-blue-400" />
            <span>Saved Bookmarks</span>
            <span className="text-sm font-mono font-normal text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
              {bookmarks.length}
            </span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Keep track of open-source challenges you plan to solve. Bookmarks are saved in your local cache.
          </p>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={onClearAll}
            className="self-start sm:self-center text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3 flex items-center gap-1.5 transition-all cursor-pointer bg-transparent"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Remove All Bookmarks</span>
          </button>
        )}
      </div>

      {/* Bookmarks List */}
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarks.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              isBookmarked={true}
              onToggleBookmark={() => onToggleBookmark(opp)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 rounded-2xl border border-zinc-900 bg-zinc-950/20 p-8 max-w-xl mx-auto space-y-6">
          <div className="mx-auto h-14 w-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
            <Bookmark className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-white">
              No saved bookmarks yet
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto">
              Bookmark interesting issues from your search results to keep track of them here.
            </p>
          </div>
          <button
            onClick={onBackToSearch}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white text-black hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
          >
            <span>Start Searching</span>
          </button>
        </div>
      )}

    </div>
  );
}
