import { Router } from "express";
import {
  allTasksCount,
  getOverdueTaskCount,
} from "../controllers/dashboard.controllers";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.get("/all-tasks-count", allTasksCount);
router.get("/overdue-tasks-count", getOverdueTaskCount);

export default router;
