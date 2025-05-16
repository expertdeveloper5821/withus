import OpengraphImage from 'components/opengraph-image';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '5-Star Rated Products';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630
};

export default async function Image() {
  return await OpengraphImage({
    title: '5-Star Rated Products'
  });
}
