require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = 'https://lglpkugzvwyeljvjslaa.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase