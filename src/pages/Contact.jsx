import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800">
            Get in Touch With Us 🤝
          </h1>
          <p className="mt-3 text-gray-600 text-lg max-w-2xl mx-auto">
            Whether you want to volunteer, donate, or just learn more, we’d love to hear from you!
          </p>
        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-xl">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Type your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-3 px-4 rounded  transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Our Location</h4>
                <p className="text-gray-600">123 Food Drive, Kindness City</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 12H8m0 0l-4 4m4-4l-4-4" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Email Us</h4>
                <p className="text-gray-600">contact@foodsharing.org</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 5h2l3.6 7.59-1.35 2.44A1 1 0 008 17h9a1 1 0 001-1v-1a1 1 0 00-1-1h-7" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Call Us</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
