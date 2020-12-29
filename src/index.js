import LZUTF8 from "lzutf8";
import {BaseAlphabet} from "basealphabet";

const ALIASES = "~!@#$%^&*()-_=`{}|[]\\:\";'<>?. \t";
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/";
const base64 = new BaseAlphabet({
  alphabet: ALPHABET,
  radix: ALPHABET.length,
})
base64.caseInsensitive = false;

const stringChop = (str, size) => str.match(new RegExp(`.{1,${size}}`, 'g')) || []

export const compress = arr => {
  const diffs = arr
    .sort((a, b) => a - b)
    .map((curr, i, arr) => {
      const prev = arr[i - 1] || 0;
      return curr - prev;
    });

  const groupedByLength = new Array(ALIASES.length + 1).fill().map(() => []);
  const base64Diffs = diffs.map(i => base64.toAlphabet(i));

  base64Diffs.forEach(n => {
    if (n.length > 1) {
      groupedByLength[n.length - 1].push(n);
      groupedByLength[0].push(ALIASES[n.length - 1]);
    } else {
      groupedByLength[0].push(n);
    }
  })

  const numberCompressed = groupedByLength.map(arr => arr.join('')).join();
  const input = LZUTF8.compress(numberCompressed, {outputEncoding: "Base64"});
  const compressed = LZUTF8.compress(input, {outputEncoding: "Base64"});
  return compressed.replace('/','_'); // for using path parameter
};

export const decompress = compressed => {
  const underscoreReplacementRestored = compressed.replace('_', '/')
  const input = LZUTF8.decompress(underscoreReplacementRestored, {inputEncoding: "Base64"});
  const numberCompressed = LZUTF8.decompress(input, {inputEncoding: "Base64"});
  const [originalArray, ...groupedByLength] = numberCompressed.split(',').map((s, i) => stringChop(s, i + 1));
  const groupedByLengthReverse = groupedByLength.map(a => a.reverse());

  const base64Diffs = originalArray.map(v => {
    const aliasindex = ALIASES.indexOf(v);
    return aliasindex < 0 ? v : groupedByLengthReverse[aliasindex - 1].pop();
  })

  const diffs = base64Diffs.map(i => base64.toDecimal(i));

  return diffs.reduce((result, n) => {
    result.push((result[result.length - 1] || 0) + n)
    return result;
  }, []);
};