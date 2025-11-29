const sql = require("mssql");

const config = {
  server: "(localdb)\\MSSQLLocalDB",
  database: "startup_24hr",
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool = null;

async function getPool() {
  try {
    if (pool && pool.connected) {
      return pool;
    }

    console.log("🔄 Connecting to database...");
    pool = await sql.connect(config);
    console.log("✅ Database connected");
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    pool = null;
    throw err;
  }
}

async function query(sqlQuery, params = {}) {
  let currentPool;
  try {
    currentPool = await getPool();
    const request = currentPool.request();

    Object.keys(params).forEach((key) => {
      request.input(key, params[key]);
    });

    const result = await request.query(sqlQuery);
    return result.recordset || [];
  } catch (err) {
    console.error("Query error:", err.message);
    console.error("SQL:", sqlQuery);
    throw err;
  }
}

async function execute(sqlQuery, params = {}) {
  let currentPool;
  try {
    currentPool = await getPool();
    const request = currentPool.request();

    Object.keys(params).forEach((key) => {
      request.input(key, params[key]);
    });

    const result = await request.query(sqlQuery);
    return result.recordset[0] || result;
  } catch (err) {
    console.error("Execute error:", err.message);
    console.error("SQL:", sqlQuery);
    throw err;
  }
}

// Handle process termination
process.on("SIGINT", async () => {
  if (pool) {
    await pool.close();
    console.log("Database connection closed");
  }
  process.exit(0);
});

module.exports = { query, execute };
