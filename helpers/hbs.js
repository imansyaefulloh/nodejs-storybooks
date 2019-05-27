const moment = require('moment');

module.exports = {
  truncate: (str, len) => {
    if (str.length > len && str.length > 0) {
      var newStr = str + ' ';
      newStr = str.substr(0, len);
      newStr = str.substr(0, newStr.lastIndexOf(' '));
      newStr = (newStr.length > 0) ? newStr : str.substr(0, len);
      return newStr + '...';
    }
    return str;
  },
  stripTags: (input) => {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  formatDate: (date, format) => {
    return moment(date).format(format);
  }
}