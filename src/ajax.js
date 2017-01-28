module.exports = {
  send: function(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("load", function(result) {
        resolve(result);
      });
      xhr.addEventListener("error", function(err) {
        reject(err);
      });
      xhr.open('POST', url);

      try {
        xhr.send();
      } catch(e) {
        reject(e);
      }
    });
  }
};