import { getCollections } from 'lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {    const { searchParams } = new URL(request.url);
    const lan = searchParams.get('language') || 'en';
    
    // Pass the language parameter to getCollections
    const collections = await getCollections(lan);
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error in collections API route:', error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}
