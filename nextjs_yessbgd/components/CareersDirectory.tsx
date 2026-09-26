"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { openings, Opening, JobLevel } from "@/data/openings";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Users,
  GraduationCap,
  Heart,
  Search,
  CheckCircle2,
  Bookmark,
  Shield,
  Layers,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";

const salaryBands: Record<string, string> = {
  "senior-full-stack-engineer": "৳180k - ৳260k / mo + Equity",
  "product-designer": "৳130k - ৳180k / mo",
  "business-analyst": "৳110k - ৳160k / mo",
  "digital-marketing-specialist": "৳90k - ৳140k / mo",
  "customer-success-executive": "৳70k - ৳110k / mo",
  "operations-manager": "৳150k - ৳220k / mo",
  "qa-engineer": "৳100k - ৳150k / mo",
  "devops-engineer": "৳170k - ৳250k / mo + Equity",
  "content-writer": "৳65k - ৳95k / mo",
  "sales-executive": "৳80k - ৳130k / mo + Commission",
  "software-engineering-intern": "৳30k - ৳45k / mo (Paid)",
  "brand-promoter": "৳40k - ৳60k / mo (Flexible)",
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

const departments = ["All Roles", "Engineering", "Design", "Consulting", "Marketing", "Operations"];

export function CareersDirectory() {
  const [selectedDept, setSelectedDept] = useState("All Roles");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filteredOpenings = useMemo(() => {
    return openings.filter((item) => {
      const matchDept =
        selectedDept === "All Roles" || item.dept.toLowerCase() === selectedDept.toLowerCase();
      const matchLevel = selectedLevel === "All" || item.level === selectedLevel;
      const matchLocation =
        selectedLocation === "All" ||
        item.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (subsidiaryMap[item.slug] &&
          subsidiaryMap[item.slug].toLowerCase().includes(searchQuery.toLowerCase()));

      return matchDept && matchLevel && matchLocation && matchSearch;
    });
  }, [selectedDept, searchQuery, selectedLevel, selectedLocation]);

  return (
    <div className="space-y-8" id="open-roles">
      {/* Filters Toolbar */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        {/* Department Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {departments.map((dept) => {
            const count =
              dept === "All Roles"
                ? openings.length
                : openings.filter((o) => o.dept.toLowerCase() === dept.toLowerCase()).length;
            const active = selectedDept === dept;
            return (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  active
                    ? "bg-[#0d6e6e] text-white shadow-md shadow-[#0d6e6e]/20"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {dept} ({count})
              </button>
            );
          })}
        </div>

        {/* Search & Select Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role title, tech stack, or subsidiary..."
              className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant/60 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#0d6e6e] focus:ring-1 focus:ring-[#0d6e6e]"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant/60 rounded-xl px-3 py-2.5 text-sm text-on-surface-variant focus:outline-none focus:border-[#0d6e6e]"
            >
              <option value="All">Experience: All Tiers</option>
              <option value="Internship">Internship</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid-Level</option>
              <option value="Senior">Senior Level</option>
              <option value="Lead">Lead / Principal</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant/60 rounded-xl px-3 py-2.5 text-sm text-on-surface-variant focus:outline-none focus:border-[#0d6e6e]"
            >
              <option value="All">Location: All Hubs</option>
              <option value="Dhaka">Dhaka (Gulshan & Motijheel)</option>
              <option value="Remote">Hybrid / Remote Friendly</option>
              <option value="Field">Field Operations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Status */}
      <div className="flex items-center justify-between text-xs text-on-surface-variant px-1 font-medium">
        <span>
          Showing <strong>{filteredOpenings.length}</strong> active requisitions across venture subsidiaries
        </span>
        <span className="text-[#0d6e6e] font-semibold">Updated weekly • Direct architect review</span>
      </div>

      {/* Openings Grid */}
      {filteredOpenings.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Briefcase className="w-12 h-12 text-outline mx-auto mb-3 opacity-60" />
          <h3 className="font-bold text-lg text-brand-navy dark:text-white">No positions match your criteria</h3>
          <p className="text-sm text-on-surface-variant mt-1 max-w-md mx-auto">
            Try resetting your search query or department filters to see other open roles.
          </p>
          <button
            onClick={() => {
              setSelectedDept("All Roles");
              setSearchQuery("");
              setSelectedLevel("All");
              setSelectedLocation("All");
            }}
            className="mt-4 px-5 py-2 rounded-xl bg-[#0d6e6e] text-white text-xs font-semibold hover:bg-[#005454] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOpenings.map((job) => {
            const salary = salaryBands[job.slug] || "Competitive Market Band";
            const subsidiary = subsidiaryMap[job.slug] || "YESS Bangladesh Ecosystem";

            return (
              <div
                key={job.slug}
                className="glass-card rounded-2xl p-6 hover:border-[#0d6e6e] hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="space-y-2.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0d6e6e]/10 text-[#0d6e6e] border border-[#0d6e6e]/20">
                        {subsidiary}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant">
                        {job.dept}
                      </span>
                      <span className="text-xs font-bold text-[#d4a359] bg-[#061a1b] dark:bg-black px-2.5 py-0.5 rounded-md">
                        {salary}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-brand-navy dark:text-white group-hover:text-[#0d6e6e] transition-colors">
                      {job.title}
                    </h3>

                    <p className="text-sm text-on-surface-variant line-clamp-2">{job.summary}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-outline pt-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0d6e6e]" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {job.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" /> {job.level} Tier
                      </span>
                      <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 48h Response SLA
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="inline-flex items-center gap-2 bg-[#0d6e6e] hover:bg-[#005454] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md shadow-[#0d6e6e]/20 transition-all active:scale-95 group/btn"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
