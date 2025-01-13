const API_URL = 'http://localhost:4000/api/blogs';

// Fetch and display blogs
async function fetchBlogs() {
    const response = await fetch(API_URL);
    const blogs = await response.json();

    const blogList = document.getElementById('blogList');
    blogList.innerHTML = ''; // Clear existing list

    blogs.forEach((blog) => {
        const blogDiv = document.createElement('div');
        blogDiv.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <p><strong>Author:</strong> ${blog.author}</p>
            <button onclick="deleteBlog('${blog._id}')">Delete</button>
        `;
        blogList.appendChild(blogDiv);
    });
}

// Add a new blog
async function addBlog(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    // Send POST request to the backend
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author }),
    });

    if (response.ok) {
        // Reset the form
        document.getElementById('blogForm').reset();

        // Refresh the blog list
        fetchBlogs();
    } else {
        console.error('Failed to add blog:', await response.json());
    }
}

// Delete a blog
async function deleteBlog(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (response.ok) {
        fetchBlogs();
    } else {
        console.error('Failed to delete blog:', await response.json());
    }
}

// Event Listeners
document.getElementById('blogForm').addEventListener('submit', addBlog);
document.addEventListener('DOMContentLoaded', fetchBlogs);
