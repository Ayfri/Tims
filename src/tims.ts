import { languages } from "./languages.ts"
import { durations, Durations, isDuration } from "./durations.ts"

interface Options {
  format?: keyof typeof languages["fr"]["plural"]
  locale?: "fr" | "es" | "en"
  full?: boolean
}

/** timestamp or {@link Date} */
type DateResolvable = number | Date

function resolve(date: DateResolvable): number {
  return typeof date === "number" ? date : date.getTime()
}

/** Get the sentence of time past since given date */
export function since(date: DateResolvable, options?: Options): string {
  return duration(Date.now() - resolve(date), options)
}

/** Get the sentence of time between given dates */
export function between(
  date1: DateResolvable,
  date2: DateResolvable,
  options?: Options
): string {
  const time1 = resolve(date1),
    time2 = resolve(date2)
  return duration(Math.max(time1, time2) - Math.min(time1, time2), options)
}

/** Get the sentence of time given */
export function duration(date: DateResolvable, options: Options = {}): string {
  let ms = resolve(date)

  let { format, locale, full } = options

  const cache: Partial<Durations> = {}

  const counters: Durations = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    ms: 0,
  }

  if (!format) format = "second"
  if (!locale) locale = "en"

  for (let i = 0; i < Object.keys(counters).length; i++){
    let key = Object.keys(counters)[i];
    if (!isDuration(key)) continue

    while (ms >= durations[key]) {
      ms -= durations[key]
      counters[key]++
    }

    while (ms <= durations[key] * -1) {
      ms += durations[key]
      counters[key]++
    }

    if (!full && !counters[key]) {
      cache[key] = false
    } else {
      const plural = counters[key] > 1
      const empty = counters[key] === 0

      cache[key] = languages[locale][plural ? "plural" : "singular"][
        key
      ].replace(
        "{quantifier}",
        plural
          ? String(Math.floor(counters[key]))
          : languages[locale].quantifiers[empty ? "nothing" : "one"]
      )
    }
  }
  
  const output = []

  for (let i = 0; i < Object.keys(cache).length; i++){
    let key = Object.keys(cache)[i];
    if (!isDuration(key)) continue

    if (cache[key]) {
      output.push(cache[key])
    }
    if (key === format) {
      break
    }
  }
  
  if (output.length > 1) {
    let last = output.pop()
    output[output.length - 1] += ` ${languages[locale].and} ${last}`
  } else if (output.length === 0) {
    return languages[locale].singular[format].replace(
      "{quantifier}",
      languages[locale].quantifiers.nothing
    )
  }

  return output.join(", ")
}

export default {
  since,
  ago: since,
  fromNow: since,
  between,
  diff: between,
  duration,
  value: duration,
}
