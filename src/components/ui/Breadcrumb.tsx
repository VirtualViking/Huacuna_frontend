import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

type BreadcrumbProps = {
  items: Array<{
    label: string;
    href?: string;
  }>;
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <Link href="/" className="flex items-center gap-1 hover:text-[#1E3A5F] transition-colors">
        <HomeIcon className="h-4 w-4" />
        <span>Inicio</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRightIcon className="h-4 w-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#1E3A5F] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1E3A5F] font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}