CREATE TABLE podracer(
    pod_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    name TEXT NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#000000',
    engine_count INTEGER NOT NULL CHECK ( engine_count >= 1 AND engine_count <= 4 ) DEFAULT 1,
    armor_rating INTEGER NOT NULL CHECK (armor_rating >= 0 AND armor_rating <= 5) DEFAULT 0,
    pod_value NUMERIC(10, 2) NOT NULL DEFAULT 100.00 CHECK ( pod_value > 0 ) ,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_AT TIMESTAMP NOT NULL DEFAULT NOW()
);