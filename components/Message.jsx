// 'use client';
// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { useGlobalContext } from '@/context/GlobalContext';

// const Message = ({ message }) => {
//   const [isRead, setIsRead] = useState(message.read);
//   const [isDeleted, setIsDeleted] = useState(false);

//   const { setUnreadCount } = useGlobalContext();

//   const handleReadClick = async () => {
//     try {
//       const res = await fetch(`/api/messages/${message._id}`, {
//         method: 'PUT',
//       });

//       if (res.status === 200) {
//         const { read } = await res.json();
//         setIsRead(read);
//         setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
//         if (read) {
//           toast.success('Marked as Read');
//         } else {
//           toast.success('Marked as New');
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong');
//     }
//   };

//   const handleDeleteClick = async () => {
//     try {
//       const res = await fetch(`/api/messages/${message._id}`, {
//         method: 'DELETE',
//       });

//       if (res.status === 200) {
//         setIsDeleted(true);
//         setUnreadCount((prevCount) => prevCount - 1);
//         toast.success('Message Deleted');
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('Message was not deleted');
//     }
//   };

//   if (isDeleted) {
//     return null;
//   }

//   return (
//     <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
//       {!isRead && (
//         <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
//           New
//         </div>
//       )}
//       <h2 className='text-xl mb-4'>
//         <span className='font-bold'>Property Inquiry:</span>{' '}
//         {message.property.name}
//       </h2>
//       <p className='text-gray-700'>{message.body}</p>

//       <ul className='mt-4'>
//         <li>
//           <strong>Name:</strong> {message.sender.username}
//         </li>

//         <li>
//           <strong>Reply Email:</strong>{' '}
//           <a href={`mailto:${message.email}`} className='text-blue-500'>
//             {message.email}
//           </a>
//         </li>
//         <li>
//           <strong>Reply Phone:</strong>{' '}
//           <a href={`tel:${message.phone}`} className='text-blue-500'>
//             {message.phone}
//           </a>
//         </li>
//         <li>
//           <strong>Received:</strong>{' '}
//           {new Date(message.createdAt).toLocaleString()}
//         </li>
//       </ul>
//       <button
//         onClick={handleReadClick}
//         className={`mt-4 mr-3 ${
//           isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
//         } py-1 px-3 rounded-md`}
//       >
//         {isRead ? 'Mark As New' : 'Mark As Read'}
//       </button>
//       <button
//         onClick={handleDeleteClick}
//         className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
//       >
//         Delete
//       </button>
//     </div>
//   );
// };
// export default Message;

'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/GlobalContext';

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        if (read) {
          toast.success('Marked as Read');
        } else {
          toast.success('Marked as New');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toast.success('Message Deleted');
      }
    } catch (error) {
      console.log(error);
      toast.error('Message was not deleted');
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className='relative  bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col gap-5'>
      {/* Header Area */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2'>
        <h2 className='text-xl font-semibold text-gray-800'>
          <span className='text-blue-600 font-bold mr-2'>Inquiry:</span>
          {message.property.name}
        </h2>
        {!isRead && (
          <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 whitespace-nowrap self-start'>
            New Message
          </span>
        )}
      </div>

      {/* Message Body Box */}
      <div className='bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 text-sm md:text-base leading-relaxed'>
        "{message.body}"
      </div>

      {/* Metadata Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-600'>
        <div>
          <strong className='text-gray-800 font-semibold'>Name:</strong>{' '}
          {message.sender.username}
        </div>

        <div>
          <strong className='text-gray-800 font-semibold'>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString()}
        </div>

        <div>
          <strong className='text-gray-800 font-semibold'>Email:</strong>{' '}
          <a
            href={`mailto:${message.email}`}
            className='text-blue-600 hover:text-blue-800 hover:underline transition-colors'
          >
            {message.email}
          </a>
        </div>

        <div>
          <strong className='text-gray-800 font-semibold'>Phone:</strong>{' '}
          <a
            href={`tel:${message.phone}`}
            className='text-blue-600 hover:text-blue-800 hover:underline transition-colors'
          >
            {message.phone}
          </a>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className='flex items-center gap-3 mt-2 pt-5 border-t border-gray-100'>
        <button
          onClick={handleReadClick}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 flex-1 sm:flex-none text-center ${
            isRead
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
          }`}
        >
          {isRead ? 'Mark As New' : 'Mark As Read'}
        </button>
        <button
          onClick={handleDeleteClick}
          className='px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200 flex-1 sm:flex-none text-center shadow-sm'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Message;