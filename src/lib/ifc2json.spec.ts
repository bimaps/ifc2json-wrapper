// tslint:disable:no-expression-statement
import test from 'ava';
import fs from 'fs';
import { ifc2json } from './ifc2json';

function cleanJsonFiles(): void {
  if (fs.existsSync('source/villa.ifc.json')) {
    fs.unlinkSync('source/villa.ifc.json');
  }
  if (fs.existsSync('source/test.ifc.json')) {
    fs.unlinkSync('source/test.ifc.json');
  }
  if (fs.existsSync('source/test2.json')) {
    fs.unlinkSync('source/test2.json');
  }
  if (fs.existsSync('source/duplex.ifc.json')) {
    fs.unlinkSync('source/duplex.ifc.json');
  }
  if (fs.existsSync('source/erroneous.ifc.json')) {
    fs.unlinkSync('source/erroneous.ifc.json');
  }
}

test.before(() => {
  cleanJsonFiles();
});

test.serial('Convert big IFC', async t => {
  const conversion = ifc2json('source/villa.ifc', {
    replaceExistingFile: false
  });
  t.is(await conversion, 'source/villa.ifc.json');
  t.is(fs.existsSync('source/villa.ifc.json'), true);
});

test.serial('Convert correct IFC', async t => {
  const conversion = ifc2json('source/test.ifc', {
    replaceExistingFile: false
  });
  t.is(await conversion, 'source/test.ifc.json');
  t.is(fs.existsSync('source/test.ifc.json'), true);
});

test.serial('Avoid overwritting output', async t => {
  const error = await t.throwsAsync(
    ifc2json('source/test.ifc', { replaceExistingFile: false })
  );
  t.is(error.message, 'JSON destination file already exists');
});

test.serial('Allow overwritting output if specified', async t => {
  const conversion = ifc2json('source/test.ifc', { replaceExistingFile: true });
  t.is(await conversion, 'source/test.ifc.json');
  t.is(fs.existsSync('source/test.ifc.json'), true);
});

test('Error if source does not exists', async t => {
  const error = await t.throwsAsync(ifc2json('donotexists.ifc'));
  t.is(error.message, 'Unable to open the source file');
});

test('Error if incorrect source file', async t => {
  const error = await t.throwsAsync(ifc2json('source/erroneous.ifc'));
  t.is(error?.message?.length > 0, true);
});

test('Convert to a given destination file', async t => {
  const conversion = ifc2json('source/test.ifc', { destination: 'source/test2.json'});
  t.is(await conversion, 'source/test2.json');
  t.is(fs.existsSync('source/test2.json'), true);
});

test('Error if destination is not a .json file', async t => {
  const error = await t.throwsAsync(ifc2json('source/test.ifc', { destination: 'source/test2.js'}))
  t.is(error.message, 'Invalid destination file');
});

test('Error if path is given in argument', async t => {
  const error = await t.throwsAsync(
    ifc2json('source/duplex.ifc', { path: '/path/to/bin' })
  );
  t.is(typeof error.message, 'string');
});

test.after(() => {
  cleanJsonFiles();
});
