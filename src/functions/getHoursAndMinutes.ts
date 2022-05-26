export function getHoursAndMinutes(duration: number): string {
  const minutes = duration % 60;
  const hours = Math.floor(duration / 60);

  return `${hours} ч ${minutes} мин`;
}
