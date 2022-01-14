import { toast } from "react-toastify";

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_POST":
      console.log("New post was added");
      toast.success("Post added");
      return state;
    case "ADD_POST_ERROR":
      console.log("An error has ocurred");
      toast.error("There has been an error, try again");
      return state;
    case "ADD_POST_AUTH_ERROR":
      toast.info("You need to login first");
      return state;
    case "SAVE_POST":
      console.log("User record updated");
      if(!action.wasAlreadySaved){
        toast.info("Post saved");
      }
      return state;
    case "SAVE_POST_AUTH_ERROR":
      toast.info("You need to login first");
      return state;
    default:
      return state;
  }
};

export default postReducer;
