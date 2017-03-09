(function() {

  function checkSyntax(str) {
    console.info(str);
    let brakes = {
      ']': '[',
      ')': '(',
      '}': '{',
      '>': '<',
    };

    let stack = [];
    let arr = str.split('');
    let lastBrake = '';

    for(let i = 0; i < arr.length; i++) {
      let val = arr[i];
      if(isOpenBrake(val)) {
        stack.push(val);
        lastBrake = val;
      } else if(isCloseBrake(val)) {
        let b = stack.pop(val);
        if(b == 'undefined' || brakes[val] != b) {
          return 1;
        }
        lastBrake = val;
      }
    }

    return 0;
  }

  function isOpenBrake(val) {
    if(['[', '(', '{', '<'].indexOf(val) != -1) {
      return true;
    }

    return false;
  }

  function isCloseBrake(val) {
    if([']', ')', '}', '>'].indexOf(val) != -1) {
      return true;
    }

    return false;
  }

  // Простая функция тестирования
  function test(call, args, count, n) {
      let r = (call.apply(n, args) === count);
      console.assert(r, `Finded items count: ${count}`);
      if (!r) throw "Test failed!";
  }

  function task() {

    try {
        test(checkSyntax, ["---(++++)----"], 0);
        test(checkSyntax, [""], 0);
        test(checkSyntax, ["before ( middle []) after "], 0);
        test(checkSyntax, [") ("], 1);
        test(checkSyntax, ["} {"], 1);
        test(checkSyntax, ["<(   >)"], 1);
        test(checkSyntax, ["(  [  <>  ()  ]  <>  )"], 0);
        test(checkSyntax, ["   (      [)"], 1);

        console.info("Congratulations! All tests success passed.");
    } catch(e) {
        console.error(e);
    }

  }

  window.fuzzbuzz2 = task;
})();
