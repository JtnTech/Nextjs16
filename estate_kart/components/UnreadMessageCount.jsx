// 'use client';
// import { useState, useEffect } from 'react';
// import { useGlobalContext } from '@/context/GlobalContext';

// const UnreadMessageCount = ({ session }) => {
//   const { unreadCount, setUnreadCount } = useGlobalContext();

//   useEffect(() => {
//     if (!session) return;

//     const fetchUnreadMessages = async () => {
//       try {
//         const res = await fetch('/api/messages/unread-count');

//         if (res.status === 200) {
//           const data = await res.json();
//           setUnreadCount(data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchUnreadMessages();
//   }, [session]);

//   return (
//     unreadCount > 0 && (
//       <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
//         {unreadCount}
//       </span>
//     )
//   );
// };
// export default UnreadMessageCount;


'use client';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

const UnreadMessageCount = ({ session }) => {
  // 💡 Safe fallback: Prevents fatal crash if context is temporarily undefined
  const context = useGlobalContext() || {};
  const unreadCount = context.unreadCount ?? 0;
  const setUnreadCount = context.setUnreadCount;

  useEffect(() => {
    // If there's no session or setUnreadCount isn't available yet, skip execution
    if (!session || !setUnreadCount) return;

    const fetchUnreadMessages = async () => {
      try {
        const res = await fetch('/api/messages/unread-count');

        if (res.status === 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnreadMessages();
  }, [session, setUnreadCount]); // Added setUnreadCount to dependency array safely

  return (
    unreadCount > 0 && (
      <span className='absolute top-0 right-0 flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-extrabold text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full ring-2 ring-white shadow-sm select-none tabular-nums pointer-events-none'>
        {unreadCount}
      </span>
    )
  );
};

export default UnreadMessageCount;