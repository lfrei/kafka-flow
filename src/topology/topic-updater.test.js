import updateTopics from './topic-updater.js';

const elements = [
  {
    id: 'input-topic',
    type: 'input',
    data: { label: 'Topic A' }
  },
  {
    id: 'intermediate-topic',
    type: 'default',
    data: { label: 'Topic B', offset: 0 }
  },
  {
    id: 'output-topic',
    type: 'output',
    data: { label: 'Topic C', offset: 20 }
  }
];

it('first offset is set', () => {
  const updatedElements = updateTopics(elements, 'input-topic', 10);

  expect(updatedElements[0].data.running).toBeFalsy();
  expect(updatedElements[0].data.offset).toEqual(10);
});

it('existing offset is updated, state is updated to running', () => {
  const updatedElements = updateTopics(elements, 'intermediate-topic', 30);

  expect(updatedElements[1].data.running).toBeTruthy();
  expect(updatedElements[1].data.offset).toEqual(30);
});

it('unchanged offset results in state stopped', () => {
  const updatedElements = updateTopics(elements, 'output-topic', 20);

  expect(updatedElements[2].data.running).toBeFalsy();
  expect(updatedElements[2].data.offset).toEqual(20);
});