import React, { useRef, useState } from 'react'
import { Button, Col, Form, FormGroup, FormLabel, FormControl, Modal, Row, Alert } from 'react-bootstrap'
import "./Welcome.css"
import { useDispatch } from 'react-redux';
import { LoginThunk } from '../Store/AuthSlice';
import { useNavigate } from 'react-router';

const Welcome = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef= useRef();
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
    
        const email = emailRef.current.value.toLowerCase();
        const enteredPassword = passwordRef.current.value;

        if(isSignup){
            const enteredConfirmPassword = confirmPasswordRef.current.value;

            if(enteredPassword !== enteredConfirmPassword){
                setError("Passwords do not match!")
                return;
            }
        };

        const result = dispatch(LoginThunk({ email, enteredPassword, authMode:isSignup}));

        if(LoginThunk.rejected.match(result)){
            setError(result.payload);
        }else{
            console.log("User Successfully Signed Up!")
            navigate("/Todo");
        }
    };

  return (
    <>
        <div className="welcome-wrapper">
            <div className='left-part'>
                <img id='welcome-logo' src='/KirokuFullLogo.png'/>
            </div>
            <div className="right-part">

                <div className="signup-form">
                    <h1 className='text-center fw-bold mb-4'>{isSignup ? 'Signup' : 'Login' }</h1>
                    <Form onSubmit={submitHandler}>
                        <Row className='mb-3'>
                            <FormGroup>
                                <FormLabel>Email:</FormLabel>
                                <FormControl type="email" 
                                ref={emailRef}
                                required/>
                            </FormGroup>
                        </Row>
                        <Row className='mb-3'>
                            <FormGroup>
                                <FormLabel>Password:</FormLabel>
                                <div className='pass-wrapper'>
                                    <FormControl className='passInp' 
                                        ref={passwordRef}
                                        type={showPass? 'text': 'password'} required
                                    />
                                    <span className='pass-icon' onClick={()=> setShowPass(prev => !prev)}>
                                        {showPass ?
                                        <i className="fa-regular fa-eye-slash"></i>:
                                        <i className="fa-regular fa-eye"></i> 
                                    }
                                    </span>
                                </div>
                            </FormGroup>
                        </Row>
                        {isSignup && <Row className='mb-3 pw-field'>
                            <FormLabel>Confirm Password:</FormLabel>
                            <div className='pass-wrapper'>
                                    <FormControl className='passInp' 
                                        ref={confirmPasswordRef}
                                        type={showPass? 'text': 'password'} required
                                    />
                                    <span className='pass-icon' onClick={()=> setShowPass(prev => !prev)}>
                                        {showPass ?
                                        <i className="fa-regular fa-eye-slash"></i>:
                                        <i className="fa-regular fa-eye"></i> 
                                    }
                                    </span>
                                </div>
                        </Row> }
                        <Row >
                                {error && <Alert>{error}</Alert>}
                        </Row>
                        <Row>
                            <Button id='sub-btn' type='submit'>{isSignup ? 'Signup' : 'Login' }</Button>
                        </Row>
                    </Form>
                    <div className='option'>
                        <span onClick={()=> setIsSignup(prev => !prev)}>{isSignup? 'Already have an Account? Login' : 'Create an account? Register' }</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Welcome