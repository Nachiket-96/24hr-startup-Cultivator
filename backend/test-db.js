const { getConnection, sql } = require("./src/config/mssql");

async function testConnection() {
  try {
    console.log("Testing database connection...");
    const pool = await getConnection();

    const result = await pool.request().query("SELECT * FROM test_items");

    console.log("✅ Database connection successful!");
    console.log("📊 Sample data:");
    console.table(result.recordset);

    process.exit(0);
  } catch (err) {
    console.error("❌ Database connection failed:");
    console.error(err.message);
    process.exit(1);
  }
}

testConnection();
