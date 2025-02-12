import React, { useState } from 'react';
import DonationModal from '../Pages/Donate/AddDonate';

const DonationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen mt-32 bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-200 to-orange-600  py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-sm uppercase font-medium mb-4">Donate</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Give the Gift of Hope, Your Support Makes a Difference.
            </h1>
            <p className="text-gray-700 mb-8">
              Every donation you make helps us empower individuals and communities
              to achieve financial independence and a brighter future.
            </p>
            <button 
              onClick={openModal}
              className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-md font-medium"
            >
              Donate now
            </button>
          </div>
          <div className="relative">
            <img
              src="/images/donate2.jpg"
              alt="Donation box"
              className="rounded-lg h-[50vh] shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Ways to Make a Difference Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Ways You Can Make a Difference</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold mb-2">Online Donation</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                eros elementum tristique.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold mb-2">Bank Transfer</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                eros elementum tristique.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold mb-2">Monthly Giving</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                eros elementum tristique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Donations Are Used Section */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">How Your Donations Are Used</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <h3 className="font-bold mb-2">Savings Groups Formation:</h3>
                <p className="text-gray-600">
                  Helping communities establish and grow collaborative savings groups.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Workshops & Seminars:</h3>
                <p className="text-gray-600">
                  Providing access to knowledge and tools for entrepreneurship and financial security
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="font-bold mb-2">Emergency Support:</h3>
                <p className="text-gray-600">
                  Assisting families in times of crisis to regain stability.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Financial Literacy Training:</h3>
                <p className="text-gray-600">
                  Equipping individuals with essential money management skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DonationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default DonationPage;