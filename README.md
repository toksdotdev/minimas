# Minimas

Easily manage time schedule with ease. If intersecting time schedules exist, combine them into one.

## Explanation

Assume you have the following time schedules:
- 2pm - 5pm
- 3pm - 6pm
- 1am - 3am

If you take a close look, you'll recognize that `2pm - 5pm` and `3pm - 6pm` inter-lap. This schedules could simply be reduced without losing information as shown below:
- 2pm - 6pm
- 1am - 3am

__That's the sole purpose of this library.__

## Usage

Here is a basic example.

> NOTE: It's adviced that `from` and `to` of a schedule should b [UNIX Epoch](https://en.wikipedia.org/wiki/Unix_time).

```ts
import Minimas, { Schedule } from 'minimas';

// Initialize Schedules (timestamp is useful if 
// schedules are synced from multiple sources).
const schedules = [
    new Schedule(14, 17, new Date()),   // "2020-12-08 12:00:00"
    new Schedule(15, 18, new Date()),   // "2020-12-08 12:00:01"
    new Schedule(1, 3, new Date()),     // "2020-12-08 12:00:02"
];

const squasher = new ScheduleSquasher(schedules);

// Log Squashed Schedules.
console.log(squasher.getAll());

/**
 * OUTPUT:
 * 
 * [
 *  { from: 14, to: 18, timestamp: "2020-12-08 12:00:01" }, 
 *  { from: 1, to: 3, timestamp: "2020-12-08 12:00:02"},
 * ]
 */

// Add Schedle
squasher.add(new Schedule(5, 6, new Date()));

// Log Squashed Schedules.
console.log(squasher.getAll());

/**
 * OUTPUT:
 * 
 * [
 *  { from: 14, to: 18, timestamp: "2020-12-08 12:00:01" }, 
 *  { from: 1, to: 3, timestamp: "2020-12-08 12:00:02" },
 *  { from: 5, to: 6, timestamp: "2020-12-08 12:00:40"  },
 * ]
 */

// Delete Schedule By Index
squasher.deleteByIndex(1);

// Log Squashed Schedules.
console.log(squasher.getAll());

/**
 * OUTPUT:
 * 
 * [
 *  { from: 14, to: 18, timestamp: "2020-12-08 12:00:01" }, 
 *  { from: 5, to: 6, timestamp: "2020-12-08 12:00:40"  },
 * ]
 */
```

## Contributing

If you find any issue, bug or missing feature, please kindly create an issue or submit a pull request. 👍🏾

## License

Minimas is open-sourced software under MIT license.
