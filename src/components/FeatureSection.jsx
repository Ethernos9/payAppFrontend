const FeaturesSection = () => {
    return (
      <div className="bg-gray-100 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          {['Secure Transactions', 'Instant Transfers', 'Global Reach', '24/7 Support'].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default FeaturesSection