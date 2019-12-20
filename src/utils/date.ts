class DateUtil {
  static getPosix(dateString: string) {
    return new Date(dateString).getTime();
  }

  static posixToUTC(dateString: string) {
    return new Date(dateString).toUTCString();
  }

  static posixToISO(dateString: string) {
    return new Date(dateString).toISOString();
  }
  /**
   * Validate if is POSIX Time.
   * @param String dateString
   */
  static isPosixTime(dateString: string) {
    const vl = parseInt(dateString, 10);

    return !(isNaN(vl) || vl < 0);
  }
}

export default DateUtil;
