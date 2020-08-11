module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'pages/**/*.vue',
      'components/**/*.vue',
      'layouts/**/*.vue',
      'plugins/**/*.vue'
    ]
  },
  corePlugins: {
  },
  theme: {
    extend: {
      colors: {
        main: '#1a4fc9',
        footer: '#141825',
        footerText: '#f0f2f6',
        background: '#f0f6fb',
        mobileHeader: '#f8f8f8',
        button: '#409eff',
        merchantBg: '#f8f9fe',
        merchantTextColor: '#9b9b9b',
        tableHeaderColor: '#000000b3',
        dealTimeText: '#88898d'
      },
      width: {
        '1/32': '3.125%',
        '1/25': '4%',
        '1/16': '6.25%',
        '3/32': '9.375%',
        '1/10': '10%',
        '1/9': '11.1111111%',
        '3/25': '12%',
        '1/8': '12.5%',
        '7/50': '14%',
        '3/20': '15%',
        '9/50': '18%',
        '3/16': '18.75%',
        '2/9': '22.2222222%',
        '15/64': '23.4375%',
        '7/25': '28%',
        '7/12': '58.3%',
        '7/8': '87.5%'
      }
    },
    minWidth: {
      0: '0',
      '1/5': '20%',
      '1/8': '12.5%',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%'
    }
  },
  variants: {
  },
  plugins: []
}
