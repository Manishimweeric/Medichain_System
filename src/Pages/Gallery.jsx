import React, { useState } from 'react';
import { X } from 'lucide-react';

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  
 


  const filters = [
    { id: 'all', label: 'All' },
    { id: 'nature', label: 'Nature' },
    { id: 'city', label: 'City' },
    { id: 'people', label: 'People' },
    { id: 'architecture', label: 'Architecture' }
  ];

  

  const images = [
    { 
      id: 1, 
      category: 'nature', 
      src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b', 
      title: 'Mountain Lake' 
    },
    { 
      id: 2, 
      category: 'city', 
      src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df', 
      title: 'City Lights' 
    },
    { 
      id: 3, 
      category: 'people', 
      src: 'https://images.unsplash.com/photo-1517732306149-e8f829eb588a', 
      title: 'Street Life' 
    },
    { 
      id: 4, 
      category: 'architecture', 
      src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2', 
      title: 'Modern Building' 
    },
    { 
      id: 5, 
      category: 'nature', 
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', 
      title: 'Forest Path' 
    },
    { 
      id: 6, 
      category: 'city', 
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000', 
      title: 'Downtown' 
    },
    { 
      id: 7, 
      category: 'people', 
      src: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672', 
      title: 'Festival' 
    },
    { 
      id: 8, 
      category: 'architecture', 
      src: 'https://images.unsplash.com/photo-1448630360428-65456885c650', 
      title: 'Historic Church' 
    },
    { 
      id: 9, 
      category: 'nature', 
      src: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9', 
      title: 'Waterfall' 
    }
  ];

    const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter);

    // Modal handlers
    const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
    };


    return (
        <div className="min-h-screen mt-28 md:mt-32 bg-gray-100">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-200 to-orange-600 py-20">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">Our Gallery</h1>
              <p className="text-xl text-center max-w-2xl mx-auto">
                Explore our collection of beautiful moments captured through the lens
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
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-purple-100'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
    
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="text-white text-xl font-semibold mb-2">{image.title}</h3>
                      <span className="inline-block px-4 py-1 bg-white bg-opacity-25 rounded-full text-white text-sm capitalize mb-3">
                        {image.category}
                      </span>
                      <button
                        onClick={() => openModal(image)}
                        className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-full text-sm hover:bg-gray-100 transition-colors"
                      >
                        See More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
    
            {/* Modal */}
            {selectedImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
                <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                  <div className="p-6">
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      className="w-full h-[400px] object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm mb-4">
                      {selectedImage.category}
                    </span>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
    
            {/* Stats Section */}
            <div className="bg-white py-16 mt-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <h4 className="text-4xl font-bold text-purple-600 mb-2">1.2K+</h4>
                    <p className="text-gray-600">Total Photos</p>
                  </div>
                  <div>
                    <h4 className="text-4xl font-bold text-purple-600 mb-2">4+</h4>
                    <p className="text-gray-600">Categories</p>
                  </div>
                  <div>
                    <h4 className="text-4xl font-bold text-purple-600 mb-2">50+</h4>
                    <p className="text-gray-600">Photographers</p>
                  </div>
                  <div>
                    <h4 className="text-4xl font-bold text-purple-600 mb-2">10K+</h4>
                    <p className="text-gray-600">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default GalleryPage;