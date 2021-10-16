import horizontalLayout from './topology-layouter.js';

const initial = 50;
const elements = [
  {
    id: 'a',
    type: 'input',
    data: { label: 'Topic A' }
  },
  {
    id: 'b',
    type: 'default',
    data: { label: 'Processor B' }
  },
  {
    id: 'c',
    type: 'output',
    data: { label: 'Topic C' }
  },
  {
    id: 'd',
    type: 'output',
    data: { label: 'Topic D' }
  },
  { id: 'A-B', source: 'a', target: 'b' },
  { id: 'B-C', source: 'b', target: 'c' },
  { id: 'B-D', source: 'b', target: 'd' }
];

it('layout topology horizontally', () => {
  const layoutedElements = horizontalLayout(elements);

  let nodeA = layoutedElements.find(el => el.id === 'a');
  let nodeB = layoutedElements.find(el => el.id === 'b');
  let nodeC = layoutedElements.find(el => el.id === 'c');
  let nodeD = layoutedElements.find(el => el.id === 'd');

  expectPosition(nodeA, 0, 50);
  expectPosition(nodeB, 230, 50);
  expectPosition(nodeC, 460, 0);
  expectPosition(nodeD, 460, 100);
});

function expectPosition(node, x, y) {
  expect(node.position.x - initial).toBeCloseTo(x);
  expect(node.position.y - initial).toEqual(y);
}