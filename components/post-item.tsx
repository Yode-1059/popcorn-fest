import React, { useState } from 'react'
import Modal from './modal';


const PostItem: React.FC<any> = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isVideoFile = (url: string) => {
    try {
      const videoExtensions = ['mp4', 'webm', 'ogg', 'mov'];
      const urlObject = new URL(url);
      const extension = urlObject.pathname.split('.').pop()?.toLowerCase();
      return extension ? videoExtensions.includes(extension) : false;
    } catch (e) {
      console.error('Invalid URL', e);
      return false;
    }
  };

  return (
    <div>
      <img src={post.img} alt="" className="w-full h-full object-cover aspect-square" onClick={handleImageClick} />
      {isModalOpen && (
        <Modal
          imgSrc={post.img}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PostItem;
