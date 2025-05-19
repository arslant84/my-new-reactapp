import axios from "axios";
import { useState } from "react";

const Post = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(props.title);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/posts/${props.id}`);
            props.setUpdate(true);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleEdit = () => {
        setEditTitle(props.title);
        setIsEditing(true);
        setError("");
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError("");
    };

    const handleSave = async () => {
        if (!editTitle.trim()) {
            setError("Title cannot be empty");
            return;
        }

        try {
            await axios.put(`http://localhost:3000/posts/${props.id}`, {
                id: props.id,
                title: editTitle,
                views: props.views
            });
            props.setUpdate(true);
            setIsEditing(false);
            setError("");
        } catch (error) {
            console.error("Error updating post:", error);
            setError("Failed to update post");
        }
    };

    return(
        <div className={`post ${isEditing ? 'editing' : ''}`}>
            <div className="post-content">
                {isEditing ? (
                    <div className="edit-form">
                        <input 
                            type="text" 
                            value={editTitle} 
                            onChange={(e) => setEditTitle(e.target.value)}
                            className={error ? "input-error" : ""}
                        />
                        {error && <p className="error-message">{error}</p>}
                    </div>
                ) : (
                    <>
                        <h3>{props.title}</h3>
                        <p>Views: {props.views}</p>
                    </>
                )}
            </div>
            <div className="post-actions">
                {isEditing ? (
                    <>
                        <button className="save-btn" onClick={handleSave}>Save</button>
                        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button className="edit-btn" onClick={handleEdit}>Edit</button>
                        <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Post;