export const formatData = data => {
  if (!data) return []

  // Group data by date
  const groupedData = data.reduce((acc, item) => {
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

export const meterToMile = (meter: number) => (meter ? meter / 1609.344 : 0)

export const formatNumberDigits = (number: number) =>
  number ? number.toFixed(3) : 0
