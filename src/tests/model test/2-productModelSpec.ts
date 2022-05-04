import productModel from "../../models/productModel";

const productTest = new productModel();

type product = {
  id: number;
  p_name: string;
  price: number;
  category: string;
};

const testproduct: product = {
  id: 1,
  p_name: "ali1",
  price: 20,
  category: "ali3",
};

describe("product model test", () => {
  it("Test create product", async () => {
    const productcreated = await productTest.create(testproduct);
    expect(productcreated.p_name).toBe("ali1");
  });

  it("Test list products", async () => {
    const list = await productTest.list();
    expect(list.length).toBeGreaterThan(0);
  });

  it("Test find product by ID", async () => {
    const product = await productTest.findById(1);
    expect(product.p_name).toBe("ali1");
  });

  it("Test find product by ID", async () => {
    const newproduct = {
      id: 2,
      p_name: "ali1",
      price: 20,
      category: "ali3",
    };
    await productTest.create(newproduct);
    const product = await productTest.deleteproduct(newproduct.id);
    expect(product.p_name).toBe("ali1");
  });
});
