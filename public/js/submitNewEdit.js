let blogPost = window.location.pathname.split("/");

const submitEdit = async (event) => {
  event.preventDefault();

  const title = document.getElementById("titleInput").value.trim();
  const description = document.getElementById("bodyInput").value.trim();

  if (title && description) {
    try {
      const response = await fetch(`/api/blogPost/${blogPost[2]}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        document.location.assign("/dashboard");
      } else {
        alert("Failed to update blog post. Please try again.");
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
      alert("An error occurred while updating the blog post. Please try again.");
    }
  }
};

const submitButton = document.getElementById("submitEdit");
submitButton.addEventListener("click", submitEdit);