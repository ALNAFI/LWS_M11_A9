export const bookingsPageData = {
  pageTitle: 'Your Orders',
  ordersCount: 2,
  periodLabel: 'placed in',
  periodOptions: ['past 3 months', '2024', '2023'],
}

export const bookingsOrdersData = [
  {
    id: 'GB-2025-001234',
    orderPlaced: 'January 20, 2025',
    total: '৳4,02,500',
    shipTo: 'John Doe',
    viewDetailsHref: '#',
    products: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=200',
        title: 'Apple MacBook Pro 16" M2 Max - 32GB RAM, 1TB SSD',
        href: '/details',
        seller: 'Official Apple Store',
        quantity: 1,
        status: { label: 'Delivered', icon: 'CheckCircle', badgeClassName: 'bg-green-100 text-green-700' },
        actions: [
          { label: 'Download Invoice', icon: 'Download', actionType: 'print' },
          { label: 'Write a Review', icon: null },
          { label: 'Buy it again', icon: null },
        ],
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
        title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        href: '/details',
        seller: 'Sony Official',
        quantity: 1,
        status: { label: 'Delivered', icon: 'CheckCircle', badgeClassName: 'bg-green-100 text-green-700' },
        actions: [
          { label: 'Download Invoice', icon: 'Download', actionType: 'print' },
          { label: 'Write a Review', icon: null },
          { label: 'Buy it again', icon: null },
        ],
      },
    ],
  },
  {
    id: 'GB-2025-001233',
    orderPlaced: 'January 15, 2025',
    total: '৳18,500',
    shipTo: 'John Doe',
    viewDetailsHref: '#',
    products: [
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=200',
        title: 'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard',
        href: '/details',
        seller: 'Razer Store',
        quantity: 1,
        status: { label: 'Shipped', icon: 'Truck', badgeClassName: 'bg-blue-100 text-blue-700' },
        actions: [
          { label: 'Download Invoice', icon: 'Download', actionType: 'print' },
          { label: 'Cancel Order', icon: 'XCircle', variant: 'danger' },
        ],
      },
    ],
  },
]
