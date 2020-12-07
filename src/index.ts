import _ from 'lodash';
import Schedule from './schedule';
import { squashOverlappingSchedules } from './utils/squasher';

class Minimas {
  /**
   * Create an instance of Minimas.
   * @param schedules Initial schedules
   */
  constructor(private schedules: Schedule[] = []) {
    this._sort();
  }

  /**
   * Get the underlying squashed schedules.
   */
  getAll() {
    return this.schedules;
  }

  /**
   * Delete a schedule by it's index.
   *
   * The index of a shedule can be retrieved by using it's index
   * as returned from `.getAll()`.
   *
   * @param index Index of schedule to delete.
   */
  public deleteByIndex(index: number) {
    this.schedules = this.schedules.splice(index, 1);
  }

  /**
   * Add a schedule item to the previous list of schedule.
   *
   * After addition of schedule, it is automatically sorted and
   * squaashed (for intersecting time frames).
   *
   * @param schedule Schedule to add
   */
  add(schedule: Schedule) {
    if (schedule.from < schedule.to) {
      schedule = new Schedule(schedule.to, schedule.from, schedule.timestamp);
    }

    this.schedules.push(schedule);
    this._sort();
  }

  /**
   * Sort the available list of schedule items. If a schedule intersects,
   * it is automatically merged and arranged.
   */
  private _sort() {
    const orderedSchedules = _.orderBy(
      this.schedules,
      ['from', 'to'],
      ['asc', 'desc']
    );

    this.schedules = squashOverlappingSchedules(_.uniqBy(orderedSchedules, 'from'));
  }
}

export default Minimas;
