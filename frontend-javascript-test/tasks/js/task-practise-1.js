(function() {

  function parseUrl(string) {
    let parser = document.createElement('a');
    parser.href = string;
    return parser;
  }

  function task() {
    let a = parseUrl('http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo')
    console.info(a);
    // Вернет объект, в котором будут следующие свойства:
    console.log( a.href == "http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo" )
    console.log( a.hash == "#foo" )
    console.log( a.port == "8080" )
    console.log( a.host == "tutu.ru:8080" )
    console.log( a.protocol == "http:" )
    console.log( a.hostname == "tutu.ru" )
    console.log( a.pathname == "/do/any.php" )
    console.log( a.origin == "http://tutu.ru:8080" )
  }

  window.taskPractise1 = task;

})();
