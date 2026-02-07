export const loginData = {
  form: {
    title: 'Sign in',
    action: '/',
    method: 'GET',
    fields: [
      {
        id: 'email',
        type: 'email',
        label: 'Email or mobile phone number',
        required: true,
      },
      {
        id: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        rightLink: {
          label: 'Forgot your password?',
          href: '/auth/forgetPassword',
        },
      },
    ],
    submitLabel: 'Sign in',
  },
  disclaimer: {
    text: "By continuing, you agree to Gadgets BD's",
    links: [
      { label: 'Conditions of Use', href: '#' },
      { label: 'Privacy Notice', href: '#' },
    ],
    linkJoin: ' and ',
    suffix: '.',
  },
  helpLink: {
    label: 'Need help?',
    href: '#',
    icon: 'ChevronRight',
  },
  divider: {
    text: 'New to Gadgets BD?',
  },
  createAccount: {
    label: 'Create your Gadgets BD account',
    href: '/register',
  },
}
