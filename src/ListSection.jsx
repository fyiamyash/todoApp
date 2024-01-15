import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function ListSection() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    React.useEffect(() => {
        fetch("http://localhost:3000/todos").then((response) => {
            response.json().then((data) => {
                setTodos(data);
            });
        })
    }, [])

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                // Remove the deleted item from the state
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting:', error);
            });
    };


    return (<>
        <center>
            <h3 style={{
                padding: "50px"
            }}>CREATE YOUR DAILY TASK!</h3>
            <Card variant="outlined" style={
                {
                    width: "50%",
                    height: "500px",
                    marginTop: "10px",
                    borderRadius: "20px",
                }
            }>
                <div style={{
                    padding: "30px"
                }}>
                    <TextField onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        style={{
                            width: "20%"
                        }} />
                    <TextField onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        style={{
                            width: "400px"
                        }} />
                    <Button onClick={() => {
                        fetch("http://localhost:3000/todos", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                title: title,
                                description: description
                            })
                        }).then(() => {
                            window.location.reload();
                        })
                    }

                    }
                        variant="outlined" style={{
                            height: "55px"
                        }}> Create</Button>
                </div>
                <div style={{ padding: "45px", }} >
                    <List sx={{ width: '100%', bgcolor: 'background.paper', backgroundColor: "#f9f9f9", borderRadius: "5px", overflowY: 'auto', maxHeight: '300px' }}>
                        {todos.map((value) => (
                            <ListItem key={value.id}>
                                <ListItemText>
                                    {value.id}{". "}
                                    {value.title}{": "}{value.description}
                                    <br />
                                </ListItemText>
                                <IconButton aria-label="delete">
                                    <DeleteIcon onClick={() => handleDelete(value.id)} />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>

                </div>
            </Card>

        </center>
    </>)
}
export default ListSection;