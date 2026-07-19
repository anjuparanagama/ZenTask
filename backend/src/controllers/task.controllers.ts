import { Response } from "express";
import db from "../config/db";
import { AuthRequest } from "../middleware/auth.middleware";

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, priority, status, due_date } = req.body;
  const userId = req.user?.id;

  const [result]: any = await db.query(
    `INSERT INTO tasks (title, description, priority, status, due_date, user_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, priority, status, due_date, userId],
  );

  res.status(201).json({
    message: "Task created",
    taskId: result.insertId,
  });
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const [rows]: any = await db.query(
    `SELECT * FROM tasks
     WHERE user_id = ?
     ORDER BY due_date ASC`,
    [userId],
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "No tasks found" });
  }

  res.json(rows);
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const taskId = req.params.id;

  const [rows]: any = await db.query(
    `SELECT * FROM tasks
     WHERE id = ? AND user_id = ?`,
    [taskId, userId],
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(rows[0]);
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const taskId = req.params.id;
  const { title, description, priority, status, due_date } = req.body;

  const [existing]: any = await db.query(
    `SELECT id FROM tasks
     WHERE id = ? AND user_id = ?`,
    [taskId, userId],
  );

  if (existing.length === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  await db.query(
    `UPDATE tasks
     SET title = ?, description = ?, priority = ?, status = ?, due_date = ?
     WHERE id = ? AND user_id = ?`,
    [title, description, priority, status, due_date, taskId, userId],
  );

  res.json({ message: "Task updated" });
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const taskId = req.params.id;

  const [existing]: any = await db.query(
    `SELECT id FROM tasks
     WHERE id = ? AND user_id = ?`,
    [taskId, userId],
  );

  if (existing.length === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  await db.query(
    `DELETE FROM tasks
     WHERE id = ? AND user_id = ?`,
    [taskId, userId],
  );

  res.json({ message: "Task deleted" });
};
