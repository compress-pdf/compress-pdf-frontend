import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const externalURL = searchParams.get('url');

  if (!externalURL) {
    console.error('Missing URL parameter');
    return NextResponse.json(
      { error: 'Missing URL parameter' },
      { status: 400 }
    );
  }

  try {
    console.log('Fetching external URL:', externalURL);
    const response = await fetch(externalURL, {
      method: req.method,
      headers: req.headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch error:', errorText);
      return NextResponse.json(
        { error: `Failed to fetch: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.blob(); // Forward the response body

    return new Response(data, {
      headers: {
        'Content-Type':
          response.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Length': response.headers.get('Content-Length') || '',
      },
    });
  } catch (error) {
    console.error('Fetch exception:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
