import './Flow.css';
import React, { useEffect, useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import convertTopologyToFlow from '../topology/topology-converter.js';
import compactTopology from '../topology/topology-compacter.js';
import horizontalLayout from '../topology/topology-layouter.js';
import getTopicsFromElements from '../topology/topic-extractor.js';
import getOffset from "../kafka/offset-service.js";
import updateTopics from '../topology/topic-updater.js';
import updateEdges from '../topology/edge-updater.js';

function Flow({ settings, onError }) {
    const initialElements = horizontalLayout(convertTopologyToFlow(settings.topology));
    const [elements, setElements] = useState(initialElements);

    useEffect(() => {
        let newElements = convertTopologyToFlow(settings.topology, settings.topologyShowStores);
        if (settings.topologyCompact) {
            newElements = compactTopology(newElements);   
        } 
        setElements(horizontalLayout(newElements));
    }, [settings, setElements])

    useEffect(() => {
        if (settings.offsetCheck) {
            const id = setInterval(() => {
                let topics = getTopicsFromElements(elements);

                topics.forEach(topic => {
                    getOffset(settings.offsetUrl, topic)
                        .then((response) => response.json())
                        .then((offset) => {
                            setElements((elements) =>
                                updateEdges(updateTopics(elements, topic, offset), topic)
                            );
                        })
                        .catch(() => {
                            clearInterval(id);
                            onError(`Failed to load offset for topic ${topic}`);
                        })
                });
            }, settings.offsetInterval);

            return () => clearInterval(id);
        }
    }, [elements, setElements, settings, onError]);

    return (
        <div style={{ height: 600 }}>
            <ReactFlow elements={elements} />
        </div>
    )
}

export default Flow;