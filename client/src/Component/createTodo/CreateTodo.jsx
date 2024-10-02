import React, { useState } from 'react';
import classes from './create.module.css';
import { createTodo } from '../../Service/Service';
import { useNavigate } from 'react-router-dom';
function CreateTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTodo = await createTodo(title, description);
            console.log(newTodo);
            // Optionally reset the form fields after submission
            setTitle('');
            setDescription('');
            navigate('/');
        } catch (error) {
            console.error('Failed to create todo', error);
        }
    };

    return (
        <div className={classes.container}>
            <h1>Create Todo</h1>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.formInput}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name='title'
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className={classes.description}
                        name='description'
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Create Todo</button>
            </form>
        </div>
    );
}

export default CreateTodo;
