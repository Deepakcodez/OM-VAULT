const calculatePendingAmount = (paid: number, total: number): number => {
  if (paid > total) return total
  else return total-paid;
}

export { calculatePendingAmount }
