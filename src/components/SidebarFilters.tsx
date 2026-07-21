import React from "react";
import { Filter, Search, Star, Flame, SortDesc, RotateCcw } from "lucide-react";

interface SidebarFiltersProps {
  repoSearch: string;
  onRepoSearchChange: (val: string) => void;
  selectedLanguage: string;
  onLanguageChange: (val: string) => void;
  languages: string[];
  selectedDifficulty: string;
  onDifficultyChange: (val: string) => void;
  minStars: number;
  onMinStarsChange: (val: number) => void;
  activeOnly: boolean;
  onActiveOnlyChange: (val: boolean) => void;
  sortBy: string;
  onSortByChange: (val: string) => void;
  onResetFilters: () => void;
  resultsCount: number;
}

export default function SidebarFilters({
  repoSearch,
  onRepoSearchChange,
  selectedLanguage,
  onLanguageChange,
  languages,
  selectedDifficulty,
  onDifficultyChange,
  minStars,
  onMinStarsChange,
  activeOnly,
  onActiveOnlyChange,
  sortBy,
  onSortByChange,
  onResetFilters,
  resultsCount
}: SidebarFiltersProps) {
  return (
    <aside className="w-full lg:w-72 lg:shrink-0 lg:sticky lg:top-24 space-y-6">
      
      {/* Title block */}
      <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-800/80 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-blue-400" />
          <span className="font-display font-bold text-sm tracking-wide text-white">
            Refine & Filter
          </span>
        </div>
        <span className="text-xs font-mono font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
          {resultsCount} found
        </span>
      </div>

      {/* Main filters panel */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-5 space-y-6 backdrop-blur-md">
        
        {/* Sort option */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5 uppercase tracking-wider">
            <SortDesc className="h-3.5 w-3.5" />
            Sort results
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-700 hover:bg-zinc-900/80 text-sm text-white rounded-lg p-2.5 outline-none cursor-pointer"
          >
            <option value="highestMatch">Highest Match</option>
            <option value="mostStars">Most Stars</option>
            <option value="recentlyUpdated">Recently Updated</option>
            <option value="mostComments">Most Comments</option>
          </select>
        </div>

        {/* Separator */}
        <div className="h-[1px] bg-zinc-900" />

        {/* Search Repository */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Search className="h-3.5 w-3.5" />
            Search Repository
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Filter by repo name..."
              value={repoSearch}
              onChange={(e) => onRepoSearchChange(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-700 pl-9 pr-3 py-2 text-sm text-white rounded-lg outline-none placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Language selector */}
        {languages.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-700 text-sm text-white rounded-lg p-2.5 outline-none cursor-pointer"
            >
              <option value="all">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Difficulty */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Difficulty
          </label>
          <div className="flex flex-col gap-2">
            {["all", "easy", "medium", "hard"].map((diff) => (
              <label
                key={diff}
                className="flex items-center gap-2.5 text-sm text-zinc-300 hover:text-white cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="difficulty"
                  checked={selectedDifficulty === diff}
                  onChange={() => onDifficultyChange(diff)}
                  className="h-4 w-4 bg-zinc-900 border-zinc-800 checked:bg-blue-500 focus:ring-0 cursor-pointer"
                />
                <span className="capitalize">{diff === "all" ? "All Levels" : diff}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Minimum Stars */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <span>Minimum Stars</span>
            <span className="font-mono text-zinc-300">{minStars}★</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={minStars}
            onChange={(e) => onMinStarsChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>0</span>
            <span>500</span>
            <span>1000+</span>
          </div>
        </div>

        {/* Active only toggle */}
        <div className="flex items-center justify-between pt-2">
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider cursor-pointer flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-emerald-400" />
            Active only
          </label>
          <button
            type="button"
            onClick={() => onActiveOnlyChange(!activeOnly)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              activeOnly ? "bg-blue-500" : "bg-zinc-800"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                activeOnly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Separator */}
        <div className="h-[1px] bg-zinc-900" />

        {/* Clear Filters */}
        <button
          type="button"
          onClick={onResetFilters}
          className="w-full py-2.5 px-4 text-xs font-semibold border border-zinc-800 hover:border-zinc-700 bg-zinc-900/20 hover:bg-zinc-900 hover:text-white rounded-lg flex items-center justify-center gap-1.5 text-zinc-400 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Filters</span>
        </button>

      </div>
    </aside>
  );
}
