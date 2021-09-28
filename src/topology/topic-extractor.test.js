import getTopicsFromElements from './topic-extractor.js';

const elements = [
  {
    id: 'input-topic',
    type: 'input',
    data: { label: 'Topic A' }
  },
  {
    id: 'default-topic',
    type: 'default',
    data: { label: 'Topic B' }
  },
  {
    id: 'intermediate-topic',
    type: 'default',
    data: { label: 'Topic C' }
  },
  {
    id: 'output-topic',
    type: 'output',
    data: { label: 'Topic D' }
  }
];

it('extract input and output topics', () => {
  const topics = getTopicsFromElements(elements);

  expect(topics).toEqual(['input-topic', 'output-topic'])
});