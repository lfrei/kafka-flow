import { isNode } from 'react-flow-renderer';
import dagre from 'dagre';

const initial = 50;
const nodeWidth = 180;
const nodeHeight = 50;

function initGraph(direction = 'TB') {
    const dagreGraph = new dagre.graphlib.Graph();

    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction });

    return dagreGraph;
}

function horizontalLayout(elements) {
    const dagreGraph = initGraph('LR');

    elements.forEach((el) => {
        if (isNode(el)) {
            dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
        } else {
            dagreGraph.setEdge(el.source, el.target);
        }
    });

    dagre.layout(dagreGraph);

    return elements.map((el) => {
        if (isNode(el)) {
            const nodeWithPosition = dagreGraph.node(el.id);
            el.targetPosition = 'left';
            el.sourcePosition = 'right';
            el.position = {
                x: initial + nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
                y: initial + nodeWithPosition.y - nodeHeight / 2,
            };
        }
        return el;
    });
}

export default horizontalLayout;