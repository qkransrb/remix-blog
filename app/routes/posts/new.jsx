import { Link, Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { db } from "../../utils/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");

  const fields = { title, body };

  const post = await db.post.create({ data: fields });

  return redirect(`/posts/${post.id}`);
};

const NewPost = () => {
  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <Form method="post">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="body">Post Body</label>
            <textarea name="body" id="body"></textarea>
          </div>
          <button type="submit" className="btn btn-block">
            Add Post
          </button>
        </Form>
      </div>
    </>
  );
};

export default NewPost;
