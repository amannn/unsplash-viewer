import ms from 'ms';
import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';

const middleware = createIntlMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en'
});

export default function handler(req: NextRequest) {
  const response = middleware(req);

  response.headers.set(
    'Cache-Control',
    [
      `s-maxage=` + ms('1d') / 1000,
      `stale-while-revalidate=` + ms('1y') / 1000
    ].join(', ')
  );

  return response;
}

export const config = {
  // Skip all non-content paths
  matcher: ['/((?!_next|favicon.ico).*)']
};
