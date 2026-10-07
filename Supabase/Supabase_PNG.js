import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dfynqplmvxyoxiadxpyf.supabase.co";
const supabaseKey = "sb_publishable_pVAxIRYHPBiovITXGnSedw_jlgsQ6qj";

export const supabase = createClient(supabaseUrl, supabaseKey);