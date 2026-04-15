  export const fetchBrokers = async (limit = 10) => {
    const res = await fetch(`/api/brokers?limit=${limit}`)
    const data = await res.json()
  return data.data
  }

  