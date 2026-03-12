export const registerData = {
  form: {
    title: 'Create account',
    action: '/auth/login',
    method: 'GET',
    accountTypes: [
      { id: 'customer', label: 'Customer' },
      { id: 'shopOwner', label: 'Shop Owner' },
    ],
    hiddenInputName: 'userType',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Your name',
        placeholder: 'First and last name',
        required: true,
      },
      {
        id: 'shopName',
        type: 'text',
        label: 'Shop name',
        placeholder: 'Your shop name',
        required: false,
        showForShopOwner: true,
      },
      {
        id: 'mobile',
        type: 'tel',
        label: 'Mobile number',
        placeholder: 'Mobile number',
        required: true,
        countrySelect: {
          options: ['BD +880'],
        },
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        placeholder: undefined,
        required: true,
      },
      {
        id: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'At least 6 characters',
        required: true,
        hint: 'Passwords must be at least 6 characters.',
      },
      {
        id: 'passwordConfirm',
        type: 'password',
        label: 'Re-enter password',
        placeholder: undefined,
        required: true,
      },
    ],
    submitLabel: 'Create your Gadget Hub account',
  },
  disclaimer: {
    text: "By creating an account, you agree to Gadget Hub's",
    links: [
      { label: 'Conditions of Use', href: '#' },
      { label: 'Privacy Notice', href: '#' },
    ],
    linkJoin: ' and ',
    suffix: '.',
  },
  signIn: {
    text: 'Already have an account?',
    link: { label: 'Sign in', href: '/auth/login' },
  },
  shopOwnerInfo: {
    title: 'Shop Owner Registration',
    description:
      "After registration, you'll be able to set up your shop profile, add products, and start selling on Gadget Hub marketplace.",
  },
}
