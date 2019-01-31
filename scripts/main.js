fetch('../bin/main.wasm').then(response =>
  response.arrayBuffer()
).then(bytes => WebAssembly.instantiate(bytes)).then(results => {
  instance = results.instance;
  document.getElementById("container").textContent = "WASM result: " + instance.exports.add(40,2);
}).catch(console.error);
