import _ from "lodash";
import DateUtil from "./utils/date";
import Schedule from "./utils/schedule";

class TimeSchedule {
  constructor(private schedule: Schedule[]) {
    this._sortSchedule();
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
    schedule =
      schedule.from > schedule.to
        ? {
            from: schedule.to,
            to: schedule.from,
            timestamp: schedule.timestamp
          }
        : schedule;

    this.schedule.push(schedule);
    this._sortSchedule();
  }

  /**
   * Delete a schedule from the list using it's index.
   *
   * @param index Index of item to delete.
   */
  deleteByIndex(index: number): Schedule[] {
    return this.schedule.splice(index, 1);
  }

  /**
   * Sort the available list of schedule items. If a schedule intersects,
   * it is automatically merged and arranged.
   */
  private _sortSchedule() {
    const orderedSchedules = _.orderBy(
      this.schedule,
      ["from", "to"],
      ["asc", "desc"]
    );

    const uniqueSchedules = _.uniqBy(orderedSchedules, "from");

    const arrangedSchedules = uniqueSchedules.reduce(
      (schedules: Schedule[], schedule: Schedule) => {
        const lastItem = schedules[schedules.length - 1];

        if (schedules.length === 0) {
          schedules.push(schedule);
          return schedules;
        }

        if (Schedule.outOfBoundary(lastItem, schedule)) {
          schedules.push(schedule);
        } else if (
          (schedule.from < lastItem.from && schedule.to === lastItem.from) ||
          (schedule.from < lastItem.from &&
            schedule.to > lastItem.from &&
            schedule.to < lastItem.to)
        ) {
          if (
            DateUtil.getPosix(schedule.timestamp) >
            DateUtil.getPosix(lastItem.timestamp)
          ) {
            schedules[schedules.length - 1].from = schedule.from;
            schedules[schedules.length - 1].timestamp = schedule.timestamp;
          }
        } else if (
          (schedule.from === lastItem.from && schedule.to < lastItem.to) ||
          (schedule.from === lastItem.from && schedule.to === lastItem.to) ||
          (schedule.from < lastItem.to && schedule.to === lastItem.to)
        ) {
          if (
            DateUtil.getPosix(schedule.timestamp) >
            DateUtil.getPosix(lastItem.timestamp)
          ) {
            schedules[schedules.length - 1].timestamp = schedule.timestamp;
          }
          return schedules;
        } else if (
          (schedule.from < lastItem.to && schedule.to > lastItem.to) ||
          (schedule.from === lastItem.to && schedule.to > lastItem.to) ||
          (schedule.from > lastItem.from && schedule.to < lastItem.to)
        ) {
          if (
            DateUtil.getPosix(schedule.timestamp) >
            DateUtil.getPosix(lastItem.timestamp)
          ) {
            schedules[schedules.length - 1].to = schedule.to;
            schedules[schedules.length - 1].timestamp = schedule.timestamp;
          }
        } else if (schedule.from < lastItem.from && schedule.to > lastItem.to) {
          if (
            DateUtil.getPosix(schedule.timestamp) >
            DateUtil.getPosix(lastItem.timestamp)
          ) {
            schedules[schedules.length - 1].from = schedule.from;
            schedules[schedules.length - 1].to = schedule.to;
            schedules[schedules.length - 1].timestamp = schedule.timestamp;
          }
        } else {
          throw Error("No condition yet");
        }

        return schedules;
      },
      []
    );

    this.schedule = arrangedSchedules;
  }
}

export default TimeSchedule;
