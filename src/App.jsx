import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(" ");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "/@!#$%&()";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-md text-white">
        <h1 className="text-2xl font-bold text-center">Password Generator</h1>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={password}
              className="w-full p-2 text-black rounded-md outline-none"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="px-4 py-2 text-sm font-semibold text-gray-900 bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none"
            >
              Copy
            </button>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-2/3 cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <span className="text-sm">Length: {length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="numberInput" className="text-sm">
              Numbers
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="characterInput" className="text-sm">
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;