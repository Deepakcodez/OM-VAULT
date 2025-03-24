const fetchPurchaseData = async (year:string) => {
  const fetchData = await window.electron.getAllPurchases(year)
  if (!fetchData) return []
  return fetchData
}

const fetchFilterPurchaseData = async (searchQuery: string, year:string) => {
  console.log(searchQuery, year)
  return window.electron.getFilterPurchases(searchQuery,  year)
}

export { fetchPurchaseData, fetchFilterPurchaseData }

