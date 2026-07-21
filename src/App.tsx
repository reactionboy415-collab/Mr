import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Code2, AlertTriangle, ArrowRight, RotateCcw, 
  HelpCircle, ChevronRight, Github, Heart, Globe, 
  BookOpen, Star, Info, ListFilter, SlidersHorizontal, Shuffle
} from "lucide-react";

import Navbar from "./components/Navbar";
import SearchCard from "./components/SearchCard";
import SidebarFilters from "./components/SidebarFilters";
import OpportunityCard from "./components/OpportunityCard";
import FeaturesFAQ from "./components/FeaturesFAQ";
import SavedBookmarks from "./components/SavedBookmarks";
import { SUGGESTED_SKILLS, INTERESTS } from "./constants";
import { Opportunity, SearchQuery, SavedSearch, SearchResponse } from "./types";

export default function App() {
  // Navigation / View State
  const [currentView, setCurrentView] = useState<"home" | "results" | "bookmarks">("home");

  // Search Form & API States
  const [activeQuery, setActiveQuery] = useState<SearchQuery | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Search Loading Animation Stages
  const [loadingStage, setLoadingStage] = useState("Searching GitHub...");
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Filter & Sort States
  const [repoSearch, setRepoSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [minStars, setMinStars] = useState(0);
  const [activeOnly, setActiveOnly] = useState(true);
  const [sortBy, setSortBy] = useState("highestMatch");

  // LocalStorage Persisted States
  const [recentSearches, setRecentSearches] = useState<SavedSearch[]>([]);
  const [bookmarks, setBookmarks] = useState<Opportunity[]>([]);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("mr_git_search_history");
      if (savedHistory) setRecentSearches(JSON.parse(savedHistory));

      const savedBookmarks = localStorage.getItem("mr_git_bookmarks");
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    } catch (e) {
      console.error("Failed to load local storage data", e);
    }
  }, []);

  // Save Bookmarks to LocalStorage on Change
  const handleSaveBookmarks = (newBookmarks: Opportunity[]) => {
    setBookmarks(newBookmarks);
    try {
      localStorage.setItem("mr_git_bookmarks", JSON.stringify(newBookmarks));
    } catch (e) {
      console.error("Failed to save bookmarks", e);
    }
  };

  // Save Search History to LocalStorage on Change
  const handleSaveHistory = (query: SearchQuery) => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      query,
      timestamp: Date.now()
    };
    // De-duplicate searches with identical query
    const filteredHistory = recentSearches.filter(
      item => !(
        item.query.skills.join(",") === query.skills.join(",") &&
        item.query.experience === query.experience &&
        item.query.interests.join(",") === query.interests.join(",")
      )
    );
    const updatedHistory = [newSearch, ...filteredHistory].slice(0, 5); // Store top 5
    setRecentSearches(updatedHistory);
    try {
      localStorage.setItem("mr_git_search_history", JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Failed to save search history", e);
    }
  };

  // Clear Search History helper
  const handleClearHistory = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("mr_git_search_history");
    } catch (e) {
      console.error("Failed to clear search history", e);
    }
  };

  // Timer simulation to make searching step progress feel gorgeous
  useEffect(() => {
    let interval: any;
    if (isSearching) {
      setLoadingProgress(0);
      setLoadingStage("Searching GitHub database...");
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          const increment = Math.floor(Math.random() * 15) + 5;
          const nextVal = Math.min(prev + increment, 98); // Lock at 98% until fetch finishes

          if (nextVal < 33) {
            setLoadingStage("Searching GitHub database...");
          } else if (nextVal < 66) {
            setLoadingStage("Finding active repositories...");
          } else {
            setLoadingStage("Matching issues to your skills...");
          }
          return nextVal;
        });
      }, 200);
    } else {
      setLoadingProgress(0);
    }
    return () => clearInterval(interval);
  }, [isSearching]);

  // Main search operation
  const runSearch = async (query: SearchQuery) => {
    setIsSearching(true);
    setError(null);
    setActiveQuery(query);
    setCurrentView("results");

    // Reset filters for new search
    setRepoSearch("");
    setSelectedLanguage("all");
    setSelectedDifficulty("all");
    setMinStars(0);
    setActiveOnly(true);
    setSortBy("highestMatch");

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
      });

      if (!response.ok) {
        throw new Error(`Server returned error: ${response.status} ${response.statusText}`);
      }

      const data: SearchResponse = await response.json();
      setOpportunities(data.opportunities || []);
      setTotalCount(data.totalCount || 0);
      setSearchTime(data.searchTime || 0);
      
      // Save query to history
      handleSaveHistory(query);

      // Force progress to 100% on success
      setLoadingProgress(100);
      setTimeout(() => {
        setIsSearching(false);
      }, 300);

    } catch (err: any) {
      console.error("Search failed:", err);
      setError(err.message || "Something went wrong while fetching opportunities. Please try again.");
      setIsSearching(false);
    }
  };

  // Toggle Bookmark logic
  const handleToggleBookmark = (opp: Opportunity) => {
    const isBookmarked = bookmarks.some(b => b.id === opp.id);
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter(b => b.id !== opp.id);
    } else {
      updated = [...bookmarks, opp];
    }
    handleSaveBookmarks(updated);
  };

  // Clear all bookmarks
  const handleClearAllBookmarks = () => {
    if (window.confirm("Are you sure you want to remove all saved bookmarks?")) {
      handleSaveBookmarks([]);
    }
  };

  // Random Search helper
  const handleRandomSearch = () => {
    // Pick 1-3 random skills
    const shuffledSkills = [...SUGGESTED_SKILLS].sort(() => 0.5 - Math.random());
    const randomSkillsCount = Math.floor(Math.random() * 3) + 1;
    const skills = shuffledSkills.slice(0, randomSkillsCount);

    // Pick 1 random experience level
    const experiences: Array<"beginner" | "intermediate" | "advanced"> = ["beginner", "intermediate", "advanced"];
    const experience = experiences[Math.floor(Math.random() * experiences.length)];

    // Pick 1-2 random interests
    const shuffledInterests = INTERESTS.map(i => i.id).sort(() => 0.5 - Math.random());
    const randomInterestsCount = Math.floor(Math.random() * 2) + 1;
    const interests = shuffledInterests.slice(0, randomInterestsCount);

    runSearch({ skills, experience, interests });
  };

  // Random Issue Picker (selects a random issue from the current results to open)
  const handlePickRandomResult = () => {
    if (opportunities.length > 0) {
      const randomIndex = Math.floor(Math.random() * opportunities.length);
      const chosen = opportunities[randomIndex];
      window.open(chosen.issue.url, "_blank");
    } else {
      // If no results yet, run a random search!
      handleRandomSearch();
    }
  };

  // Retrieve unique languages present in search results
  const uniqueLanguages = useMemo(() => {
    const langs = new Set<string>();
    opportunities.forEach(opp => {
      if (opp.repository.language) {
        langs.add(opp.repository.language);
      }
    });
    return Array.from(langs);
  }, [opportunities]);

  // Frontend filtering and sorting
  const filteredAndSortedOpportunities = useMemo(() => {
    let result = [...opportunities];

    // Filter by Repository Name
    if (repoSearch.trim()) {
      const query = repoSearch.toLowerCase();
      result = result.filter(
        opp => 
          opp.repository.name.toLowerCase().includes(query) ||
          opp.repository.fullName.toLowerCase().includes(query)
      );
    }

    // Filter by Language
    if (selectedLanguage !== "all") {
      result = result.filter(opp => opp.repository.language === selectedLanguage);
    }

    // Filter by Difficulty
    if (selectedDifficulty !== "all") {
      result = result.filter(opp => opp.difficulty === selectedDifficulty);
    }

    // Filter by Min Stars
    if (minStars > 0) {
      result = result.filter(opp => opp.repository.stars >= minStars);
    }

    // Filter by Active Only status
    if (activeOnly) {
      result = result.filter(opp => opp.activityStatus === "active");
    }

    // Sorting Logic
    result.sort((a, b) => {
      if (sortBy === "mostStars") {
        return b.repository.stars - a.repository.stars;
      }
      if (sortBy === "recentlyUpdated") {
        return new Date(b.issue.createdAt).getTime() - new Date(a.issue.createdAt).getTime();
      }
      if (sortBy === "mostComments") {
        return b.issue.comments - a.issue.comments;
      }
      // Default: Highest Match score
      return b.matchScore - a.matchScore;
    });

    return result;
  }, [opportunities, repoSearch, selectedLanguage, selectedDifficulty, minStars, activeOnly, sortBy]);

  // Reset Filters Helper
  const handleResetFilters = () => {
    setRepoSearch("");
    setSelectedLanguage("all");
    setSelectedDifficulty("all");
    setMinStars(0);
    setActiveOnly(true);
    setSortBy("highestMatch");
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col relative overflow-hidden">
      
      {/* Background Ambience / Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl rounded-full bg-gradient-to-b from-blue-500/5 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] right-0 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none animate-pulse-glow" />

      {/* NAVBAR */}
      <Navbar
        onHomeClick={() => setCurrentView("home")}
        onBookmarksClick={() => setCurrentView("bookmarks")}
        onRandomClick={handlePickRandomResult}
        bookmarkCount={bookmarks.length}
        currentView={currentView}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 focus:outline-none">
        
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: HOME PAGE (HERO + SEARCH CARD + MARKETING) */}
          {currentView === "home" && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* HERO SEGMENT */}
              <div className="text-center max-w-3xl mx-auto space-y-6 pt-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold tracking-wide uppercase"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Discover Opportunities Instantly</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none"
                >
                  Find Your Next <br />
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                    Open Source Contribution
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-zinc-400 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-sans"
                >
                  Enter your skills and instantly discover GitHub issues tailored to your expertise. Spend less time hunting, and more time coding.
                </motion.p>
              </div>

              {/* SEARCH CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <SearchCard
                  onSearch={runSearch}
                  recentSearches={recentSearches}
                  onSelectRecentSearch={runSearch}
                  onClearRecentSearches={handleClearHistory}
                  isSearching={isSearching}
                />
              </motion.div>

              {/* MARKETING SECTIONS */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <FeaturesFAQ />
              </motion.div>
            </motion.div>
          )}

          {/* VIEW 2: SEARCH RESULTS PAGE */}
          {currentView === "results" && (
            <motion.div
              key="results-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              
              {/* Back CTA */}
              <button
                onClick={() => setCurrentView("home")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-white cursor-pointer bg-transparent border-0 p-0"
              >
                &larr; Back to Search Dashboard
              </button>

              {/* Search Progress Loading Frame */}
              {isSearching ? (
                <div className="space-y-12 py-12 max-w-3xl mx-auto text-center">
                  <div className="space-y-4">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2 animate-pulse">
                      <Code2 className="h-5 w-5 text-blue-500" />
                      <span>{loadingStage}</span>
                    </h2>
                    <p className="text-xs text-zinc-500 max-w-md mx-auto">
                      Mr. Git is scanning verified GitHub repositories to locate relevant issues with good-first-issue, bug, and feature tags.
                    </p>
                  </div>

                  {/* High fidelity animated progress meter */}
                  <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800 p-0.5 max-w-md mx-auto">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                      initial={{ width: "0%" }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  {/* Skeleton cards loader */}
                  <div className="space-y-4 max-w-2xl mx-auto pt-6 text-left">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-xl border border-zinc-900 bg-zinc-950/20 p-5 space-y-4 animate-pulse">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-zinc-900 shrink-0" />
                          <div className="h-4 bg-zinc-900 rounded w-1/3" />
                          <div className="h-4 bg-zinc-900 rounded w-16 ml-auto" />
                        </div>
                        <div className="h-5 bg-zinc-900 rounded w-4/5" />
                        <div className="h-10 bg-zinc-900 rounded w-full" />
                        <div className="flex items-center gap-2">
                          <div className="h-4 bg-zinc-900 rounded w-20" />
                          <div className="h-4 bg-zinc-900 rounded w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : error ? (
                /* ERROR VIEW STATE */
                <div className="text-center py-16 rounded-2xl border border-red-950/40 bg-red-950/5 max-w-xl mx-auto p-8 space-y-6">
                  <div className="mx-auto h-12 w-12 rounded-full bg-red-950/20 border border-red-500/20 flex items-center justify-center text-red-400">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-white">
                      Search Failed
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {error}
                    </p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => activeQuery && runSearch(activeQuery)}
                      className="px-4 py-2 text-xs font-semibold bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Retry Search</span>
                    </button>
                    <button
                      onClick={() => setCurrentView("home")}
                      className="px-4 py-2 text-xs font-semibold border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer bg-transparent"
                    >
                      Change Skills
                    </button>
                  </div>
                </div>
              ) : (
                /* SUCCESSFUL SEARCH RESULTS CONTENT */
                <div className="space-y-6">
                  
                  {/* Results summary header */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3.5 border-b border-zinc-900 pb-6">
                    <div className="space-y-1">
                      <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                        Curated Opportunities
                      </h1>
                      <div className="flex flex-wrap items-center gap-2 text-zinc-400 text-xs sm:text-sm">
                        <span>For:</span>
                        {activeQuery?.skills.map(s => (
                          <span key={s} className="font-mono bg-zinc-900 text-zinc-300 border border-zinc-800 px-1.5 py-0.5 rounded font-semibold text-xs">
                            {s}
                          </span>
                        ))}
                        <span>•</span>
                        <span className="capitalize text-blue-400 font-semibold">{activeQuery?.experience}</span>
                        <span>•</span>
                        <span className="text-zinc-500">Fetched in {searchTime}ms</span>
                      </div>
                    </div>

                    <button
                      onClick={handlePickRandomResult}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 text-xs font-semibold bg-zinc-900 text-white border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                      title="Select and open a random issue instantly on GitHub"
                    >
                      <Shuffle className="h-3.5 w-3.5 text-blue-400" />
                      <span>Surprise Me (Open Random Match)</span>
                    </button>
                  </div>

                  {/* Main Grid: Filters Sidebar + Results List */}
                  <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Filters Sidebar */}
                    <SidebarFilters
                      repoSearch={repoSearch}
                      onRepoSearchChange={setRepoSearch}
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={setSelectedLanguage}
                      languages={uniqueLanguages}
                      selectedDifficulty={selectedDifficulty}
                      onDifficultyChange={setSelectedDifficulty}
                      minStars={minStars}
                      onMinStarsChange={setMinStars}
                      activeOnly={activeOnly}
                      onActiveOnlyChange={setActiveOnly}
                      sortBy={sortBy}
                      onSortByChange={setSortBy}
                      onResetFilters={handleResetFilters}
                      resultsCount={filteredAndSortedOpportunities.length}
                    />

                    {/* Results Cards Stream */}
                    <div className="flex-1 space-y-5">
                      {filteredAndSortedOpportunities.length > 0 ? (
                        filteredAndSortedOpportunities.map((opp) => {
                          const isBookmarked = bookmarks.some(b => b.id === opp.id);
                          return (
                            <OpportunityCard
                              key={opp.id}
                              opportunity={opp}
                              isBookmarked={isBookmarked}
                              onToggleBookmark={() => handleToggleBookmark(opp)}
                            />
                          );
                        })
                      ) : (
                        /* EMPTY FILTER STATE */
                        <div className="text-center py-20 rounded-2xl border border-zinc-900 bg-zinc-950/20 p-8 space-y-4">
                          <div className="mx-auto h-12 w-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                            <Info className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-display text-base font-bold text-white">
                              No matching opportunities
                            </h3>
                            <p className="text-zinc-500 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                              No issues fit the selected filter criteria. Try adjusting the difficulty, star filters, or resetting filters to show all.
                            </p>
                          </div>
                          <button
                            onClick={handleResetFilters}
                            className="text-xs font-semibold text-blue-400 hover:text-blue-300 border-0 bg-transparent cursor-pointer p-1"
                          >
                            Reset filters and show all results
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              )}

            </motion.div>
          )}

          {/* VIEW 3: BOOKMARKS PAGE */}
          {currentView === "bookmarks" && (
            <motion.div
              key="bookmarks-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SavedBookmarks
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onClearAll={handleClearAllBookmarks}
                onBackToSearch={() => {
                  if (opportunities.length > 0) {
                    setCurrentView("results");
                  } else {
                    setCurrentView("home");
                  }
                }}
              />
            </motion.div>
          )}

        </AnimatePresence>

      </main>
    </div>
  );
}
