
var pb1 = new progressBar('#pb1', function() {
  console.info('done');
});

var percents = 0;

setInterval(function() {
  percents += 10;
  pb1.update(percents);
}, 300);
