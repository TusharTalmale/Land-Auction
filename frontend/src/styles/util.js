export default {
  btn: [
    'my-2',
    'py-2',
    'px-8',
    'text-sm', 
    'rounded',
    'font-bold',
    ''
  ].join(' '),
  btnGreen: [
    'bg-myGr-light',
    'text-white',
    'focus:bg-myGr-dark',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-myGr-dark',
    'font-bold',
    ''
  ].join(' '),
  btnDisabled: (bol) => [
    bol ? 
    'bg-myGr-disabled ' 
    : ' '
  ],
  th: [
    'max-h-2',
    'text-sm',
    'font-medium',
    'font-myPtext',
    ''
  ].join(' '),
  icon: [
    'h-5',
    'w-5',
    'text-black',
    'float-left',
    ''
  ].join(' '),
  iconText: [
    'font-medium',
    'ml-6',
    ''
  ].join(' '),
  box: [
    'box-border',
    'w-11/12',
    'bg-myAw',
    'mb-2',
    'px-2',
    'py-2',
    ''
  ].join(' '),
  input: [
    'w-full',
    'px-2',
    'py-2',
    'mb-8',
    'mt-1',
    'text-primary',
    'border',
    'rounded-md',
    'outline-none',
    'text-sm',
    'transition',
    'duration-150',
    'ease-in-out',
    'focus:ring-myGr-light focus:border-myGr-light',
    ''
  ].join(' '),

}
