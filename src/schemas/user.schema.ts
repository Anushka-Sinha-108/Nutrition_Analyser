import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().optional(),
  displayName: z.string().optional(),
  email: z.string().email().optional(),
  rollNumber: z.string().optional(),
  goals: z.record(z.string(), z.any()).optional(),
  createdAt: z.any().optional(),
});

export type UserProfile = z.infer<typeof UserSchema>;
export default UserSchema;
