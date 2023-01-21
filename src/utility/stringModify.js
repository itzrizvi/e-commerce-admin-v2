module.exports = {
  strCamelCase: string => {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
    return false;
  },
  nameFormat: name => `${name?.last_name}, ${name?.first_name}`
};
