import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./RegisterForm.css"

const pages = [
  ({ formData, setFormData }) => (
    <div className="page field">
      <label>Name: <input className="form-input" value={formData.name} onChange={(e) => {
        const input = e.target.value
        if (input.length > 30) {
          alert('Name can not exceed 30 characters!')
        }
        setFormData({...formData, name: e.target.value})
        }} /></label>
    </div>
  ),
  ({ formData, setFormData }) => (
    <div className="page field">
      <label>Email: <input className="form-input" 
        type="email"
        value={formData.email} 
        onChange={(e) => {
          //if new character is valid, append to form
          const input = e.target.value;
          setFormData({ ...formData, email: input});
              }}
      /></label>
    </div>
  ),
  ({ formData }) => (
    <div className="page review">
      <p className="review-header">Review:</p>
      <p>Name: {formData.name ? formData.name : "*EMPTY*"}</p>
      <p>Email: {formData.email ? formData.email : "*EMPTY*"}</p>
    </div>
  )
];




const RegisterForm = ({setIsRegistered, setUserInfo, setIsModal, setTypeModal, setModalText}) => {

  
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [slideDirection, setSlideDirection] = useState(1);

 const variants = {
    enter: (direction) => ({

      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: 'relative'
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative'
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      position: 'relative'
    })
  };

  const nextPage = () => {
    setSlideDirection(1); 
    setPage((prev) => Math.min(prev + 1, pages.length - 1));
  }

  const prevPage = () => {
    setSlideDirection(-1);
    setPage((prev) => Math.max(prev - 1, 0));
  }

  const handleSubmit = async () => {
    //IF name ERROR and email ERROR
    if (formData.name === '' &&  
      (formData.email.length === 0 || 
      !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)))) {
        setIsModal(true);
        setTypeModal('error')
        setModalText('Please enter your name and a valid email address')
    }
    //IF name ERROR and email VALID
    else if (formData.name === '' && 
      (formData.email.length !== 0 && 
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))) {
        setIsModal(true);
        setTypeModal('error')
        setModalText('Please enter a valid name')
    }
    //IF name VALID and email ERROR
    else if (formData.name !== '' && (formData.email.length === 0 ||
      !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)))) {
        setIsModal(true);
        setTypeModal('error');
        setModalText('Please enter a valid email address');
    }
    else {
      setIsModal(true);
      setTypeModal('loading');
      setModalText('Please wait while we register you to our platform');
      console.log(formData);
      try {
        const response = await fetch('https://bestscrape-api-official.onrender.com/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();

        //Wait 500 milliseconds, then display response modal
        setTimeout(() => {
          if (data.error) {
            console.error('server error:', data)
            setTypeModal('error');
            setModalText('Uh Oh! A user with the same email has already been found in our database! Please try again with a different email, or log in with the same name');
            return;
          }
          else if (data.login) {
            console.log('server response:', data);
            setUserInfo({
              name: data.User.name,
              email: data.User.email,
              id: data.User.userid
            })
            setIsRegistered(true);
            setIsModal(false);
            setIsModal(true)
            setTypeModal('success');
            setModalText('Successfully Logged In!');
            localStorage.setItem('userData', {'name': data.User.name, 'email': data.User.email})
          }
          else if (data.register) {
            console.log('server response: ', data)
            setUserInfo({
              name: data.User.name,
              email: data.User.email,
              id: data.User.userid
            })
            setIsRegistered(true);
            setIsModal(false)
            setIsModal(true)
            setTypeModal('success')
            setModalText('Successfully Registered!')
            localStorage.setItem('userData', {'name': data.User.name, 'email': data.User.email})
        
          }
        }, 500)
      }
      catch {
        setIsModal(true);
        setTypeModal('error');
        setModalText('Error registering user; Please check your internet connection')
      }
    }
  }

  return (
    <div className="form-container" >
      <img className="image" src="/BEST_SCRAPE-removebg-preview.png" alt='logo'></img>
      <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
      <h1 className='welcome'>Welcome to <span id="yellow">Best</span><span id="blue">Scrape</span>™!</h1>
      </motion.div>
      <h4 className="info">Sign-Up/Log-In to Receive Updates on Prices:</h4>
      <AnimatePresence  mode="wait" custom={slideDirection}>
        <motion.div
          key={page}
          custom={slideDirection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {React.createElement(pages[page], { formData, setFormData })}
        </motion.div>
      </AnimatePresence>
      <div className="buttons" style={{ marginTop: '20px' }}>
        {page > 0 && <button className="page-button" onClick={prevPage}>Back</button>}
        {page < pages.length - 1 ? (
          <button className="page-button" onClick={nextPage} style={{ float: 'right' }}>Next</button>
        ) : (
          <button className="page-button" style={{ float: 'right' }} onClick={handleSubmit}>Submit</button>
        )}
      </div>

    </div>
  );
};

export default RegisterForm;