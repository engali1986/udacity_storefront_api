import express from "express";
import ordered_product from "../models/order_productsModel";
import validation from "../middlewares/validation";

const route = express.Router();
// the following route will be used to list ordered products
route.get(
  "/",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const orderedProduct = new ordered_product();
      const list = await orderedProduct.list();
      res.json({
        list,
      });
    } catch (error) {
      res.send("No orders Found");
    }
  }
);
// The following route will be used to find all products orderd by user ID
route.get(
  "/find/:id",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const order = new ordered_product();
      const result = await order.findById(parseInt(req.params.id));
      res.json({
        result,
      });
    } catch (error) {
      res.send("order Not Found");
    }
  }
);

// the following route will be used to delete order by user ID
route.post(
  "/delete/:id",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const order = new ordered_product();
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
