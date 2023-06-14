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
        dealTimeText: '#88898d',
        socialBg: '#1a4fc9',
        socialHeader: '#1448BF',
        socialTableBg: '#faf8fe',
        socialTagBg: '#e7ecf8',
        socialTagTransparentBg: '#ffffff40',
        socialUpdateTimeText: '#ffffff70',
        socialMinerTitle: '#00000085',
        socialMinerBorder: '#0000001a',
        spaceRace: '#1f57d8',
        spaceRaceProgressBg: '#e7ecf6',
        customBackground: '#f0f6fa',
        success: '#5ac6a8',
        card: '#F8F9FA',
        cardHighlight: '#eef1f8',
        customBlue: {
          100: '#F1F6FA',
          200: '#F8FAFD'
        },
        customGray: {
          100: '#F1F6FA',
          200: '#F7F8F9',
          250: '#F4F6FC',
          300: '#E3E7EC',
          350: '#B6BDC7',
          375: '#979797',
          400: '#858E98',
          450: '#748094',
          500: '#6F7B88',
          550: '#748094',
          600: '#3F4449'
        }
      },
      width: {
        '1/6': '16.66%',
        '1/32': '3.125%',
        '1/25': '4%',
        '1/16': '6.25%',
        '3/32': '9.375%',
        '1/10': '10%',
        '5/48': '10.417%',
        '1/9': '11.1111111%',
        '3/25': '12%',
        '1/8': '12.5%',
        '2/15': '13.3333%',
        '7/50': '14%',
        '3/20': '15%',
        '9/50': '18%',
        '29/160': '18.125%',
        '3/16': '18.75%',
        '2/9': '22.2222222%',
        '15/64': '23.4375%',
        '4/15': '26.67%',
        '7/25': '28%',
        '3/8': '37.5%',
        '7/12': '58.3%',
        '5/8': '62.5%',
        '7/8': '87.5%',
        26: '6.5rem',
        27: '6.75rem',
        28: '7rem',
        30: '7.5rem',
        36: '9rem',
        38: '9.5rem',
        40: '10rem'
      },
      height: {
        7: '1.75rem',
        11: '2.75rem',
        30: '7.5rem',
        68: '17rem',
        136: '34rem'
      },
      maxHeight: {
        100: '25rem',
        200: '50rem'
      },
      boxShadow: {
        container: '2px 2px 20px rgb(0 0 0 / 60%)'
      },
      spacing: {
        1.5: '0.375rem',
        2.5: '0.625rem',
        5.5: '1.375rem'
      },
      inset: {
        '-1': '-0.25rem',
        '-2': '-0.5rem',
        '-4': '-1rem',
        '-8': '-2rem'
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
    },
    minHeight: {
      64: '17rem'
    }
  },
  variants: {
  },
  plugins: []
}
