const testWord = "aeusiwoknsckprkdycdy";
const testArr = [
  8,
  12,
  21,
  25,
  14,
  27,
  24,
  13,
  21,
  26,
  10,
  11,
  22,
  23,
  15,
  13,
  27,
  10,
  11,
  32
];

const testWord_1 = "scout";
const testArr_1 = [20, 12, 18, 30, 21];
const testWord_2 = "xy";
const testArr_2 = [26, 27];

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const startCyphVal = 0;
const cyphStep = 1;

function makeCypherMap(alphabet, startVal, cypherStep) {
  let cypherMap = {};
  let zeroCode = alphabet.charCodeAt(0) + startVal;

  for (let strId = 0; strId !== alphabet.length; strId++) {
    cypherMap[alphabet[strId]] =
      alphabet.charCodeAt(strId) - zeroCode + cypherStep;
  }
  return cypherMap;
}

function translateTextToCodes(cypherMap, text) {
  let codesArr = [];
  for (let strId = 0; strId !== text.length; strId++) {
    if (cypherMap.hasOwnProperty(text[strId])) {
      codesArr.push(cypherMap[text[strId]]);
    }
  }
  return codesArr;
}

function getRawCypherKey(cyphArr, decypherArr) {
  let rawKey = [];
  for (let id = 0; id !== cyphArr.length; id++) {
    rawKey.push(cyphArr[id] - decypherArr[id]);
  }

  return rawKey;
}
function findUniqueKey(rawKey) {
  let start = 0;
  let end = rawKey.length;
  let seqEnd = end;
  if (start === end) {
    return [];
  }
  for (let id = 1; id !== rawKey.length; id++) {
    if (seqEnd !== end && rawKey[id] !== rawKey[id - seqEnd]) {
      seqEnd = end;
    }
    if (rawKey[id] === rawKey[start] && seqEnd === end) {
      console.log(id);
      seqEnd = id;
      for (
        let aproxId = id;
        aproxId !== rawKey.length && aproxId !== id * 2 - 1;
        aproxId++
      ) {
        seqEnd = id;
        if (rawKey[aproxId] !== rawKey[aproxId - id]) {
          seqEnd = end;
          break;
        }
      }
    }
  }
  return rawKey.splice(start, seqEnd);
}

function digitalCypher(text, cyphArr) {
  const cypherMap = makeCypherMap(alphabet, startCyphVal, cyphStep);
  const decypherArr = translateTextToCodes(cypherMap, text);
  const rawCypherKey = getRawCypherKey(cyphArr, decypherArr);
  const cypherKey = findUniqueKey(rawCypherKey);

  return parseInt(cypherKey.join(""), 10);
}

console.log(digitalCypher(testWord, testArr));
console.log(digitalCypher(testWord_1, testArr_1));
console.log(digitalCypher(testWord_2, testArr_2));
