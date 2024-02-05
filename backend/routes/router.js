const router = require("express").Router();
const { authenticate } = require("../middleware/authMiddleware");

// Tasks Router
const tasksRouter = require("./tasks");
router.use("/", authenticate, tasksRouter);

// Lists Router
const listsRouter = require("./lists");
router.use("/", authenticate, listsRouter);

module.exports = router;