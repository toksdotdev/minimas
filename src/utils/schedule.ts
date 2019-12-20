class Schedule {
  /**
   * Schedule is outside of the boundary.
   *
   * @param boundary Boundary
   * @param schedule Schedule
   */
  public static outOfBoundary(boundary: Schedule, schedule: Schedule): boolean {
    return (
      (schedule.from < boundary.from && schedule.to < boundary.from) ||
      (schedule.from > boundary.to && schedule.to > boundary.to)
    );
  }
  /**
   * A schedule.
   */
  constructor(
    public from: string,
    public to: string,
    public timestamp: string,
  ) {}
}

export default Schedule;
