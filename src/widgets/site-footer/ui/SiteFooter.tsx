import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-4 justify-between text-sm text-gray-500">
        <div>
          <p className="text-lg font-semibold text-gray-900">Pubble</p>
          <p>회의가 끝나면 회의록 걱정은 퍼블에게 맡기세요.</p>
        </div>
        <div className="flex gap-6">
          <Link href="mailto:contact@pubble.com" className="hover:text-primary">
            contact@pubble.com
          </Link>
          <Link href="https://www.notion.so" target="_blank" rel="noreferrer" className="hover:text-primary">
            노션 페이지
          </Link>
        </div>
      </div>
    </footer>
  );
}
