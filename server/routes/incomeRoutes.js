const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
<<<<<<< HEAD
} = require("../controllers/incomeController");
=======
} = require("../controllers/incomeControllers");
>>>>>>> 968ad80a28fbeed15db0b34d713dcd22ac0de8fc
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 968ad80a28fbeed15db0b34d713dcd22ac0de8fc
