export const profilePageData = {
  header: {
    sellerBadge: 'seller central',
    navLinks: [
      { label: 'Manage', href: '/manageList' },
      { label: 'Orders', href: '/bookings' },
      { label: 'Shop Profile', href: '/profile', active: true },
    ],
    userLabel: 'Shop Owner',
  },
  pageIntro: {
    title: 'Shop Profile',
    subtitle: 'Manage your shop information and appearance on Gadgets BD',
    modeButtons: [
      { id: 'view', label: 'View Mode', icon: 'Eye' },
      { id: 'edit', label: 'Edit Mode', icon: 'Pencil' },
    ],
  },
  shop: {
    name: 'Tech Hub BD',
    location: 'Dhaka, Bangladesh',
    bannerImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600',
    imageGradient: 'from-blue-50 to-blue-100',
    rating: 5,
    ratingsCount: '3,240 ratings',
    description:
      'Leading retailer of laptops, computers, and accessories. Official partner of Apple, Dell, and HP with 10+ years of experience.',
    specializesIn: 'Laptops & PCs',
    verified: true,
  },
  infoFields: [
    { label: 'Shop Name', value: 'Tech Hub BD' },
    { label: 'Owner Name', value: 'Kamal Hossain' },
    { label: 'Email', value: 'techhub@gadgetsbd.com' },
    { label: 'Phone Number', value: '+880 1712-345678' },
    { label: 'Location', value: 'Dhaka, Bangladesh' },
    { label: 'Specialization', value: 'Laptops & PCs' },
    { label: 'Shop Description', value: 'Leading retailer of laptops, computers, and accessories. Official partner of Apple, Dell, and HP with 10+ years of experience.', colSpan: 2 },
    { label: 'Address', value: '123 Gulshan Avenue, Gulshan-1, Dhaka-1212, Bangladesh', colSpan: 2 },
  ],
  editSections: [
    {
      id: 'basic',
      title: 'Basic Information',
      fieldGroups: [
        {
          gridCols: 2,
          fields: [
            { name: 'shopName', label: 'Shop Name *', type: 'text', defaultValue: 'Tech Hub BD' },
            { name: 'ownerName', label: 'Owner Name *', type: 'text', defaultValue: 'Kamal Hossain' },
          ],
        },
        {
          gridCols: 2,
          fields: [
            { name: 'email', label: 'Email *', type: 'email', defaultValue: 'techhub@gadgetsbd.com' },
            { name: 'phone', label: 'Phone Number *', type: 'tel', defaultValue: '+880 1712-345678' },
          ],
        },
        {
          gridCols: 1,
          fields: [
            { name: 'description', label: 'Shop Description *', type: 'textarea', rows: 4, defaultValue: 'Leading retailer of laptops, computers, and accessories. Official partner of Apple, Dell, and HP with 10+ years of experience.' },
          ],
        },
      ],
    },
    {
      id: 'location',
      title: 'Location & Specialization',
      fieldGroups: [
        {
          gridCols: 2,
          fields: [
            { name: 'location', label: 'City/Location *', type: 'select', defaultValue: 'Dhaka', options: ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'] },
            { name: 'specialization', label: 'Specialization *', type: 'select', defaultValue: 'Laptops & PCs', options: ['Laptops & PCs', 'Smartphones', 'Gaming Gear', 'Audio & Headphones', 'Cameras & Lenses', 'Wearables', 'Accessories'] },
          ],
        },
        {
          gridCols: 1,
          fields: [
            { name: 'address', label: 'Full Address *', type: 'textarea', rows: 2, defaultValue: '123 Gulshan Avenue, Gulshan-1, Dhaka-1212, Bangladesh' },
          ],
        },
      ],
    },
    {
      id: 'banner',
      title: 'Shop Banner Image',
      type: 'banner',
      currentImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600',
      uploadHint: 'Click to upload or drag and drop',
      formatHint: 'PNG, JPG up to 5MB (Recommended: 1200 x 400 pixels)',
    },
    {
      id: 'additional',
      title: 'Additional Information',
      fieldGroups: [
        {
          gridCols: 2,
          fields: [
            { name: 'yearEstablished', label: 'Year Established', type: 'number', placeholder: 'e.g., 2014', defaultValue: '2014' },
            { name: 'employees', label: 'Number of Employees', type: 'number', placeholder: 'e.g., 25', defaultValue: '25' },
          ],
        },
        {
          gridCols: 1,
          fields: [
            { name: 'brandPartnerships', label: 'Official Brand Partnerships (Optional)', type: 'text', placeholder: 'e.g., Apple, Dell, HP, Lenovo', defaultValue: 'Apple, Dell, HP, Lenovo', hint: 'Separate multiple brands with commas' },
            { name: 'website', label: 'Website URL (Optional)', type: 'url', placeholder: 'https://www.yourshop.com', defaultValue: 'https://www.techhubbd.com' },
          ],
        },
      ],
    },
  ],
  formActions: [
    { type: 'button', label: 'Cancel', variant: 'secondary' },
    { type: 'submit', label: 'Save Changes', variant: 'primary' },
  ],
  footer: {
    copyrightText: 'Gadgets BD Seller Central. All rights reserved by LWS.',
  },
}
