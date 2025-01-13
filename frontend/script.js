const API_URL = 'http://localhost:4000/api/blogs';

// Fetch and display blogs
async function fetchBlogs() {
    const response = await fetch(API_URL);
    const blogs = await response.json();

    const blogList = document.getElementById('blogList');
    blogList.innerHTML = '';

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
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author }),
    });

    document.getElementById('blogForm').reset();
    fetchBlogs();
}

// Delete a blog
async function deleteBlog(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchBlogs();
}

document.getElementById('blogForm').addEventListener('submit', addBlog);
document.addEventListener('DOMContentLoaded', fetchBlogs);
