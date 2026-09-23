"use client";

import { Search, Lightbulb, Rocket, LineChart } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/Reveal";

const processIcons = [Search, Lightbulb, Rocket, LineChart];

interface ProcessItem {
  title: string;
  desc: string;
}

interface ConnectedProcessTimelineProps {
  items: ProcessItem[];
}

export function ConnectedProcessTimeline({ items }: ConnectedProcessTimelineProps) {
  return (
    <div className="relative mt-10 sm:mt-14">
      {/* Connected desktop hairline pipeline rule */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] right-[12%] top-11 hidden h-[2px] bg-gradient-to-r from-primary/10 via-primary/35 to-primary/10 lg:block"
      />

      <Stagger className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((p, i) => {
          const Icon = processIcons[i] || Lightbulb;
          const stepNumber = `0${i + 1}`;

          return (
            <StaggerItem key={p.title}>
              <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-glass-border bg-card/80 p-5 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant sm:p-6">
                <div>
                  <div className="flex items-center justify-between">
                    {/* Step Icon Badge */}
                    <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Step Tag */}
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary/40 transition-colors group-hover:text-primary">
                      STEP {stepNumber}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-base font-bold sm:text-lg tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {p.desc}
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="mt-5 pt-3 border-t border-border/40">
                  <div className="h-1 w-8 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
