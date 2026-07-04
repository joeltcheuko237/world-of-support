"use server";

import { sql } from "@/lib/db";

interface UserData {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "recruiter" | "seeker";
}

export async function saveUserRole({ clerkId, email, firstName = "", lastName = "", role }: UserData) {
  try {
    if (!clerkId || !email) {
      return { success: false, error: "Données utilisateur manquantes." };
    }

    // Insertion directe et sécurisée dans la base Neon
    await sql`
      INSERT INTO users (clerk_id, email, first_name, last_name, role)
      VALUES (${clerkId}, ${email}, ${firstName}, ${lastName}, ${role})
      ON CONFLICT (clerk_id) 
      DO UPDATE SET 
        role = ${role}, 
        first_name = ${firstName}, 
        last_name = ${lastName};
    `;

    return { success: true };

  } catch (error) {
    console.error("❌ ERREUR NEON DATABASE :", error);
    return { 
      success: false, 
      error: "Impossible d'enregistrer le profil dans la base de données." 
    };
  }
}