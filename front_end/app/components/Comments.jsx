import { commentData } from "../api/comments";
const Comment = ({ data }) => {
  const { name, text } = data;
  return (
    <div className="flex shadow-sm  p-2 rounded-lg my-2">
      <img
        className="w-12 h-12"
        src="https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
        alt="user"
      />
      <div className="px-3 ">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};
const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div>
      <Comment key={index} data={comment} />
      <div className="pl-5 border border-l-black ml-5">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};
const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments:</h1>
      {/* <Commnet data={commentData[0]} /> */}
      <CommentsList comments={commentData} />
    </div>
  );
};
export default CommentsContainer;
