"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rsp = /** @class */ (function () {
    function Rsp() {
    }
    // 操作成功响应
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
    // 操作失败响应
    Rsp.Fail = function (ctx, message, object, extParams) {
        if (message === void 0) { message = undefined; }
        if (object === void 0) { object = undefined; }
        if (extParams === void 0) { extParams = undefined; }
        var result = {
            code: 200,
            success: false,
            object: object,
            message: message,
            extParams: extParams,
        };
        ctx.status = result.code;
        ctx.body = result;
    };
    // 请求错误响应
    Rsp.Error = function (ctx, code, message, object, extParams) {
        if (code === void 0) { code = 500; }
        if (message === void 0) { message = undefined; }
        if (object === void 0) { object = undefined; }
        if (extParams === void 0) { extParams = undefined; }
        if (!message && !object && !extParams) {
            ctx.status = code;
        }
        else {
            var result = {
                code: code,
                success: false,
                object: object,
                message: message,
                extParams: extParams,
            };
            ctx.status = result.code;
            ctx.body = result;
        }
    };
    return Rsp;
}());
exports.default = Rsp;
