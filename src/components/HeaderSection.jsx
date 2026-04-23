import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Nav, Navbar, } from 'react-bootstrap';

import { LoginForm } from './LoginForm';
import ItemsTable from './Table';

export const HeaderSection = () => {

    const [show, setShow] = useState(false);


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        password: ""
    });

    console.log("formData", formData)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("formDataaaa", formData)

        try {
            const res = await axios.post(
                "http://localhost:5001/api/items/register",
                formData
            );

            console.log("Success:", res.data);
            alert("User Registered Successfully!");
            setShow(false);

            setFormData({
                FirstName: "",
                LastName: "",
                Email: "",
                password: ""
            });

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Error");
        }


    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Navbar</Navbar.Brand>

                    <Nav className="me-auto">
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link>Features</Nav.Link>
                        <Nav.Link>Pricing</Nav.Link>
                    </Nav>

                    <div className="d-flex gap-2">
                        <Button variant="primary" onClick={handleShow}>
                            Sign Up
                        </Button>


                        <LoginForm />


                    </div>
                </Container>
            </Navbar>




            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Register User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleRegister}>

                        <Form.Control
                            type="text"
                            name="FirstName"
                            placeholder="First Name"
                            className="mb-2"
                            value={formData.FirstName}
                            onChange={handleChange}
                            required
                        />

                        <Form.Control
                            type="text"
                            name="LastName"
                            placeholder="Last Name"
                            className="mb-2"
                            value={formData.LastName}
                            onChange={handleChange}
                            required
                        />

                        <Form.Control
                            type="email"
                            name="Email"
                            placeholder="Email"
                            className="mb-2"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                        />

                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="password"
                            className="mb-3"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <Button type="submit" className="w-100">
                            Register
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>


        </>
    );
};