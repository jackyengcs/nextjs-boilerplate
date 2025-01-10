const route: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/user`;

export async function getUserDetails(accessToken: string | null) {
  const headers: HeadersInit = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${accessToken}`);

  const response = await fetch(`${route}`, {
    method: 'GET',
    headers,
  });

  return response.json();
}
