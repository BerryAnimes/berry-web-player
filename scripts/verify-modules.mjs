globalThis.document = undefined;
await import('../dist/player.js');
await import('../dist/watch.js');
console.log('berry-web-player modules ok');
