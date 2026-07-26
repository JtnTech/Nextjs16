// 'use client';
// import { useState, useEffect } from 'react';
// import Spinner from '@/components/Spinner';
// import Message from '@/components/Message';

// const Messages = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await fetch('/api/messages');

//         if (res.status === 200) {
//           const data = await res.json();
//           setMessages(data);
//         }
//       } catch (error) {
//         console.log('Error fetching messages: ', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getMessages();
//   }, []);

//   return loading ? (
//     <Spinner loading={loading} />
//   ) : (
//     <section className='bg-blue-50'>
//       <div className='container m-auto py-24 max-w-6xl'>
//         <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
//           <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

//           <div className='space-y-4'>
//             {messages.length === 0 ? (
//               <p>You have no messages</p>
//             ) : (
//               messages.map((message) => (
//                 <Message key={message._id} message={message} />
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Messages;

'use client';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import Message from '@/components/Message';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch('/api/messages');

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.log('Error fetching messages: ', error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className='bg-slate-50  min-h-screen mix-blend-normal'>
      <div className='container m-auto py-16 px-4 max-w-5xl'>
        <div className='bg-white p-6 md:p-10 mb-6 shadow-sm rounded-2xl border border-gray-100 m-2 md:m-0'>
          
          {/* Header Section */}
          <div className='flex  items-center justify-between mb-8 pb-4 border-b border-gray-100'>
            <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>
              Your Messages
            </h1>
            {messages.length > 0 && (
              <span className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold'>
                {messages.length} total
              </span>
            )}
          </div>

          {/* Messages List / Empty State */}
          <div className='space-y-6'>
            {messages.length === 0 ? (
              <div className='text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200 px-4'>
                <p className='text-lg font-medium text-gray-600'>You have no messages</p>
                <p className='text-sm text-gray-400 mt-1 max-w-xs mx-auto'>
                  Inquiries from prospective buyers or tenants regarding your properties will appear here.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <Message key={message._id} message={message} />
              ))
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Messages;