export const reviewPageData = {
  pageTitle: 'Create Review',
  header: {
    userName: 'John Doe',
  },
  product: {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    title: 'Apple MacBook Pro M2 - Space Gray, 16GB RAM, 512GB SSD',
  },
  form: {
    starCount: 5,
    sections: [
      {
        id: 'rating',
        type: 'rating',
        title: 'Overall rating',
      },
      {
        id: 'photo',
        type: 'photo',
        title: 'Add a photo or video',
        description: 'Shoppers find images and videos more helpful than text alone.',
        uploadLabel: 'Add media',
      },
      {
        id: 'headline',
        type: 'headline',
        title: 'Add a headline',
        placeholder: "What's most important to know?",
      },
      {
        id: 'written',
        type: 'written',
        title: 'Add a written review',
        placeholder: 'What did you like or dislike? What did you use this product for?',
        rows: 6,
      },
    ],
    submitLabel: 'Submit',
  },
}
