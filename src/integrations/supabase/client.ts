// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ahcqtqxyejhlwvauajqq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoY3F0cXh5ZWpobHd2YXVhanFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NzgzNTMsImV4cCI6MjA2NTU1NDM1M30.un7XO6gLS12MmHEFyrjhMzX1aaMxnbEMUMqgDk0Pf-A";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);