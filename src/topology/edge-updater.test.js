import updateEdges from './edge-updater.js';

const elements = [
  {
    id: 'input-topic',
    type: 'input',
    data: { label: 'Topic A' }
  },
  {
    id: 'processor',
    type: 'default',
    data: { label: 'Processor B' }
  },
  {
    id: 'output-topic-1',
    type: 'output',
    data: { label: 'Topic C', running: false }
  },
  {
    id: 'output-topic-2',
    type: 'output',
    data: { label: 'Topic D', running: true }
  },
  { id: 'A-B', source: 'input-topic', target: 'processor' },
  { id: 'B-C', source: 'processor', target: 'output-topic-1' },
  { id: 'B-D', source: 'processor', target: 'output-topic-2' }
];

it('update edges to animated', () => {
  const updatedElements = updateEdges(elements, 'output-topic-2')

  const edgeAB = updatedElements.find(el => el.id === 'A-B');
  const edgeBC = updatedElements.find(el => el.id === 'B-C');
  const edgeBD = updatedElements.find(el => el.id === 'B-D');

  expect(edgeAB.animated).toBeTruthy();
  expect(edgeBC.animated).toBeFalsy();
  expect(edgeBD.animated).toBeTruthy();
});