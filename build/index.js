"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const middleware_1 = __importDefault(require("./middleware/middleware"));
const app = (0, express_1.default)();
const port = 3000;
app.listen(port, () => {
    console.log(`Server has started and is listening on localhost:${port}`);
});
app.use(middleware_1.default);
app.use('/', index_1.default);
exports.default = app;
