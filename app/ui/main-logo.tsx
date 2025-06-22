import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function MainLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <AdjustmentsHorizontalIcon className="h-12 w-12 flex-shrink-0" />
      <p className="text-[44px] ml-4 flex-shrink-0">ILPV</p>
    </div>
  );
}