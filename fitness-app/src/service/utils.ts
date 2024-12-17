
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fgwnocxzzcrsvfeqvilh.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnd25vY3h6emNyc3ZmZXF2aWxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzODcxMzQsImV4cCI6MjA0OTk2MzEzNH0.raM_BJV3qkwOtJlEvmf_Lo32q2LSI6AFRo9iC_1lOPk";
export const supabase = createClient(supabaseUrl, supabaseKey);