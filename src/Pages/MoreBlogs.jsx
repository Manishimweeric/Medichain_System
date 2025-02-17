import React from 'react';
import { useNavigate } from 'react-router-dom';
const MoreBlogs = () => {
  const navigate = useNavigate();
  const handleReadMore = (id) => {
    navigate(`/BlogDetail/${id}`);
  };
  const blogs = [
    {
      id: 1,
      title: "Practical Steps To Achieve Financial Security",
      date: "14 Jan 2025",
      author: "Admin",
      category: "Wood",
      image: "/images/event1.jpg",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc."
    },
    {
      id: 2,
      title: "Build An Emergency Fund",
      date: "14 Oct 2025",
      author: "Admin",
      category: "Handmade",
      image: "/images/event2.webp",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 3,
      title: "Join A Savings Group",
      date: "14 Oct 2025",
      author: "Admin",
      category: "Wood",
      image: "/images/event3.webp",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ];

  const categories = [
    { name: "Donation", count: 3 },
    { name: "Finance", count: 2 },
    { name: "Workshop", count: 4 },
    { name: "Trainings", count: 5 }
  ];

  const recentPosts = [
    { title: "Community Empowerment Day", category: "Donation", image: "/images/event1.jpg" },
    { title: "This Week's Top Stories About....", category: "Workshop", image: "/images/event1.jpg" },
    { title: "Why You Should Focus On Charity", category: "Finance", image: "/images/event1.jpg" }
  ];

  const tags = ["Food", "Medical", "Home", "Lifestyle", "Education", "Water"];

  return (
    <div className='mt-28 md:mt-32'>

      <div className="bg-gradient-to-r from-orange-200 to-orange-600 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">Trending Blogs</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Explore our insightful articles that inspire change, spark conversations, and empower growth.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {blogs.map((blog) => (
              <div key={blog.id} className="mb-12">
                <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {blog.date}
                  </span>
                  <span>{blog.category}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <button
                  className="text-purple-600 font-semibold"
                  onClick={() => handleReadMore(blog.id)}
                >
                  Read more
                </button>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex gap-2 mt-8">
              <button className="px-4 py-2 bg-yellow-600 text-white rounded">1</button>
              <button className="px-4 py-2 bg-gray-200 rounded">2</button>
              <button className="px-4 py-2 bg-gray-200 rounded">3</button>
              <button className="px-4 py-2 bg-gray-200 rounded">Next</button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="mb-8">
              <input type="search" placeholder="Search..." className="w-full px-4 py-2 border rounded-lg" />
            </div>

            {/* Categories */}
            <div className="bg-purple-100 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-4">Category</h3>
              {categories.map((category) => (
                <div key={category.name} className="flex justify-between items-center mb-2">
                  <span>{category.name}</span>
                  <span className="text-gray-600">({category.count})</span>
                </div>
              ))}
            </div>

            {/* Recent Posts */}
            <div className="bg-purple-100 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
              {recentPosts.map((post, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h4 className="font-semibold">{post.title}</h4>
                    <span className="text-sm text-gray-600">{post.category}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="bg-purple-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreBlogs;