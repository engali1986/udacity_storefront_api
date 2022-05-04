/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    p_id INTEGER ,
    FOREIGN KEY (p_id) REFERENCES products(id),
    qty INTEGER NOT NULL,
    u_id INTEGER ,
    FOREIGN KEY (u_id) REFERENCES users(id),
    o_status VARCHAR(100)

)