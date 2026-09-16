export async function getMetalPrices() {
  try {
    const res = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${process.env.METALPRICE_API_KEY}&base=USD&currencies=XAU,XAG,XPT,XPD`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    if (!data.success || !data.rates) return null;

    return {
      gold: (1 / data.rates.XAU).toFixed(2),
      silver: (1 / data.rates.XAG).toFixed(2),
      platinum: (1 / data.rates.XPT).toFixed(2),
      palladium: (1 / data.rates.XPD).toFixed(2),
    };
  } catch {
    return null;
  }
}