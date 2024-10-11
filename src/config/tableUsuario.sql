CREATE TABLE usuarios(
	id SERIAl PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	senha_hash VARCHAR(255) NOT NULL,
	telefone VARCHAR(15),
	endereco TEXT,
	tipo_usuario VARCHAR(20) NOT NULL DEFAULT 'comprador',
	criado_em TIMESTAMP DEFAULT NOW(),
	atualizado_em TIMESTAMP DEFAULT NOW(),
	ultimo_login TIMESTAMP,
	status_ativo BOOLEAN DEFAULT TRUE,
	CONSTRAINT chk_tipo_usuario CHECK (tipo_usuario IN ('comprador', 'vendedor')),
    CONSTRAINT chk_telefone CHECK (telefone ~ '^\+?[0-9]{7,15}$'),
    CONSTRAINT chk_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
)