const os = require('os');

const BUILTIN_FUNCTIONS = { '+': 'plus' };
const PARAM_REGISTERS = ['RDI', 'RSI', 'RDX'];
const SYSCALL_MAP = os.platform() === 'darwin' ? {
    'exit': '0x2000001',
} : {
    'exit': 60,
};

function emit(depth, code) {
    const indent = new Array(depth + 1).map(() => '').join('  ');
    console.log(indent + code);
}

function compile_argument(arg, destination) {
    // If arg AST is a list, call compile_call on it
    if (Array.isArray(arg)) {
        compile_call(arg[0], arg.slice(1), destination);
        return;
    }

    // Else must be a literal number, store in destination register square
    emit(1, `MOV ${destination}, ${arg}`);
}

function compile_call(fun, args, destination) {
    // Save param registers to the stack
    args.forEach((_, i) => emit(1, `PUSH ${PARAM_REGISTERS[i]}`));

    // Compile arguments and store in param registers
    args.forEach((arg, i) => compile_argument(arg, PARAM_REGISTERS[i]));

    // Call function
    emit(1, `CALL ${BUILTIN_FUNCTIONS[fun] || fun}`);

    // Restore param registers back to the stack
    args.forEach((_, i) => emit(1, `POP ${PARAM_REGISTERS[args.length - i - 1]}`));

    // Move result into destination if provided
    if (destination) {
        emit(1, `MOV ${destination}, RAX`);
    }

    emit(0, '');
}

function emit_prefix() {
    emit(1, '.global_main\n');

    emit(1, '.text\n');

    emit(0, 'plus:');
    emit(1, 'ADD RDI, RSI');
    emit(1, 'MOV RAX, RDI');
    emit(1, 'RET\n');

    emit(0, '_main:');
}

function emit_postfix() {
    emit(1, 'MOV RDI, RAX');    // set exit arg
    emit(1, `MOV RAX, ${SYSCALL_MAP['exit']}`); // set syscall number
    emit(1, 'SYSCALL');
}

module.exports.compile = function parse(ast) {
    emit_prefix();
    compile_call(ast[0], ast.slice(1));
    emit_postfix();
}