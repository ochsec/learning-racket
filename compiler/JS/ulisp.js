const { parse } = require('./parser');
const { compile } = require('./compiler');

function main(args) {
    const script = args[2];
    const [ast] = parse(script);
    compile(ast[0]);
}

main(process.argv);
