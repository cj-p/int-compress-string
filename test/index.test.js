import {compress, decompress} from "../src";
import {expect} from "chai";

const test = originalArray => {
  const finalOutput = compress(originalArray);
  const decompressed = decompress(finalOutput);
  expect(originalArray).to.deep.equal(decompressed);
};

describe('compress-number-set', () => {
  it('small sequential', () => {
    test(new Array(100).fill().map((_,i) => i));
  })

  it('large sequential', () => {
    test([100001,
      100002,
      100003,
      100004,
      100005,
      100006,
      100007,
      100008,
      100009,
      1000010,
      1000011,
      1000012,
      1000013,
      1000014,
      1000015,
      1000016,
      1000017,
      1000018,
      1000019,
      1000020,
      1000021,
      1000022,
      1000023,
      1000024,
      1000025,
      1000026,
      1000027,
      1000028,
      1000029,
      1000030,
      1000031,
      1000032,
      1000033,
      1000034,
      1000035,
      1000036,
      1000037,
      1000038,
      1000039,
      1000040
    ]);
  })

  it('sparse sequential', () => {
    test([100001,
      100002,
      100003,
      100004,
      100005,
      100006,
      100007,
      100008,
      100009,
      2000010,
      2000011,
      2000012,
      2000013,
      2000014,
      2000015,
      2000016,
      2000017,
      2000018,
      2000019,
      2000020,
      3000021,
      3000022,
      3000023,
      3000024,
      3000025,
      3000026,
      3000027,
      3000028,
      3000029,
      3000030,
      3000031,
      4000032,
      4000033,
      4000034,
      4000035,
      4000036,
      4000037,
      4000038,
      4000039,
      4000040
    ]);
  })

  it('big amounts of sequential', () => {
    test(new Array(10000).fill().map((_, i) => i));
  })

  it('big amounts of random', () => {
    test(new Array(10000).fill().map((_, i) => ~~(Math.random() * 10000)));
  })

  it('big integer', () => {
    test([Math.floor(Math.pow(64,30))]);
  })
})