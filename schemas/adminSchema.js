import { z } from "zod";

export const updatePostStatusSchema = z.object({
  status: z.enum(["draft", "published", "archived"]),
});

export const updateUserRoleSchema = z.object({
  roles: z.enum(["user", "admin", "moderator"]),
  isActive: z.boolean(),
});
