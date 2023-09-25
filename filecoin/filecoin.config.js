export const network = {
  multipleNetworks: true,
  currentNetwork: 0, // 切换环境需修改
  networks: [
    {
      name: 'Mainnet',
      url: 'https://filfox.info',
      fns: 'https://app.fns.space',
      chainId: '0x13a',
      chainName: 'Filecoin - Mainnet',
      nativeCurrency: 'FIL'
    },
    {
      name: 'Calibration',
      url: 'https://calibration.filfox.info',
      fns: 'https://testapp.fns.space',
      chainId: '0x4cb2f',
      chainName: 'Filecoin - Calibration testnet',
      nativeCurrency: 'tFIL'
    }
  ]
}

export const wiki = {
  url: 'https://filfox.info/wiki'
}

export const NETWORK = network.networks[network.currentNetwork]
export const NETWORK_NAME = NETWORK.name
export const CHAIN_ID = NETWORK.chainId
export const CHAIN_NAME = NETWORK.chainName
export const NATIVE_CURRENCY = NETWORK.nativeCurrency

export const HOST = NETWORK.url
export const RPC = `${HOST}/rpc/v1`
export const FNS = NETWORK.fns
export const FNS_SERVER = `${FNS}/api`
export const ADMIN_SERVER = `https://admin.filfox.info`
export const FILFOX_WALLET_HOST = `https://wallet.filfox.info`
export const METAMASK_PLUGIN_URL = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=ext_sidebar'

export const TOKEN_ICONS = {
  f410fpoidg73f7krlfohnla52dotowde5p2sejxnd4mq: require('@/assets/img/token/filadoge.png'),
  f410fezdlwnrykhjr3sr54bc6b23d2cx6wqt52caxhaq: require('@/assets/img/token/filedoge.png'),
  f410f74s7vn5esqhmglfszihjkztjj3m3wkfbacg26oi: require('@/assets/img/token/sc.png'),
  f410fabpafjfjgqkc3douo3yzfug5tq4bwfvuhsewxji: require('@/assets/img/token/ths.png'),
  f410fiiuetm2vaon4ldzhqdgeqvert7e47l4upp6ugly: require('@/assets/img/token/celerusdt.png'),
  f410fmdqxonrwz5peuit5tlbe6ih6zibu5ys223xctfi: require('@/assets/img/token/wfil.png'),
  f410fhq2qdzwdkpn25xp2sa3ws5ooplhevr5ittlp6by: require('@/assets/img/token/stfil.png'),
  f410fyxvjnxjwlgb473eq44vwulnmsvrpiwf2c4i4k5i: require('@/assets/img/token/SFT.png'),
  f410fcrysfupl3j3ojeimzxctv23klbqf5nmonbahudi: require('@/assets/img/token/rSFT.png'),
  DEFAULT: require('@/assets/img/token/default.png'),
  '': require('@/assets/img/token/default.png')
}

// 切换环境需修改
export const FNS_CONTRACT_ADDRESS = {
  Multicall: '0x8ccEEf57F2E092562DBB969f38B68711F493b543',
  FNSRegistry: '0x916915d0d41EaA8AAEd70b2A5Fb006FFc213961b',
  ReverseRegistrar: '0xc49833d827b01e1465c65221A59885Fb71614a26',
  Registrar: '0x45d9d6408d5159a379924cf423cb7e15C00fA81f',
  FixedPriceOracle: '0x5e838eF42d5D1D8B3F691d7dbFC49D8a9f6aC577',
  RegistrarController: '0xDA3c407a23Ef96930f1A07903fB8360D8926991E',
  PublicResolver: '0xed9bd04b1BB87Abe2EfF583A977514940c95699c'
}

export const epochsInDay = 2880
