function calculateTotalPrice(
  exactPrice: number| null = 0,
  taxRate: number | null = 0,
  discountPercentage: number | null = 0,
  quantity: number | null = 1
) {

    const priceWithQuantity = exactPrice! * quantity!;
    const discount = (priceWithQuantity * discountPercentage!) / 100;
    const priceAfterDiscount = priceWithQuantity - discount;
    const tax = (priceAfterDiscount * taxRate!) / 100;
    const totalPriceWithoutTax = priceAfterDiscount;
    const totalPrice = totalPriceWithoutTax + tax;
  

  return parseFloat(totalPrice.toFixed(2)); // Round to 2 decimal places (optional)
}

export { calculateTotalPrice };
