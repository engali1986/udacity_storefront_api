import express from "express";
import validation from "../middlewares/validation";
import userModel from "../models/userModel";

const route = express.Router();

// Create admin user with authorization token

route.post(
  "/create/admin",
  async (req: express.Request, res: express.Response) => {
    try {
      const user = new userModel();
      const adduser = await user.create(req.body);
      res.json({
        Massage: "User Added",
        adduser,
      });
    } catch (error) {
      console.log(req.body);
      res.send("Error user not added");
    }
  }
);

// the following route will be used to create users
route.post(
  "/create",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const user = new userModel();
      const adduser = await user.create(req.body);
      res.json({
        Massage: "User Added",
        adduser,
      });
    } catch (error) {
      console.log(req.body);
      res.send("Error user not added");
    }
  }
);
// the following route will be used to list all users
route.get(
  "/",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const users = new userModel();
      const userslist = await users.listusers();
      res.json({
        massage: "Users list",
        userslist,
      });
    } catch (error) {
      res.send("cannot send users list");
    }
  }
);
// the following route will be used to find user by ID
route.get(
  "/finduser/:id",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = new userModel();
      const result = await user.findUserById(id);
      res.json({
        result,
      });
    } catch (error) {
      res.send("user not found");
    }
  }
);
// the following route will be used to update user
route.post(
  "/updateuser",
  async (req: express.Request, res: express.Response) => {
    try {
      const user = new userModel();
      const result = await user.updateUser(req.body);
      res.json({
        result,
      });
    } catch (error) {
      res.send("user not found");
    }
  }
);
// the following route will be used to delete user by ID
route.post(
  "/delete/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const user = new userModel();
      const result = await user.deleteUser(parseInt(req.params.id));
      res.json({
        result,
      });
    } catch (error) {
      res.send("User Not deleted");
    }
  }
);

export default route;
