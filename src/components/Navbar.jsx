import { useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LoginForm } from "./LoginForm";

export const Navbara = () => {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    password: ""
  });




//login ka lia hai
  const [form, setForm] = useState({
    Email: "",
    password: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Simple validation
  const validate = () => {
    let newErrors = {};

    if (!form.Email) {
      newErrors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.Email)) {
      newErrors.Email = "Invalid Email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Submit form
  const handleSubmitt = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5001/api/items/login",
        form
      );

      const token = response.data.token;

      // Store token
      localStorage.setItem("token", token);

      alert("Login successful");

    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };








  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChangee = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.error("FULL ERROR:", error);
      console.error("RESPONSE:", error.response);
      alert(error.response?.data?.message || "Error ❌");


    };



    return (
      <>
<h1>okkkk</h1>
        <Navbar bg="light" expand="lg">
          <Container>

            <Navbar.Brand href="#">MyApp</Navbar.Brand>

            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Features</Nav.Link>
              <Nav.Link href="#">Pricing</Nav.Link>
            </Nav>

            <div className="d-flex gap-2">
              <Button variant="primary" onClick={handleShow}>
                Sign Up
              </Button>

              <Button variant="outline-dark" >
                 <LoginForm />
              </Button>
            </div>

          </Container>
        </Navbar>




        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Register User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>

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
                type="Email"
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
                placeholder="Password"
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

    )
  }
}
