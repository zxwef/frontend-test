(function() {

  var bar = null;
  var label = null;
  var callback = null;
  var initialized = false;
  var completed = false;

  var progressBar = function(id, _callback) {
    bar = document.querySelector(id + ' .progress-bar__bar');
    label = document.querySelector(id + ' .progress-bar__percents');
    callback = _callback;

    if(bar) {
      initialized = true;
    }
  };

  progressBar.prototype.update = function(percents) {
    if(completed) {
      return;
    }

    if(!initialized) {
      completed = true;
      throw 'Компонент не инициализирован';
    }

    if(percents >= 100) {
      label.innerHTML = 100;
      bar.style.width = '100%';
      completed = true;

      if(callback) {
        callback();
      }
    } else {
      bar.style.width = percents + '%';
      label.innerHTML = percents;
    }
  }

  window.progressBar = progressBar;

})();
