module.exports = {
  strCamelCase: string => {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
    return false;
  },
  nameFormat: name => {
    if (name) return `${name?.last_name}, ${name?.first_name}`;
    return 'No REP Found';
  },
  validateEmail: (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
   }
};
