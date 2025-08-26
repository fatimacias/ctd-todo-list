const airtable_url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function authHeaders() {
  return {
    Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
    "Content-Type": "application/json",
  };
}


export async function safeFetch(options) {
  const resp = await fetch(airtable_url, options);
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    const detail = text?.slice(0, 300) || "";
    throw new Error(
      `HTTP ${resp.status} ${resp.statusText}${detail ? ` — ${detail}` : ""}`
    );
  }
  return resp.json();
}
export async function getFetch() {
  return safeFetch({
    method: "GET",
    headers: authHeaders(),
  });
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

