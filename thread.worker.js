const fib = (name) => `Hello ${name}`;

self.addEventListener('message', ({ data }) => {
  let { type, payload } = data;
  if (type === 'UPDATE') {
    const result = fib(payload);
    self.postMessage({ type: 'UPDATE_SUCCESS', payload: result });
  }
});

self.addEventListener(
  'exit',
  () => {
    process.exit(0);
  },
  false
);