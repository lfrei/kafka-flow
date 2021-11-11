const keyword = 'Topologies:'

function isHtml(topology) {
    return /<\/?[a-z][\s\S]*>/i.exec(topology);
}

function isValidTopology(topology) {
    return topology.trim().startsWith(keyword) && !isHtml(topology);
}

export default isValidTopology; 