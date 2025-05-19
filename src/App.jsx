import { useState, useEffect } from 'react';
import Post from './components/Post';
import AddPost from './components/AddPost';
import TodoList from './components/TodoList';
import Timer from './components/Timer';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    
    try {
      // Get total count for pagination
      const countResponse = await axios.get("http://localhost:3000/posts");
      setTotalPosts(countResponse.data.length);
      
      // Get paginated and sorted data
      const sortPrefix = sortDirection === 'desc' ? '-' : '';
      const { data } = await axios.get(
        `http://localhost:3000/posts?_page=${currentPage}&_limit=${postsPerPage}&_sort=${sortField}&_order=${sortDirection === 'desc' ? 'desc' : 'asc'}`
      );
      
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
      setUpdate(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPage, postsPerPage, sortField, sortDirection]);

  useEffect(() => {
    if(update) {
      fetchData();
    }
  }, [update]);
  
  const handleSort = (field) => {
    if (field === sortField) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={`container ${theme}`}>
      <div className="header-container">
        <h1>React Application</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
      
      <div className="app-sections">
        <div className="section todo-section">
          <TodoList />
          <Timer />
        </div>
        
        <div className="section posts-section">
          <h2>Posts</h2>
          <div>
            <AddPost setUpdate={setUpdate} />
          </div>
          
          <div className="posts-container">
            {isLoading 
              ? <h2>Loading...</h2>
              : posts.length > 0 
                ? posts.map((post) => (<Post key={post.id} {...post} setUpdate={setUpdate} />))
                : <p>No posts found. Add your first post!</p>
            }
          </div>
          
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-btn" 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              
              <div className="page-info">
                Page {currentPage} of {totalPages}
              </div>
              
              <button 
                className="page-btn" 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
