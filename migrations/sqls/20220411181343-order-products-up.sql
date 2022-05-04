/* Replace with your SQL commands */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    u_id INTEGER,
    p_id INTEGER,
    qty INTEGER,
    FOREIGN KEY (p_id) REFERENCES products(id),
    FOREIGN KEY (u_id) REFERENCES users(id)

)