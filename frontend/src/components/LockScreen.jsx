import {useEffect, useState} from 'react'
import './LockScreen.css'
import emailjs from '@emailjs/browser';


export default function LockScreen({password, isLocal, setIsLocal}) {
    const [attemptedPassword, setAttemptedPassword] = useState('');
    const [randomPassword, setRandomPassword] = useState(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        for (let i = 0; i < 6; i++) {
          
          password = password + chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return password;
    })

    useEffect(() => {
      OneTimePassword()
    }, [])

    const handleChange = (e) => {
        setAttemptedPassword(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && attemptedPassword === password) {
            setIsLocal(true)
            console.log(isLocal)
        }
    }

    const OneTimePassword = () => {
      const emailParams = {
        OTP: randomPassword
      }
      emailjs.send(
                'bestscrapeotp',             
                'template_o3hl8ze',          
                emailParams
            )
            .then((result) => {
                console.log('OTP sent successfully:', result.text);
            })
            .then(setFormData({
                name: '',
                email: '',
                message: ''
            }))
            .catch((error) => {
                console.error('Email send failed:', error.text);
            })
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