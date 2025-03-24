const fetchSaleData = async (year:string) => {
    const fetchData = await window.electron.getAllSales(year)
    console.log("purchase data from json  ", fetchData);
   if(!fetchData) return []
    return fetchData
  };


const fetchFilterSaleData = async (searchQuery: string, year:string) => {
  return window.electron.getFilterSale(searchQuery, year)
}

  export {
    fetchSaleData,
    fetchFilterSaleData
  }
