import { isNode } from 'react-flow-renderer';

function findEdges(elements, nodeName) {
    let edges = [];

    elements.forEach((el) => {
        if (!isNode(el) && el.target === nodeName) {
            edges.push(el.id);
            edges.push(...findEdges(elements, el.source));
        }
    });

    return edges;
}

function updateEdges(elements, topic) {
    let edges = [];

    elements.forEach((el) => {
        if (isNode(el) && el.id === topic && el.data.running) {
            edges.push(...findEdges(elements, el.id));
        }
    });

    elements.forEach((el) => {
        if (!isNode(el) && edges.includes(el.id)) {
            el.animated = true;
        } else {
            el.animated = false;
        }
    });

    return elements;
}

export default updateEdges;