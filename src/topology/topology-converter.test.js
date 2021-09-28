import convertTopologyToFlow from './topology-converter.js';
import example from './topology-example.json';


it('convert topology to flow nodes', () => {
  const elements = convertTopologyToFlow(example.simple);

  expect(elements.length).toEqual(11);

  expectContainsNode(elements, 'input');
  expectContainsNode(elements, 'KSTREAM-SOURCE-0000000000');
  expectContainsNode(elements, 'KSTREAM-FILTER-0000000001');
  expectContainsNode(elements, 'KSTREAM-MAPVALUES-0000000002');
  expectContainsNode(elements, 'KSTREAM-SINK-0000000003');
  expectContainsNode(elements, 'output');
});

it('convert topology to flow edges', () => {
  const elements = convertTopologyToFlow(example.simple);

  expect(elements.length).toEqual(11);

  expectContainsEdge(elements, 'input', 'KSTREAM-SOURCE-0000000000');
  expectContainsEdge(elements, 'KSTREAM-SOURCE-0000000000', 'KSTREAM-FILTER-0000000001');
  expectContainsEdge(elements, 'KSTREAM-FILTER-0000000001', 'KSTREAM-MAPVALUES-0000000002');
  expectContainsEdge(elements, 'KSTREAM-MAPVALUES-0000000002', 'KSTREAM-SINK-0000000003');
  expectContainsEdge(elements, 'KSTREAM-SINK-0000000003', 'output');
});

function expectContainsNode(elements, id) {
  const node = elements.find(el => el.id === id);
  expect(node).toBeTruthy();
}

function expectContainsEdge(elements, source, target) {
  const id = `${source}-${target}`;
  const node = elements.find(el => el.id === id);
  expect(node).toBeTruthy();
  expect(node.source).toEqual(source);
  expect(node.target).toEqual(target);
}