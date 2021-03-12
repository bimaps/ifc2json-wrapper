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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZjMmpzb24uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaWZjMmpzb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUF5QztBQUN6Qyw4Q0FBdUI7QUFDdkIsNENBQW9CO0FBQ3BCLHlDQUFzQztBQUV0QyxTQUFTLGNBQWM7SUFDckIsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLEVBQUU7UUFDMUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0tBQ3hDO0lBQ0QsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7UUFDekMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0tBQ3ZDO0lBQ0QsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7UUFDdEMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ3BDO0lBQ0QsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7UUFDM0MsWUFBRSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0tBQ3pDO0lBQ0QsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLDJCQUEyQixDQUFDLEVBQUU7UUFDOUMsWUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0tBQzVDO0FBQ0gsQ0FBQztBQUVELGFBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO0lBQ2YsY0FBYyxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRTtJQUN2QyxNQUFNLFVBQVUsR0FBRyxtQkFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzlDLG1CQUFtQixFQUFFLEtBQUs7S0FDM0Is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