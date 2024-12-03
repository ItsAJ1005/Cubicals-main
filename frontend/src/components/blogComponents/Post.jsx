import React from "react";

const Post = ({ title, content, tags, author, file, createdAt }) => {
  // Format the createdAt date
  const postDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) : "Unknown date";

  const postTime = createdAt ? new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Unknown time";

  return (
    <div>
      <div className="post max-w-[100%] flex gap-10 mb-10">
        <div className="image max-w-[40%]">
          <img
            src={file ? file : "https://www.pixelstalk.net/wp-content/uploads/2016/06/Car-desktop-backgrounds-car-wallpapers-car-hd-photo.jpg"} 
            alt="Blog post"
          />
        </div>
        <div className="texts">
          <h2 className="font-bold text-3xl">{title}</h2>
          <p className="text-slate-600 font-semibold mb-4">
            <a className="author mr-2">@{author?.fullname}</a>
            <time>{postDate}, {postTime}</time>
          </p>
          <p className="summary text-[1.1rem]">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
