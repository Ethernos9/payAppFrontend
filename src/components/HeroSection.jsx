// import React from 'react';

// const HeroSection = () => {
//   return (
//     <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-screen flex items-center justify-center">
//       <div className="text-center max-w-4xl px-6">
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">
//           Simplify Payments, Empower Your Life
//         </h1>
//         <p className="text-lg md:text-xl mb-6">
//           Experience seamless and secure transactions at your fingertips. Join the revolution today.
//         </p>
//         <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-50 transition duration-300">
//           Get Started
//         </button>
//       </div>
//       <div className="hidden lg:block ml-10">
//         <img
//           src="../hero.png"
//           alt="Digital Transactions Illustration"
//           className="w-96"
//         />
//       </div>
//     </div>
//   );
// };

// export default HeroSection;



import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Simplify Payments, Empower Your Life
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Experience seamless and secure transactions at your fingertips. Join the revolution today.
        </p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-50 transition duration-300">
          Get Started
        </button>
      </div>
      <div className="hidden lg:block ml-10">
        <img
          src="../hero.png"
          alt="Digital Transactions Illustration"
          className="w-96 rounded-lg shadow-xl border-4 border-white hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export default HeroSection;