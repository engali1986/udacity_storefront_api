// this is validation middle ware to validate user token

import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

function validation(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    // let token=req.body.token
    // req.headers.authorization=req.body.token

    const authurization: string = req.headers.authorization as string;
    const token = authurization?.split(" ")[1];

    if (jwt.verify(token, process.env.TOKEN_SECRET as string)) {
      next();
    } else {
      const err = new Error();
      next(err);
    }
  } catch (error) {
    next(error);
  }
}

export default validation;
