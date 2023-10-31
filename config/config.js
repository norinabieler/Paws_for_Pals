console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://rqqllrdsamxzjjulenht.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcWxscmRzYW14empqdWxlbmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMzY3NDEsImV4cCI6MjAxMTkxMjc0MX0.JXkSXYVb1M4aHRet-UmScJNXogv_4QZzuzlkGqywA0Y'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

async function checkAuthenticationAndRedirect() {
    const user = supabase.auth.user();
  
    if (!user) {
      window.location.href = "login.html"; // Redirect to login.html if the user is not authenticated
    }
  }
  
  // Use the window.onload event to call the function when the document is loaded
  window.onload = checkAuthenticationAndRedirect;

export { supa }