import express from "express";
import productModel from "../models/productModel";
import validation from "../middlewares/validation";

const route = express.Router();
// the following route will be used to create products
route.post(
  "/create",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const product = new productModel();
      const newProduct = await product.create(req.body);
      res.json({
        Massage: "Product created",
        newProduct,
      });
    } catch (error) {
      res.send("Product not created");
    }
  }
);
// the following route will be used to list all products
route.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const product = new productModel();
    const list = await product.list();
    res.json({
      list,
    });
  } catch (error) {
    res.send("No Products Found");
  }
});
// the following route will be used to find product by ID
route.get("/find/:id", async (req: express.Request, res: express.Response) => {
  try {
    const product = new productModel();
    const result = await product.findById(parseInt(req.params.id));
    res.json({
      result,
    });
  } catch (error) {
    res.send("Product Not Found");
  }
});
// the following route will be used to delete product by ID
route.post(
  "/delete/:id",
  validation,
  async (req: express.Request, res: express.Response) => {
    try {
      const product = new productModel();
      const result = await product.deleteproduct(parseInt(req.params.id));
      res.json({
        result,
      });
    } catch (error) {
      res.send("product Not deleted");
    }
  }
);

export default route;
