import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from 'react-bootstrap';



export default function ItemsTable() {
    const [items, setItems] = useState([]);


    const handleEdit = (item) => {
        setCurrentItem(item);
        setShowModal(true);
    };


    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);



    const selectAll = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/items/items");

            console.log("RESPONSE:", res.data);

            const data = res.data.items || res.data.data || res.data;

            if (Array.isArray(data)) {
                setItems(data);
            } else {
                setItems([]);
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        selectAll();
    }, []);






    const deleteItem = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            await axios.delete(`http://localhost:5001/api/items/delete/${id}`);

            // UI update (without reload)
            setItems(items.filter((item) => item._id !== id));

        } catch (error) {
            console.error(error);
            alert("Delete failed ");
        }
    };




    const handleUpdate = async () => {
        try {
            const res = await axios.put(`http://localhost:5001/api/items/update/${currentItem._id}`,
                currentItem
            );


            setItems(prev =>
                prev.map(item =>
                    item._id === currentItem._id ? currentItem : item
                )
            );

            setShowModal(false);

        } catch (error) {
            console.error(error);
            alert("Update failed ");
        }
    };




    return (
        <>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>courses</th>
                        <th>departments</th>
                        <th>marks</th>
                        <th>age</th>
                        <th>skils</th>
                        <th>description</th>
                        <th>rollNmber</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(items) && items.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.courses}</td>
                            <td>{item.departments}</td>
                            <td>{item.marks}</td>
                            <td>{item.age}</td>
                            <td>{item.skils}</td>
                            <td>{item.description}</td>
                            <td>{item.rollNmber}</td>

                            <td>
                                <button className='bg-danger text-white' onClick={() => deleteItem(item._id)}>
                                    Delete
                                </button>
                            </td>

                            <td>
                                <button className='bg-success text-white' onClick={() => handleEdit(item)}>
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>





            {showModal && (
                <div style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    background: "#14141488",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        backgroundColor: "white",
                        padding: "50px",
                        width: "500px",
                        borderRadius: "10px",
                    }}>
                        <h2>Update Item</h2>

                        <input
                            type="string"
                            value={currentItem?.name || ""}
                            onChange={(e) =>
                                setCurrentItem({ ...currentItem, name: e.target.value })
                            }
                        />

                        <input
                            type="string"
                            value={currentItem?.description || ""}
                            onChange={(e) =>
                                setCurrentItem({ ...currentItem, description: e.target.value })
                            }
                        />

                        <input
                            type="number"
                            value={currentItem?.age || ""}
                            onChange={(e) =>
                                setCurrentItem({ ...currentItem, age: e.target.value })
                            }
                        />

                        <input
                            type="string"
                            value={currentItem?.courses || ""}
                            onChange={(e) =>
                                setCurrentItem({ ...currentItem, courses: e.target.value })
                            }
                        />

                        <input
                            type="string"
                            value={currentItem?.departments || ""}
                            onChange={(e) =>
                                setCurrentItem({ ...currentItem, departments: e.target.value })
                            }
                        />

                        <input
                            type="string"
                            value={currentItem?.skils || ""}
                            onChange={(e) =>
                                setCurrentItem({ ...currentItem, skils: e.target.value })
                            }
                        />


                        <input
                            type="number"
                            value={currentItem?.marks || ""}
                            onChange={(e) =>
                                setCurrentItem({ ...currentItem, marks: e.target.value })
                            }
                        />


                        <input
                            type="number"
                            value={currentItem?.rollNmber || ""}
                            onChange={(e) =>
                                setCurrentItem({ ...currentItem, rollNmber: e.target.value })
                            }
                        />

                        <br /><br />

                        <button className='me-5' onClick={handleUpdate}>Save</button>

                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}





        </>
    );

}
