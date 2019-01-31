// check WASM supported on browser
// https://stackoverflow.com/a/47880734/6628517
const supported = (() => {
    try {
        if (typeof WebAssembly === "object"
            && typeof WebAssembly.instantiate === "function") {
            const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            if (module instanceof WebAssembly.Module)
                return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
        }
    } catch (e) {
    }
    return false;
})();
console.log(supported ? "WebAssembly is supported" : "WebAssembly is not supported");
document.getElementById("wasm_support").textContent = (supported ? "WebAssembly is supported" : "WebAssembly is not supported");

// Hello World from WASM
// https://www.youtube.com/watch?v=yEYtwmI7bDg&t=191s
function my(wasm) {
  const textAsBytes = new Uint8Array(wasm.exports.memory.buffer, wasm.exports.position, wasm.exports.length);
  const textAsString = new TextDecoder('utf8').decode(textAsBytes);
  console.log("bls ", wasm);
  document.getElementById("container2").textContent = textAsString;
}

fetch("../bin/my.wasm").then(response =>
  response.arrayBuffer()
).then(bytes =>
  WebAssembly.instantiate(bytes, {})
).then(result =>
  result.instance
).then(my);
