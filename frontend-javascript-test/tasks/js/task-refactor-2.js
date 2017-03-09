(function() {

  function drawRating(vote) {

      var stars = [
        '★☆☆☆☆',
        '★★☆☆☆',
        '★★★☆☆',
        '★★★★☆',
        '★★★★★'
      ];

      var cntStars = Math.ceil(vote / 20);
      return stars[cntStars > 0 ? cntStars - 1 : 0];
  }

  function task() {
    // Проверка работы результата
    console.log(drawRating(0) ); // ★☆☆☆☆
    console.log(drawRating(1) ); // ★☆☆☆☆
    console.log(drawRating(50)); // ★★★☆☆
    console.log(drawRating(99)); // ★★★★★
  }

  window.taskRefactor2 = task;

})();
