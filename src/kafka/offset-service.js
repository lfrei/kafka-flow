const host = 'http://localhost:8080';

async function getOffset(topic) {
    const response = await fetch(`${host}/offset/${topic}`)
    return response.json();
}

export default getOffset;