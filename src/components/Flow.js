import React from 'react';
import ReactFlow from 'react-flow-renderer';
import topology from '../topology/topology-example.json';
import convertTopologyToFlow from '../topology/topology-converter.js';

function Flow() {
    const elements = convertTopologyToFlow(topology.simple);

    return (
        <div style={{ height: 1200 }}>
            <ReactFlow elements={elements} />
        </div>
    )
}

export default Flow;