export function makeRequestToServer(url, body, method) {
    return fetch(`'http://localhost:3000${url}`,{
        method: (method === 'POST') ? 'POST' : 'GET',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json());
}