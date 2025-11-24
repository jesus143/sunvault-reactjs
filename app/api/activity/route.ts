import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

// Parse user agent
function parseUserAgent(ua: string | null) {
  if (!ua) return { browser: "Unknown", os: "Unknown", device: "Unknown" };

  const browser =
    /chrome/i.test(ua) ? "Chrome" :
    /safari/i.test(ua) ? "Safari" :
    /firefox/i.test(ua) ? "Firefox" :
    /edge/i.test(ua) ? "Edge" : "Unknown";

  const os =
    /android/i.test(ua) ? "Android" :
    /iphone|ipad/i.test(ua) ? "iOS" :
    /windows/i.test(ua) ? "Windows" :
    /mac/i.test(ua) ? "MacOS" :
    "Unknown";

  const device =
    /mobile/i.test(ua) ? "Mobile" : "Desktop";

  return { browser, os, device };
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const userAgent = req.headers.get("user-agent");
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.ip ||
    "Unknown";

  const { browser, os, device } = parseUserAgent(userAgent);

  // Insert each field into its correct column
  const { data, error } = await supabase
    .from("activities")
    .insert([
      {
        message,
        ip,
        browser,
        os,
        device,
        user_agent: userAgent,
      },
    ]);

  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  return NextResponse.json({ success: true, data }, { status: 200 });
}
