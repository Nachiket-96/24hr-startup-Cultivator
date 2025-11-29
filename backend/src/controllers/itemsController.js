const { query, execute } = require("../utils/db-helper");

// GET all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await query("SELECT * FROM test_items");

    res.json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (err) {
    console.error("Error getting items:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch items",
      message: err.message,
    });
  }
};

// GET single item by ID
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await query("SELECT * FROM test_items WHERE id = @id", {
      id: id,
    });

    if (items.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Item not found",
      });
    }

    res.json({
      success: true,
      data: items[0],
    });
  } catch (err) {
    console.error("Error getting item:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch item",
      message: err.message,
    });
  }
};

// POST create new item
exports.createItem = async (req, res) => {
  try {
    const { name, description } = req.body;

    const result = await execute(
      `INSERT INTO test_items (name, description) 
       OUTPUT INSERTED.*
       VALUES (@name, @description)`,
      { name, description }
    );

    res.status(201).json({
      success: true,
      data: result,
      message: "Item created successfully",
    });
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({
      success: false,
      error: "Failed to create item",
      message: err.message,
    });
  }
};

// PUT update item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const result = await execute(
      `UPDATE test_items 
       SET name = @name, description = @description, updated_at = GETDATE()
       OUTPUT INSERTED.*
       WHERE id = @id`,
      { id, name, description }
    );

    res.json({
      success: true,
      data: result,
      message: "Item updated successfully",
    });
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({
      success: false,
      error: "Failed to update item",
      message: err.message,
    });
  }
};

// DELETE item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    await query("DELETE FROM test_items WHERE id = @id", { id });

    res.json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({
      success: false,
      error: "Failed to delete item",
      message: err.message,
    });
  }
};
