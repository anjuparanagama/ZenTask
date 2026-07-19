import { Response } from "express";
import db from "../config/db";
import { AuthRequest } from "../middleware/auth.middleware";

export const allTasksCount = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const [rows]: any = await db.query(
    `
  SELECT
    COUNT(*) AS totalTasks,
    SUM(status = 'Completed') AS completedTasks,
    SUM(status = 'In Progress') AS inProgressTasks,
    SUM(status = 'To Do') AS todoTasks
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
      AND status != 'Completed'
    `,
    [userId],
  );

  res.json({
    overdueTasks: rows[0].overdueTasks,
  });
};
