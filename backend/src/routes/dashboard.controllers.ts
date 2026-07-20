import { Router } from "express";
import {
  allTasksCount,
  getCompletedTodayCount,
  getOverdueTaskCount,
  priorityCounts,
} from "../controllers/dashboard.controllers";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.get("/all-tasks-count", allTasksCount);
router.get("/overdue-tasks-count", getOverdueTaskCount);
router.get("/completed-today-count", getCompletedTodayCount);
router.get("/priority-counts", priorityCounts);

export default router;
