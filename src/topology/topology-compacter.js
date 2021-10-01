import { isNode } from 'react-flow-renderer';

function isOutputTopics(elements, topic) {
    return elements
        .filter(e => isNode(e))
        .filter(e => e.id === topic)
        .filter(e => e.type === 'output')
        .length > 0;
}

function findEdgesWithSource(elements, source) {
    return elements
        .filter(e => !isNode(e))
        .filter(e => e.source === source)
}

function getInputTopics(elements) {
    return elements
        .filter(e => e.type === 'input')
        .map(e => e.id)
}

function getOutputTopics(elements, start) {
    const outputTopics = [];
    const edges = findEdgesWithSource(elements, start);

    edges.forEach(ed => {
        if (isOutputTopics(elements, ed.target)) {
            outputTopics.push(ed.target);
        } else {
            outputTopics.push(...getOutputTopics(elements, ed.target))
        }
    });

    return outputTopics;
}

function compactTopology(elements) {
    const newEdges = [];

    getInputTopics(elements).forEach(source => {
        getOutputTopics(elements, source).forEach(target => {
            newEdges.push({ id: `${source}-${target}`, source: source, target: target })
        });
    });

    return elements
        .filter(e => isNode(e))
        .filter(e => e.type === 'input' || e.type === 'output')
        .concat(newEdges)

}

export default compactTopology;