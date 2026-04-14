import z from "zod";

export const BrokerSchema = z.object({
  userName: z.string(),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g),
  bio:z.string(),
  company:z.string().optional(),
  image:z.string().optional(),
  phone:z.string().optional(),
  location:z.string().optional(),
  languages:z.array(z.string()).optional(),
  createdAt:z.string().transform((val) => new Date(val)).optional(),
  UpdatedAt:z.string().transform((val) => new Date(val)).optional(),
});