'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch('/api/bookmarks/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ propertyId: property._id }),
        });
        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to sign in to bookmark a property');
      return;
    }

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  /* ── Skeleton loader ── */
  if (loading) {
    return (
      <div className="skeleton h-11 w-full rounded-2xl" aria-label="Loading bookmark status" />
    );
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold text-sm transition-all duration-250 hover:shadow-[0_4px_14px_rgba(239,68,68,0.35)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
      aria-label="Remove bookmark"
    >
      <BookmarkCheck size={17} strokeWidth={2.5} />
      Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm transition-all duration-250 hover:shadow-glow-blue hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
      aria-label="Bookmark this property"
    >
      <Bookmark size={17} strokeWidth={2.5} />
      Bookmark Property
    </button>
  );
};

export default BookmarkButton;
