"use server";

import { sql } from "@/lib/db";

// Enregistrement des informations du profil
export async function saveSeekerProfile(data: {
  userId: string;
  fullName: string;
  professionalTitle: string;
  bio: string;
  skills: string;
  qualifications: string;
  githubUrl: string;
  linkedinUrl: string;
}) {
  try {
    if (!data.userId) return { success: false, error: "Non connecté" };

    await sql`
      INSERT INTO seeker_profiles (user_id, full_name, professional_title, bio, skills, qualifications, github_url, linkedin_url, updated_at)
      VALUES (${data.userId}, ${data.fullName}, ${data.professionalTitle}, ${data.bio}, ${data.skills}, ${data.qualifications}, ${data.githubUrl}, ${data.linkedinUrl}, NOW())
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        full_name = EXCLUDED.full_name,
        professional_title = EXCLUDED.professional_title,
        bio = EXCLUDED.bio,
        skills = EXCLUDED.skills,
        qualifications = EXCLUDED.qualifications,
        github_url = EXCLUDED.github_url,
        linkedin_url = EXCLUDED.linkedin_url,
        updated_at = NOW();
    `;
    return { success: true };
  } catch (error) {
    console.error("Database Error (Profile):", error);
    return { success: false, error: "Erreur serveur" };
  }
}

// Récupération des candidatures de l'utilisateur
export async function getMyApplications(userId: string) {
  try {
    if (!userId) return [];
    // Effectue une jointure pour récupérer le titre et les détails de l'offre
    const rows = await sql`
      SELECT a.id, a.status, a.applied_at, j.title as job_title, c.official_name as company_name
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      LEFT JOIN companies c ON j.user_id = c.user_id
      WHERE a.user_id = ${userId}
      ORDER BY a.applied_at DESC;
    `;
    return rows;
  } catch (error) {
    console.error("Database Error (Applications):", error);
    return [];
  }
}