# sort-json-by-object-key
Sort JSON by key and don't change the value.

If you use [jq](https://stedolan.github.io/jq/) or other commands to sort JSON by object key, the representation of the values will change, so I created this tool to sort JSON by object key without changing the representation of the values.

# Example
Here's a sample json.

```bash
$ cat test.json
{
  "abc": 3e7,
  "def": {
    "xyz": 1.0,
    "uvw": "abc"
  }
}
```

sort by jq command with --sort-keys option.
representation is changed.

```bash
$ jq --sort-keys < test.json
{
  "abc": 30000000,
  "def": {
    "uvw": "abc",
    "xyz": 1
  }
}
```

sort by this cli.
representation is not changed.

```bash
$ sortjson < test.json
{
  "abc": 3e7,
  "def": {
    "uvw": "abc",
    "xyz": 1.0
  }
}
```

