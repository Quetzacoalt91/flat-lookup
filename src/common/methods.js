export function dateIsInFuture(dateString) {
  if (!dateString) {
    return false;
  }
  const date = new Date(dateString);
  const now = new Date();
  return now > date;
};

export function googleMapsLink(postal_code) {
  if (undefined === postal_code || !postal_code.length) {
    return false;
  }
  const query = postal_code.replace(/ /g, '+');
  return `http://maps.google.com/?q=${query}`;
};