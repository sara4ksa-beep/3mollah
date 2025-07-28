import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dniyiqmgn',
  api_key: process.env.CLOUDINARY_API_KEY || '882849791158336',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'jYNZLnm2G-_HmmtlOSe2LTHip4c',
});

export default cloudinary;

// Helper function to generate optimized image URLs
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

  const transformations = [];
  
  if (width || height) {
    transformations.push(`${crop}_${width || 'auto'}_${height || 'auto'}`);
  }
  
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  return cloudinary.url(publicId, {
    transformation: transformations.join('/'),
    secure: true
  });
};

// Helper function to upload images
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dniyiqmgn'}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();
  return data.public_id;
};

// Helper function to delete images
export const deleteImage = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
}; 