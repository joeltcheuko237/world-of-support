"use server";

import { sql } from "@/lib/db";

export async function getJobs() {
  try {
    const rows = await sql`
      SELECT id, title, description, qualifications, created_at 
      FROM jobs 
      ORDER BY created_at DESC;
    `;
    return rows;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des offres :", error);
    return [];
  }
}