import express, { Request } from "express";
import multer, { Multer } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.room_id}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
