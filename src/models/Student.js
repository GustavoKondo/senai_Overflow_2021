const { Model, DataTypes } = require("sequelize");

class Student extends Model {
    /**
     * aqui configuramos os campos da tabela
     * os campos automáticos não precisam ser declarados
     */
    static init(sequelize) {
        super.init(
            {
                ra: DataTypes.STRING,
                nome: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING
            },
            {
                sequelize,
                tableName: "alunos"
            }
        )
    }

    /**
     * aqui configuramos os relacionamentos 
     */
    static associate(models) {
        this.hasMany(models.Question, { foreignKey: "aluno_id" });
        this.hasMany(models.Answer,{foreignKey:"student_id"})
    }
}

module.exports = Student;