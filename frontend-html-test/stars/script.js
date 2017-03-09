
(function() {

  function Stars() {

    this.initBlock = function(block) {
      var self = this;

      var starsItems = block.querySelectorAll('.stars__item');
      starsItems.forEach(function(star) {
        star.onclick = function() {
          self.removeActiveClasses(block);
          block.classList.add('stars_active_' + this.getAttribute('data-num'));
        }

        /*star.onmouseover = function() {
          self.removeActiveClasses(block);
          block.classList.add('stars_hover_' + this.getAttribute('data-num'));
        }*/
      });
    }

    this.removeActiveClasses = function(block) {
      for(var i = 1; i <= 5; i++) {
        block.classList.remove('stars_active_' + i);
      }
    }

    var blocks = document.querySelectorAll('.stars');
    blocks.forEach(function(block) {
      this.initBlock(block);
    });

  }

  Stars();

})();
