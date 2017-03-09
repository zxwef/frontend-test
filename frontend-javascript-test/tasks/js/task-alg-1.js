(function() {

    var Pancakes = function() {

        this.items = [{
            side1: false,
            side2: false
        }, {
            side1: false,
            side2: false
        }, {
            side1: false,
            side2: false
        }];

        this.isDone = function() {

            for (var i in this.items) {
                if (!this.items[i].side1 || !this.items[i].side2) {
                    return false;
                }
            }

            return true;
        }

        this.fry = function() {
            let iterations = 0;

            for (let i = 0; i < this.items.length && iterations < 2; i++) {
                if ((!this.items[i].side1 || !this.items[i].side2) && iterations == 0) {
                    this.fryItem(i);
                    iterations++;
                } else if (iterations == 1 && this.items[i].side1) {
                    if (this.items.length > i + 1) {
                      this.fryItem(i + 1);
                    } else {
                      this.fryItem(i);
                    }
                    iterations++;
                } else if (!this.items[i].side1 || !this.items[i].side2) {
                  this.fryItem(i);
                  iterations++;
                }
            }
        }

        this.fryItem = function(i) {
          if(!this.items[i].side1) {
            this.items[i].side1 = true;
          } else {
            this.items[i].side2 = true;
          }
        }
    }

    function task() {
        console.info('Pancakes!!!!!!!!!!');
        var pancakes = new Pancakes();

        iterations = 0;
        while (!pancakes.isDone()) {
            pancakes.fry();
            iterations++;
        }

        console.info(iterations, pancakes.items);
    }

    window.Pancake = task;
})();

/*
Если мы будем жарить блинчики поочередно, т.е. сначала первые два, а потом положим третий, то у нас будет простаивать 2-ая сковорода, поэтому мы затратим 4 итерации. А если мы, после первой итерации снимем один блин и положим другой, то на 3-ю итерацию у нас будет один блинчик поджаренный с обоих сторон и 2 блинчика с одной поджаренной стороной и в итоге мы затратим 3 итерации т.к. все три итерации у нас были заняты обе скоророды.
*/
