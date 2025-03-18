const fetchPurchaseData = async () => {
  const fetchData = await window.electron.getAllPurchases()
  if (!fetchData) return []
  return fetchData
}

const fetchFilterPurchaseData = async (searchQuery: string) => {
  return window.electron.getFilterPurchases(searchQuery)
}

export { fetchPurchaseData, fetchFilterPurchaseData }
