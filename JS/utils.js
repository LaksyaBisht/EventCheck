
export async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  return await response.json();
}
