const deletePostHandler = async (event) => {
  event.preventDefault();
  console.log("Clicked delete button");

  const blogPostId = event.target.getAttribute("data-id");
  console.log("Blog post ID to delete:", blogPostId);

  try {
    const response = await fetch(`/api/blogPost/${blogPostId}`, {
      method: "DELETE"
    });

    if (response.ok) {
      document.location.assign("/dashboard");
    } else {
      alert(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting blog post:", error);
    alert("An error occurred while deleting the blog post.");
  }
};

const editBlogPost = (event) => {
  event.preventDefault();
  console.log("Clicked edit button");

  const blogPostId = event.target.getAttribute("data-id");
  console.log("Blog post ID to edit:", blogPostId);

  document.location.assign(`/create/${blogPostId}`);
};

const editButtons = document.querySelectorAll("#editBtn");
editButtons.forEach((button) => {
  button.addEventListener("click", editBlogPost);
});

const deleteButtons = document.querySelectorAll("#deleteBtn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", deletePostHandler);
});