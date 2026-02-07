export const addressSummaryData = {
    step: '1',
    title: 'Shipping address',
    address: {
      name: 'John Doe',
      street: '123 Main St, Apartment 4B',
      city: 'Dhaka, 1212',
      country: 'Bangladesh',
      phone: '+880 1712-345678',
    },
    changeLink: {
      href: '#',
      label: 'Change',
    },
  }
  
export const paymentProductsListData = {
  sectionNumber: '2',
  sectionTitle: 'Review items',
  products: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=300',
      title: 'Apple MacBook Pro 16" M2 Max - 32GB RAM, 1TB SSD',
      seller: 'Official Apple Store',
      price: '৳3,45,000',
      quantityOptions: [1, 2, 3],
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
      title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
      seller: 'Sony Official',
      price: '৳38,500',
      quantityOptions: [1, 2, 3],
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300',
      title: 'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard',
      seller: 'Razer Store',
      price: '৳18,500',
      quantityOptions: [1, 2, 3],
    },
  ],
}

export const paymentOrderSummaryData = {
  formId: 'paymentForm',
  submitButton: { label: 'Place your order' },
  disclaimer: {
    text: "By placing your order, you agree to Gadgets BD's",
    links: [
      { label: 'privacy notice', href: '#' },
      { label: 'conditions of use', href: '#' },
    ],
    suffix: '.',
  },
  title: 'Order Summary',
  rows: [
    { label: 'Items (3):', value: '৳4,02,000' },
    { label: 'Delivery Fee:', value: 'FREE', valueClassName: 'text-green-600 font-bold' },
    { label: 'Service Fee:', value: '৳500', borderBottom: true },
    { label: 'Order Total:', value: '৳4,02,500', total: true },
  ],
  footerItems: [
    { icon: 'Truck', text: 'FREE Delivery on orders over ৳50,000', className: 'text-green-600 font-bold mb-2' },
    { icon: 'ShieldCheck', text: 'Secure checkout', className: 'text-gray-600' },
  ],
}

export const paymentMethodData = {
    step: '3',
    title: 'Choose a payment method',
    methods: [
      {
        id: 'card',
        label: 'Credit or Debit Card',
        logos: [
          {
            src: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
            alt: 'Visa',
          },
          {
            src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
            alt: 'Mastercard',
          },
        ],
      },
    ],
    months: [
      '01','02','03','04','05','06',
      '07','08','09','10','11','12',
    ],
    years: ['2025', '2026', '2027', '2028', '2029', '2030'],
  }
  
export const paymentProcessFooterData = {
  links: [
    { label: 'Conditions of Use', href: '#' },
    { label: 'Privacy Notice', href: '#' },
    { label: 'Help', href: '#' },
  ],
  copyrightText: 'Gadgets BD - Premium Tech Marketplace. All rights reserved by LWS.',
}
