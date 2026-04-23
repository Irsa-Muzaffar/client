import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

export const LoginForm = () => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // login form state
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    // Handle input change
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

    const validate = () => {
        const errors = {};

        if (!form.email?.trim()) {
            errors.email = "Email required";
        } else if (!isEmailValid(form.email)) {
            errors.email = "Invalid email";
        }

        if (!form.password?.trim()) {
            errors.password = "password required";
        } else if (form.password.trim().length < 6) {
            errors.password = "password must be 6+ chars";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            setLoading(true);

            // ✅ FIXED: Send Email instead of email
            const res = await axios.post(
                "http://localhost:5001/api/items/login",
                {
                    Email: form.email,
                    password: form.password
                }
            );

            const token = res.data.token;

            // Store token
            localStorage.setItem("token", token);

            alert("Login successful");

            handleClose();

        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="outline-light" onClick={handleShow}>
                Login
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={form.email}
                            onChange={handleForm}
                            className="mb-2"
                            required
                        />

                        {errors.email && (
                            <small style={{ color: "red" }}>{errors.email}</small>
                        )}

                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleForm}
                            className="mb-2"
                            required
                        />

                        {errors.password && (
                            <small style={{ color: "red" }}>{errors.password}</small>
                        )}

                        <Button type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};