// src/services/activityService.ts
import { supabase } from "./supabaseClient";

export async function recordActivity(message: string) {

   await fetch("/api/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  
  // const { data, error } = await supabase
  //   .from("activities")
  //   .insert([{ message: message }]);

  // if (error) {
  //   console.error("Error recording activity:", error);
  //   return { success: false, error };
  // }

  // return { success: true, data };
}


// import { recordActivity } from "@/services/activityService";

// async function handleSubmit() {
//   await recordActivity("User clicked submit button");
// }

// useEffect(() => {
//   recordActivity("Landing page visited");
// }, []);
