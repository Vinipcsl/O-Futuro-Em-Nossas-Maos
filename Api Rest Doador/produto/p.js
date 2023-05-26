const pool = require('../BancoDeDados/banco');

class Produto {
  constructor(id, nome, descricao) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
  }

  static async encontrarTodos() {
    const { rows } = await pool.query('SELECT * FROM produtos');
    return rows.map((row) => new Produto(row.id, row.nome, row.descricao));
  }

  static async encontrarPorId(id) {
    const { rows } = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Produto(row.id, row.nome, row.descricao);
  }

  async salvar() {
    if (this.id) {
      await pool.query('UPDATE produtos SET nome = $1, descricao = $2, preco = $3 WHERE id = $4', [
        this.nome,
        this.descricao,
        this.id,
      ]);
    } else {
      const { rows } = await pool.query(
        'INSERT INTO produtos (nome, descricao) VALUES ($1, $2, $3) RETURNING id',
        [this.nome, this.descricao, this.preco]
      );
      this.id = rows[0].id;
    }
  }

  async deletar() {
    await pool.query('DELETE FROM produtos WHERE id = $1', [this.id]);
  }
}

module.exports = Produto;
