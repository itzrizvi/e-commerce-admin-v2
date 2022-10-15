const renderImage = (id, image, type, size) => {
    if(!image) return require('../static/img/avatar/NoPath.png');
    const image_arry = image.split('.');
    const ext = image_arry[image_arry.length - 1]
    const filename = `${process.env.REACT_APP_IMAGE_URL}/${type}/${id}/${size}_${id}.${ext}` 
    return filename
}

const errorImageSrc = (e, size = 120) => {
    // e.target.src = `https://via.placeholder.com/${size}/5F63F2/FFFFFF?text=${process.env.REACT_APP_APPNAME}`
    e.target.src = require('../static/img/avatar/NoPath.png') 
}

module.exports = {
    renderImage,
    errorImageSrc
}