// goalService.js
import db from './db.js';

// Add a new goal
export const addGoal = async (title, totalMinutes) => {
  const now = Date.now();
  const result = await db.runAsync(
    'INSERT INTO goals (title, start_time, total_minutes) VALUES (?, ?, ?)',
    [title, now, totalMinutes]
  );
  return result.lastInsertRowId;
};

// Get all goals
export const getGoals = async () => {
  const result = await db.getAllAsync('SELECT * FROM goals ORDER BY id DESC');
  return result;
};
export const getCompletedGoals = async () => {
  const result = await db.getAllAsync("SELECT * FROM goals WHERE status = 'completed' ORDER BY id DESC");
  return result;
}
export const getFailedGoals = async () => {
  const result = await db.getAllAsync("SELECT * FROM goals WHERE status = 'failed' ORDER BY id DESC");
  return result;
}
// Mark goal as completed
export const markGoalDone = async (id) => {
  const end = Date.now();
  await db.runAsync(
    "UPDATE goals SET status = 'completed', end_time = ? WHERE id = ?",
    [end, id]
  );
};

// Mark goal as failed
export const markGoalFailed = async (id) => {
  const end = Date.now();
  await db.runAsync(
    "UPDATE goals SET status = 'failed', end_time = ? WHERE id = ?",
    [end, id]
  );
};

// Delete goal
export const deleteGoal = async (id) => {
  await db.runAsync('DELETE FROM goals WHERE id = ?', [id]);
};

// Reset all
export const clearGoals = async () => {
  await db.runAsync('DELETE FROM goals');
};
