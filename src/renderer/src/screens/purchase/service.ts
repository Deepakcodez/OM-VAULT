const fetchPurchaseData = async () => {
  const fetchData = await window.electron.getAllPurchases()
  if (!fetchData) return []
  return fetchData
}

const fetchFilterPurchaseData = async (searchQuery: string, year:string) => {
  console.log(searchQuery, year)
  return window.electron.getFilterPurchases(searchQuery,  year)
}

export { fetchPurchaseData, fetchFilterPurchaseData }

