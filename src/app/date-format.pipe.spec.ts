import { DateFormatPipe } from "./date-format.pipe";

describe('DateFormatPipe', () => {
  const pipe = new DateFormatPipe();

  it('should transform date string to day number', () => {
    expect(pipe.transform('Sun Jul 07 2019 00:00:00 GMT+0300', 'DAY_NUMBER')).toBe('7');
    expect(pipe.transform('Tue Jul 09 2019 00:00:00 GMT+0300', 'DAY_NUMBER')).toBe('9');
    expect(pipe.transform('Fri Aug 09 2019 00:00:00 GMT+0300', 'DAY_NUMBER')).toBe('9');
  })
})
