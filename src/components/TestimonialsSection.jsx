
const TestimonialsSection = () => {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {['Trusted by 1M+ users', 'Processed $1B+ transactions securely.'].map((stat, index) => (
            <div key={index} className="bg-white text-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <p className="text-lg font-semibold">{stat}</p>
            </div>
          ))}
          <div className="bg-white text-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <p className="text-lg font-semibold">"This app changed my life!" - Jane Doe</p>
          </div>
        </div>
      </div>
    );
  };

  export default TestimonialsSection 