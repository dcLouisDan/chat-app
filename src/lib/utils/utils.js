export const checkMissingValues = (fieldsArray) => {
  if (!Array.isArray(fieldsArray)) return true;

  for (let i = 0; i < fieldsArray.length; i++) {
    if (fieldsArray[i] === '') return true;
  }


  return false;
};
