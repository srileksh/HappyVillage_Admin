import { Link } from 'react-router-dom';
import { useState } from 'react';

const AnimatedCard = ({ icon:Icon, title, description, linkText, desc_className='', className = '', linkUrl = '#'}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative w-96 h-72 px-7 py-4 bg-white rounded-xl shadow-xl transition-transform 
                 duration-300 hover:-translate-y-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-24 h-24 mb-10 transition-transform duration-300 rounded-full bg-[#4977E51A]
                      ${isHovered ? 'scale-110' : 'scale-100'}`}>
                    <div className='flex items-center justify-center'>{Icon}</div>
      </div>
      <p className="text-xl text-black mb-[-5] font-bold">{title}</p>
      <p className={`text-[15px] text-gray-600 font-semibold mt-4  ${desc_className}`}>{description}
        <Link to={linkUrl} className="text-[#838B95] font-bold ">{linkText}</Link>
      </p>
      
      <div className={`absolute inset-0  rounded-xl transition-opacity 
                     duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
};

export default AnimatedCard;
