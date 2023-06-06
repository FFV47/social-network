import { useState, useId } from "react";
import useNewPost from "../hooks/useNewPost";
import useDataContext from "../context/DataContext";

const NewPost = () => {
  const { postsQueryKey } = useDataContext();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const newPostMutation = useNewPost(postsQueryKey);
  const id = useId();

  const handleSubmit = (e) => {
    setSending(true);
    e.preventDefault();

    if (text.trim().length > 0) {
      newPostMutation.mutate(text, {
        onSuccess: () => {
          setText("");
          setSending(false);
        },
      });
    }
  };

  return (
    <form className="card round-card shadow mx-3 mt-3" onSubmit={handleSubmit}>
      <div className="card-body d-flex flex-column align-items-center">
        <label htmlFor={id} className="h3">
          New Post
        </label>
        <textarea
          name="post-text"
          id={id}
          className="form-control post-textarea"
          cols="20"
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button className="btn btn-primary mt-2" type="submit">
          {!sending ? "Post" : "Posting"}
        </button>
      </div>
    </form>
  );
};

export default NewPost;
