export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return ""
  
  const [integerPart, fractionalPart] = num.toString().split('.')
  const fromattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return fractionalPart
    ? `${fromattedInteger}.${fractionalPart}`
    : fromattedInteger
}