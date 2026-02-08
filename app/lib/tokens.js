import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'default-secret-change-in-production'
)

const ACCESS_TOKEN_MAX_AGE = 15 * 60 // 15 minutes
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 // 7 days

const ACCESS_COOKIE = 'accessToken'
const REFRESH_COOKIE = 'refreshToken'

export async function signAccessToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(`${ACCESS_TOKEN_MAX_AGE}s`)
    .setIssuedAt()
    .sign(JWT_SECRET)
}

export async function verifyAccessToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

export function getAccessTokenMaxAge() {
  return ACCESS_TOKEN_MAX_AGE
}

export function getRefreshTokenMaxAge() {
  return REFRESH_TOKEN_MAX_AGE
}

export function getCookieNames() {
  return { ACCESS_COOKIE, REFRESH_COOKIE }
}

export function setTokenCookies(accessToken, refreshToken) {
  const isProd = process.env.NODE_ENV === 'production'
  return [
    {
      name: ACCESS_COOKIE,
      value: accessToken,
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: ACCESS_TOKEN_MAX_AGE,
    },
    {
      name: REFRESH_COOKIE,
      value: refreshToken,
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: REFRESH_TOKEN_MAX_AGE,
    },
  ]
}

export function clearTokenCookies() {
  return [
    { name: ACCESS_COOKIE, value: '', path: '/', maxAge: 0 },
    { name: REFRESH_COOKIE, value: '', path: '/', maxAge: 0 },
  ]
}

export function getAccessTokenFromRequest(request) {
  const cookieHeader = request.headers.get('cookie') || ''
  const match = cookieHeader.match(new RegExp(`${ACCESS_COOKIE}=([^;]+)`))
  return match ? match[1].trim() : null
}

export function getRefreshTokenFromRequest(request) {
  const cookieHeader = request.headers.get('cookie') || ''
  const match = cookieHeader.match(new RegExp(`${REFRESH_COOKIE}=([^;]+)`))
  return match ? match[1].trim() : null
}
