CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price DECIMAL(10,2),
    category TEXT
);

INSERT INTO products (id, name, price, category)
VALUES
(1, 'Essence Mascara Lash Princess', 9.99, 'beauty'),
(2, 'Smartphone', 299.99, 'electronics'),
(3, 'Running Shoes', 79.99, 'sports');