export function makeRequestToServer(url, body, method) {
    return fetch(process.env.VUE_APP_SERVER_URL + url,{
        method: (method === 'POST') ? 'POST' : 'GET',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json());
}