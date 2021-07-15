function isEmpty(obj) {
    for (var x in obj) { if (Object.prototype.hasOwnProperty.call(obj, x)) return false; }
    return true;
}

module.exports = isEmpty;