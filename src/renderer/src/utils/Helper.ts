const calculatePendingAmount = (paid: number, total: number): number => {
  if (paid > total) return total
  else return total-paid;
}


const calculateInstallments = (installments: string): number => {
  if (!installments || installments.trim() === '') return 0;
  try {
    const parsedInstallments = JSON.parse(installments) as { rate: number }[];
    return parsedInstallments.reduce((acc, curr) => acc + curr.rate, 0);
  } catch (error) {
    console.error("Error parsing installments:", error);
    return 0;
  }
};


export { calculatePendingAmount , calculateInstallments}

