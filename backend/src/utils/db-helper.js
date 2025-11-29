const sql = require("mssql");

const config = {
  server: "(localdb)\\MSSQLLocalDB",
  database: "startup_24hr",
  options: {
    trustedConnection: true,
    encrypt: false,
  },
};

async function query(sqlQuery, params = {}) {
  let pool;
  try {
    pool = await sql.connect(config);
    const request = pool.request();

    // Add parameters
    Object.keys(params).forEach((key) => {
      request.input(key, params[key]);
    });

    const result = await request.query(sqlQuery);
    return result.recordset;
  } catch (err) {
    console.error("Query error:", err);
    throw err;
  } finally {
    if (pool) await pool.close();
  }
}

module.exports = { query };
