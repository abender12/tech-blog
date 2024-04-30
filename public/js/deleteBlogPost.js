const deletePostHandler = async (event) => {
  event.preventDefault();
  console.log("Clicked delete button");

  let blogPostId = window.location.pathname.split("/")[2];
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

const deleteButtons = document.querySelectorAll("#deleteBtn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", deletePostHandler);
});