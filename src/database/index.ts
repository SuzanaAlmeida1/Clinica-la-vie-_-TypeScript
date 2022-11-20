import { Options, Sequelize } from 'sequelize';

const DB_NAME: string = process.env.DB_NAME as string;
const DB_USER: string = process.env.DB_USER as string;
const DB_PASS: string = process.env.DB_PASS as string;
const DB_CONFIG: Options = {
    dialect: 'mysql',
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT)
}

//let db: Sequelize = {} as Sequelize;
try {
    const db: Sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
    
} catch (err) {
    console.error("Erro ao carregar o banco de dados", err);
    
}

async function hasConnection() {
    try {
        await db.authenticate();
        console.log("Autenticado com sucesso!");
    } catch (err) {
        console.log("Erro na autenticação...", err);
    }
};

Object.assign(db, {
    hasConnection,
});

export default db
