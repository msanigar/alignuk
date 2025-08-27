import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-20 h-20',
  };

  const imageSizes = {
    sm: 24,
    md: 32,
    lg: 80,
  };

  return (
    <Image
      src="/logo-large.svg"
      alt="AlignUK Logo"
      width={imageSizes[size]}
      height={imageSizes[size]}
      className={`${sizeClasses[size]} ${className}`}
    />
  );
}
