import React from 'react';
import { Star, Quote, BadgeCheck, Camera } from 'lucide-react';
import Image from 'next/image';

interface Review {
  id: string;
  name: string;
  rating: number;
  title?: string;
  body: string;
  date?: string;
  product?: string;
  location?: string;
  avatar?: string;
  verified?: boolean;
  images?: string[];
}

export function ReviewCard({ review }: { review: Review }) {
  // Mock verified if undefined for the premium feel
  const isVerified = review.verified !== false; 

  return (
    <div className="bg-white rounded-xl p-6 sm:p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-500 ease-apple border border-stone-200/80 flex flex-col justify-between h-full group">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={15}
              className={s <= review.rating ? 'fill-amber-500 stroke-amber-500' : 'fill-stone-200 stroke-stone-200'}
            />
          ))}
        </div>
        <Quote size={22} className="text-stone-300 group-hover:text-amber-500 transition-colors duration-500" />
      </div>

      {/* Title & Body */}
      {review.title && (
        <h4 className="font-display font-bold text-stone-900 text-base md:text-lg mb-2 leading-tight">{review.title}</h4>
      )}
      <p className="text-stone-600 font-normal leading-relaxed text-sm md:text-base flex-1 mb-4 italic">"{review.body}"</p>

      {/* Instagram-style Image Gallery */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {review.images.map((img, i) => (
            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
              <Image src={img} alt="Customer photo" fill className="object-cover hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-stone-100 flex-shrink-0 shadow-sm">
            {review.avatar ? (
              <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-stone-900 text-amber-300 font-display font-bold text-sm">
                {review.name[0].toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wide">{review.name}</p>
              {isVerified && (
                <BadgeCheck size={14} className="text-emerald-500" aria-label="Verified Buyer" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-400 uppercase tracking-wider font-medium">
              {isVerified && <span>Verified Buyer</span>}
              {review.date && (
                <>
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  <span>{review.date}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tag */}
      {review.product && (
        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 hover:bg-amber-500/20 transition-colors w-fit">
          <Camera size={12} /> {review.product}
        </div>
      )}
    </div>
  );
}
