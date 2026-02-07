export const orderPlacedData = {
  heading: 'Order placed, thank you!',
  confirmationMessage: 'Confirmation will be sent to your email.',
  shipping: {
    label: 'Shipping to John Doe',
    addressLines: ['123 Main St, Apartment 4B', 'Dhaka, 1212'],
  },
  orderNumber: {
    label: 'Order Number',
    number: '#GB-2025-001234',
    placedLabel: 'Placed on Jan 20, 2025',
  },
  actions: [
    { type: 'button', label: 'Download Invoice', icon: 'Download' },
    { type: 'link', label: 'View All Orders', href: '/bookings', primary: false },
    { type: 'link', label: 'Continue Shopping', href: '/', primary: true },
  ],
}

export const successOrderInfoData = {
  title: 'Order Details',
  items: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=200',
      title: 'Apple MacBook Pro 16" M2 Max - 32GB RAM, 1TB SSD',
      href: '/details',
      quantity: 1,
      price: '৳3,45,000',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
      title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
      href: '/details',
      quantity: 1,
      price: '৳38,500',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=200',
      title: 'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard',
      href: '/details',
      quantity: 1,
      price: '৳18,500',
    },
  ],
  summaryRows: [
    { label: 'Subtotal:', value: '৳4,02,000' },
    { label: 'Delivery Fee:', value: 'FREE', valueClassName: 'text-green-600 font-bold' },
    { label: 'Service Fee:', value: '৳500', borderBottom: true },
    { label: 'Total:', value: '৳4,02,500', total: true },
  ],
}
