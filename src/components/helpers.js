import { FALLBACK, API, REPO } from "./constants.js"

export const format = (day) => {
    const result = new Date(day)
    return result.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
}

// export const fetchAPI = (path, saver, status, setError) => {
//     fetch(path, {
//         // mode: 'no-cors',
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 setError(data.message === 'Not Found' ? 'User not found!' : 'API rate limit');
//             } else {
//                 setError('');
//                 saver(data);
//             }
//         })
//         .then(status(false))
// }

export async function fetchAPI (path) {
    const result = await fetch(path, {
        // mode: 'no-cors',
    })
    const json = await result.json();
    return json;
}

export async function retrievePayload (path, setError) {
    const data = await fetchAPI(path);

    if (data.message) {
        setError(data.message === 'Not Found' ? 'User not found!' : 'API rate limit');
        return null;
    } 

    setError('');
    return data;
        
}

export async function searchData (status, lookup, setUser, setRepos, setError) {
    const username = lookup || FALLBACK;
    const newUser = await retrievePayload(`${API}${username}`, setError);
    const newRepo = await retrievePayload(`${API}${username}${REPO}`, setError);
    status(true);
    setUser(newUser);
    setRepos(newRepo);
    status(false);
}