import React, { useState } from 'react';
import {useNavigate} from 'react-router'
import { motion, AnimatePresence } from 'framer-motion';
import "./RegisterForm.css"

const pages = [
  ({ formData, setFormData }) => (
    <div className="field">
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
    <div className="field">
      <label>Phone # (US ONLY): <input className="form-input" 
        value={formData.phone} 
        onChange={(e) => {
          //if new character is valid, append to form
          const input = e.target.value;
          if (input.length > 10) {
            return;
          }
          
          if (/^\d*$/.test(input)) {
            setFormData({ ...formData, phone: input});
          } 
          
          else {
            
          }
              }} /></label>
    </div>
  ),
  ({ formData }) => (
    <div className="review">
      <p>Review:</p>
      <p>Name: {formData.name}</p>
      <p>Phone #: {formData.phone}</p>
    </div>
  )
];





const RegisterForm = ({setIsRegistered, setUserInfo, setIsModal, setTypeModal, setModalText}) => {

  
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const navigate = useNavigate();


  const nextPage = () => setPage((prev) => Math.min(prev + 1, pages.length - 1));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));


  const handleSubmit = async () => {

    if (formData.name === '' && formData.phone.length !== 10) {
      alert('please enter your name and phone number')
    }
    else if (formData.name === '' && formData.phone.length === 10) {
      alert('please enter a name')
    }
    else if (formData.name !== '' && formData.phone.length !== 10) {
      alert('please enter a phone #')
    }
    else {
      //setTypeModal('loading');
      setIsModal(true);
      setModalText('Please wait while we register you to our platform')
      console.log(formData);
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      console.log('server response:', data);
      setUserInfo({
        name: data.User.name,
        phone: data.User.phone
      })
      setIsRegistered(true)
      setIsModal(false)
      navigate('/search')
      }


  }

  return (
    <div className="form-container" >
      <img className="image" src="/BEST_SCRAPE-removebg-preview.png"></img>
      <h1 className='welcome'>Welcome to BestScrape™!</h1>
      <h4 className="info">Fill out the following form to receive updates on prices:</h4>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
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