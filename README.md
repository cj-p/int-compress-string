# compress-integers

Compresses an array of integers in the following range into a URL-safe short string. 

|min | max|
| --- | --- |
| 0 | 64^30 === 1.532495540865889e+54 |

I wrote this function to store a large amount of sequential ID in a lmited URL query string (up to 2048 characters in Internet Explorer).  
When compressed, the size decreases by more than 80% on average, depending on the data characteristics.  
When decompressed, the order is not preserved and is sorted.

```js
const finalOutput = compress([0,1,2,.......,99]); //TURIZkFkOEIzd0hGQVN6ZEFRPT0=
const decompressed = decompress(finalOutput);
expect(decompressed).to.deep.equal(decompressed); // true
```

## How It Works

1. Sort the array.
1. Convert numbers to the difference between adjacent elements
1. Convert to 64-digit string
1. Grouped by digit length and replaced with an alias of 1 character allocated for each digit length
1. Concat and join each group and the replaced original array
1. Compress once again with lzw

