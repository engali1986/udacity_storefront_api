import supertest from "supertest";
import db from "../../database/index";
import app from "../../server";

const request = supertest(app);
describe("test orders Routes", () => {
  let token: string;
  let user_id: number;
  let product_id: number;
  let o_id: number;

  beforeAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM orders";
    const sql2 = "ALTER SEQUENCE orders_id_seq RESTART WITH 1";
    await connection.query(sql);
    await connection.query(sql2);
    connection.release();
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM orders";
    const sql2 = "DELETE FROM order_products";
    // const sql3='DELETE FROM users'
    const sql4 = "ALTER SEQUENCE orders_id_seq RESTART WITH 1";
    // const sql5 =
    //   "DROP TABLE users, products, orders, order_products, migrations CASCADE;";
    await connection.query(sql);
    await connection.query(sql2);
    // await connection.query(sql3)
    await connection.query(sql4);
    // await connection.query(sql5);

    connection.release();
  });

  it("expect create order response to be 200", async () => {
    await request
      .post("/api/users/create/admin")
      .send({
        first_name: "adali2",
        last_name: "adali3",
        pass: "adali4",
      })
      .then((res) => {
        token = res.body.adduser.token;
        user_id = res.body.adduser.id;
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
        product_id = result.body.newProduct.id;
      });

    await request
      .post("/api/orders/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        p_id: product_id,
        u_id: user_id,
        qty: 4,
        o_status: "processing",
      })
      .expect((result) => {
        expect(result.status).toBe(200);
        o_id = result.body.newOrder.id;
      });
  });

  it("expect list orders response to be 200", async () => {
    await request
      .get("/api/orders/")
      .set("Authorization", `Bearer ${token}`)
      .expect((result) => {
        expect(result.status).toBe(200);
      });
  });

  it("expect find order by ID response to be 200", async () => {
    await request
      .get("/api/orders/find/" + o_id)
      .set("Authorization", `Bearer ${token}`)
      .expect((result) => {
        expect(result.status).toBe(200);
      });
  });

  it("expect delete order by ID response to be 200", async () => {
    await request
      .post("/api/orders/delete/" + o_id)
      .set("Authorization", `Bearer ${token}`)
      .expect((result) => {
        expect(result.status).toBe(200);
      });
  });
});
