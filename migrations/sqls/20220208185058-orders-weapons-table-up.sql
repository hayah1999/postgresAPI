CREATE TABLE orders_weapons ( id SERIAL PRIMARY KEY, quantity INTEGER, order_id INTEGER REFERENCES orders(id), weapon_id INTEGER REFERENCES mythical_weapons(id));