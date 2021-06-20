const { ArgumentParser } = require('argparse');
const { version } = require('../package.json');
const fs = require('fs');
const { tokenize, parseTokens } = require('json-parse-ast');

class SortJSON {
    constructor(rootNode, formatEnabled, indent) {
        this._rootNode = rootNode;
        this._formatEnabled = formatEnabled;
        this._indent = indent;
    }

    sort() {
        this._jsonStr = '';
        this._walk(this._rootNode, 0);
        return this._jsonStr;
    }

    _walk(node, depth) {
        if (node.type === 'Object') {
            const values = node.extractValues();
            values.sort((a,b) => {
                if (a.key.value >= b.key.value) return 1;
                if (a.key.value == b.key.value) return 0;
                return -1;
            });
            this._write('{');
            if (this._formatEnabled) this._write('\n');
            values.forEach((child, index) => {
                this._writeIndent(depth + 1);
                this._write(child.key.raw);
                this._write(':');
                if (this._formatEnabled) this._write(' ');
                this._walk(child.value, depth + 1);
                if (values.length !== index + 1) this._write(',');
                if (this._formatEnabled) this._write('\n');
            });
            this._writeIndent(depth);
            this._write('}');
        } else if (node.type === 'Array') {
            const values = node.extractValues();
            this._write('[');
            if (this._formatEnabled) this._write('\n');
            values.forEach((child, index) => {
                this._writeIndent(depth + 1);
                this._walk(child, depth + 1);
                if (values.length !== index + 1) this._write(',');
                if (this._formatEnabled) this._write('\n');
            });
            this._writeIndent(depth);
            this._write(']');
        } else {
            this._write(node.raw);
        }
    }

    _writeIndent(depth) {
        if (!this._formatEnabled) return;
        for (let i = 0; i < this._indent * depth; i++) {
            this._write(' ');
        }
    }

    _write(str) {
        this._jsonStr += str;
    }
}

function sortJSON(args, input) {
    const root = parseTokens(tokenize(input));
    const s = new SortJSON(root, !(args.formatEnabled === false), args.indent > 0 ? args.indent : 2);
    return s.sort();
}

function readJSON(args) {
    let input;
    try {
        input = fs.readFileSync(process.stdin.fd, "utf8");
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
    return input;
}

function main() {
    const parser = new ArgumentParser({
    description: 'Sort json by key'
    });

    parser.add_argument('-v', '--version', {action: 'version', version})
    parser.add_argument('-n', '--no-format', {help: 'Do not format json'})

    const args = parser.parse_args();
    sortJSON(args);
}

module.exports.main = main;
module.exports.sortJSON = sortJSON;
module.exports.readJSON = readJSON;
