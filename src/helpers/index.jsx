export const isValidResult = (result) => {
  if (result.status === 200 && !result.error) {
    return true;
  }
  throw result;
};
