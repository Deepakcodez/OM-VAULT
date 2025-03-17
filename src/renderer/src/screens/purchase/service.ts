const fetchPurchaseData = async () => {
  const fetchData = await window.electron.getAllPurchases()
  console.log('purchase data from json  ', fetchData)
  if (!fetchData) return []
  return fetchData
}

const fetchFilterPurchaseData = async (searchQuery: string) => {
  return window.electron.getFilterPurchases(searchQuery)
}

export { fetchPurchaseData, fetchFilterPurchaseData }
