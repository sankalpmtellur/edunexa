import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xvrnnvasjqsonyixlelf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cm5udmFzanFzb255aXhsZWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDE5NTMsImV4cCI6MjA2NzMxNzk1M30.22MPxdpzCpCjJp-iyXVVsfOhuwrtRcdillW2Zkz8dIo';

export const supabase = createClient(supabaseUrl, supabaseKey);