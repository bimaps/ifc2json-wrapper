"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-expression-statement
const ava_1 = __importDefault(require("ava"));
const fs_1 = __importDefault(require("fs"));
const ifc2json_1 = require("./ifc2json");
function cleanJsonFiles() {
    if (fs_1.default.existsSync('source/villa.ifc.json')) {
        fs_1.default.unlinkSync('source/villa.ifc.json');
    }
    if (fs_1.default.existsSync('source/test.ifc.json')) {
        fs_1.default.unlinkSync('source/test.ifc.json');
    }
    if (fs_1.default.existsSync('source/test2.json')) {
        fs_1.default.unlinkSync('source/test2.json');
    }
    if (fs_1.default.existsSync('source/duplex.ifc.json')) {
        fs_1.default.unlinkSync('source/duplex.ifc.json');
    }
    if (fs_1.default.existsSync('source/erroneous.ifc.json')) {
        fs_1.default.unlinkSync('source/erroneous.ifc.json');
    }
}
ava_1.default.before(() => {
    cleanJsonFiles();
});
ava_1.default.serial('Convert big IFC', async (t) => {
    const conversion = ifc2json_1.ifc2json('source/villa.ifc', {
        replaceExistingFile: false
    });
    t.is(await conversion, 'source/villa.ifc.json');
    t.is(fs_1.default.existsSync('source/villa.ifc.json'), true);
});
ava_1.default.serial('Convert correct IFC', async (t) => {
    const conversion = ifc2json_1.ifc2json('source/test.ifc', {
        replaceExistingFile: false
    });
    t.is(await conversion, 'source/test.ifc.json');
    t.is(fs_1.default.existsSync('source/test.ifc.json'), true);
});
ava_1.default.serial('Avoid overwritting output', async (t) => {
    const error = await t.throwsAsync(ifc2json_1.ifc2json('source/test.ifc', { replaceExistingFile: false }));
    t.is(error.message, 'JSON destination file already exists');
});
ava_1.default.serial('Allow overwritting output if specified', async (t) => {
    const conversion = ifc2json_1.ifc2json('source/test.ifc', { replaceExistingFile: true });
    t.is(await conversion, 'source/test.ifc.json');
    t.is(fs_1.default.existsSync('source/test.ifc.json'), true);
});
ava_1.default('Error if source does not exists', async (t) => {
    const error = await t.throwsAsync(ifc2json_1.ifc2json('donotexists.ifc'));
    t.is(error.message, 'Unable to open the source file');
});
ava_1.default('Error if incorrect source file', async (t) => {
    var _a, _b;
    const error = await t.throwsAsync(ifc2json_1.ifc2json('source/erroneous.ifc'));
    t.is(((_b = (_a = error) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.length) > 0, true);
});
ava_1.default('Convert to a given destination file', async (t) => {
    const conversion = ifc2json_1.ifc2json('source/test.ifc', { destination: 'source/test2.json' });
    t.is(await conversion, 'source/test2.json');
    t.is(fs_1.default.existsSync('source/test2.json'), true);
});
ava_1.default('Error if destination is not a .json file', async (t) => {
    const error = await t.throwsAsync(ifc2json_1.ifc2json('source/test.ifc', { destination: 'source/test2.js' }));
    t.is(error.message, 'Invalid destination file');
});
ava_1.default('Error if path is given in argument', async (t) => {
    const error = await t.throwsAsync(ifc2json_1.ifc2json('source/duplex.ifc', { path: '/path/to/bin' }));
    t.is(typeof error.message, 'string');
});
ava_1.default.after(() => {
    cleanJsonFiles();
});
