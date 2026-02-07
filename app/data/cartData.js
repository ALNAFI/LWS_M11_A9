export const orderSummaryData = {
  freeShipping: {
    text: 'Your order qualifies for FREE Shipping!',
    icon: 'CheckCircle',
  },
  subtotal: {
    itemCount: 3,
    amount: '৳4,02,000',
  },
  giftOption: {
    id: 'gift',
    label: 'This order contains a gift',
  },
  checkoutButton: {
    label: 'Proceed to Checkout',
    href: '/paymentProcess',
  },
  footerItems: [
    { icon: 'ShieldCheck', text: 'Secure transaction' },
    { icon: 'Truck', text: 'Ships from Gadgets BD' },
  ],
}
export const cartItemsData = {
    items: [
      {
        id: 1,
        title:
          'Apple MacBook Pro 16" M2 Max - 32GB RAM, 1TB SSD',
        image:
          'https://images.unsplash.com/photo-1517336712461-481140081023?w=300',
        price: '৳3,45,000',
        seller: 'Official Apple Store',
        href: '/details',
      },
      {
        id: 2,
        title:
          'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
        price: '৳38,500',
        seller: 'Sony Official',
        href: '/details',
      },
      {
        id: 3,
        title:
          'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard',
        image:
          'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300',
        price: '৳18,500',
        seller: 'Razer Store',
        href: '/details',
      },
    ],
    subtotal: {
      label: 'Subtotal (3 items):',
      amount: '৳4,02,000',
    },
  }
  