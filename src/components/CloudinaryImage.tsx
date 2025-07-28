'use client';

import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  crop?: 'fill' | 'scale' | 'fit' | 'thumb';
  placeholder?: 'empty';
  blurDataURL?: string;
}

export default function CloudinaryImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  quality = 80,
  crop = 'fill',
  placeholder = 'empty',
  blurDataURL
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Handle loading state
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle error state
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">فشل في تحميل الصورة</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      
      {/* Cloudinary Image */}
      <CldImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        crop={crop}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

// Optimized image component for product cards
export function ProductImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      width={300}
      height={300}
      className={`object-cover rounded-lg ${className}`}
      crop="fill"
      quality={85}
      placeholder="empty"
    />
  );
}

// Optimized image component for hero banners
export function HeroImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      width={1200}
      height={600}
      className={`object-cover w-full ${className}`}
      crop="fill"
      quality={90}
      priority={true}
      placeholder="empty"
    />
  );
}

// Optimized image component for thumbnails
export function ThumbnailImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      width={100}
      height={100}
      className={`object-cover rounded ${className}`}
      crop="thumb"
      quality={70}
      placeholder="empty"
    />
  );
} 