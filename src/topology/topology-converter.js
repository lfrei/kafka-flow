function id(source, target) {
    return `${source}-${target}`;
}

function isRepartition(topic) {
    return topic.includes("repartition");
}

function addSinkTopic(elements, processor, topic) {
    elements.push({
        id: topic,
        type: isRepartition(topic) ? 'default' : 'output',
        data: { label: <div className='topic'>{topic}</div> },
    })
    elements.push({ id: id(processor, topic), source: processor, target: topic, animated: true });
}

function addSourceTopic(elements, processor, topic) {
    if (!isRepartition(topic)) {
        elements.push({
            id: topic,
            type: 'input',
            data: { label: <div className='topic'>{topic}</div> },
        });
    }
    elements.push({ id: id(topic, processor), source: topic, target: processor, animated: true });
}

function addStore(elements, processor, store) {
    elements.push({
        id: store,
        type: 'output',
        data: { label: <div className='store'>{store}</div> },
    })

    if (processor.includes("JOIN")) {
        elements.push({ id: id(store, processor), source: store, target: processor, animated: true });
    } else {
        elements.push({ id: id(processor, store), source: processor, target: store, animated: true });
    }
}

function addProcessor(elements, processor) {
    elements.push({
        id: processor,
        data: { label: <div className='processor'>{processor}</div> },
    })
}

function addStream(elements, processor, target) {
    if (target === 'none') {
        return;
    }

    elements.push({ id: id(processor, target), source: processor, target: target, animated: true });
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