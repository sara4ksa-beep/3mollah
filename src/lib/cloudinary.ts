// Server-side only Cloudinary configuration
let cloudinary: any = null;

if (typeof window === 'undefined') {
  // Only import cloudinary on server-side
  const { v2 } = require('cloudinary');
  cloudinary = v2;
  
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dniyiqmgn',
    api_key: process.env.CLOUDINARY_API_KEY || '882849791158336',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'jYNZLnm2G-_HmmtlOSe2LTHip4c',
  });
}

export default cloudinary;

// Helper function to generate optimized image URLs (works on both client and server)
export const getOptimizedImageUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    crop?: 'fill' | 'scale' | 'fit' | 'thumb';
  } = {}
) => {
  const {
    width,
    height,
    quality = 80,
    format = 'auto',
    crop = 'fill'
  } = options;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dniyiqmgn';
  const transformations = [];
  
  if (width || height) {
    transformations.push(`${crop}_${width || 'auto'}_${height || 'auto'}`);
  }
  
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformationString = transformations.join('/');
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`;
};



// Helper function to delete images (server-side only)
export const deleteImage = async (publicId: string): Promise<void> => {
  if (typeof window === 'undefined' && cloudinary) {
    await cloudinary.uploader.destroy(publicId);
  }
}; 