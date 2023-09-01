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
    inset: {
      0: '0rem',
      1: '0.5rem',
      2: '1rem',
      3: '1.5rem',
      3.5: '1.75rem',
      4: '2rem',
      '1px': '1px'
    },
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
        increaseNum: '#7FCB0A',
        decreaseNum: '#DE1B0B',
        iconShadow: '#EEF5FE',
        customBlue: {
          100: '#F1F6FA',
          200: '#F8FAFD',
          250: '#EEF7FF',
          300: '#1950C9'
        },
        customGray: {
          100: '#F1F6FA',
          200: '#F7F8F9',
          250: '#F4F6FC',
          270: '#F4F4F4',
          280: '#EAECEF',
          300: '#E3E7EC',
          350: '#B6BDC7',
          375: '#979797',
          400: '#858E98',
          450: '#748094',
          500: '#6F7B88',
          550: '#748094',
          600: '#3F4449',
          650: '#606264',
          700: '#5F6266'
        },
        customOrange: {
          100: '#FFFCF4'
        }
      },
      width: {
        '1px': '1px',
        '2px': '2px',
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
        4.25: '1.0625rem',
        4.5: '1.125rem',
        9: '2.25rem',
        24.5: '6.125rem',
        25: '6.25rem',
        26: '6.5rem',
        27: '6.75rem',
        28: '7rem',
        29: '7.25rem',
        30: '7.5rem',
        36: '9rem',
        38: '9.5rem',
        60: '15rem',
        68: '19.25rem',
        69: '19.5rem',
        69.5: '19.75rem',
        70: '20rem'
      },
      height: {
        '1px': '1px',
        '2px': '2px',
        7: '1.75rem',
        9: '2.25rem',
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        24.5: '6.125rem',
        25: '6.25rem',
        27: '6.75rem',
        29: '7rem',
        30: '7.5rem',
        32: '8rem',
        33: '8.5rem',
        34: '9rem',
        68: '17rem',
        69: '17.5rem',
        70: '18rem',
        72: '19rem',
        74: '20rem',
        136: '34rem'
      },
      margin: {
        2.5: '0.6rem',
        3.5: '0.9rem'
      },
      maxHeight: {
        100: '25rem',
        200: '50rem'
      },
      boxShadow: {
        container: '2px 2px 20px rgb(0 0 0 / 60%)',
        card: '0px 4px 4px 0px #0000000F',
        panel: '0px 4px 10px 0px #00000014',
        popover: '0 0 20px #00000020'
      },
      spacing: {
        0.5: '0.125rem',
        1.25: '0.3125rem',
        1.5: '0.375rem',
        1.75: '0.4375rem',
        2.25: '0.5625rem',
        2.5: '0.625rem',
        5.5: '1.375rem'
      },
      inset: {
        '-1': '-0.25rem',
        '-2': '-0.5rem',
        '-4': '-1rem',
        '-6': '-1.5rem',
        '-8': '-2rem',
        1.5: '0.75rem'
      },
      lineHeight: {
        12: '3rem',
        13: '3.5rem'
      },
      gridTemplateColumns: {
        dappList: 'repeat(auto-fill, 20rem)'
      }
    },
    minWidth: {
      0: '0',
      '1/5': '20%',
      '1/8': '12.5%',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
      20: '5rem'
    },
    minHeight: {
      64: '17rem'
    }
  },
  variants: {
  },
  plugins: []
}
