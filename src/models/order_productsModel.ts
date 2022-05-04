import db from "../database/index";
import env from "dotenv";

env.config();

type orderdProduct = {
  id: number;
  u_id: number;
  p_id: number;
  qty: number;
};

class ordered_product {
  // List all ordered products
  async list(): Promise<orderdProduct[]> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM order_products  ";
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error("No products to show");
    }
  }
  // delete all ordered products by user

  async deleteorder(id: number): Promise<orderdProduct[]> {
    try {
      const conn = await db.connect();
      const sql = `DELETE FROM order_products Where u_id=$1 RETURNING *`;
      const result = await conn.query(sql, [id]);
      conn.release();

      if (result.rows.length > 0) {
        return result.rows;
      } else {
        throw new Error("order Not deleted");
      }
    } catch (error) {
      throw new Error("order Not deleted");
    }
  }

  // find all ordered products by user ID
  async findById(id: number): Promise<orderdProduct[]> {
    try {
      const conn = await db.connect();
      const sql = `SELECT * FROM order_products WHERE u_id=$1`;
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        throw new Error("order Not Found");
      }
    } catch (error) {
      throw new Error("order Not Found");
    }
  }
}

export default ordered_product;
