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

  return (
    <div>
      {post ? (
        <img src={post.img} alt="" className="w-full h-full object-cover aspect-square" onClick={handleImageClick} />
      ) : (
        // postがundefinedの場合のフォールバックUIを表示
        <div>Loading...</div>
      )}
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
