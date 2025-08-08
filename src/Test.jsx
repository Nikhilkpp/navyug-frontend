import { useRef, useState } from "react";

export default function FocusInput() {
  const inputRef = useRef();
  const inputRef_1 = useRef();
const refCounter = useRef(0);
const [stateCounter, setStateCounter] = useState(0);
  const handleClick = () => {
    inputRef.current.focus();
    inputRef.current.placeholder="now I'm visible"
    console.log('ref:',refCounter.current);
    console.log('state:',stateCounter)
    
  };

  return (
    <>
      <input ref={inputRef} type="text" placeholder="i'm gone" />
      <input ref={inputRef_1} type="text" />
      <button onClick={handleClick}>Focus Input</button>
      <br/>
      <button onClick={() => refCounter.current++}>Ref +{refCounter.current}</button>
      <br/>
<button onClick={() => setStateCounter(c => c + 1)}>State + {stateCounter}</button>
    </>
  );
}
