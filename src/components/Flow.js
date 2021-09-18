import './Flow.css';
import React, { useEffect, useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import topology from '../topology/topology-example.json';
import convertTopologyToFlow from '../topology/topology-converter.js';

function Flow() {
    const initialTopology = topology.complex;
    const initialElements = convertTopologyToFlow(initialTopology);

    const [elements, setElements] = useState(initialElements);
    const [newTopology, setTopology] = useState(initialTopology);

    useEffect(() => setElements(() => convertTopologyToFlow(newTopology)), [newTopology, setElements]);

    return (
        <div style={{ height: 1200 }}>
            <div className="update-topology-control">
                <textarea
                    rows="20"
                    cols="50"
                    value={newTopology}
                    onChange={(evt) => setTopology(evt.target.value)} />
            </div>
            <ReactFlow elements={elements} />
        </div>
    )
}

export default Flow;