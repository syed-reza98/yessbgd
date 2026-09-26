"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { openings, Opening, JobLevel } from "@/data/openings";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const salaryBands: Record<string, string> = {
  "senior-full-stack-engineer": "৳280k - ৳380k / mo + Equity",
  "product-designer": "৳160k - ৳220k / mo",
  "business-analyst": "৳130k - ৳180k / mo",
  "digital-marketing-specialist": "৳100k - ৳150k / mo",
  "customer-success-executive": "৳75k - ৳120k / mo",
  "operations-manager": "৳180k - ৳250k / mo",
  "qa-engineer": "৳110k - ৳160k / mo",
  "devops-engineer": "৳260k - ৳350k / mo + Equity",
  "content-writer": "৳70k - ৳105k / mo",
  "sales-executive": "৳90k - ৳140k / mo + Commission",
  "software-engineering-intern": "৳35k - ৳50k / mo (Paid)",
  "brand-promoter": "৳45k - ৳70k / mo (Flexible)",
};

const subsidiaryMap: Record<string, string> = {
  "senior-full-stack-engineer": "Yess Soft Ltd.",
  "product-designer": "Dhaka Venture Studio",
  "business-analyst": "YESS Advisory",
  "digital-marketing-specialist": "YESS Media & Growth",
  "customer-success-executive": "Akash OTT Media",
  "operations-manager": "YESS Organic Haat",
  "qa-engineer": "Yess Soft Ltd.",
  "devops-engineer": "CyberKilla Sovereign SecOps",
  "content-writer": "YESS Editorial",
  "sales-executive": "Yess FinCorp Solutions",
  "software-engineering-intern": "Yess Soft Labs",
  "brand-promoter": "YESS Field Ops",
};

const departments = [
  "All Roles (12)",
  "Software Engineering (5)",
  "Agritech & Logistics (2)",
  "Product & UX (2)",
  "Data & AI (2)",
  "Corporate Governance (1)",
];

export function CareersDirectory() {
  const [selectedDept, setSelectedDept] = useState("All Roles (12)");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedSubsidiary, setSelectedSubsidiary] = useState("All");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const toggleBookmark = (slug: string) => {
    setBookmarked((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const filteredOpenings = useMemo(() => {
    return openings.filter((item) => {
      let matchDept = true;
      if (selectedDept.startsWith("Software")) {
        matchDept = item.dept.toLowerCase().includes("engineer") || item.title.toLowerCase().includes("engineer");
      } else if (selectedDept.startsWith("Agritech")) {
        matchDept = item.dept.toLowerCase().includes("operations") || item.title.toLowerCase().includes("operations") || item.title.toLowerCase().includes("brand");
      } else if (selectedDept.startsWith("Product")) {
        matchDept = item.dept.toLowerCase().includes("design") || item.title.toLowerCase().includes("designer");
      } else if (selectedDept.startsWith("Data")) {
        matchDept = item.dept.toLowerCase().includes("qa") || item.title.toLowerCase().includes("devops") || item.title.toLowerCase().includes("analyst");
      } else if (selectedDept.startsWith("Corporate")) {
        matchDept = item.dept.toLowerCase().includes("marketing") || item.dept.toLowerCase().includes("sales");
      }

      const matchLevel = selectedLevel === "All" || item.level === selectedLevel;
      const matchLocation =
        selectedLocation === "All" ||
        item.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const sub = subsidiaryMap[item.slug] || "";
      const matchSub =
        selectedSubsidiary === "All" ||
        sub.toLowerCase().includes(selectedSubsidiary.toLowerCase());

      const q = searchQuery.toLowerCase();
      const matchSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        sub.toLowerCase().includes(q);

      return matchDept && matchLevel && matchLocation && matchSub && matchSearch;
    });
  }, [selectedDept, searchQuery, selectedLevel, selectedLocation, selectedSubsidiary]);

  return (
    <div className="space-y-8" id="open-roles">
      {/* Department Tabs & Search Filter Header */}
      <div className="glass-card rounded-2xl p-6 space-y-4 border border-border shadow-sm">
        {/* Department Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {departments.map((dept) => {
            const active = selectedDept === dept;
            return (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-foreground/70 hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {dept}
              </button>
            );
          })}
        </div>

        {/* Secondary Search and Dropdown Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 w-4 h-4" />
            <input
              id="careers-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, tech stack, or subsidiary..."
              aria-label="Search open roles by title, skill, or subsidiary"
              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <select
              id="careers-level-filter"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              aria-label="Filter roles by experience level"
              className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs sm:text-sm text-foreground/80 focus:outline-none focus:border-primary"
            >
              <option value="All">Experience: All Tiers</option>
              <option value="Mid">Mid-Level (3-5 yrs)</option>
              <option value="Senior">Senior (5-7 yrs)</option>
              <option value="Lead">Staff / Principal (7+ yrs)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              id="careers-location-filter"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              aria-label="Filter roles by location"
              className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs sm:text-sm text-foreground/80 focus:outline-none focus:border-primary"
            >
              <option value="All">Location: Dhaka Hubs</option>
              <option value="Dhaka">Gulshan Innovation Wing</option>
              <option value="Motijheel">Motijheel Executive Center</option>
              <option value="Hybrid">Hybrid / Autonomous</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              id="careers-subsidiary-filter"
              value={selectedSubsidiary}
              onChange={(e) => setSelectedSubsidiary(e.target.value)}
              aria-label="Filter roles by subsidiary venture"
              className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs sm:text-sm text-foreground/80 focus:outline-none focus:border-primary"
            >
              <option value="All">Subsidiary: All Ventures</option>
              <option value="Yess Soft">Yess Soft Ltd.</option>
              <option value="Akash">Akash OTT Media</option>
              <option value="Organic">YESS Organic Haat</option>
              <option value="CyberKilla">CyberKilla</option>
              <option value="FinCorp">Yess FinCorp Solutions</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Status */}
      <div className="flex items-center justify-between text-xs text-foreground/70 px-1 font-medium">
        <span>
          Showing <strong>{filteredOpenings.length}</strong> active requisitions across venture subsidiaries
        </span>
        <span className="text-primary font-semibold">Updated weekly • Direct architect review</span>
      </div>

      {/* Job Cards Stream (Stitch Style with Dark Navy + Gold Salary Badge) */}
      <div className="space-y-4">
        {filteredOpenings.map((job) => {
          const salary = salaryBands[job.slug] || "৳180k - ৳260k / mo + Equity";
          const subsidiary = subsidiaryMap[job.slug] || "Yess Soft Ltd.";
          const isBookmarked = !!bookmarked[job.slug];

          return (
            <div
              key={job.slug}
              className="glass-card rounded-2xl p-6 sm:p-7 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-2.5 max-w-3xl">
                  {/* Pills Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {subsidiary}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-muted text-foreground/80 border border-border/50">
                      {job.dept}
                    </span>
                    <span className="text-xs font-bold text-amber-300 bg-[#061a1b] px-3 py-1 rounded-full border border-amber-400/30">
                      {salary}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">
                    {job.title}
                  </h3>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-foreground/60">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{job.location}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-foreground/50" />
                      <span>Full-Time</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                      <span>{job.level} Tier</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Zero-Trust Gov-Tech</span>
                    </span>
                  </div>
                </div>

                {/* Trailing Actions */}
                <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                  <button
                    onClick={() => toggleBookmark(job.slug)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isBookmarked
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-500"
                        : "border-border text-foreground/60 hover:text-primary hover:bg-muted"
                    }`}
                    title="Bookmark Role"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-500" : ""}`} />
                  </button>

                  <Link
                    href={`/careers/${job.slug}`}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
