import React, { useState } from "react";
import { X } from "lucide-react";

const VideoGalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filters = [
    { id: "all", label: "All" },
    { id: "nature", label: "Nature" },
    { id: "city", label: "City" },
    { id: "people", label: "People" },
    { id: "architecture", label: "Architecture" },
  ];

  const videos = [
    {
      id: 1,
      category: "nature",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Mountain Stream",
    },
    {
      id: 2,
      category: "city",
      src: "https://www.w3schools.com/html/movie.mp4",
      title: "City Rush",
    },
    {
      id: 3,
      category: "people",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Street Dancers",
    },
    {
      id: 4,
      category: "architecture",
      src: "https://www.w3schools.com/html/movie.mp4",
      title: "Modern Skyscrapers",
    },
    {
      id: 5,
      category: "nature",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Forest Waterfall",
    },
  ];

  const filteredVideos =
    activeFilter === "all"
      ? videos
      : videos.filter((video) => video.category === activeFilter);

  // Modal handlers
  const openModal = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  return (
    <div className="min-h-screen mt-28 md:mt-32 bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-200 to-orange-600 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Our Video Gallery
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Explore our collection of amazing video moments
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-purple-100"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <video
                src={video.src}
                className="w-full h-64 object-cover"
                controls
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {video.title}
                  </h3>
                  <span className="inline-block px-4 py-1 bg-white bg-opacity-25 rounded-full text-white text-sm capitalize mb-3">
                    {video.category}
                  </span>
                  <button
                    onClick={() => openModal(video)}
                    className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-full text-sm hover:bg-gray-100 transition-colors"
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
            <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <div className="p-6">
                <video
                  src={selectedVideo.src}
                  controls
                  className="w-full h-[400px] object-cover rounded-lg mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm mb-4">
                  {selectedVideo.category}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-white py-16 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h4 className="text-4xl font-bold text-purple-600 mb-2">500+</h4>
                <p className="text-gray-600">Total Videos</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-purple-600 mb-2">4+</h4>
                <p className="text-gray-600">Categories</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-purple-600 mb-2">30+</h4>
                <p className="text-gray-600">Video Creators</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-purple-600 mb-2">8K+</h4>
                <p className="text-gray-600">Views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGalleryPage;
