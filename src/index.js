module.exports = function getZerosCount(number, base) {

  var arrayAllMn = getSimpleMn(base);
  var arrayUniqMn = unique(arrayAllMn);
  var possibleCountZeros = seachPossibleCountZeros(number, arrayUniqMn);
  var countRepetMn = countRepetMn(arrayAllMn, arrayUniqMn);
  var zerosCount = zerosCount(possibleCountZeros, countRepetMn);


// base factorization
  function getSimpleMn(base) {
    let array = [];
    for (let i = 2; i < base + 1; i++) {
      while (base % i == 0) {
        base /= i;
        array.push(i);
      }
    }
    return array
  };

  //search unique multipliers
  function unique(array) {
    var obj = {};

    for (let i = 0; i < array.length; i++) {
      var str = array[i];
      obj[str] = true;
    }

    return Object.keys(obj);
  };

  //search possible count zeros for each multipliers
  function seachPossibleCountZeros(number, arrayUniq) {
    let array = arrayUniq.slice();
    let zeros = [];
    for (let i = 0; i < array.length; i++) {
      let count = Math.trunc(number / array[i]);
      zeros[i] = 0;
      while (count) {
        zeros[i] += count;
        array[i] *= arrayUniq[i];
        count = Math.trunc(number / array[i]);
      }
    }
    return zeros
  };

  // get count of repetitions for each multiplier
  function countRepetMn(arrayAll, arrayUniq) {
    let countRepetMn = [];
    for (let i = 0; i < arrayUniq.length; i++) {
      countRepetMn[i] = arrayAll.filter(number => number == arrayUniq[i]).length;
    }
    return countRepetMn
  };

  // get zeros count in factorial
  function zerosCount(possibleCountZeros, countRepetMn) {
    for (let i = 0; i < possibleCountZeros.length; i++) {
      possibleCountZeros[i] = Math.trunc(possibleCountZeros[i] / countRepetMn[i]);
      
    }
    return Math.min.apply(null, possibleCountZeros);
  };

  return zerosCount
}