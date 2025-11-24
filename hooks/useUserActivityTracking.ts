"use client";

import { useEffect, useRef } from "react";
import { recordActivity } from "@/services/activityService";

export function useUserActivityTracking() {
  const scrollMilestones = useRef(new Set<number>());
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Log page load ONCE
  useEffect(() => {
    recordActivity("Page loaded");
  }, []);

  // Scroll tracking (only logs 25%, 50%, 75%, 100% ONCE)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;

      const milestones = [25, 50, 75, 100];

      milestones.forEach((milestone) => {
        if (scrolled >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          recordActivity(`Scrolled ${milestone}%`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Button + Link clicks only
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Only log meaningful clicks
      if (target.tagName === "BUTTON") {
        const label = target.innerText || "Unnamed button";
        recordActivity(`Button clicked: ${label}`);
      }

      // Detect <a> link clicks
      if (target.tagName === "A") {
        recordActivity(`Link clicked: ${target.getAttribute("href")}`);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Debounced input typing tracking (fires AFTER user stops typing)
  useEffect(() => {
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target) return;

      if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") return;

      // Clear old timeout
      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      // Log only after user stops typing for 1 second
      typingTimeout.current = setTimeout(() => {
        recordActivity(`Typed in field: ${target.name || target.id}`);
      }, 1000);
    };

    window.addEventListener("input", handleInput);
    return () => window.removeEventListener("input", handleInput);
  }, []);

  // Time spent (fires once)
  useEffect(() => {
    const start = Date.now();

    const handleBeforeUnload = () => {
      const seconds = Math.floor((Date.now() - start) / 1000);
      recordActivity(`User left page after ${seconds} seconds`);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
}
