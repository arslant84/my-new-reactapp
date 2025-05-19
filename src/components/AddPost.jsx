import { useState, useEffect } from "react";
import axios from "axios";

const AddPost = (props) => {
    // Form data for auto-save form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
    // Post form data
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    
    // Load data from SessionStorage when component mounts
    useEffect(() => {
        const savedName = sessionStorage.getItem('name');
        const savedEmail = sessionStorage.getItem('email');
        const savedPhone = sessionStorage.getItem('phone');
        
        if (savedName) setName(savedName);
        if (savedEmail) setEmail(savedEmail);
        if (savedPhone) setPhone(savedPhone);
    }, []);

    // Save data to SessionStorage whenever values change
    useEffect(() => {
        sessionStorage.setItem('name', name);
    }, [name]);
    
    useEffect(() => {
        sessionStorage.setItem('email', email);
    }, [email]);
    
    useEffect(() => {
        sessionStorage.setItem('phone', phone);
    }, [phone]);
    
    // Reset form data and clear sessionStorage
    const handleReset = () => {
        setName('');
        setEmail('');
        setPhone('');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('phone');
    };
    
    // Submit post to API
    const onSubmit = async () => {
        // Validate title is not empty
        if (!title.trim()) {
            setError("Title cannot be empty");
            return;
        }
        
        try {
            const { data } = await axios.post("http://localhost:3000/posts", 
                {title, views: 0});
            console.log("created data", data);
            props.setUpdate(true);
            setTitle(""); // Clear input after successful submission
            setError(""); // Clear any previous errors
        } catch (error) {
            console.error("Error creating post:", error);
            setError("Failed to create post");
        }
    }
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };
    
    return (
        <div className="form-container">
            <div className="form">
                <div className="form-section">
                    <h3>Auto-save Form</h3>
                    
                    <div className="form-fields">
                        <input 
                            placeholder="Set Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                        <input 
                            placeholder="Set Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            placeholder="Set Phone" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                        />
                    </div>
                    
                    <button 
                        className="reset-button" 
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
                
                <div className="form-section">
                    <h3>Add Post</h3>
                    <input 
                        value={title} 
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (e.target.value.trim()) setError("");
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter post title"
                        className={error ? "input-error" : ""}
                    />
                    <button onClick={onSubmit} className="submit-button">Submit</button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default AddPost;