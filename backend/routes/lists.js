const router = require("express").Router();

const listController = require("../controllers/listController");

router.route("/lists").post((req, res) => listController.create(req, res));
router.route("/lists").get((req, res) => listController.getAll(req, res));
router.route("/lists/:id").get((req, res) => listController.get(req, res));
router.route("/lists/:id").delete((req, res) => listController.delete(req, res));
router.route("/lists/:id").put((req, res) => listController.update(req, res));

module.exports = router;