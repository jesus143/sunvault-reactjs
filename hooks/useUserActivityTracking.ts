"use client";

import { useEffect, useRef } from "react";
// Assuming this path is correct for your project
import { recordActivity } from "@/services/activityService"; 

export function useUserActivityTracking() {
  const scrollMilestones = useRef(new Set<number>());
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // 1. Log page load ONCE
  useEffect(() => {
    recordActivity("Page loaded");
  }, []);

// ---

  // 2. Scroll tracking (only logs 25%, 50%, 75%, 100% ONCE)
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
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

// ---

  // 3. ALL clicks tracking (REPLACED original limited tracking)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const tagName = target.tagName;
      
      // Attempt to find the best identifier for the clicked element
      const identifier = 
        target.id || 
        target.getAttribute('name') || 
        target.innerText?.substring(0, 30).trim() || 
        tagName;

      let logMessage = `Clicked on ${tagName}`;

      if (tagName === "BUTTON") {
        logMessage = `Button clicked: ${identifier}`;
      } else if (tagName === "A") {
        logMessage = `Link clicked: ${target.getAttribute("href")}`;
      } else if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
        logMessage = `Form control clicked: ${identifier}`;
      } else {
        // General click log for any other element (e.g., div, span, h1)
        logMessage = `Clicked on element: ${identifier}`;
      }

      recordActivity(logMessage);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

// ---

  // 4. Debounced input typing tracking (fires AFTER user stops typing)
  useEffect(() => {
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target) return;

      // Only track inputs in form fields
      if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") return;

      // Clear old timeout to debounce the activity log
      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      // Log only after user stops typing for 1 second (1000ms)
      typingTimeout.current = setTimeout(() => {
        recordActivity(`Typed in field: ${target.name || target.id}`);
      }, 1000);
    };

    window.addEventListener("input", handleInput);
    return () => window.removeEventListener("input", handleInput);
  }, []);

// ---

  // 5. Time spent (fires once when user leaves the page)
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