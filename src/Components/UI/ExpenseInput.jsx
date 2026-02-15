import React, { useRef, useState } from 'react'
import "./CSS/InputForm.css"
import { Button, Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { sendExpenseThunk } from '../../Store/expenseSlice'
import { categories } from '../helper/Categories'
const ExpenseInput = ({selectedDate="", closeModal}) => {
    const dispatch = useDispatch();
    
    const today = new Date().toLocaleDateString("en-CA");

    const [inpDate, setDate] = useState(selectedDate || today);
    const titleRef =  useRef();
    const amountRef = useRef();
    const [categoryId, setCategoryId] = useState("");

    const submitHandler = async (e) =>{
        e.preventDefault();

        const selectedCat = categories.find( (c) => (c.id === categoryId));
        console.log(selectedCat);
        const newExpense = {
            title : titleRef.current.value,
            amount : amountRef.current.value,
            category : {
                emoji:selectedCat.emoji,
                label:selectedCat.label,
            },
            date : inpDate,
        };
        await dispatch(sendExpenseThunk(newExpense));
        console.log(newExpense);
        
        closeModal();
    };

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
                                <FormSelect 
                                    value={categoryId}
                                    onChange={(e)=> setCategoryId(Number(e.target.value))}
                                    required    
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map((cat)=>(
                                        <option key={cat.id} value={cat.id}>
                                            {cat.emoji} {cat.label}
                                        </option>
                                    ))}
                                </FormSelect>
                            </FormGroup>
                        </Row>
                        <Row className='mb-2'>
                            <FormGroup as={Col}>
                                <FormLabel>Amount:</FormLabel>
                                <FormControl type='number' ref={amountRef} required/>
                            </FormGroup>
                            <FormGroup as={Col} >
                                <FormLabel>Date:</FormLabel>
                                <FormControl type='date' value={inpDate} onChange={(e)=> setDate(e.target.value)} required/>
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