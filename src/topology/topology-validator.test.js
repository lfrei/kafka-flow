import isValidTopology from './topology-validator.js';
import example from './topology-example.json';

it('detect example as valid topology', () => {
    const valid = isValidTopology(example.simple);

    expect(valid).toBeTruthy();
});

it('detect topology with leading whitespaces as valid topology', () => {
    const valid = isValidTopology('   Topologies:\r\nSub-topology: 0\r\nSource: SOURCE (topics: [input])');

    expect(valid).toBeTruthy();
});

it('detect text as invalid topology', () => {
    const valid = isValidTopology('Some text');

    expect(valid).toBeFalsy();
});

it('detect text with keyword as invalid topology', () => {
    const valid = isValidTopology('Some text with Topologies:');

    expect(valid).toBeFalsy();
});

it('detect html as invalid topology', () => {
    const valid = isValidTopology('<html><body>Some html</body></html>');

    expect(valid).toBeFalsy();
});

it('detect html with keyword as invalid topology', () => {
    const valid = isValidTopology('<html><body>Topologies:</body></html>');

    expect(valid).toBeFalsy();
});