import {z} from "zod"

export const userSchema = z.object({
  userName: z.string(),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g),
  password:z.string(),
  image:z.string().optional(),
  location:z.string().optional(),
  phone:z.string().optional(),
  phoneCode:z.string().optional(),
  locationCode:z.string().optional(),
  role:z.string(),
  createdAt:z.date().optional(),
  UpdatedAt:z.date().optional(),
});


/**
    id: number;
    userName: string;
    email: string;
    password: string;
    role: string;
    isBroker: boolean;
    createdAt: string;
    UpdatedAt: string;
 */