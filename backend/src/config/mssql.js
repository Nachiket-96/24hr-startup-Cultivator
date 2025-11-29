const sql = require("mssql");
require("dotenv").config();

const config = {
  server: "(localdb)\\MSSQLLocalDB",
  database: "startup_24hr",
  driver: "tedious",
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    encrypt: false,
    trustServerCertificate: true,
    instanceName: "MSSQLLocalDB",
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool = null;

const getConnection = async () => {
  try {
    if (pool && pool.connected) {
      return pool;
    }

    console.log("🔄 Connecting to SQL Server LocalDB...");
    pool = await sql.connect(config);
    console.log("✅ Connected to SQL Server LocalDB");
    console.log("📊 Database: startup_24hr");

    return pool;
  } catch (err) {
    console.error("❌ Database Connection Failed:", err.message);
    pool = null;
    throw err;
  }
};

// Handle connection errors
sql.on("error", (err) => {
  console.error("SQL Error:", err);
});

module.exports = {
  sql,
  getConnection,
};
