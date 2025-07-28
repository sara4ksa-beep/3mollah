'use client';

interface BuyButtonProps {
  productId: string;
  externalLink: string;
}

export default function BuyButton({ productId, externalLink }: BuyButtonProps) {
  const handleClick = async () => {
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
    }
  };

  return (
    <button
      onClick={handleClick}
      className="block w-full bg-blue-600 text-white text-center py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
    >
      شراء المنتج
    </button>
  );
} 