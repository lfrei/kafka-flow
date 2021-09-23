import Node from '../components/Node.js';

const runningColor = '#D6D5E6';
const stoppedColor = '#fff';

function isRunning(element, offset) {
    return offset > element.data.offset;
}

function updateElementData(element, topic, offset, running) {
    return {
        ...element.data,
        offset,
        running,
        label: <Node type='topic' name={topic} offset={offset}/>,
    };
}

function updateElementStyle(element, running) {
    return {
        ...element.style,
        background: running ? runningColor : stoppedColor,
    };
}

function updateTopic(element, topic, offset) {
    if (element.id === topic) {
        let running = isRunning(element, offset);

        element.data = updateElementData(element, topic, offset, running);
        element.style = updateElementStyle(element, running);
    }
    return element;
}

function updateTopics(elements, topic, offset) {
    return elements.map((element) => updateTopic(element, topic, offset));
}

export default updateTopics;