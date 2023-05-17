export function discountForDifferentProducts(quantityCartItems: number) {
  if (quantityCartItems >= 2) {
    if (quantityCartItems == 2) {
      return 0.05
    }
    if (quantityCartItems == 3) {
      return 0.10
    }
    if (quantityCartItems == 4) {
      return 0.20
    }
    if (quantityCartItems >= 5) {
      return 0.25
    }
  }
  return 1;
}
