const User = require("../models/User");
const Income = require("../models/Income");
const xlsx = require("xlsx");
// Add Income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id; // Assuming authentication middleware sets req.user

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();

    res.status(200).json(newIncome);
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all incomes for logged-in user
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete income by ID
// Delete Income Source
exports.deleteIncome = async (req, res) => {
  try {
    // Assuming 'Income' is a Mongoose model imported earlier in the file
    // req.params.id will contain the ID from the URL (e.g., /api/income/delete/:id)
    await Income.findByIdAndDelete(req.params.id);

    // Send a success response if the income is deleted
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    // Log the error for debugging purposes (optional but recommended)
    console.error("Error deleting income:", error);
    // Send a 500 Internal Server Error response if something goes wrong
    res.status(500).json({ message: "Server Error" });
  }
};
// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id; // Assuming userId is available from authentication middleware

  try {
    // Fetch income data for the specific user, sorted by date in descending order
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel: map the Mongoose documents to a plain array of objects
    const data = income.map(item => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date, // Note: You might want to format the date here for better Excel display
    }));

    // --- Excel Generation using 'xlsx' library (requires 'xlsx' package installed) ---

    // Create a new workbook
    const wb = xlsx.utils.book_new();

    // Convert JSON data to a worksheet
    const ws = xlsx.utils.json_to_sheet(data);

    // Append the worksheet to the workbook with the name "Income"
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Define the filename for the Excel file
    const excelFileName = 'income_details.xlsx';

    // Write the workbook to a file
    // Note: xlsx.writeFile is synchronous. If you need a fully async operation,
    // consider using xlsx.write(wb, { type: 'buffer' }) and then piping it.
    xlsx.writeFile(wb, excelFileName);

    // Set the headers for the file download
    res.setHeader('Content-Disposition', `attachment; filename=${excelFileName}`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the file as a download
    res.download(excelFileName, (err) => {
      if (err) {
        // Handle error during file download
        console.error("Error sending Excel file:", err);
        // It's tricky to send a 500 here if headers are already sent,
        // but this catches issues with res.download itself.
        if (!res.headersSent) {
          res.status(500).json({ message: "Error downloading file." });
        }
      }
      // Optional: Clean up the generated file after download
      // fs.unlinkSync(excelFileName); // Requires 'fs' module
    });

  } catch (error) {
    console.error("Server Error during Excel download:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
