module.exports.parse = function parse(program) {
    const tokens = [];
    let currentToken = '';

    for (let i = 0; i < program.length; i++) {
        const char = program.charAt(i);

        switch (char) {
            case '(':
                const [parsed, rest] = parse(program.substring(i + 1));
                tokens.push(parsed);
                program = rest;
                i = 0;
                break;
            case ')':
                tokens.push(+currentToken || currentToken);
                return [tokens, program.substring(i + 1)];
            case ' ':
                tokens.push(+currentToken || currentToken);
                currentToken = '';
                break;
            default:
                currentToken += char;
                break;
        }
    }

    return [tokens, ''];
};
