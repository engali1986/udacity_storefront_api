import db from "../database/index";
import env from "dotenv";

env.config();

type order = {
  id: number;
  p_id: number;
  qty: number;
  u_id: number;
  o_status: string;
};

class ordersModel {
  async create(order: order): Promise<order> {
    try {
      const conn = await db.connect();
      const sql = `INSERT INTO orders (p_id, qty, u_id, o_status) VALUES ($1,$2,$3,$4) returning *`;
      const sql2 = `INSERT INTO order_products (p_id, qty, u_id) VALUES ($1,$2,$3) returning *`;
      const result = await conn.query(sql, [
        order.p_id,
        order.qty,
        order.u_id,
        order.o_status,
      ]);
      await conn.query(sql2, [order.p_id, order.qty, order.u_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Order not created");
    }
  }

  async list(): Promise<order[]> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        throw new Error("No orders Found");
      }
    } catch (error) {
      throw new Error("No orders Found");
    }
  }

  async findById(id: number): Promise<order> {
    try {
      const conn = await db.connect();
      const sql = `SELECT * FROM orders WHERE id=$1`;
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("order Not Found");
      }
    } catch (error) {
      throw new Error("order Not Found");
    }
  }

  async deleteorder(id: number): Promise<order> {
    try {
      const conn = await db.connect();
      const sql = `DELETE FROM orders Where id=$1 RETURNING *`;
      const result = await conn.query(sql, [id]);
      conn.release();

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("order Not deleted");
      }
    } catch (error) {
      throw new Error("order Not deleted");
    }
  }
}

export default ordersModel;
