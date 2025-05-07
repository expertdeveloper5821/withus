import clsx from 'clsx';
import LogoIcon from './icons/logo';
import Image from 'next/image';
import { allIconList } from 'config/security-config';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      // className={clsx(
      //   'flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black',
      //   {
      //     'h-[40px] w-[40px] rounded-xl': !size,
      //     'h-[30px] w-[30px] rounded-lg': size === 'sm'
      //   }
      // )}
    >
      <Image src={allIconList.Bibishop} alt="Logo"  width={70} height={70} />
      {/* <LogoIcon
        className={clsx({
          'h-[16px] w-[16px]': !size,
          'h-[10px] w-[10px]': size === 'sm'
        })}
      /> */}
    </div>
  );
}
