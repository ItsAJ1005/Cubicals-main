import React from "react";

const Post = ({ title, content, tags, author, image, createdAt }) => {
  const postDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) : "Unknown date";

  const postTime = createdAt ? new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Unknown time";

  return (
    <div>
      <div className="post max-w-[80%] flex gap-10 mb-12">
        <div className="image w-[16rem] max-w-[16rem] flex-shrink-0">
          <img
            src={image ? image : "/src/assets/blog_default.webp"}
            alt="Blog post"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="texts flex-1">
          <h2 className="font-bold text-3xl mb-2">{title}</h2>
          <p className="text-slate-600 font-semibold mb-4">
            <a className="author mr-2">@{author?.fullname}</a>
            <time>{postDate}, {postTime}</time>
            <span className="ml-20 text-purple-700">
              <span className="text-black">Tags: </span>#{tags}
            </span>
          </p>
          <p className="summary text-[1.1rem]  text-wrap break-words w-[58rem]">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
