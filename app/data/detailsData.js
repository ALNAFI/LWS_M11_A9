export const descriptionTabData = {
    title: 'Product Description',
    paragraphs: [
      `The Apple MacBook Pro 16" with M2 Max chip delivers
      groundbreaking performance and amazing battery life.
      Whether you're compiling code, editing 8K video, or
      working with massive 3D models, the M2 Max chip
      handles it all with ease.`,
      `The stunning 16-inch Liquid Retina XDR display
      features Extreme Dynamic Range, over 1000 nits of
      brightness for HDR content, and pro reference modes.
      The advanced thermal system sustains pro-level
      performance, and the six-speaker sound system with
      force-cancelling woofers creates an immersive audio
      experience.`,
    ],
    featuresTitle: 'Key Features:',
    features: [
      'Apple M2 Max chip with 12-core CPU and 38-core GPU',
      '32GB unified memory for seamless multitasking',
      '1TB SSD storage',
      '16-inch Liquid Retina XDR display (3456 x 2234)',
      '1080p FaceTime HD camera',
      'Three Thunderbolt 4 ports, HDMI port, SDXC card slot',
      'MagSafe 3 charging port',
      'Backlit Magic Keyboard with Touch ID',
    ],
  }
  
export const reviewsTabData = {
    title: 'Customer Reviews',
    summary: {
      rating: '4.8 out of 5',
      total: '1,245 global ratings',
    },
    reviews: [
      {
        initials: 'JD',
        name: 'John Doe',
        rating: 5,
        title: "Best laptop I've ever owned",
        date: 'Reviewed in Bangladesh on January 15, 2025',
        content:
          'The M2 Max chip is incredibly fast. I use this for video editing and 3D rendering, and it handles everything smoothly. Battery life is amazing too!',
        hidden: false,
      },
      {
        initials: 'SA',
        name: 'Sarah Ahmed',
        rating: 4,
        title: 'Great for development work',
        date: 'Reviewed in Bangladesh on January 10, 2025',
        content:
          'Perfect for coding and running multiple VMs. The display is stunning and the keyboard is comfortable for long coding sessions.',
        hidden: false,
      },
      {
        initials: 'MK',
        name: 'Mehedi Khan',
        rating: 5,
        title: 'Worth every taka!',
        date: 'Reviewed in Bangladesh on January 5, 2025',
        content:
          'Expensive but absolutely worth it. The build quality is premium and performance is unmatched.',
        hidden: true,
      },
      {
        initials: 'RH',
        name: 'Rahim Hossain',
        rating: 4,
        title: 'Excellent for creative work',
        date: 'Reviewed in Bangladesh on December 28, 2024',
        content:
          'As a graphic designer, this laptop handles Photoshop and Illustrator like a breeze. Highly recommended!',
        hidden: true,
      },
    ],
  }
  
export const shopInfoTabData = {
    title: 'Shop Information',
    shop: {
      name: 'Official Apple Store',
      description:
        'Authorized Apple reseller providing genuine products with official warranty.',
      stats: [
        { label: 'Rating', value: '4.9/5 (2,450 reviews)' },
        { label: 'Products', value: '156 items' },
        { label: 'Joined', value: 'January 2020' },
        { label: 'Response Time', value: 'Within 2 hours' },
      ],
    },
    policies: [
      '14-day return policy',
      '1-year official warranty',
      'Free shipping on orders over ৳50,000',
      'Secure payment options',
    ],
    shopLink: {
      href: '/shops',
      label: 'Visit Shop Page →',
    },
  }
  
export const tabsSectionData = {
    tabs: [
      {
        id: 'description',
        label: 'Description',
        active: true,
      },
      {
        id: 'reviews',
        label: 'Reviews',
        active: false,
      },
      {
        id: 'shop',
        label: 'Shop Info',
        active: false,
      },
    ],
  }
  
export const buyBoxData = {
    price: '৳3,45,000',
    delivery: 'Tomorrow',
    stockStatus: 'In Stock',
    quantityOptions: [1, 2, 3, 4, 5],
    sellerInfo: {
      secureText: 'Secure transaction',
      shippedBy: 'Ships from Gadget Hub',
      soldBy: 'Sold by Official Apple Store',
    },
  }
  
export const productInfoData = {
    title:
      'Apple MacBook Pro 16" M2 Max - 32GB RAM, 1TB SSD, Space Gray',
    store: {
      name: 'Apple Store',
      href: '/shops',
    },
    rating: {
      value: 5,
      count: '1,245 ratings',
    },
    price: '৳3,45,000',
    about: [
      'Apple M2 Max chip for exceptional performance',
      '16-inch Liquid Retina XDR display',
      '32GB unified memory, 1TB SSD storage',
      '1080p FaceTime HD camera',
      'Six-speaker sound system with force-cancelling woofers',
      'Up to 21 hours battery life',
    ],
    meta: {
      category: 'Laptops & Computers',
      brand: 'Apple',
      stock: '24 units available',
    },
  }
  
export const imageGalleryData = {
    thumbnails: [
      {
        src: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=100',
        active: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100',
        active: false,
      },
      {
        src: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=100',
        active: false,
      },
    ],
    mainImage:
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600',
  }
  
export const relatedProductsData = {
    title: 'Related Products',
    items: [
      {
        name: 'Apple MacBook Air M2',
        price: '৳1,35,000',
        image:
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200',
        href: '/details',
      },
      {
        name: 'Dell XPS 15 Laptop',
        price: '৳1,85,000',
        image:
          'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=200',
        href: '/details',
      },
      {
        name: 'Magic Keyboard',
        price: '৳12,500',
        image:
          'https://images.unsplash.com/photo-1527690710675-4ae7d334803b?w=200',
        href: '/details',
      },
      {
        name: 'Magic Mouse',
        price: '৳8,500',
        image:
          'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200',
        href: '/details',
      },
      {
        name: 'AirPods Pro',
        price: '৳28,500',
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
        href: '/details',
      },
      {
        name: 'Apple Watch Series 9',
        price: '৳45,000',
        image:
          'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200',
        href: '/details',
      },
    ],
  }
  