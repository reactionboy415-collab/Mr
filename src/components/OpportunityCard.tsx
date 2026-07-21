import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Star, GitFork, Calendar, MessageSquare, ExternalLink, 
  Copy, Share2, Check, Bookmark, Activity, Award, ShieldAlert
} from "lucide-react";
import { Opportunity } from "../types";

interface OpportunityCardProps {
  key?: string | number;
  opportunity: Opportunity;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export default function OpportunityCard({
  opportunity,
  isBookmarked,
  onToggleBookmark
}: OpportunityCardProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const { repository, issue, matchScore, difficulty, activityStatus, matchReasons } = opportunity;

  // Formatting date string
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return "Recently";
    }
  };

  // Copy issue link helper
  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(issue.url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Share helper
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Check out this open source issue! ${issue.title} on ${repository.fullName} (Match score: ${matchScore}%). ${issue.url}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Match score ${matchScore}%: ${issue.title}`,
          text: shareText,
          url: issue.url
        });
      } else {
        throw new Error("Web Share not supported");
      }
    } catch (err) {
      // If native sharing is cancelled or blocked (e.g. by iframe container security),
      // gracefully fallback to copying the pre-formatted text to the clipboard.
      console.log("Native share cancelled or unavailable, falling back to clipboard copy:", err);
      try {
        await navigator.clipboard.writeText(shareText);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      } catch (clipErr) {
        console.error("Clipboard copy fallback failed:", clipErr);
      }
    }
  };

  // Set difficulty styles
  const getDifficultyStyles = (diff: string) => {
    switch (diff) {
      case "easy":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          text: "Easy",
          dot: "bg-emerald-400"
        };
      case "hard":
        return {
          bg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
          text: "Hard",
          dot: "bg-rose-400"
        };
      default:
        return {
          bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
          text: "Medium",
          dot: "bg-amber-400"
        };
    }
  };

  const diffStyle = getDifficultyStyles(difficulty);

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-950/40 hover:bg-zinc-900/20 hover:border-zinc-700/60 p-5 sm:p-6 backdrop-blur-md shadow-lg transition-all duration-300"
    >
      {/* Upper Half: Repository Section */}
      <div className="flex items-start justify-between gap-4 border-b border-zinc-900 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <img
            src={repository.owner.avatarUrl || "https://github.com/identicons/git.png"}
            alt={repository.owner.login}
            referrerPolicy="no-referrer"
            className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 object-cover shrink-0"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-zinc-100 hover:text-blue-400 truncate hover:underline flex items-center gap-1 cursor-pointer"
              >
                {repository.fullName}
              </a>
              {repository.language && (
                <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                  {repository.language}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5 font-sans">
              {repository.description || "No repository description provided."}
            </p>
          </div>
        </div>

        {/* Match score Badge */}
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-display font-bold text-xs shadow-lg shadow-blue-950/20">
            <Award className="h-3.5 w-3.5" />
            <span>{matchScore}% Match</span>
          </div>
          {activityStatus === "active" ? (
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active Repo
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium mt-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
              Stale
            </span>
          )}
        </div>
      </div>

      {/* Middle Half: Issue Section */}
      <div className="flex-1 space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-wider">
            <span>Issue #{issue.number}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(issue.createdAt)}
            </span>
          </div>
          <a
            href={issue.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-base font-semibold text-white leading-snug hover:text-blue-400 hover:underline transition-colors cursor-pointer"
          >
            {issue.title}
          </a>
        </div>

        {/* Issue body teaser */}
        {issue.body && (
          <p className="text-sm text-zinc-400 line-clamp-2 font-sans bg-zinc-950/20 p-2.5 rounded-lg border border-zinc-900/40">
            {issue.body.replace(/[#*`[\]]/g, "").trim()}
          </p>
        )}

        {/* Labels & Details */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {/* Difficulty Badge */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-medium font-sans ${diffStyle.bg}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${diffStyle.dot}`} />
              {diffStyle.text}
            </span>

            {/* GitHub labels */}
            {issue.labels.slice(0, 4).map(label => (
              <span
                key={label.name}
                className="text-[10px] font-medium bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-800 max-w-32 truncate"
                title={label.name}
              >
                {label.name}
              </span>
            ))}
            {issue.labels.length > 4 && (
              <span className="text-[10px] text-zinc-500 font-medium py-0.5 px-1.5">
                +{issue.labels.length - 4} more
              </span>
            )}
          </div>

          {/* Stars, Forks, Comments counts */}
          <div className="flex items-center gap-3.5 text-zinc-500 font-mono text-xs">
            <span className="flex items-center gap-1.5" title="Stars">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500/10" />
              {repository.stars}
            </span>
            <span className="flex items-center gap-1.5" title="Forks">
              <GitFork className="h-3.5 w-3.5" />
              {repository.forks}
            </span>
            {issue.comments > 0 && (
              <span className="flex items-center gap-1.5" title="Comments">
                <MessageSquare className="h-3.5 w-3.5" />
                {issue.comments}
              </span>
            )}
          </div>
        </div>

        {/* Match Alignment reasons */}
        {matchReasons && matchReasons.length > 0 && (
          <div className="pt-2">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
              Alignment Reasons
            </div>
            <div className="flex flex-wrap gap-1.5">
              {matchReasons.map((reason, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-0.5 rounded-lg"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  {reason}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Row: Actions */}
      <div className="mt-5 pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Secondary utilities (Bookmark, Copy, Share) */}
        <div className="flex items-center justify-start gap-1">
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`p-2 rounded-lg border text-sm flex items-center gap-1.5 cursor-pointer transition-colors ${
              isBookmarked
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                : "bg-transparent border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white"
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Issue"}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-blue-500/30" : ""}`} />
            <span className="sm:hidden text-xs">Bookmark</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="p-2 rounded-lg border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer bg-transparent transition-colors"
            title="Copy GitHub Issue Link"
          >
            {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span className="sm:hidden text-xs">{copiedLink ? "Copied" : "Copy"}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-lg border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer bg-transparent transition-colors"
            title="Share this match"
          >
            {copiedShare ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
            <span className="sm:hidden text-xs">{copiedShare ? "Copied Summary" : "Share"}</span>
          </button>
        </div>

        {/* Primary Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial text-center text-xs font-semibold px-3 py-2 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-300 hover:text-white transition-colors cursor-pointer bg-transparent"
          >
            View Repository
          </a>
          <a
            href={issue.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial text-center text-xs font-semibold px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open Issue</span>
            <ExternalLink className="h-3 w-3 shrink-0" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
