import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sanitizeInput } from '@/lib/security';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') ? sanitizeInput(searchParams.get('category')) : undefined;
    const brand = searchParams.get('brand') ? sanitizeInput(searchParams.get('brand')) : undefined;
    const search = searchParams.get('search') ? sanitizeInput(searchParams.get('search')) : undefined;
    
    const minPriceRaw = searchParams.get('minPrice');
    const minPrice = minPriceRaw && !isNaN(Number(minPriceRaw)) ? Number(minPriceRaw) : undefined;
    
    const maxPriceRaw = searchParams.get('maxPrice');
    const maxPrice = maxPriceRaw && !isNaN(Number(maxPriceRaw)) ? Number(maxPriceRaw) : undefined;
    
    const sort = searchParams.get('sort') ? sanitizeInput(searchParams.get('sort')) : undefined;

    const products = db.getProducts({ category, brand, search, minPrice, maxPrice, sort });

    return NextResponse.json({ success: true, products, total: products.length });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}
