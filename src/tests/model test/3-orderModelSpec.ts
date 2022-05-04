import ordersModel from "../../models/ordersModel";
import userModel from "../../models/userModel";
import productModel from "../../models/productModel";

const orderTest = new ordersModel();
const userTest = new userModel();
const productTest = new productModel();

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
  id: 2,
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
  id: 1,
  p_id: 1,
  qty: 1,
  u_id: 1,
  o_status: "active",
};

describe("order model test", () => {
  it("Test create order", async () => {
    await userTest.create(testuser);
    await productTest.create(testproduct);
    const ordercreated = await orderTest.create(testorder);
    expect(ordercreated.id).toBeDefined;
  });

  it("Test list orders", async () => {
    const list = await orderTest.list();
    expect(list.length).toBeGreaterThan(0);
  });

  it("Test find order by ID", async () => {
    const order = await orderTest.findById(1);
    expect(order).toBeDefined;
  });

  it("Test delete order by ID", async () => {
    const order = await orderTest.deleteorder(1);
    expect(order).toBeDefined;
  });
});
