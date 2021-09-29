async function getOffset(url, topic) {
    return fetch(`${url}/${topic}`)
}

export default getOffset;