import React, { useRef } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel, FormText, Row } from 'react-bootstrap';
import "./SetUser.css";
import { setUsername } from '../API/streak-userDB';
import { useNavigate } from 'react-router';

const SetUser = () => {
    const userRef = useRef();
    const navigate = useNavigate();

    const submitHandler= async (e) =>{
        e.preventDefault();
        const enteredUsername = userRef.current.value;
        const res = await setUsername(enteredUsername);
        if(!res.ok){
            console.log('error setting username');
        }
        localStorage.setItem('displayname',enteredUsername );
        await navigate('/Todo');
    };

  return (
    <>
        <div className="username-wrapper">
                <img id='welcome-logo' src='/KirokuFullLogo.png'/>
            <div className="username-card">
                <h3>Set a Username</h3>
                <Form onSubmit={submitHandler}>
                    <FormGroup as={Row} className='mb-3'>
                        <FormControl  type='text' ref={userRef} required />
                    </FormGroup>
                    <FormGroup as={Row} className='mt-2'>
                        <Button type='submit'>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        </div>
    </>
  )
}

export default SetUser;