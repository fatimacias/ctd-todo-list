const airtable_url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function authHeaders() {
  return {
    Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
    "Content-Type": "application/json",
  };
}

const encodeUrl = (sortField, sortDirection, queryString ) => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = "";
    if (queryString && queryString.trim() !== "") {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
     return encodeURI(`${airtable_url}?${sortQuery}${searchQuery}`);
  };

export async function safeFetch(options,url=airtable_url) {
  const resp = await fetch(url, options);
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    const detail = text?.slice(0, 300) || "";
    throw new Error(
      `HTTP ${resp.status} ${resp.statusText}${detail ? ` — ${detail}` : ""}`
    );
  }
  return resp.json();
}
export async function getFetch(sortField, sortDirection,queryString) {
  const url = encodeUrl(sortField,sortDirection,queryString);
  return safeFetch({
    method: "GET",
    headers: authHeaders(),
  },url);
}

export async function postFetch(payload) {
  return safeFetch({
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}


export async function patchFetch(payload) {
  return safeFetch({
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}

