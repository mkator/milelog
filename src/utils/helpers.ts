export interface IStorageData {
  date: string
  start: number
  stop: number
  mile: number
}

export interface IData {
  title: string
  data: {
    date: string
    start: number
    stop: number
    mile: number
  }[]
}

export const formatData = (data: IStorageData[]): IData[] => {
  if (!data) return []

  // Group data by date
  const groupedData: IStorageData = data.reduce((acc: any, item: any) => {
    const date = item.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)

    return acc
  }, {})

  // Transform grouped data into an array of objects with a data property
  const sectionData = Object.entries(groupedData).map(([key, value]) => ({
    title: key,
    data: value,
  }))

  return sectionData.reverse()
}

export const meterToMile = (meter: number | null | undefined) =>
  meter ? meter / 1609.344 : 0

export const formatNumberDigits = (
  number: number | null | undefined,
  digits = 3,
) => (number ? number.toFixed(digits) : '0')
