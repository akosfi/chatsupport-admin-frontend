export function makeRequestToServer(url, body, method) {

    const _url = getServerUrl() + url;
    
    return fetch(_url ,{
        method: method ? method : 'GET',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json());
}


export const getServerUrl = () => {    
    if(process.env.NODE_ENV === 'production') {
        return process.env.VUE_APP_SERVER_URL;
    }
    else {
        return "http://localhost:3000";
    } 
}