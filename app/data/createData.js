export const createPageData = {
  header: {
    sellerBadge: 'seller central',
    navLinks: [
      { label: 'Catalog', href: '/manageList' },
      { label: 'Orders', href: '/bookings' },
    ],
    userLabel: 'Shop Owner',
  },
  pageIntro: {
    title: 'Add a Product',
    subtitle: 'Create a new listing for your gadget product.',
    backLink: { label: 'Back to Manage List', href: '/manageList' },
  },
  form: {
    action: '#',
    method: 'POST',
    steps: [
      {
        id: 'identity',
        title: 'Step 1: Product Identity',
        fieldGroups: [
          {
            gridCols: 2,
            fields: [
              { name: 'productName', type: 'text', label: 'Product Name', placeholder: 'e.g., Apple MacBook Pro M2 - 16GB RAM', required: true },
              { name: 'category', type: 'select', label: 'Category', options: ['Laptops & Computers', 'Smartphones & Tablets', 'Audio & Headphones', 'Gaming Accessories', 'Cameras & Photography', 'Wearables & Smartwatches'], required: true },
            ],
          },
          {
            gridCols: 2,
            fields: [
              { name: 'brand', type: 'select', label: 'Brand', options: ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Sony', 'Razer', 'Logitech', 'Other'], required: true },
              { name: 'condition', type: 'select', label: 'Condition', options: ['New', 'Renewed'] },
            ],
          },
          {
            gridCols: 1,
            fields: [
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Describe your product features, specifications, and benefits...', rows: 4 },
            ],
          },
        ],
      },
      {
        id: 'pricing',
        title: 'Step 2: Pricing & Inventory',
        fieldGroups: [
          {
            gridCols: 3,
            fields: [
              { name: 'price', type: 'number', label: 'Price (৳)', placeholder: '0.00', required: true },
              { name: 'stockQuantity', type: 'number', label: 'Stock Quantity', placeholder: '0', required: true },
              { name: 'sku', type: 'text', label: 'SKU (Optional)', placeholder: 'e.g., MBP-M2-16-1TB' },
            ],
          },
          {
            gridCols: 2,
            fields: [
              { name: 'availability', type: 'select', label: 'Availability', options: ['In Stock', 'Pre-Order', 'Out of Stock'] },
              { name: 'warrantyPeriod', type: 'select', label: 'Warranty Period', options: ['No Warranty', '6 Months', '1 Year', '2 Years', '3 Years'] },
            ],
          },
        ],
      },
      {
        id: 'images',
        title: 'Step 3: Product Images',
        type: 'images',
        mainImage: {
          label: 'Main Product Image',
          hint: 'Click to upload or drag and drop',
          formatHint: 'PNG, JPG up to 5MB',
        },
        additionalLabel: 'Additional Images (Optional)',
        additionalSlots: 4,
      },
      {
        id: 'specs',
        title: 'Step 4: Technical Specifications (Optional)',
        fieldGroups: [
          {
            gridCols: 2,
            fields: [
              { name: 'processor', type: 'text', label: 'Processor/Chipset', placeholder: 'e.g., Apple M2 Max' },
              { name: 'ram', type: 'text', label: 'RAM/Memory', placeholder: 'e.g., 32GB' },
            ],
          },
          {
            gridCols: 2,
            fields: [
              { name: 'storage', type: 'text', label: 'Storage', placeholder: 'e.g., 1TB SSD' },
              { name: 'displaySize', type: 'text', label: 'Display Size', placeholder: 'e.g., 16 inch' },
            ],
          },
          {
            gridCols: 1,
            fields: [
              { name: 'otherSpecs', type: 'textarea', label: 'Other Specifications', placeholder: 'Add any other technical details (Battery life, Connectivity, Ports, etc.)', rows: 3 },
            ],
          },
        ],
      },
    ],
    actions: [
      { type: 'button', label: 'Cancel', href: '/manageList', variant: 'secondary' },
      { type: 'submit', label: 'Publish Product', variant: 'primary' },
    ],
  },
  footer: {
    copyrightText: 'Gadgets BD Seller Central. All rights reserved by LWS.',
  },
}
