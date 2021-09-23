import Node from '../components/Node.js';

function id(source, target) {
    return `${source}-${target}`;
}

function exists(elements, id) {
    return elements.some(element => element.id === id);
}

function toIntermediateTopic(topic) {
    return {
        ...topic,
        type: 'default',
    }
}

function addOrReplaceTopic(elements, topic) {
    let index = elements.findIndex(e => e.id === topic.id);

    if (index !== -1) {
        elements[index] = toIntermediateTopic(topic);
    } else {
        elements.push(topic);
    }
}

function addSinkTopic(elements, processor, topic) {
    addOrReplaceTopic(elements, {
        id: topic,
        type: 'output',
        data: { label: <Node type='topic' name={topic}/> },
    });
    elements.push({ id: id(processor, topic), source: processor, target: topic });
}

function addSourceTopic(elements, processor, topic) {
    addOrReplaceTopic(elements, {
        id: topic,
        type: 'input',
        data: { label: <Node type='topic' name={topic}/> },
    });
    elements.push({ id: id(topic, processor), source: topic, target: processor });
}

function addStore(elements, processor, store) {
    if (!exists(elements, store)) {
        elements.push({
            id: store,
            type: 'output',
            data: { label: <Node type='store' name={store}/> },
        })
    }

    if (processor.includes("JOIN")) {
        elements.push({ id: id(store, processor), source: store, target: processor });
    } else {
        elements.push({ id: id(processor, store), source: processor, target: store });
    }
}

function addProcessor(elements, processor) {
    elements.push({
        id: processor,
        data: { label: <Node type='processor' name={processor}/> },
    })
}

function addStream(elements, processor, target) {
    if (target === 'none') {
        return;
    }

    elements.push({ id: id(processor, target), source: processor, target: target });
}

function convertTopologyToFlow(topology) {
    let elements = [];
    let processor;

    topology.split('\n').forEach(line => {

        let processorMatch = /(Source:|Processor:|Sink:)\s+(\S+)\s+\((topics|topic|stores):(.*)\)/.exec(line)

        if (processorMatch) {
            processor = processorMatch[2];
            let type = processorMatch[3];
            let states = processorMatch[4];

            states.split(',').forEach(state => {
                state = state.replace(/[[\]]/g, '').trim();

                if (state === '') {
                    // short circuit
                }
                else if (type === 'topic') {
                    addSinkTopic(elements, processor, state);
                }
                else if (type === 'topics') {
                    addSourceTopic(elements, processor, state);
                }
                else if (type === 'stores') {
                    addStore(elements, processor, state);
                }
            });

            addProcessor(elements, processor);

            return;
        }

        let streamMatch = /-->\s+(.*)$/.exec(line.trim());

        if (streamMatch && processor) {
            let targets = streamMatch[1];

            targets.split(',').forEach(target => {
                target = target.trim();
                addStream(elements, processor, target);
            });
        }
    })

    return elements;
}

export default convertTopologyToFlow;