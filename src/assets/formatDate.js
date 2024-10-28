function formatDate(date) {
  const shortDateFormat = /^\d{2}-\d{2}-\d{2}$/;
  const longDateFormat = /^\d{4}-\d{2}-\d{2}$/;

  if (shortDateFormat.test(date)) {
    const [day, month, year] = date.split('-');
    const fullYear = year.length === 2 ? `20${year}` : year;
    return `${fullYear}-${month}-${day}`;
  } else if (longDateFormat.test(date)) {
    return date;
  } else {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate)) {
      return parsedDate.toISOString().split('T')[0];
    }
  }
  return new Date().toISOString().split('T')[0];
}
export default formatDate