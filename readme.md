
# Tims 🕚
- no dependency
- optimized and light code
- typescript typings included
- deno version of the [npm package `tims`](https://github.com/CamilleAbella/Tims).

## Usage
```ts
import tims from 'https://api.deno.land/webhook/gh/tims';
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
console.log(tims.since(yesterday));
// "1 day"
```
## Methods

| Method | Description | Return Type |
| --- | --- | --- |
| `between(moment, moment, options)` | Get the sentence of time past since given moment. | string |
| `duration(duration, options)` | Get the sentence of time between given moments. | string |
| `since(moment, options)` | Get the sentence of given duration. | string |

## Options

```ts
interface Options {
  format?: "day" | "year" | "month" | "hour" | "minute" | "second" | "ms"
  locale?: "fr" | "es" | "en"
  full?: boolean
}
```

# Enjoy 🕛
