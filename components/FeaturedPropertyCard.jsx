import Link from 'next/link';
import Image from 'next/image';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';

const FeaturedPropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className='group bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col md:flex-row overflow-hidden w-full min-h-[280px]'>
      
      {/* ── Image Wrapper ── */}
      <div className='relative w-full md:w-[40%] aspect-[16/10] md:aspect-auto min-h-[200px] overflow-hidden flex-shrink-0'>
        <Image
          src={property.images[0]}
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl'
        />
        
        {/* Floating Price Badge */}
        <h3 className='absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl text-blue-600 font-extrabold text-sm shadow-md border border-blue-50/50 text-right md:text-center lg:text-right font-sans tracking-tight z-10'>
          ${getRateDisplay()}
        </h3>
      </div>

      {/* ── Content Container ── */}
      <div className='p-5 sm:p-6 flex flex-col flex-1 justify-between min-w-0'>
        <div>
          {/* Property Type Badge Line */}
          <div className='text-xs font-bold uppercase tracking-wider text-blue-500 mb-1.5'>{property.type}</div>
          
          {/* Title */}
          <h3 className='text-lg sm:text-xl font-bold text-slate-800 tracking-tight leading-snug line-clamp-1 mb-4 group-hover:text-blue-600 transition-colors duration-200'>
            {property.name}
          </h3>

          {/* Core Layout Specs Row */}
          <div className='flex flex-wrap gap-x-5 gap-y-2 items-center text-slate-500 text-sm mb-4 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100/60'>
            <p className='flex items-center font-medium text-slate-700'>
              <FaBed className='inline-block mr-2 text-blue-400 text-base' /> 
              {property.beds}{' '}
              <span className='md:hidden lg:inline font-normal text-slate-400 ml-1'>Beds</span>
            </p>
            <p className='flex items-center font-medium text-slate-700'>
              <FaBath className='inline-block mr-2 text-cyan-400 text-base' /> 
              {property.baths}{' '}
              <span className='md:hidden lg:inline font-normal text-slate-400 ml-1'>Baths</span>
            </p>
            <p className='flex items-center font-medium text-slate-700'>
              <FaRulerCombined className='inline-block mr-2 text-purple-400 text-sm' />
              {property.square_feet}{' '}
              <span className='md:hidden lg:inline font-normal text-slate-400 ml-1'>sqft</span>
            </p>
          </div>

          {/* Rates Options Available List */}
          <div className='flex flex-wrap items-center gap-2 text-emerald-800 text-xs font-semibold mb-4'>
            {property.rates.nightly && (
              <p className='bg-emerald-50 border border-emerald-100/80 px-2.5 py-1 rounded-lg flex items-center'>
                <FaMoneyBill className='inline mr-1.5 text-emerald-500' /> Nightly
              </p>
            )}

            {property.rates.weekly && (
              <p className='bg-emerald-50 border border-emerald-100/80 px-2.5 py-1 rounded-lg flex items-center'>
                <FaMoneyBill className='inline mr-1.5 text-emerald-500' /> Weekly
              </p>
            )}

            {property.rates.monthly && (
              <p className='bg-emerald-50 border border-emerald-100/80 px-2.5 py-1 rounded-lg flex items-center'>
                <FaMoneyBill className='inline mr-1.5 text-emerald-500' /> Monthly
              </p>
            )}
          </div>
        </div>

        {/* ── Footer Segment ── */}
        <div>
          <div className='border-t border-slate-100 mb-4' />

          <div className='flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3'>
            <div className='flex items-center gap-2 min-w-0'>
              <FaMapMarker className='text-base text-amber-500 flex-shrink-0' />
              <span className='text-slate-600 font-medium text-sm truncate'>
                {' '}
                {property.location.city}, {property.location.state}
              </span>
            </div>
            
            <Link
              href={`/properties/${property._id}`}
              className='h-[38px] bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl font-semibold flex items-center justify-center text-sm transition-all duration-150 active:scale-95 text-center shadow-sm shadow-blue-200 hover:shadow-md'
            >
              Details
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;