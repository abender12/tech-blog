async function newCommentHandler(event) {
  event.preventDefault();

  console.log("Clicked submit button");

  const comment_body = document.getElementById("comment").value.trim();
  const url = window.location.toString().split("/");
  const blogPost_id = url[url.length - 1];

  if (comment_body) {
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ blogPost_id, comment_body }),
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to add comment. Please try again.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("An error occurred while adding the comment. Please try again.");
    }
  }
}

console.log("HERE!");
console.log(document.getElementById("comment-form"));

document.getElementById("comment-form").addEventListener("submit", newCommentHandler);