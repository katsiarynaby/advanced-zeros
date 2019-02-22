module.exports = function getZerosCount(number, base) {

  var arrayAll = getSimple(base);
  var arrayUniq = unique(arrayAll);
  var possibleZeros = test(number, arrayUniq);
  var countZeros = transform(arrayAll, arrayUniq);
  var result = lastStep(possibleZeros, countZeros);



  function getSimple(base) {
    let array = [];
    for (i = 2; i < base + 1; i++) {
      while (base % i == 0) {
        base /= i;
        array.push(i);
      }
    }
    return array
  };

  function unique(array) {
    var obj = {};

    for (var i = 0; i < array.length; i++) {
      var str = array[i];
      obj[str] = true;
    }

    return Object.keys(obj);
  }

  function test(number, arrayUniq) {
    let array = arrayUniq.slice();
    let zeros = [];
    for (i = 0; i < array.length; i++) {
      let count = Math.trunc(number / array[i]);
      zeros[i] = 0;
      while (count) {
        zeros[i] += count;
        array[i] *= array[i];
        count = Math.trunc(number / array[i]);
      }
    }
    return zeros
  }

  function transform(arrayAll, arrayUniq) {
    let arrayZeros = [];
    for (i = 0; i < arrayUniq.length; i++) {
      arrayZeros[i] = arrayAll.filter(number => number == arrayUniq[i]).length;
    }
    return arrayZeros
  }

  function lastStep(possibleZeros, countZeros) {
    for (i = 0; i < possibleZeros.length; i++) {
      possibleZeros[i] = Math.trunc(possibleZeros[i] / countZeros[i]);
      
    }
    return Math.min.apply(null, possibleZeros);
  }

  return result
}