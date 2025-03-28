import z from "zod";

export const SignupSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

export const SigninSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

export const UpdateMetadataSchema = z.object({
  avatarId: z.string(),
});

export const CreateSpaceSchema = z.object({
  name: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  mapId: z.string().optional(),
});

export const AddElementSchema = z.object({
  spaceId: z.string(),
  elementId: z.string(),
  x: z.number(),
  y: z.number(),
});

export const DeleteElementSchema = z.object({
  id:z.string(),
})

export const CreateElementSchema = z.object({
  imageUrl: z.string(),
  width: z.number(),
  height: z.number(),
  static: z.boolean(),
});

export const UpdateElementSchema  = z.object({
  imageUrl: z.string(),  // ✅ fixed typo
});

export const CreateAvatarSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
});

export const CreateMapSchema = z.object({
  thumbnail: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  name:z.string(),
  defaultElements: z.array(z.object({
    elementId: z.string(),  // ✅ fixed missing parentheses
    x: z.number(),
    y: z.number(),
  })),
});
