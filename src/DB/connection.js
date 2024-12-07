import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("social_db", "root", "root", {
    host: "127.0.0.1",
    dialect: "mysql",
});

export const connectDB = async function () {
    try {
        await sequelize.authenticate();
        console.log("DB connected successfully.");
    } catch (error) {
        console.log(`Failed to connect DB: ${error.message}`);
    }
};

export const syncTables = async function () {
    try {
        await sequelize.sync();
        console.log("Tables sync successfully!");
    }
    catch {
        console.log("Failed to sync models: ", error.message);
    }
}


