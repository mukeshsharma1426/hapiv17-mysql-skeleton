`CREATE TABLE tb_admins (
    admin_id bigint(20) NOT NULL,
    first_name text NOT NULL,
    last_name text,
    email varchar(50) NOT NULL,
    password mediumtext NOT NULL,
    creation_datetime datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated datetime DEFAULT NULL
)`
