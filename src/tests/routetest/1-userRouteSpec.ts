import supertest from "supertest";
import db from "../../database/index";
import app from "../../server";

const request = supertest(app);
describe("test user Routes", () => {
  let token: string;
  let u_id: number;
  beforeAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM orders;";
    const sql2 = "DELETE FROM order_products;";
    const sql3 = "DELETE FROM users;";
    const sql4 = "ALTER SEQUENCE users_id_seq RESTART WITH 1";
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
    const sql3 = "DELETE FROM users;";
    const sql4 = "ALTER SEQUENCE users_id_seq RESTART WITH 1";
    await connection.query(sql);
    await connection.query(sql2);
    await connection.query(sql3);
    await connection.query(sql4);
    connection.release();
  });
  it("expect create admin user response body to contain adali1", async () => {
    await request
      .post("/api/users/create/admin")
      .send({
        first_name: "adali1",
        last_name: "adali2",
        pass: "adali3",
      })
      .expect((response) => {
        expect(response.body.adduser.first_name).toContain("adali1");
        token = response.body.adduser.token;
        console.log(token);
      });
  });

  it("expect list user to return 200", async () => {
    await request
      .get("/api/users/")
      .set("Authorization", `Bearer ${token}`)
      .expect((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("expect create user to return 200", async () => {
    await request
      .post("/api/users/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "ali3",
        last_name: "ali3",
        pass: "ali3",
      })
      .expect((res) => {
        expect(res.status).toBe(200);
        u_id = res.body.id;
      });
  });

  it("expect find user to return 200", async () => {
    await request
      .get("/api/users/finduser/" + u_id)
      .set("Authorization", `Bearer ${token}`)
      .expect((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("expect ubdate user to return 200", async () => {
    await request
      .post("/api/users/updateuser")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: u_id,
        first_name: "ali4",
        last_name: "ali3",
        pass: "ali3",
      })
      .expect((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("expect delete user to return 200", async () => {
    await request
      .post("/api/users/delete/" + u_id)
      .set("Authorization", `Bearer ${token}`)
      .expect((res) => {
        expect(res.status).toBe(200);
      });
  });
});
