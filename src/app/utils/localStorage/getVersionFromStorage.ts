function getVersionFromStorage(): number | null {
  if (localStorage.getItem('customer') !== null) {
    const customerJSON = localStorage.getItem('customer');
    if (customerJSON !== null) {
      const customer = JSON.parse(customerJSON);
      if (typeof customer.version === 'number') {
        return customer.version;
      }
    }
  }
  return null;
}

export default getVersionFromStorage;
