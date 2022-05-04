import db from "../database/index";
import env from "dotenv";
import increption from "bcrypt";
import token from "jsonwebtoken";
env.config();

const hashpass = (password: string) => {
  const salt = parseInt(process.env.SALT_ROUNDS as string);
  return increption.hashSync(`${password}${process.env.BCRYPT_PASS}`, salt);
};
type user = {
  id?: number;
  first_name: string;
  last_name: string;
  pass: string;
};

class userModel {
  async create(user: user): Promise<user> {
    try {
      const regestred = {
        first_name: user.first_name,
        pass: user.pass,
      };
      const tok = token.sign({ regestred }, process.env.TOKEN_SECRET as string);
      const conn = await db.connect();
      const sql = `INSERT INTO users (first_name,last_name,pass,token) VALUES ($1,$2,$3,$4) returning *`;
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        hashpass(user.pass),
        tok,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error("Unable to create user");
    }
  }

  async listusers(): Promise<user[]> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      console.log(typeof result + typeof result.rows + result.rows.length);
      return result.rows;
    } catch (error) {
      throw new Error("Cannot get users list");
    }
  }

  async findUserById(id: number): Promise<user> {
    try {
      const conn = await db.connect();
      const sql = `SELECT * FROM users where id=$1`;
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length > 0) {
        console.log(result.rows[0].first_name);
        return result.rows[0];
      } else {
        throw new Error("User Not Found");
      }
    } catch (error) {
      throw new Error("User not Found");
    }
  }

  async updateUser(user: user): Promise<user> {
    try {
      const conn = await db.connect();
      const sql1 = `SELECT * from users where id=$1`;
      const result1 = await conn.query(sql1, [user.id]);

      console.log(result1.rows[0].id);
      console.log(typeof result1.rows[0].id);

      if (user.first_name) {
        result1.rows[0].first_name = user.first_name;
      } else {
      }
      if (user.last_name) {
        result1.rows[0].last_name = user.last_name;
      } else {
      }
      if (user.pass) {
        result1.rows[0].pass = hashpass(user.pass);
      } else {
      }
      console.log(result1.rows[0]);
      const sql2 = `UPDATE users SET first_name=$2,last_name=$3,pass=$4 WHERE id=$1 returning *`;
      const result2 = await conn.query(sql2, [
        result1.rows[0].id,
        result1.rows[0].first_name,
        result1.rows[0].last_name,
        result1.rows[0].pass,
      ]);
      return result2.rows[0];
    } catch (error) {
      throw new Error("User not found");
    }
  }
  async deleteUser(id: number): Promise<user> {
    try {
      const conn = await db.connect();
      const sql = `DELETE FROM users Where id=$1 RETURNING *`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("User Not deleted");
    }
  }
}

export default userModel;
