import { Response } from "express";
import db from "../config/db";
import { AuthRequest } from "../middleware/auth.middleware";

export const allTasksCount = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const [rows]: any = await db.query(
    `
  SELECT
    COUNT(*) AS totalTasks,
    SUM(status = 'COMPLETED') AS completedTasks,
    SUM(status = 'IN_PROGRESS') AS inProgressTasks,
    SUM(status = 'TODO') AS todoTasks
  FROM tasks
  WHERE user_id = ?
  `,
    [userId],
  );

  res.json(rows[0]);
};

export const getOverdueTaskCount = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const [rows]: any = await db.query(
    `
    SELECT COUNT(*) AS overdueTasks
    FROM tasks
    WHERE user_id = ?
      AND due_date < CURDATE()
      AND status != 'COMPLETED'
    `,
    [userId],
  );

  res.json({
    overdueTasks: rows[0].overdueTasks,
  });
};

export const getCompletedTodayCount = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const [rows]: any = await db.query(
    `
    SELECT COUNT(*) AS completedToday
    FROM tasks
    WHERE user_id = ?
      AND status = 'COMPLETED'
      AND DATE(updated_at) = CURDATE()
    `,
    [userId],
  );

  res.json({
    completedToday: rows[0].completedToday,
  });
};

export const priorityCounts = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const [rows]: any = await db.query(
    `
    SELECT
      COUNT(*) AS totalTasks,
      SUM(priority = 'HIGH') AS highPriorityTasks,
      SUM(priority = 'MEDIUM') AS mediumPriorityTasks,
      SUM(priority = 'LOW') AS lowPriorityTasks
    FROM tasks
    WHERE user_id = ?
    `,
    [userId],
  );

  res.json(rows[0]);
};
