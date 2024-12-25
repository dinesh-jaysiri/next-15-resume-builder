import { z } from "zod";

// Utility for optional strings, allowing empty strings or undefined values
const optionalString = z.string().trim().optional().or(z.literal(""));

// ----------------------------- General Information Schema -----------------------------
// Schema for general information such as title and description
export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

// ----------------------------- Personal Information Schema -----------------------------
// Schema for personal information including photo, name, job title, and contact details
export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/"))
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB"
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalInforValues = z.infer<typeof personalInfoSchema>;

// ----------------------------- Work Experience Schema -----------------------------
// Schema for capturing work experience details, allowing multiple entries
export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      })
    )
    .optional(),
});

export type WorkExperiencesValues = z.infer<typeof workExperienceSchema>;

// ----------------------------- Education Schema -----------------------------
// Schema for capturing education details, allowing multiple entries
export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      })
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;

// ----------------------------- Skill Schema -----------------------------
// Schema for capturing skills as an array of strings
export const skillSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export type SkillValues = z.infer<typeof skillSchema>;

// ----------------------------- Summary Schema -----------------------------
// Schema for capturing a brief summary
export const summarySchema = z.object({
  summary: optionalString,
});

export type SummaryValues = z.infer<typeof summarySchema>;

// ----------------------------- Resume Schema -----------------------------
// Combined schema for the entire resume, merging general info, personal info, work experience,
// education, and skills into a single schema
export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
  ...summarySchema.shape
});

export type resumeSchemaValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: string | File | null;
};
