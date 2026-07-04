"use server";

import { neon } from "@neondatabase/serverless";

// Initialisation de la connexion Neon via la variable d'environnement
const sql = neon(process.env.DATABASE_URL!);

export async function saveCompanyInfo(data: {
  userId: string;
  officialName: string;
  website: string;
  contactEmail: string;
  address: string;
  phone: string;
  foundedDate: string;
  location: string;
  postalCode: string;
}) {
  try {
    // Exemple d'un UPSERT (insère ou met à jour si l'entreprise existe déjà pour cet utilisateur)
    await sql`
      INSERT INTO companies (user_id, official_name, website, contact_email, address, phone, founded_date, location, postal_code)
      VALUES (${data.userId}, ${data.officialName}, ${data.website}, ${data.contactEmail}, ${data.address}, ${data.phone}, ${data.foundedDate}, ${data.location}, ${data.postalCode})
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        official_name = EXCLUDED.official_name,
        website = EXCLUDED.website,
        address = EXCLUDED.address,
        phone = EXCLUDED.phone,
        founded_date = EXCLUDED.founded_date,
        location = EXCLUDED.location,
        postal_code = EXCLUDED.postal_code;
    `;
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to save company information." };
  }
}

export async function publishJobOffer(data: {
  userId: string;
  title: string;
  description: string;
  qualifications: string;
}) {
  try {
    await sql`
      INSERT INTO jobs (user_id, title, description, qualifications, created_at)
      VALUES (${data.userId}, ${data.title}, ${data.description}, ${data.qualifications}, NOW());
    `;
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to publish job offer." };
  }
}