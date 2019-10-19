export function dateIsInFuture(dateString) {
  if (!dateString) {
    return false;
  }
  const date = new Date(dateString);
  const now = new Date();
  return now > date;
};