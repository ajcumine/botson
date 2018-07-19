// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    // Rule disabled as this is a test setup file not used in production
    // eslint-disable-next-line security/detect-object-injection
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {},
    );
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

const div = global.document.createElement('div');
div.id = 'app';
global.document.body.appendChild(div);

copyProps(window, global);
