const fetchPurchaseData = async () => {
    const fetchData = await window.electronAPI.getPurchaseData();
    console.log("purchase data from json  ", fetchData);
   if(!fetchData) return []
    return fetchData
  };
  export {
    fetchPurchaseData
  }