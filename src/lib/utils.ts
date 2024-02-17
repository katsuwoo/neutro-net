export const getRandomString = (length: number): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  
  const result = Array.from(randomValues, (value) => chars[value % chars.length]).join('');
  
  return result;
}