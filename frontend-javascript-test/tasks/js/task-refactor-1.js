(function() {

  function func(s, a, b) {
      console.log(s, a, b);

      if (s.match(/^$/)) {
          return -1;
      }

      var i = s.length -1;
      /*var aIndex =     -1;
      var bIndex =     -1;*/
      var index = -1;

      while (i > 0) { // "(aIndex == -1) && (bIndex == -1) && "
          var s1 = s.substring(i, i + 1);
          if (s1 == a || s1 == b) {
              index = i;
              break; // если мы нашли индекс буквы, то можно завершать поиск
          }
          /*if (s.substring(i, i + 1) == b) {
              bIndex = i;
              break;
          }*/
          i--; // i = i - 1;
      }

      /*if (aIndex != -1) {
          if (bIndex == -1) { // 2-ух разных значений тут не может быть, так что это лишнее
              return aIndex;
          }
          else {
              return Math.max(aIndex, bIndex);
          }
      } else if (bIndex != -1) {
          return bIndex;
      }
      else {
          return -1;
      }*/

      return index;
  }

  function task() {
    console.info('Рефакторинг задача №1 -> ', func('asdxfbg', 'x', 'f'));
  }

  window.taskRefactor1 = task;

})();
