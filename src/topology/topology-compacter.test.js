import compactTopology from './topology-compacter.js';

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
        data: { label: 'Processor C' }
    },
    {
        id: 'd',
        type: 'output',
        data: { label: 'Topic D' }
    },
    {
        id: 'e',
        type: 'output',
        data: { label: 'Topic E' }
    },
    { id: 'A-B', source: 'a', target: 'b' },
    { id: 'B-C', source: 'b', target: 'c' },
    { id: 'C-D', source: 'c', target: 'd' },
    { id: 'B-E', source: 'b', target: 'e' }
];

it('compact topology elements', () => {
    const compactedElements = compactTopology(elements);

    expect(compactedElements.length).toEqual(5);

    //processors removed
    expect(element(compactedElements, 'a')).toBeTruthy();
    expect(element(compactedElements, 'b')).toBeFalsy();
    expect(element(compactedElements, 'c')).toBeFalsy();
    expect(element(compactedElements, 'd')).toBeTruthy();
    expect(element(compactedElements, 'e')).toBeTruthy();

    //edges removed
    expect(element(compactedElements, 'A-B')).toBeFalsy();
    expect(element(compactedElements, 'B-C')).toBeFalsy();
    expect(element(compactedElements, 'C-D')).toBeFalsy();
    expect(element(compactedElements, 'B-E')).toBeFalsy();

    //updated edges added
    expect(element(compactedElements, 'a-d')).toBeTruthy();
    expect(element(compactedElements, 'a-e')).toBeTruthy();

});

function element(elements, id) {
    return elements.find(el => el.id === id);
}