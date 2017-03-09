"use strict";

(function() {

  function dscount(s0, s1, s2) {

    let s = s1 + s2;
    let len = s.length;
    let s0Len = s0.length;
    let s0LowerCase = s0.toLowerCase();
    let indx = 0;
    let cnt = 0;

    for(var i = 0; i < s0Len; i++) {
      if(s0LowerCase.substr(i, len) == s) {
        cnt++;
      }
    }
    console.log(s0, s, cnt);
    return cnt;

    /***************************************************************************
    // первоначально думал через регулярное выражение сделать, но не пошло
    let rgxp = new RegExp(`${s}`, 'ig');
    let matches = s0.match(rgxp);
    console.log(s0, s, rgxp, matches);
    return matches ? matches.length : 0;
    */

  }
  // ... //

  // Простая функция тестирования
  function test(call, args, count, n) {
      let r = (call.apply(n, args) === count);
      console.assert(r, `Finded items count: ${count}`);
      if (!r) throw "Test failed!";
  }

  function task() {

    // Для удобства можно использовать эти тесты:
    try {
        test(dscount, ['ab___ab__', 'a', 'b'], 2);
        test(dscount, ['___cd____', 'c', 'd'], 1);
        test(dscount, ['de_______', 'd', 'e'], 1);
        test(dscount, ['12_12__12', '1', '2'], 3);
        test(dscount, ['_ba______', 'a', 'b'], 0);
        test(dscount, ['_a__b____', 'a', 'b'], 0);
        test(dscount, ['-ab-аb-ab', 'a', 'b'], 2);
        test(dscount, ['aAa', 'a', 'a'], 2);

        console.info("Congratulations! All tests success passed.");
    } catch(e) {
        console.error(e);
    }
  }

  window.fuzzbuzz1 = task;

})();
