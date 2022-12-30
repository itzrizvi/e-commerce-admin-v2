module.exports = {
  strCamelCase: str => {
    if (str)
      return str
        .replace(/\s(.)/g, function(a) {
          return a.toUpperCase();
        })
        .replace(/\s/g, '')
        .replace(/^(.)/, function(b) {
          return b.toLowerCase();
        });
    return false;
  },
};
