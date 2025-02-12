import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const DonationModal = ({ isOpen, onClose }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ donationAmount, donationType, ...formData });
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-lg shadow-xl">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Make a Donation</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donation Type Selection */}
              <div className="space-y-4">
                <label className="font-medium">Select Donation Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`p-4 rounded-lg border ${
                      donationType === 'one-time'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setDonationType('one-time')}
                  >
                    One-time Donation
                  </button>
                  <button
                    type="button"
                    className={`p-4 rounded-lg border ${
                      donationType === 'monthly'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setDonationType('monthly')}
                  >
                    Monthly Donation
                  </button>
                </div>
              </div>

              {/* Donation Amount Selection */}
              <div className="space-y-4">
                <label className="font-medium">Select Amount</label>
                <div className="grid grid-cols-3 gap-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`p-4 rounded-lg border ${
                        donationAmount === amount.toString()
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200'
                      }`}
                      onClick={() => setDonationAmount(amount.toString())}
                    >
                      ${amount}
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Other amount"
                    className="p-4 rounded-lg border border-gray-200"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-medium"
              >
                Complete Donation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;