import { getCollectionProducts } from 'lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');
    const lan = searchParams.get('language') || 'en';

    if (!collection) {
      return NextResponse.json({ error: 'Collection handle is required' }, { status: 400 });
    }

    const products = await getCollectionProducts({ collection, lan });
    
    if (!products || products.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error in collection products API:', error);
    return NextResponse.json({ error: 'Failed to fetch collection products' }, { status: 500 });
  }
}
