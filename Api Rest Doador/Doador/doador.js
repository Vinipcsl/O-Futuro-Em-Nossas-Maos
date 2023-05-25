const poll = require ('../BancoDeDados/banco');

class Doador
{
    constructor(id, nome, sobrenome, telefone)
    {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.telefone = telefone;
    }

    static async encontrarTodos()
    {
        const {rows} = await poll.query('SELECT * FROM doadores');
        return rows.map((row) => new Doador(row.id, row.nome, row.sobrenome, row.telefone));
    }

    static async encontrarPorId(id)
    {
        const {rows} = await poll.query('SELECT * FROM doadores WHERE id = $1', [id]);
        if (rows.length === 0)
        {
            return null;
        }
        const row = rows[0];
        return new Doador(row.id, row.nome, row.sobrenome, row.telefone);
    }

    async salvar()
    {
        if(this.id)
        {
            await poll.query('UPDATE doadores SET nome = $1, sobrenome = $2, telefone = $3 WHERE id = $4', [this.nome, this.sobrenome, this.telefone, this.id]);
        }
        else
        {
            const {rows} = await poll.query('INSERT INTO doadores (nome, sobrenome, telefone) VALUES ($1, $2, $3) RETURNING id', [this.nome, this.sobrenome, this.telefone]);
            this.id = rows[0].id;
        }
    }

    async deletar()
    {
        await poll.query('DELETE FROM doadores WHERE id = $1', [this.id]);
    }
}

module.exports = Doador;