import { GetStreak, UpdateStreak } from "../../API/streak-userDB";

export const handleStreakUpdate = async () => {
  const res = await GetStreak();
  const data = res.data || { currentStreak: 0, lastCompletedDate: null };

  const today = new Date().toLocaleDateString("en-CA");
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("en-CA");

  let newStreak;

  if (data.lastCompletedDate === yesterday) {
    newStreak = data.currentStreak + 1;
  } else if (data.lastCompletedDate === today) {
    return;
  } else {
    newStreak = 1;
  }
  const streak = {
    currentStreak: newStreak,
    lastCompletedDate: today
  };
  const updateRes = await UpdateStreak(streak);
  if (!updateRes.ok) {
    console.error("Failed to update streak:", updateRes.error);
  }
};
