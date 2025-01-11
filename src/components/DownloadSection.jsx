
import { FaGooglePlay, FaApple, FaWindows } from 'react-icons/fa';
const DownloadSection = () => {
    return (
      <div className="bg-gray-100 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Download Our App</h2>
        <div className="flex justify-center space-x-6">
          {[
            { icon: <FaGooglePlay size={40} className="text-green-500" />, label: 'Google Play' },
            { icon: <FaApple size={40} className="text-gray-800" />, label: 'App Store' },
            { icon: <FaWindows size={40} className="text-blue-500" />, label: 'Microsoft Store' }
          ].map((store, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              {store.icon}
              <p className="mt-2 text-gray-600">{store.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };


  export default DownloadSection;