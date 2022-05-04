import supertest from "supertest";
import db from "../../database/index";
import app from "../../server";

const request = supertest(app);
describe("test products Routes", () => {
  let token: string;
  let p_id: number;

  beforeAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM orders;";
    const sql2 = "DELETE FROM order_products;";
    const sql3 = "DELETE FROM products;";
    const sql4 = "ALTER SEQUENCE products_id_seq RESTART WITH 1";
    await connection.query(sql);
    await connection.query(sql2);
    await connection.query(sql3);
    await connection.query(sql4);
    connection.release();
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM orders;";
    const sql2 = "DELETE FROM order_products;";
    const sql3 = "DELETE FROM products;";
    const sql4 = "ALTER SEQUENCE products_id_seq RESTART WITH 1";
    await connection.query(sql);
    await connection.query(sql2);
    await connection.query(sql3);
    await connection.query(sql4);
    connection.release();
  });
  it("expect create product response to be 200", async () => {
    await request
      .post("/api/users/create/admin")
      .send({
        first_name: "adali2",
        last_name: "adali3",
        pass: "adali4",
      })
      .then((res) => {
        token = res.body.adduser.token;
      });
    await request
      .post("/api/products/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        p_name: "iphone",
        price: 200,
        category: "electronics",
      })
      .expect((result) => {
        expect(result.status).toBe(200);
        p_id = result.body.newProduct.id;
      });
  });

  it("expect list products response to be 200", async () => {
    await request
      .get("/api/products/")
      .set("Authorization", `Bearer ${token}`)
      .expect((result) => {
        expect(result.status).toBe(200);
      });
  });

  it("expect find product by ID response to be 200", async () => {
    await request
      .get("/api/products/find/" + p_id)
      .set("Authorization", `Bearer ${token}`)
      .expect((result) => {
        expect(result.status).toBe(200);
      });
  });

  it("expect delete product by ID response to be 200", async () => {
    await request
      .post("/api/products/delete/" + p_id)
      .set("Authorization", `Bearer ${token}`)
      .expect((result) => {
        expect(result.status).toBe(200);
      });
  });
});
