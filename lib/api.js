export async function fetcher(url, options = {}) {
    let response;
    console.log(url)
    if(!options) {
        response = await fetch(url);
    }else {
        response = await fetch(url, options);
    }
    const data = await response.json();
    return data;
}