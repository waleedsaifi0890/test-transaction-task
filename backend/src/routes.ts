import { Router, Request, Response } from "express";
import Transaction from "./controller/transaction";

const router = Router();

// router.post("/transaction/", Transaction.create);
// router.put("/transaction/:id", Transaction.update);
// router.delete("/transaction/:id", Transaction.delete);

router.get("/transaction/:id", Transaction.getOne);
router.get("/transaction/", Transaction.all);
router.post("/transaction/:id/flag", Transaction.setFlag);
router.post("/transaction/:id/allow", Transaction.allowTransaction);
router.post("/transaction/:id/comment", Transaction.addComment);

export default router;
