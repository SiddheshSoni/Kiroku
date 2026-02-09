import React, { useRef, useState } from 'react'
import "./CSS/InputForm.css"
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { sendExpenseThunk } from '../../Store/expenseSlice'

const ExpenseInput = ({selectedDate="", closeModal}) => {
    const dispatch = useDispatch();

    const [inpDate, setDate] = useState(selectedDate);
    const titleRef =  useRef();
    const amountRef = useRef();
    const categoryRef = useRef();

    const submitHandler = async (e) =>{
        e.preventDefault();
        const newExpense = {
            title : titleRef.current.value,
            amount : amountRef.current.value,
            category : categoryRef.current.value,
            date : inpDate,
        };
        await dispatch(sendExpenseThunk(newExpense));
        console.log(newExpense);
        
    };

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
                                <FormLabel>Category:</FormLabel>
                                <FormControl type='text' ref={categoryRef} required/>
                            </FormGroup>
                        </Row>
                        <Row className='mb-2'>
                            <FormGroup as={Col}>
                                <FormLabel>Amount:</FormLabel>
                                <FormControl type='number' ref={amountRef} required/>
                            </FormGroup>
                            <FormGroup as={Col} >
                                <FormLabel>Date:</FormLabel>
                                <FormControl type='date' value={inpDate} min={today} onChange={(e)=> setDate(e.target.value)} required/>
                            </FormGroup>
                        </Row>
                        <Row className='mb-1 mt-3'>
                            <Col className='text-center'>
                                <Button type='submit' className='w-100'>Add Expense</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    
  )
}

export default ExpenseInput;