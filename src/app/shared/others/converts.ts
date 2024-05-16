

export function convertDate(isoDate: string): string {
  const dateObject = new Date(Date.parse(isoDate));
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Note:getMonth() returns 0-based month index
  const day = dateObject.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  return formattedDate;
}
