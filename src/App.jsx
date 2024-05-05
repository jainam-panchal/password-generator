import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(true)

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    var passDict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumbers) passDict += '0123456789'
    if (includeSpecialCharacters) passDict += '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~'

    var tempPass = ''
    for (let index = 0; index < length; index++) {
      var charInd = Math.floor(Math.random() * passDict.length) // corrected line
      tempPass += passDict[charInd]
    }
    console.log(tempPass)
    setPassword(tempPass)
  }, [length, includeNumbers, includeSpecialCharacters, setPassword])

  useEffect(generatePassword, [
    length,
    includeNumbers,
    includeSpecialCharacters,
  ])

  const handleCopyPassword = () => {
    const input = passwordRef.current
    if (input) {
      input.focus()
      input.select()
      window.navigator.clipboard.writeText(password).catch((err) => {
        console.error('Failed to copy text: ', err)
      })
    }
  }

  return (
    <div className="py-11 text-neutral-200 h-screen flex items-center  flex-col bg-slate-950 gap-2">
      <p className="text-naeutral-200 text-4xl">Password Generator ...</p>

      {/* dispaly password */}
      <div className="flex gap-3 mt-11 font-semibold text-stone-900">
        <input
          ref={passwordRef}
          name="password"
          className="bg-white rounded-lg px-2"
          type="text"
          value={password}
          disabled
        ></input>
        <button
          className="px-4 bg-slate-500 rounded-lg"
          onClick={handleCopyPassword}
        >
          Copy
        </button>
      </div>

      <div className="py-5">
        {/* leng */}
        <div className="flex gap-5">
          <label htmlFor="length">Length : {length}</label>
          <input
            type="range"
            name="length"
            min="8"
            max="32"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        {/* Numbers / Special Characters  */}
        <div className="flex items-center">
          <label htmlFor="numbers" style={{ marginRight: '10px' }}>
            Include Numbers:{' '}
          </label>
          <input
            type="checkbox"
            defaultChecked="true"
            name="numbers"
            onChange={() => setIncludeNumbers((prevState) => !prevState)}
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="numbers" style={{ marginRight: '10px' }}>
            Include Special Characters:{' '}
          </label>
          <input
            type="checkbox"
            defaultChecked="true"
            name="numbers"
            onChange={() =>
              setIncludeSpecialCharacters((prevState) => !prevState)
            }
          />
        </div>
      </div>
    </div>
  )
}

export default App
