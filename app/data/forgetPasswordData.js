export const forgetPasswordData = {
  form: {
    title: 'Password assistance',
    description:
      'Enter the email address or mobile phone number associated with your Gadget Hub account.',
    fields: [
      {
        id: 'email',
        type: 'text',
        label: 'Email or mobile phone number',
        required: true,
      },
    ],
    submitLabel: 'Continue',
    formId: 'resetForm',
  },
  successMessage: {
    icon: 'CheckCircle',
    title: 'Check your email',
    text: "We've sent a password reset link to your email address.",
  },
  helpSection: {
    title: 'Has your email or mobile number changed?',
    text: "If you no longer use the e-mail address associated with your Gadget Hub account, you may contact",
    link: {
      label: 'Customer Service',
      href: '#',
    },
    linkSuffix: ' for help restoring access to your account.',
  },
}
