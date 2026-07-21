import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, X, Check, Code2, Sparkles, Server, 
  Layout, Cpu, Terminal, Smartphone, Database, 
  Trash2, History, ChevronRight
} from "lucide-react";
import { SUGGESTED_SKILLS, INTERESTS, EXPERIENCE_LEVELS } from "../constants";
import { SearchQuery, SavedSearch } from "../types";

interface SearchCardProps {
  onSearch: (query: SearchQuery) => void;
  recentSearches: SavedSearch[];
  onSelectRecentSearch: (query: SearchQuery) => void;
  onClearRecentSearches: () => void;
  isSearching: boolean;
}

export default function SearchCard({
  onSearch,
  recentSearches,
  onSelectRecentSearch,
  onClearRecentSearches,
  isSearching
}: SearchCardProps) {
  // State for search form
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["TypeScript"]);
  const [experience, setExperience] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["frontend", "backend", "ai"]);

  // Skill search state
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  // Filter skills based on query
  const filteredSkills = useMemo(() => {
    if (!skillSearchQuery) return SUGGESTED_SKILLS.slice(0, 12);
    return SUGGESTED_SKILLS.filter(skill =>
      skill.toLowerCase().includes(skillSearchQuery.toLowerCase())
    );
  }, [skillSearchQuery]);

  // Skill selection helpers
  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else {
      if (selectedSkills.length >= 10) return; // Max 10 limit
      setSelectedSkills(prev => [...prev, skill]);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };

  // Interest selection helpers
  const handleToggleInterest = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(prev => prev.filter(i => i !== interestId));
    } else {
      setSelectedInterests(prev => [...prev, interestId]);
    }
  };

  // Submit search query
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSkills.length === 0) return;
    onSearch({
      skills: selectedSkills,
      experience,
      interests: selectedInterests
    });
  };

  // Dynamic icon mapping for interests
  const renderInterestIcon = (iconName: string, active: boolean) => {
    const props = { className: `h-5 w-5 ${active ? "text-blue-400" : "text-zinc-500"}` };
    switch (iconName) {
      case "Layout": return <Layout {...props} />;
      case "Server": return <Server {...props} />;
      case "Cpu": return <Cpu {...props} />;
      case "Terminal": return <Terminal {...props} />;
      case "Smartphone": return <Smartphone {...props} />;
      case "Database": return <Database {...props} />;
      default: return <Code2 {...props} />;
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        {/* SECTION 1: SKILLS SELECTION */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <label className="font-display text-base font-semibold text-zinc-100 flex items-center gap-2">
              <span>1. Programming Skills & Technologies</span>
              <span className="text-xs font-normal text-zinc-500">({selectedSkills.length}/10 selected)</span>
            </label>
            <span className="text-xs text-zinc-400 font-sans">Minimum 1, maximum 10 skills</span>
          </div>

          {/* Selected skills capsules */}
          <div className="flex flex-wrap gap-2 min-h-10 p-3 rounded-xl border border-zinc-800/60 bg-black/40">
            {selectedSkills.length === 0 ? (
              <span className="text-sm text-zinc-500 flex items-center gap-1.5 py-1 px-2">
                <Code2 className="h-4 w-4" />
                Select at least one skill below to search
              </span>
            ) : (
              <AnimatePresence>
                {selectedSkills.map(skill => (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="p-0.5 rounded-full hover:bg-blue-500/20 text-blue-400 hover:text-blue-100 transition-colors border-0 cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Skill Selector Input + Dropdown */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute top-3.5 left-4 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search and add skills (e.g., React, Go, PyTorch...)"
                value={skillSearchQuery}
                onChange={(e) => {
                  setSkillSearchQuery(e.target.value);
                  setShowSkillDropdown(true);
                }}
                onFocus={() => setShowSkillDropdown(true)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-900/60 hover:bg-zinc-900/80 focus:bg-zinc-900 border border-zinc-800 focus:border-zinc-700 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all duration-200"
              />
              {skillSearchQuery && (
                <button
                  type="button"
                  onClick={() => setSkillSearchQuery("")}
                  className="absolute top-3 right-4 text-zinc-500 hover:text-white cursor-pointer p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Skill Suggestions Drawer/Dropdown */}
            {showSkillDropdown && (
              <div className="absolute left-0 right-0 mt-2 z-20 max-h-64 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-800/50 mb-1">
                  <span className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">
                    Suggested Skills
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSkillDropdown(false)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-1.5">
                  {filteredSkills.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => handleToggleSkill(skill)}
                        className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                            : "bg-zinc-900/30 border-zinc-800/60 text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                        }`}
                      >
                        <span>{skill}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
                {filteredSkills.length === 0 && (
                  <div className="text-center py-6 text-zinc-500 text-xs font-medium">
                    No matching skills found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: EXPERIENCE LEVEL */}
        <div className="space-y-4">
          <label className="font-display text-base font-semibold text-zinc-100 flex items-center gap-2">
            <span>2. Experience Level</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EXPERIENCE_LEVELS.map(level => {
              const active = experience === level.id;
              return (
                <button
                  type="button"
                  key={level.id}
                  onClick={() => setExperience(level.id as any)}
                  className={`relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer group ${
                    active
                      ? "bg-zinc-900/60 border-zinc-700 shadow-lg"
                      : "bg-zinc-950/20 border-zinc-900 hover:border-zinc-800/80"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-sm font-semibold capitalize ${active ? "text-blue-400" : "text-zinc-300 group-hover:text-zinc-200"}`}>
                      {level.label}
                    </span>
                    <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${active ? "border-blue-500 text-blue-500 bg-blue-500/10" : "border-zinc-700"}`}>
                      {active && <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">
                    {level.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: INTERESTS */}
        <div className="space-y-4">
          <label className="font-display text-base font-semibold text-zinc-100 flex items-center gap-2">
            <span>3. Domain Interests</span>
            <span className="text-xs font-normal text-zinc-500">(multi-select)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
            {INTERESTS.map(interest => {
              const active = selectedInterests.includes(interest.id);
              return (
                <button
                  type="button"
                  key={interest.id}
                  onClick={() => handleToggleInterest(interest.id)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all duration-150 cursor-pointer ${
                    active
                      ? "bg-blue-500/5 border-blue-500/30 text-blue-300 shadow-md shadow-blue-950/10"
                      : "bg-zinc-950/20 border-zinc-900 text-zinc-400 hover:border-zinc-800/80 hover:text-zinc-200"
                  }`}
                >
                  <div className="mb-2">
                    {renderInterestIcon(interest.icon, active)}
                  </div>
                  <span className="text-xs font-medium">
                    {interest.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={selectedSkills.length === 0 || isSearching}
            className={`w-full relative flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-display font-semibold text-base transition-all duration-300 cursor-pointer overflow-hidden ${
              selectedSkills.length === 0 || isSearching
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-white text-black hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-[0.99]"
            }`}
          >
            {isSearching ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Searching GitHub database...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 text-blue-500" />
                <span>Find Matching Issues</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* RECENT SEARCHES */}
      {recentSearches.length > 0 && (
        <div className="mt-6 rounded-xl border border-zinc-800/40 bg-zinc-950/20 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1.5 tracking-wider uppercase">
              <History className="h-3.5 w-3.5" />
              Recent Searches
            </span>
            <button
              type="button"
              onClick={onClearRecentSearches}
              className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors border-0 bg-transparent p-0"
            >
              <Trash2 className="h-3 w-3" />
              Clear history
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {recentSearches.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectRecentSearch(item.query)}
                className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40 text-left transition-all duration-150 cursor-pointer group"
              >
                <div className="flex items-center gap-2 overflow-hidden mr-4">
                  <div className="flex gap-1 overflow-hidden">
                    {item.query.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="text-[10px] font-semibold bg-zinc-900 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-800">
                        {skill}
                      </span>
                    ))}
                    {item.query.skills.length > 3 && (
                      <span className="text-[10px] text-zinc-500 py-0.5 px-0.5">+{item.query.skills.length - 3}</span>
                    )}
                  </div>
                  <span className="text-zinc-600 hidden sm:inline">•</span>
                  <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-950/30 border border-blue-900/30 px-1.5 rounded py-0.5 hidden sm:inline">
                    {item.query.experience}
                  </span>
                  <span className="text-zinc-600 hidden sm:inline">•</span>
                  <span className="text-[10px] text-zinc-400 capitalize truncate hidden sm:inline">
                    {item.query.interests.join(", ") || "No preferred interests"}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
