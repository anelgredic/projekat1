const { Sequelize } = require("sequelize");

const usernamePG = process.env.USERNAME;
const passwordPG = process.env.PASSWORD;

// Kreiranje nove instance Sequelize sa konfiguracijom za bazu podataka
const sequelize = new Sequelize("Database1", usernamePG, passwordPG, {
  host: "localhost",
  dialect: "postgres",
});

// Testiranje konekcije sa bazom podataka
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Povezivanje sa bazom podataka je uspešno!");
  } catch (err) {
    console.error("Greška pri povezivanju sa bazom podataka:", err);
  }
}

testConnection();

module.exports = sequelize;
