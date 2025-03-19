const fetchSaleData = async () => {
    const fetchData = await window.electron.getAllSales()
    console.log("purchase data from json  ", fetchData);
   if(!fetchData) return []
    return fetchData
  };


const fetchFilterSaleData = async (searchQuery: string) => {
  return window.electron.getFilterSale(searchQuery)
}

  export {
    fetchSaleData,
    fetchFilterSaleData
  }
