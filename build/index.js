"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const logger_1 = __importDefault(require("./middleware/logger"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/api', (req, res) => {
    res.send('Hello');
});
app.listen(port, () => {
    console.log(`Server has started and is listening on localhost:${port}`);
});
app.use(logger_1.default);
app.use('/', index_1.default);
exports.default = app;
