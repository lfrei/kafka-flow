function getTopicsFromElements(elements) {
    return elements
        .filter(el => el.type === 'input' || el.type === 'output')
        .map(el => el.id);
}

export default getTopicsFromElements;