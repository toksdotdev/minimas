class Schedule {
  /**
   * Schedule instance.
   */
  constructor(public from: string, public to: string, public timestamp: Date) {}

  /**
   * Schedule is outside of the boundary.
   *
   * @param boundary Boundary
   * @param schedule Schedule
   */
  public fromAndToNotInBoundary(boundary: Schedule): boolean {
    return (
      (this.from < boundary.from && this.to < boundary.from) ||
      (this.from > boundary.to && this.to > boundary.to)
    );
  }

  public onlyToOnOrInBoundary(boundary: Schedule): boolean {
    return (
      this.from < boundary.from &&
      this.to >= boundary.from &&
      this.to <= boundary.to
    );
  }

  public onlyFromOnOrInBoundary(boundary: Schedule): boolean {
    return (
      this.to > boundary.to &&
      this.from >= boundary.from &&
      this.from <= boundary.to
    );
  }

  public fromAndToInBoundary(boundary: Schedule): boolean {
    return (
      this.from >= boundary.from &&
      this.from <= boundary.to &&
      this.to >= boundary.from &&
      this.to <= boundary.to
    );
  }

  public fromAndToEnvelopeBoundary(boundary: Schedule): boolean {
    return this.from < boundary.from && this.to > boundary.to;
  }
}

export default Schedule;
