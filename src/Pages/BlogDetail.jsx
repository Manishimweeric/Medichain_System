import React from 'react';
import { useParams } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    title: "Practical Steps To Achieve Financial Security",
    date: "14 Jan 2025",
    author: "Admin",
    category: "Wood",
    image: "/images/event1.jpg",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. Sit amet luctus venenatis lectus magna fringilla urna. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a."
  },
  {
    id: 2,
    title: "Build An Emergency Fund",
    date: "14 Oct 2025",
    author: "Admin",
    category: "Handmade",
    image: "/images/event2.webp",
    content: "Vitae justo eget magna fermentum iaculis eu non diam phasellus. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Magna fermentum iaculis eu non diam."
  },
  {
    id: 3,
    title: "Join A Savings Group",
    date: "14 Oct 2025",
    author: "Admin",
    category: "Wood",
    image: "/images/event3.webp",
    content: "Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at."
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find(blog => blog.id === parseInt(id));

  if (!blog) {
    return <div className="text-center text-xl font-bold mt-20">Blog not found</div>;
  }

  return (
    <div className='mt-28 md:mt-32'>
      <div className="bg-gradient-to-r from-orange-200 to-orange-600 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">{blog.title}</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            {blog.excerpt || "Explore our insightful articles that inspire change, spark conversations, and empower growth."}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">        
        <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover rounded-lg mb-4" />
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span>By {blog.author}</span>
          <span>{blog.date}</span>
          <span>{blog.category}</span>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
