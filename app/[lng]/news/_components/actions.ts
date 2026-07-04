"use server";

import { sql } from "@/lib/db";

export async function getNewsArticles(category?: string) {
  try {
    if (category && category !== "all") {
      return await sql`
        SELECT * FROM news_articles 
        WHERE category = ${category} 
        ORDER BY created_at DESC;
      `;
    }
    
    return await sql`SELECT * FROM news_articles ORDER BY created_at DESC;`;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des articles :", error);
    return [];
  }
}