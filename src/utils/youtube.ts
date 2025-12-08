export async function youtube<T>(
  path: 'playlistlimit',
  playlistId: string,
  limit: number
): Promise<T> {
  const res = await fetch('/api/youtube', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, playlistId, limit })
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Erro desconhecido');
  }
  return json as T;
}
