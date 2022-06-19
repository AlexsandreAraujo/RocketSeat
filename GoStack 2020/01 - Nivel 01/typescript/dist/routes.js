"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloword = void 0;
function helloword(request, response) {
    return response.json({ message: 'Hello World' });
}
exports.helloword = helloword;
