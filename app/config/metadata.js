const SITE_NAME = 'Gadget Hub'
const DEFAULT_DESCRIPTION = 'Buy and Sell Premium Tech Products'

/**
 * Central metadata for all routes. Paths are matched in order (first match wins).
 * Use pathname without query string for matching (e.g. /details not /details?productId=...).
 */
const ROUTE_METADATA = [
  { path: '/auth/reset-password', title: 'Reset Password', description: 'Set a new password for your Gadget Hub account.' },
  { path: '/auth/forgetPassword', title: 'Password Assistance', description: DEFAULT_DESCRIPTION },
  { path: '/auth/register', title: 'Create Account', description: DEFAULT_DESCRIPTION },
  { path: '/auth/login', title: 'Sign In', description: DEFAULT_DESCRIPTION },
  { path: '/create/edit', title: 'Edit Product', description: 'Gadget Hub Seller Central' },
  { path: '/create', title: 'Add Product', description: 'Gadget Hub Seller Central' },
  { path: '/shop/orders', title: 'Orders', description: 'Gadget Hub Seller Central' },
  { path: '/manageList', title: 'Manage Inventory', description: 'Gadget Hub Seller Central' },
  { path: '/profile', title: 'Shop Profile', description: 'Gadget Hub Seller Central' },
  { path: '/paymentProcess', title: 'Checkout', description: DEFAULT_DESCRIPTION },
  { path: '/success', title: 'Order Placed', description: DEFAULT_DESCRIPTION },
  { path: '/review', title: 'Create Review', description: DEFAULT_DESCRIPTION },
  { path: '/bookings', title: 'My Orders', description: DEFAULT_DESCRIPTION },
  { path: '/cart', title: 'Shopping Cart', description: DEFAULT_DESCRIPTION },
  { path: '/details', title: 'Product Details', description: DEFAULT_DESCRIPTION },
  { path: '/products', title: 'Products', description: DEFAULT_DESCRIPTION },
  { path: '/shop', title: 'Shops', description: DEFAULT_DESCRIPTION },
  { path: '/', title: 'Premium Tech Marketplace', description: DEFAULT_DESCRIPTION },
]

/**
 * Get metadata for a pathname. Dynamic segments (e.g. /shop/123) match by prefix.
 */
export function getMetadataForPath(pathname) {
  const path = (pathname || '/').split('?')[0].replace(/\/$/, '') || '/'
  const match = ROUTE_METADATA.find((r) => path === r.path || (r.path !== '/' && path.startsWith(r.path + '/')))
  const title = match ? match.title : 'Premium Tech Marketplace'
  const description = match ? match.description : DEFAULT_DESCRIPTION
  const fullTitle = path === '/' ? `${SITE_NAME} - ${title}` : `${title} - ${SITE_NAME}`
  return {
    title: fullTitle,
    description,
  }
}

export { SITE_NAME, DEFAULT_DESCRIPTION }
