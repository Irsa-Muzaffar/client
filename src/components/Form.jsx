import { useState } from "react";
import { Formik } from "formik";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import axios from 'axios'

export default function AdmissionForm() {
    const [submittedData, setSubmittedData] = useState(null);

    return (
        <Formik
            initialValues={{
                name: "",
                courses: "",
                departments: "",
                marks: "",
                age: "",
                skils: "",
                description: "",
                rollNmber: "",
            }}
            // This is what happens when you click Submit
            onSubmit={async (values, { resetForm }) => {
                try {
                    const res = await axios.post(
                        "http://localhost:5001/api/items/",
                        values
                    );

                    console.log("API Response:", res.data);

                    setSubmittedData(values);

                    alert("Saved successfully ✅");

                    resetForm();

                } catch (error) {
                    console.error("FULL ERROR:", error);
                    console.error("RESPONSE:", error.response);
                    alert(error.response?.data?.message || "Error ❌");
                }
            }}
        >
            {({ handleSubmit, handleChange, values, handleReset }) => (
                <div
                    style={{
                        minHeight: "100vh",
                        background: "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: "40px 20px"
                    }}
                >
                    {/* CRITICAL: Ensure onSubmit is passed to the Bootstrap Form */}
                    <Form
                        onSubmit={handleSubmit}
                        style={{
                            width: "40%",
                            maxWidth: "600px",
                            padding: "35px",
                            borderRadius: "15px",
                            background: "#f2dede",
                            boxShadow: "0 10px 30px rgba(63, 55, 55, 0.15)"
                        }}
                    >
                        <h2 className="text-center mb-4 fw-bold"> Admission Form</h2>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label>name</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>rollNmber</Form.Label>
                                <Form.Control
                                    name="rollNmber"
                                    value={values.rollNmber}
                                    onChange={handleChange}
                                    placeholder="2024-CS-001"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label>courses</Form.Label>
                                <Form.Control
                                    name="courses"
                                    value={values.courses}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>departments</Form.Label>
                                <Form.Select
                                    name="departments"
                                    value={values.departments}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Department</option>
                                    <option>Computer Science</option>
                                    <option>Business</option>
                                    <option>Engineering</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label>age</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="age"
                                    value={values.age}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>marks</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="marks"
                                    value={values.marks}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Form.Group className="mb-4">
                            <Form.Label>skils</Form.Label>
                            <Form.Control
                                name="skils"
                                value={values.skils}
                                onChange={handleChange}
                                placeholder="e.g. React, Node.js"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>description</Form.Label>
                            <Form.Control
                                as="textarea"         /* This makes it a big box */
                                rows={3}              /* Number of lines */
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                placeholder="Tell us about yourself..."
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center gap-3">
                            <Button
                                type="submit"
                                style={{
                                    padding: "10px 40px",
                                    borderRadius: "30px",
                                    background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                                    border: "none",
                                    fontWeight: "bold",
                                    color: "white"
                                }}
                            >
                                Submit Application
                            </Button>

                            <Button
                                variant="outline-danger"
                                style={{ borderRadius: "30px", padding: "10px 30px" }}
                                onClick={() => {
                                    handleReset();           // 1. Form khali karega
                                    setSubmittedData(null);  // 2. Payload box hide karega
                                }}
                            >
                                Reset Form
                            </Button>
                        </div>
                    </Form>

                    {submittedData && (
                        <Card
                            style={{
                                marginTop: "30px",
                                width: "100%",
                                maxWidth: "800px",
                                background: "#1e1e1e",
                                borderRadius: "10px",
                                border: "1px solid #333"
                            }}
                        >
                            <Card.Header style={{ color: "#4ec9b0", fontWeight: "bold", borderBottom: "1px solid #333" }}>
                                Payload Data (Object Form)
                            </Card.Header>
                            <Card.Body>
                                <pre style={{ color: "#ce9178", margin: 0 }}>
                                    {JSON.stringify(submittedData, null, 2)}
                                </pre>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            )}
        </Formik>
    );
}