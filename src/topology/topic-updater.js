function updateElement(element, topic, offset) {
    if (element.id === topic) {
        element.data = {
            ...element.data,
            label: <div className='topic'>{topic}: {offset}</div>,
        };
    }
    return element;
}

function updateElements(elements, topic, offset) {
    return elements.map((element) => updateElement(element, topic, offset));
}

export default updateElements;