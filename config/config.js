console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://rqqllrdsamxzjjulenht.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcWxscmRzYW14empqdWxlbmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMzY3NDEsImV4cCI6MjAxMTkxMjc0MX0.JXkSXYVb1M4aHRet-UmScJNXogv_4QZzuzlkGqywA0Y'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }