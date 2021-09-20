import './Flow.css';
import React, { useEffect, useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import topology from '../topology/topology-example.json';
import convertTopologyToFlow from '../topology/topology-converter.js';
import horizontalLayout from '../topology/topology-layouter.js';
import getTopicsFromElements from '../topology/topic-extractor.js';
import getOffset from "../kafka/offset-service.js";
import updateTopics from '../topology/topic-updater.js';
import updateEdges from '../topology/edge-updater.js';

function Flow() {
    const initialTopology = topology.simple;
    const initialElements = horizontalLayout(convertTopologyToFlow(initialTopology));

    const [elements, setElements] = useState(initialElements);
    const [newTopology, setTopology] = useState(initialTopology);

    useEffect(() => setElements(() => horizontalLayout(convertTopologyToFlow(newTopology))), [newTopology, setElements]);

    useEffect(() => {
        const id = setInterval(() => {
            let topics = getTopicsFromElements(elements);

            topics.forEach(topic => {
                getOffset(topic).then((offset) => {
                    setElements((elements) =>
                        updateEdges(updateTopics(elements, topic, offset), topic)
                    );
                })
            });
        }, 2000);

        return () => clearInterval(id);
    }, [elements, setElements]);

    return (
        <div style={{ height: 600 }}>
            <div className="update-topology-control">
                <textarea
                    rows="10"
                    cols="100"
                    value={newTopology}
                    onChange={(evt) => setTopology(evt.target.value)} />
            </div>
            <ReactFlow elements={elements} />
        </div>
    )
}

export default Flow;