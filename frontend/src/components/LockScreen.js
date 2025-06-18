import {useEffect, useState} from 'react'
import './LockScreen.css'

export default function LockScreen({password, isLocal, setIsLocal}) {
    const [attemptedPassword, setAttemptedPassword] = useState('');

    const handleChange = (e) => {
        setAttemptedPassword(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && attemptedPassword === password) {
            setIsLocal(true)
            console.log(isLocal)
        }
    }
    return (
        <div className="ls-background">
            <TypingEffect text="Please enter the password provided by the developer to be granted access" speed={20} />
            <input onChange={handleChange} onKeyDown={handleKeyDown} value={attemptedPassword} className="pw-input" type='text'></input>
        </div>
    )
}

const TypingEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <h1 style={{textAlign: 'center'}}>{displayedText}</h1>;
}