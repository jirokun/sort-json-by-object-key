const assert = require('assert');
const { sortJSON } = require('../lib/index');

describe('sortJSON', () => {
    it('can sort object by key', () => {
        const input = `{
  "2": 2,
  "1": 1
}`;
        const expect = `{
  "1": 1,
  "2": 2
}`;
        const got = sortJSON({}, input);
        assert.strictEqual(got, expect);
    });
    it('can sort nested object by key', () => {
        const input = `{
  "2": 2,
  "1": {
    "2": 2,
    "1": 1
  } 
}`;
        const expect = `{
  "1": {
    "1": 1,
    "2": 2
  },
  "2": 2
}`;
        const got = sortJSON({}, input);
        assert.strictEqual(got, expect);
    });
    it('can sort number without changing their representation', () => {
        const input = `{
  "2": 1.0000000000000000000000001,
  "1": 1e7
}`;
        const expect = `{
  "1": 1e7,
  "2": 1.0000000000000000000000001
}`;
        const got = sortJSON({}, input);
        assert.strictEqual(got, expect);
    });
    it('can sort object in array by key', () => {
        const input = `[
  {
    "2": 1.0000000000000000000000001,
    "1": 1e7
  },
  100
]`;
        const expect = `[
  {
    "1": 1e7,
    "2": 1.0000000000000000000000001
  },
  100
]`;
        const got = sortJSON({}, input);
        assert.strictEqual(got, expect);
    });
    it('can specify format space count', () => {
        const input = `[
  {
    "2": 1.0000000000000000000000001,
    "1": 1e7
  },
  100
]`;
        const expect = `[
    {
        "1": 1e7,
        "2": 1.0000000000000000000000001
    },
    100
]`;
        const got = sortJSON({indent: 4}, input);
        assert.strictEqual(got, expect);
    });
    it('can output non format json', () => {
        const input = `[
  {
    "2": 1.0000000000000000000000001,
    "1": 1e7
  },
  100
]`;
        const expect = `[{"1":1e7,"2":1.0000000000000000000000001},100]`;
        const got = sortJSON({formatEnabled: false}, input);
        assert.strictEqual(got, expect);
    });
});