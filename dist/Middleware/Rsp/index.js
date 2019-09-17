"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rsp = /** @class */ (function () {
    function Rsp() {
    }
    Rsp.Success = function (ctx, object, message, extParams) {
        if (object === void 0) { object = undefined; }
        if (message === void 0) { message = undefined; }
        if (extParams === void 0) { extParams = undefined; }
        var result = {
            code: 200,
            success: true,
            object: object,
            message: message,
            extParams: extParams,
        };
        ctx.status = result.code;
        ctx.body = result;
    };
    Rsp.Error = function (ctx, code) {
        if (code === void 0) { code = 500; }
        ctx.status = code;
    };
    return Rsp;
}());
exports.default = Rsp;
