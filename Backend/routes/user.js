import { Router } from "express";
import { UpdateElementSchema,UpdateMetadataSchema } from "./types/index.js";
import client from "../Db/index.js";
import { userMiddleware } from "../middlewares/user.js";

export const userRouter = Router();

userRouter.post("/metadata", userMiddleware, async (req, res) => {
  const parsedData = UpdateMetadataSchema.safeParse(req.body);
  if (!parsedData.sucess) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }

  await client.user.update({
    where: {
      id: req.userId,
    },
    data: {
      avatarId: parsedData.data.avatarId,
    },
  });

  res.json({ message: "Metadata updated" });
});

userRouter.get("/metadata/bulk", async (req, res) => {
  const userIdString = req.query.ids ?? "[]";

  const userIds = userIdString.slice(1, userIdString?.length - 2).split(",");

  const metadata = await client.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      avatar: true,
      id: true,
    },
  });
  res.json({
    avatars: metadata.map((m) => ({
      userId: m.id,
      avatarId: m.avatar?.imageUrl,
    })),
  });
});
