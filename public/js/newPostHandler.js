async function newPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#titleInput").value.trim();
  const description = document.querySelector("#bodyInput").value.trim();

  if (title && description) {
    try {
      const response = await fetch(`/api/blogPost`, {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to create blog post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("An error occurred while creating the blog post. Please try again.");
    }
  }
}

document.querySelector(".createBlogPost").addEventListener("submit", newPostHandler);