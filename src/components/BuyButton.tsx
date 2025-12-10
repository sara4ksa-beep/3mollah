'use client';

import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface BuyButtonProps {
  productId: string;
  externalLink: string;
}

export default function BuyButton({ productId, externalLink }: BuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        window.open(data.externalLink, '_blank');
      } else {
        // Fallback to direct link if API fails
        window.open(externalLink, '_blank');
      }
    } catch (error) {
      console.error('Error recording click:', error);
      // Fallback to direct link if API fails
      window.open(externalLink, '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 sm:py-5 px-6 rounded-xl font-bold text-base sm:text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>جاري التوجيه...</span>
        </>
      ) : (
        <>
          <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
          <span>شراء المنتج الآن</span>
          <ArrowLeft size={18} className="group-hover:translate-x-1 transition-transform" />
        </>
      )}
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500"></div>
    </button>
  );
} 