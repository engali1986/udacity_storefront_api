import express from "express";
import ordersModel from "../models/ordersModel";
import validation from "../middlewares/validation";

const route = express.Router();
// the following route will be used to create orders
route.post(
  "/create",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const order = new ordersModel();
      const newOrder = await order.create(req.body);
      res.json({
        Massage: "Order created",
        newOrder,
      });
    } catch (error) {
      throw new Error("Order not created");
    }
  }
);
// the following route will be used to list all orders
route.get(
  "/",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const order = new ordersModel();
      const list = await order.list();
      res.json({
        list,
      });
    } catch (error) {
      res.send("No orders Found");
    }
  }
);
// the following route will be used to find order by ID
route.get(
  "/find/:id",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const order = new ordersModel();
      const result = await order.findById(parseInt(req.params.id));
      console.log(result);
      res.json({
        result,
      });
    } catch (error) {
      res.send("order Not Found");
    }
  }
);
// the following route will be used to delete order by ID
route.post(
  "/delete/:id",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const order = new ordersModel();
      const result = await order.deleteorder(parseInt(req.params.id));
      res.json({
        result,
      });
    } catch (error) {
      res.send("order Not deleted");
    }
  }
);

export default route;
