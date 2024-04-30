const editPost = (event) => {
  event.preventDefault();
  console.log("Clicked edit button");

  let blogPost = window.location.pathname.split("/");
  console.log(blogPost);

  const blogPostId = blogPost[2];
  document.location.assign(`/create/${blogPostId}`);
};

const editButtons = document.querySelectorAll("#editBtn");
editButtons.forEach((button) => {
  button.addEventListener("click", editPost);
});