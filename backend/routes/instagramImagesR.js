import express from "express";
import { config } from "dotenv";
import axios from "axios";
import { load } from "cheerio";

config();
const instagramRouter = express.Router();

instagramRouter.get("/posts", async (req, res) => {
  try {
    const widgetUrl = process.env.SNAPWIDGET_LINK; // substitua pelo seu ID se necessário
    const { data: html } = await axios.get(widgetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36",
      },
    });

    const $ = load(html);

    const posts = [];

    $("figure.thumbnail-image img").each((_, el) => {
      const link = $(el).attr("data-link");
      const img =
        $(el).attr("data-src-medium") ||
        $(el).attr("data-src-small") ||
        $(el).attr("data-src-large");

      if (link && img) {
        posts.push({ link, img });
      }
    });

    res.json(posts);
  } catch (error) {
    console.error("Erro ao buscar os posts:", error.message);
    res.status(500).json({ error: "Falha ao obter dados do SnapWidget." });
  }
});

export { instagramRouter };
