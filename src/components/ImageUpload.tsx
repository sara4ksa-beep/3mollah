'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '@/lib/cloudinary';

interface ImageUploadProps {
  onUpload: (publicId: string) => void;
  onRemove?: () => void;
  currentImage?: string;
  className?: string;
  multiple?: boolean;
  maxFiles?: number;
}

export default function ImageUpload({
  onUpload,
  onRemove,
  currentImage,
  className = '',
  multiple = false,
  maxFiles = 5
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await handleFiles(files);
  }, []);

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const uploadPromises = files.slice(0, maxFiles).map(async (file) => {
        const publicId = await uploadImage(file);
        return publicId;
      });

      const uploadedIds = await Promise.all(uploadPromises);
      
      if (multiple) {
        setUploadedImages(prev => [...prev, ...uploadedIds]);
        uploadedIds.forEach(id => onUpload(id));
      } else {
        onUpload(uploadedIds[0]);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('حدث خطأ أثناء رفع الصور');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    if (multiple) {
      setUploadedImages(prev => prev.filter((_, i) => i !== index));
    } else if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
          disabled={isUploading}
        />
        
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          {isUploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          ) : (
            <Upload className="w-8 h-8 text-gray-400" />
          )}
          
          <div>
            <p className="text-sm font-medium text-gray-700">
              {isUploading ? 'جاري رفع الصور...' : 'اسحب الصور هنا أو اضغط للاختيار'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF حتى 10MB
            </p>
          </div>
        </label>
      </div>

      {/* Current Image Display */}
      {currentImage && !multiple && (
        <div className="relative inline-block">
          <img
            src={`https://res.cloudinary.com/dniyiqmgn/image/upload/w_200,h_200,c_fill/${currentImage}`}
            alt="Current"
            className="w-32 h-32 object-cover rounded-lg"
          />
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Multiple Images Display */}
      {multiple && uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {uploadedImages.map((imageId, index) => (
            <div key={index} className="relative">
              <img
                src={`https://res.cloudinary.com/dniyiqmgn/image/upload/w_200,h_200,c_fill/${imageId}`}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 