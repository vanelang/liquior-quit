export const calculateTimeDifference = (startDate: Date) => {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  return {
    years,
    months: months % 12,
    days: days % 30,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
};

export const calculateProgress = (startDate: Date, targetDays: number) => {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();
  const daysPassed = diff / (1000 * 60 * 60 * 24);
  return Math.min((daysPassed / targetDays) * 100, 100);
};

export const formatTimeValue = (value: number) => {
  return value.toString().padStart(2, "0");
};
