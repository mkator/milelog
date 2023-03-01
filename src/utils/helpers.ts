export const formatData = (data: any) => {
  if (!data) return []

  // Group data by date
  const groupedData = data.reduce((acc: any, item: any) => {
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

export const formatNumberDigits = (number: number | null | undefined) =>
  number ? number.toFixed(3) : '0'
