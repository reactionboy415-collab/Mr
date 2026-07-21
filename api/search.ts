export default async function handler(req: any, res: any) {
  // Support CORS if needed, or simple direct method checks
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { skills, experience, interests } = req.body || {};
    
    // Basic validation
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      res.status(400).json({ error: "At least one skill is required." });
      return;
    }
    
    const payload = {
      skills,
      experience: experience || "intermediate",
      interests: interests || []
    };

    console.log("Forwarding search payload to external API under Vercel Serverless Function:", JSON.stringify(payload));

    const response = await fetch("https://ezudlxon3ldbg.mocha.app/api/search", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; LAVA Blaze Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/150.0.7871.46 Mobile Safari/537.36",
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Content-Type": "application/json",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-ch-ua": "\"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"150\", \"Android WebView\";v=\"150\"",
        "sec-ch-ua-mobile": "?1",
        "origin": "https://ezudlxon3ldbg.mocha.app",
        "x-requested-with": "mark.via.gp",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        "referer": "https://ezudlxon3ldbg.mocha.app/results?skills=TypeScript%2CAi&experience=advanced&interests=ai%2Cdevtools%2Cfrontend%2Cbackend",
        "accept-language": "en-IN,en-US;q=0.9,en;q=0.8",
        "priority": "u=1, i"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`External API error: ${response.status} - ${errText}`);
      res.status(response.status).json({ 
        error: "Failed to fetch matching issues from external backend.",
        details: errText 
      });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.error("Proxy error in Vercel API /api/search:", error);
    res.status(500).json({ 
      error: "Internal server error occurred while searching on Vercel.",
      message: error.message 
    });
  }
}
