const renderImage = (id, image, type, size, noSize = false) => {
  if (!image) return require('../static/img/avatar/NoPath.png');
  if (noSize) return `${process.env.REACT_APP_IMAGE_URL}/${type}/${id}/${image}`;
  else return `${process.env.REACT_APP_IMAGE_URL}/${type}/${id}/${size}_${image}`;
};
const getFile = path => `${process.env.REACT_APP_FILE_URL}/${path}`;

const errorImageSrc = (e, size = 120) => {
  // e.target.src = `https://via.placeholder.com/${size}/5F63F2/FFFFFF?text=${process.env.REACT_APP_APPNAME}`
  e.target.src = require('../static/img/avatar/NoPath.png');
};

module.exports = {
  renderImage,
  errorImageSrc,
  getFile
};
