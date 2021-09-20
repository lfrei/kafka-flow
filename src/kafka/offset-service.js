async function getOffset(url, topic) {
    const response = await fetch(`${url}/${topic}`)
    return response.json();
}

export default getOffset;