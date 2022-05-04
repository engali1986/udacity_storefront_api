import ordered_product from "../../models/order_productsModel";
import ordersModel from "../../models/ordersModel";
import userModel from "../../models/userModel";
import productModel from "../../models/productModel";

const orderTest = new ordersModel();
const userTest = new userModel();
const productTest = new productModel();
const orderd = new ordered_product();

type user = {
  id?: number;
  first_name: string;
  last_name: string;
  pass: string;
};

const testuser: user = {
  first_name: "ali1",
  last_name: "ali2",
  pass: "ali3",
};

type product = {
  id: number;
  p_name: string;
  price: number;
  category: string;
};

const testproduct: product = {
  id: 3,
  p_name: "ali1",
  price: 20,
  category: "ali3",
};

type order = {
  id: number;
  p_id: number;
  qty: number;
  u_id: number;
  o_status: string;
};

const testorder: order = {
  id: 2,
  p_id: 1,
  qty: 1,
  u_id: 1,
  o_status: "active",
};

describe("order_products model test", () => {
  it("Test list ordered products to be defined", async () => {
    await userTest.create(testuser);
    await productTest.create(testproduct);
    await orderTest.create(testorder);
    const orderedlist = await orderd.list();

    expect(orderedlist.length).toBeGreaterThan(0);
  });

  it("Test find ordered product  by ID", async () => {
    const order = await orderd.findById(1);
    expect(order).toBeDefined;
  });

  it("Test delete ordered product  by ID", async () => {
    const order = await orderd.deleteorder(1);
    expect(order).toBeDefined;
  });
});
