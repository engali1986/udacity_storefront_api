import db from "../database/index";
import env from "dotenv";

env.config();

type product = {
  id: number;
  p_name: string;
  price: number;
  category: string;
};

class productModel {
  async create(p: product): Promise<product> {
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO products ( p_name, price, category) VALUES ($1,$2,$3) returning *";
      const result = await conn.query(sql, [p.p_name, p.price, p.category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Product not added");
    }
  }

  async list(): Promise<product[]> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        throw new Error("No Products Found");
      }
    } catch (error) {
      throw new Error("No Products Found");
    }
  }

  async findById(id: number): Promise<product> {
    try {
      const conn = await db.connect();
      const sql = `SELECT * FROM products WHERE id=$1`;
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Product Not Found");
      }
    } catch (error) {
      throw new Error("Product Not Found");
    }
  }

  async deleteproduct(id: number): Promise<product> {
    try {
      const conn = await db.connect();
      const sql = `DELETE FROM products Where id=$1 RETURNING *`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("product Not deleted");
    }
  }
}
export default productModel;
