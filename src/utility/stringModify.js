module.exports = {
  strCamelCase: string => {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
    return false;
  },
  nameFormat: name => {
    if (name) return `${name?.last_name}, ${name?.first_name}`;
    return 'No REP Found';
  },
};
