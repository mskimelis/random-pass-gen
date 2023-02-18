import { useEffect, useState } from "react";
import "./App.css";
import Checkbox from "./components/checkbox";

function App() {
  const [passwordGen, setPasswordGen] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [handelText, setHandelText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChangeUppercase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };

  function SaveButton() {
    const [saves, setSaves] = useState([]);

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("Passw"));
      if (data) {
        setSaves(data);
      }
    }, []);

    useEffect(() => {
      localStorage.setItem("Passw", JSON.stringify(saves));
    }, [saves]);
  }

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandelText(characters.join(""));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }

  return (
    <div className="App">
      <div className="container">
        <h2>Password Generator</h2>
        <div className="result-container">
          <input
            type="text"
            value={handelText}
            placeholder=""
            autoComplete="off"
            onChange={(e) => setHandelText(e.target.value)}
          />
          <button
            className="btn"
            onClick={() => {
              if (handelText.length > 0) {
                navigator.clipboard.writeText(handelText);
                setCopied(true);
                setInterval(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
          >
            {copied ? "Done" : "Copy"}
          </button>
        </div>
        <br />
        <div className="settings">
          <div className="setting">
            <div>
              <label>Password length</label>
            </div>
            <div>
              <input
                type="range"
                min="5"
                max="20"
                value={passwordGen.length}
                onChange={(e) => setPasswordLength(e.target.value)}
              />{" "}
              {passwordGen.length}
            </div>
          </div>
          <div className="setting">
            <div>
              <label>Include uppercase letters</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.uppercase}
                onChange={handleChangeUppercase}
              />
            </div>
          </div>
          <div className="setting">
            <div>
              <label>Include lowercase letters</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.lowercase}
                onChange={handleChangeLowercase}
              />
            </div>
          </div>
          <div className="setting">
            <div>
              <label>Include numbers</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.numbers}
                onChange={handleChangeNumbers}
              />
            </div>
          </div>
          <div className="setting">
            <div>
              <label>Include symbols</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.symbols}
                onChange={handleChangeSymbols}
              />
            </div>
          </div>
        </div>
        <div>
          <button className="generate-button" onClick={generatePassword}>
            Generate password
          </button>
        </div>
        <div>
          <button className="Save-password-btn" onClick={SaveButton}>
            Save Password
          </button>
        </div>
      </div>
      <div className="Saved-container">
        <h2>Saved Passwords</h2>
        <div className="Search-container">
          <input type="search" placeholder="Search" />
        </div>
        <div className="Saved-passwords">
          <li>{handelText}</li>
        </div>
      </div>
    </div>
  );
}

export default App;
