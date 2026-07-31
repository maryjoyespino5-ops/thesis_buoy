import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Example: fetch up to 100 rows from a sample table named `buoys`.
  // Adjust the table name or query to match your schema.
  const { data, error } = await supabaseServer
    .from("buoys")
    .select("*")
    .limit(100);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ data });
}
