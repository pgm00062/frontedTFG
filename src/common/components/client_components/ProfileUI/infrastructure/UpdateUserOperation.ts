export async function updateUserProfile(data: {
  name: string
  surname: string
  email: string
  dni: string
}) {
  const res = await fetch('/api/user/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || !json?.ok) throw new Error(json?.message || 'No se pudo guardar');
  return json;
}