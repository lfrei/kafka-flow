async function getTopology(url) {
    const response = await fetch(url)
    return response.text();
}

export default getTopology;