"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const functions_1 = require("./functions");
const error = () => {
    throw new Error();
};
exports.error = error;
class ReturnData {
    constructor(data) {
        this.data = data;
    }
    // #region Checkers
    get isClienError() {
        return (0, functions_1.isClientError)(this.data);
    }
    get isInformation() {
        return (0, functions_1.isInformation)(this.data);
    }
    get isPermission() {
        return (0, functions_1.isPermission)(this.data);
    }
    get isRedirect() {
        return (0, functions_1.isRedirect)(this.data);
    }
    get isServerError() {
        return (0, functions_1.isServer)(this.data);
    }
    get isSuccess() {
        return (0, functions_1.isSuccess)(this.data);
    }
    get isTimeoutError() {
        return (0, functions_1.isTimeout)(this.data);
    }
    // #endregion
    get hasData() {
        return (this.isInformation ||
            this.isPermission ||
            this.isRedirect ||
            this.isSuccess);
    }
    get status() {
        return this.data.status;
    }
    // #region Mappers
    map({ information, client, permission, redirect, server, success, timeout, }) {
        const data = this.data;
        // #region Checkers
        if ((0, functions_1.isInformation)(data)) {
            data.payload;
            return information(data.status, data.payload, data.messages);
        }
        if ((0, functions_1.isPermission)(data)) {
            return permission(data.status, data.payload, data.notPermitteds);
        }
        if ((0, functions_1.isRedirect)(data)) {
            return redirect(data.status, data.payload, data.messages);
        }
        if ((0, functions_1.isServer)(data)) {
            return server(data.status, data.messages);
        }
        if ((0, functions_1.isSuccess)(data)) {
            return success(data.status, data.payload);
        }
        if ((0, functions_1.isTimeout)(data)) {
            return timeout(data.status);
        }
        // #endregion
        return client(data.status, data.messages);
    }
    maybeMap(cases) {
        // #region Cases
        var _a, _b, _c, _d, _e, _f, _g;
        const client = (_a = cases.client) !== null && _a !== void 0 ? _a : cases.else;
        const information = (_b = cases.information) !== null && _b !== void 0 ? _b : cases.else;
        const permission = (_c = cases.permission) !== null && _c !== void 0 ? _c : cases.else;
        const redirect = (_d = cases.redirect) !== null && _d !== void 0 ? _d : cases.else;
        const server = (_e = cases.server) !== null && _e !== void 0 ? _e : cases.else;
        const success = (_f = cases.success) !== null && _f !== void 0 ? _f : cases.else;
        const timeout = (_g = cases.timeout) !== null && _g !== void 0 ? _g : cases.else;
        // #endregion
        return this.map({
            client,
            information,
            permission,
            redirect,
            server,
            success,
            timeout,
        });
    }
    successMap(cases) {
        // #region Cases
        var _a, _b, _c, _d, _e, _f;
        const information = (_a = cases.information) !== null && _a !== void 0 ? _a : exports.error;
        const permission = (_b = cases.permission) !== null && _b !== void 0 ? _b : exports.error;
        const redirect = (_c = cases.redirect) !== null && _c !== void 0 ? _c : exports.error;
        const server = (_d = cases.server) !== null && _d !== void 0 ? _d : exports.error;
        const success = cases.success;
        const timeout = (_e = cases.timeout) !== null && _e !== void 0 ? _e : exports.error;
        const client = (_f = cases.client) !== null && _f !== void 0 ? _f : exports.error;
        // #endregion
        return this.map({
            client,
            information,
            permission,
            redirect,
            server,
            success,
            timeout,
        });
    }
    // #endregion
    // #region Chain
    _chainSync({ information, permission, redirect, success, }) {
        return this.map({
            success: (...args) => {
                return success(...args);
            },
            information: (status, payload, messages) => {
                const out = information(status, payload, messages);
                return out.map({
                    success() {
                        return new ReturnData({ status, payload, messages });
                    },
                    information(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    redirect(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    permission(status, _, notPermitteds, messages) {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    client(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    timeout() {
                        return new ReturnData({ status, payload, messages });
                    },
                    server(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                });
            },
            redirect: (status, payload, messages) => {
                const out = redirect(status, payload, messages);
                return out.map({
                    success() {
                        return new ReturnData({ status, payload, messages });
                    },
                    information(_, __, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    redirect(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    permission(status, _, notPermitteds, messages) {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    client(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    timeout() {
                        return new ReturnData({ status, payload, messages });
                    },
                    server(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                });
            },
            permission: (status, payload, notPermitteds, messages) => {
                const out = permission(status, payload, notPermitteds, messages);
                return out.maybeMap({
                    success() {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    else() {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                });
            },
            client: () => this,
            timeout: () => this,
            server: () => this,
        });
    }
    chainSync(args) {
        if (args instanceof ReturnData) {
            return this._chainSync({
                information: () => args,
                permission: () => args,
                redirect: () => args,
                success: () => args,
            });
        }
        if (args instanceof Function) {
            return this._chainSync({
                information: args,
                permission: args,
                redirect: args,
                success: args,
            });
        }
        return this._chainSync(args);
    }
    _chainAsync({ information, permission, redirect, success, }) {
        return this.map({
            success: (...args) => success(...args),
            information: async (status, payload, messages) => {
                const out = await information(status, payload, messages);
                return out.successMap({
                    success() {
                        return new ReturnData({ status, payload, messages });
                    },
                    information(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    redirect(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    permission(status, _, notPermitteds, messages) {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    client(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    timeout() {
                        return new ReturnData({ status, payload, messages });
                    },
                    server(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                });
            },
            redirect: async (status, payload, messages) => {
                const out = await redirect(status, payload, messages);
                return out.map({
                    success() {
                        return new ReturnData({ status, payload, messages });
                    },
                    information(_, __, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    redirect(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    permission(status, _, notPermitteds, messages) {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    client(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    timeout() {
                        return new ReturnData({ status, payload, messages });
                    },
                    server(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                });
            },
            permission: async (status, payload, notPermitteds, messages) => {
                const out = await permission(status, payload, notPermitteds, messages);
                return out.maybeMap({
                    success() {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    else() {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                });
            },
            client: async () => this,
            timeout: async () => this,
            server: async () => this,
        });
    }
    chainAsync(args) {
        if (args instanceof Function) {
            return this._chainAsync({
                information: args,
                permission: args,
                redirect: args,
                success: args,
            });
        }
        if (args instanceof Promise) {
            return this._chainAsync({
                information: () => args,
                permission: () => args,
                redirect: () => args,
                success: () => args,
            });
        }
        return this._chainAsync(args);
    }
    // #endregion
    // #region Renews
    _renewSync({ information, permission, redirect, success, }) {
        return this.map({
            success: (...args) => {
                return success(...args);
            },
            information: (status, payload, messages) => {
                const out = information(status, payload, messages);
                return out.maybeMap({
                    success(_, payload) {
                        return new ReturnData({ status, payload, messages });
                    },
                    else() {
                        return out;
                    },
                });
            },
            redirect: (status, payload, messages) => {
                const out = redirect(status, payload, messages);
                return out.maybeMap({
                    success(_, payload) {
                        return new ReturnData({ status, payload, messages });
                    },
                    else() {
                        return out;
                    },
                });
            },
            permission,
            client: () => new ReturnData({ status: 400 }),
            timeout: () => new ReturnData({ status: 900 }),
            server: () => new ReturnData({ status: 500 }),
        });
    }
    renewSync(args) {
        if (args instanceof ReturnData) {
            return this._renewSync({
                information: () => args,
                permission: () => args,
                redirect: () => args,
                success: () => args,
            });
        }
        if (args instanceof Function) {
            return this._renewSync({
                information: args,
                permission: args,
                redirect: args,
                success: args,
            });
        }
        return this._renewSync(args);
    }
    _renewAsync({ information, permission, redirect, success, }) {
        return this.map({
            success: (...args) => success(...args),
            information: async (status, payload, messages) => {
                const out = await information(status, payload, messages);
                return out.maybeMap({
                    success(_, payload) {
                        return new ReturnData({ status, payload, messages });
                    },
                    else() {
                        return out;
                    },
                });
            },
            redirect: async (status, payload, messages) => {
                const out = await redirect(status, payload, messages);
                return out.maybeMap({
                    success(_, payload) {
                        return new ReturnData({ status, payload, messages });
                    },
                    else() {
                        return out;
                    },
                });
            },
            permission,
            client: async () => new ReturnData({ status: 400 }),
            timeout: async () => new ReturnData({ status: 900 }),
            server: async () => new ReturnData({ status: 500 }),
        });
    }
    renewAsync(args) {
        if (args instanceof Function) {
            return this._renewAsync({
                information: args,
                permission: args,
                redirect: args,
                success: args,
            });
        }
        if (args instanceof Promise) {
            return this._renewAsync({
                information: () => args,
                permission: () => args,
                redirect: () => args,
                success: () => args,
            });
        }
        return this._renewAsync(args);
    }
    // #endregion
    // #region Static
    static chain(previous, next) {
        return previous.chainAsync(next);
    }
}
exports.default = ReturnData;
