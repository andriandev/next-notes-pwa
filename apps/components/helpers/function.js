export function timeNow() {
  // Return timestamp
  return new Date().getTime();
}

export function timestampToDatetime(timestamp) {
  // Add zero number example 2022-5-2 3:2:5 => 2022-05-02 03:02:05
  const addZero = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  // Date init
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate());
  const hour = addZero(date.getHours());
  const minute = addZero(date.getMinutes());
  const second = addZero(date.getSeconds());

  const datetime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return datetime;
}
