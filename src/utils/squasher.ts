import Schedule from '../schedule';

/**
 * Squash overalling schedules into self contained schedule.
 *
 * E.g. if there is are schedules as follows [2pm - 5pm, 3pm - 6pm],
 * the squasher will reduce the aboce schedules to just [2pm - 6pm].
 *
 * @param overlappingSchedules Overalapping schedules to squash.
 */
export const squashOverlappingSchedules = (
  overlappingSchedules: Schedule[]
): Schedule[] => {
  return overlappingSchedules.reduce(
    (schedules: Schedule[], schedule: Schedule) => {
      const boundary = schedules[schedules.length - 1];

      if (schedules.length === 0) {
        schedules.push(schedule);
        return schedules;
      }

      // #region Boundary checks.
      if (schedule.fromAndToNotInBoundary(boundary)) {
        schedules.push(schedule);
        return schedules;
      }

      if (schedule.onlyToOnOrInBoundary(boundary)) {
        if (schedule.timestamp.getTime() > boundary.timestamp.getTime()) {
          schedules[schedules.length - 1].from = schedule.from;
          schedules[schedules.length - 1].timestamp = schedule.timestamp;
        }
        return schedules;
      }

      if (schedule.fromAndToInBoundary(boundary)) {
        if (schedule.timestamp.getTime() > boundary.timestamp.getTime()) {
          schedules[schedules.length - 1].timestamp = schedule.timestamp;
        }
        return schedules;
      }

      if (schedule.onlyFromOnOrInBoundary(boundary)) {
        if (schedule.timestamp.getTime() > boundary.timestamp.getTime()) {
          schedules[schedules.length - 1].to = schedule.to;
          schedules[schedules.length - 1].timestamp = schedule.timestamp;
        }

        return schedules;
      }

      if (schedule.fromAndToEnvelopeBoundary(boundary)) {
        if (schedule.timestamp.getTime() > boundary.timestamp.getTime()) {
          schedules[schedules.length - 1].from = schedule.from;
          schedules[schedules.length - 1].to = schedule.to;
          schedules[schedules.length - 1].timestamp = schedule.timestamp;
        }
        return schedules;
      }

      //#endregion Boundary checks

      throw Error('Invalid Boundary!!!');
    },
    []
  );
};
