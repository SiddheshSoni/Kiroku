import React, { useRef, useState } from 'react'
import "./CSS/InputForm.css"
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { SendTodosThunk } from '../../Store/TodoSlice'

//if its a daily task I should disable date input
const InputForm = ({selectedDate="", closeModal}) => {
    const dispatch = useDispatch();

    const [ isDaily, setIsDaily] = useState(false);
    const [inpDate, setDate] = useState(selectedDate);
    const titleRef =  useRef();
    const timeRef = useRef();

    const submitHandler = async (e) =>{
        e.preventDefault();
        const newTodo = {
            title : titleRef.current.value,
            time : timeRef.current.value,
            date : isDaily? null : inpDate ,
            isDaily,
            isCompleted:isDaily ? null : false,
            lastCompletedDate: isDaily? null: undefined,
        };
        await dispatch(SendTodosThunk(newTodo));
        console.log(newTodo);
        closeModal();
    };

    // const now = new Date().toTimeString().slice(0,5);
    const today = new Date().toLocaleDateString("en-CA");

  return (
        <div className="cust-modal" onClick={closeModal}>
            <div className='input-modal-wrapper' >
                <div className='input-form' onClick={(e) => e.stopPropagation()}>
                    <Form onSubmit={submitHandler}>
                        <Row className='mb-2'>
                            <FormGroup as={Col}>
                                <FormLabel>Title:</FormLabel>
                                <FormControl type='text' ref={titleRef} required/>
                            </FormGroup>
                        </Row>
                        <Row className='mb-2'>
                            <FormGroup as={Col}>
                                <FormLabel>Time:</FormLabel>
                                <FormControl type='time' 
                                // min={now}
                                 ref={timeRef} required/>
                            </FormGroup>
                            <FormGroup className='text-center' as={Col}>
                                <FormLabel>Daily Task:</FormLabel>
                                <Form.Check type="switch" checked={isDaily} onChange={(e)=>setIsDaily(e.target.checked)} className="fs-3 user-select-none" id="toggle-switch-id" />
                            </FormGroup>
                            <FormGroup as={Col} >
                                <FormLabel>Date:</FormLabel>
                                <FormControl type='date' value={inpDate} min={today} onChange={(e)=> setDate(e.target.value)} disabled={isDaily} required/>
                            </FormGroup>
                        </Row>
                        <Row className='mb-1 mt-3'>
                            <Col className='text-center'>
                                <Button type='submit' className='w-100'>Add Task</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    
  )
}

export default InputForm;