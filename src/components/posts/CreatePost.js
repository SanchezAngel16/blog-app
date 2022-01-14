import { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import Card from "../layout/Card";
import CustomButton from "../layout/CustomButton";
import "./CreatePost.css";

const CreatePost = ({addPost}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverPhoto: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("posting new article");
    addPost(formData);
  };

  return (
    <div className="createPost-panel">
      <Card>
        <h3>Write your post</h3>

        <form className="createPost-form">
          <label className="createPost-label" htmlFor="">
            Title
          </label>
          <input type="text" name="title" onChange={handleChange} />
          <label className="createPost-label" htmlFor="">
            Content
          </label>
          <textarea
            rows="2"
            type="content"
            name="content"
            onChange={handleChange}
          />
          <CustomButton text="Publish" OnClick={handleSubmit} type="submit" />
        </form>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => dispatch(addPost(post)),
  };
};

export default connect(null, mapDispatchToProps)(CreatePost);
