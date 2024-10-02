function getCustomerIDFromStorage(): string | null {
  if (localStorage.getItem('customer') !== null) {
    const customerJSON = localStorage.getItem('customer');
    if (customerJSON !== null) {
      const customer = JSON.parse(customerJSON);
      if (typeof customer.id === 'string') {
        return customer.id;
      }
    }
  }
  return null;
}

export default getCustomerIDFromStorage;
