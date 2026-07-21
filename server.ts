import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // For parsing application/json
  app.use(express.json());

  // API route for search proxy
  app.post("/api/search", async (req, res) => {
    try {
      const { skills, experience, interests } = req.body;
      
      // Basic validation
      if (!skills || !Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({ error: "At least one skill is required." });
      }
      
      const payload = {
        skills,
        experience: experience || "intermediate",
        interests: interests || []
      };

      console.log("Forwarding search payload to external API:", JSON.stringify(payload));

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
        return res.status(response.status).json({ 
          error: "Failed to fetch matching issues from external backend.",
          details: errText 
        });
      }

      const data = await response.json();
      return res.json(data);
    } catch (error: any) {
      console.error("Proxy error in /api/search:", error);
      return res.status(500).json({ 
        error: "Internal server error occurred while searching.",
        message: error.message 
      });
    }
  });

  // Serve static assets in production, or use Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
