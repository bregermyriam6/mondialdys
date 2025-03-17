import React from 'react';

export function AppleIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <img 
        src="https://cdn.discordapp.com/attachments/1325194954909417493/1336131047204720710/apple-pay.png"
        alt="Apple Pay"
        className={className}
        style={{ 
          maxHeight: '40px',
          width: 'auto',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}

export function GooglePayIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <img 
        src="https://cdn.discordapp.com/attachments/1325194954909417493/1336131047204720710/google-pay.png"
        alt="Google Pay"
        className={className}
        style={{ 
          maxHeight: '40px',
          width: 'auto',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}