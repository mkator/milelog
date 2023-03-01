import {formatData, meterToMile, formatNumberDigits} from '../helpers'

describe('Should format data correctly', () => {
  it('With valid data', () => {
    const rawData = [
      {
        date: '03-01-2023',
        start: 1677675972609,
        stop: 1677676029293,
        mile: 1,
      },
      {
        date: '03-01-2023',
        start: 1677676114390,
        stop: 1677676148501,
        mile: 1.5,
      },
      {
        date: '03-02-2023',
        start: 1677676174161,
        stop: 1677676204001,
        mile: 2,
      },
    ]

    const expectedData = [
      {
        title: '03-02-2023',
        data: [
          {
            date: '03-02-2023',
            start: 1677676174161,
            stop: 1677676204001,
            mile: 2,
          },
        ],
      },
      {
        title: '03-01-2023',
        data: [
          {
            date: '03-01-2023',
            start: 1677675972609,
            stop: 1677676029293,
            mile: 1,
          },
          {
            date: '03-01-2023',
            start: 1677676114390,
            stop: 1677676148501,
            mile: 1.5,
          },
        ],
      },
    ]

    const result = formatData(rawData)

    expect(result).toEqual(expectedData)
  })

  it('Should be empty array with null or undefined data', () => {
    const result = formatData(undefined)

    expect(result.length).toBe(0)
  })
})

describe('Should convert meter to mile correctly', () => {
  it('With valid number', () => {
    const result = meterToMile(1609.344)

    expect(result).toBe(1)
  })

  it('Should be zero with NaN', () => {
    const result = meterToMile(null)

    expect(result).toBe(0)
  })
})

describe('Should format number digits correctly', () => {
  it('Should display 3 decimals, type string, with valid number', () => {
    const result = formatNumberDigits(1609.344567)

    expect(result).toBe('1609.345')
  })

  it('Should be zero, type string, with NaN', () => {
    const result = formatNumberDigits(null)

    expect(result).toBe('0')
  })
})
