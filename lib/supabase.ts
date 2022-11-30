import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY


if (!supabaseKey || !supabaseUrl ) {
  throw new Error('Please provider a valid url or api key')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
