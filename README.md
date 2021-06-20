# sort-json-by-key
Sort JSON by key and don't change the value.

[jq](https://stedolan.github.io/jq/) command changes the representation of the value, but `sort-json-by-key` cli-tool don't change the representation.

example
```
$ cat test.json
{
  "defg": 3e7,
  "abc": "🍣",
  "bcd": {
    "xyz": 1.0,
    "bde": "abc"
  },
  "carray": [
    123,
    "abc",
    {
      "defg": 1.0,
      "abc": "abc",
      "bcd": {
        "xyz": 1.0,
        "bde": "abc"
      }
    }
  ]
}
```

```
$ jq --sort-keys < test.json
{
  "1": "🍣",
  "2": {
    "1": "abc",
    "2": 1
  },
  "3": [
    123,
    "abc",
    {
      "1": {
        "1": "abc",
        "2": 3
      },
      "2": 2
    }
  ],
  "4": 30000000
}
```

```
$ node index.js < test.json
{
  "1": "🍣",
  "2": {
    "1": "abc",
    "2": 1.00
  },
  "3": [
    123,
    "abc",
    {
      "1": {
        "1": "abc",
        "2": 3.00000000000000000000000000000000000000000001
      },
      "2": 2.0
    }
  ],
  "4": 3e7
}
```

