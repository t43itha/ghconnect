"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import { CategoryPill } from "@/components/CategoryPill";
import ListCard from "@/components/ListCard";
import CompanyLogo from "@/components/CompanyLogo";
import StatusBadge from "@/components/StatusBadge";

const jobTypes = ["All", "Full-time", "Part-time", "Contract"] as const;

export default function JobsPage() {
  const jobs = useQuery(api.jobs.list);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    if (!jobs) return [];
    const q = searchQuery.toLowerCase();
    return jobs.filter((job) => {
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
      const matchesType = activeType === "All" || job.type === activeType;
      return matchesSearch && matchesType;
    });
  }, [jobs, searchQuery, activeType]);

  return (
    <div className="min-h-dvh">
      <PageHeader title="Jobs" />

      <div className="mt-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search jobs..."
          onFilter={() => setShowFilters((prev) => !prev)}
        />

        {showFilters && (
          <div className="flex gap-2 px-4 pb-4 overflow-x-auto scrollbar-hide">
            {jobTypes.map((type) => (
              <CategoryPill
                key={type}
                label={type}
                active={activeType === type}
                onClick={() => setActiveType(type)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-4 flex flex-col gap-3 pb-24">
        {jobs === undefined && (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 rounded-full border border-white/10 border-t-white/40 animate-spin" />
          </div>
        )}

        {jobs !== undefined && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/20 text-sm">No jobs found</p>
          </div>
        )}

        {filtered.map((job, i) => (
          <ListCard
            key={job._id}
            href={`/jobs/${job._id}`}
            thumbnail={<CompanyLogo name={job.company} />}
            title={job.title}
            subtitle={`${job.company} · ${job.location}`}
            badge={<StatusBadge variant={job.featured ? "hot" : "new"} />}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
