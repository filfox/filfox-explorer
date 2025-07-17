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
  // f410fiiuetm2vaon4ldzhqdgeqvert7e47l4upp6ugly: require('@/assets/img/token/celerusdt.png'),
  f410fmdqxonrwz5peuit5tlbe6ih6zibu5ys223xctfi: require('@/assets/img/token/wfil.svg'),
  f410fhq2qdzwdkpn25xp2sa3ws5ooplhevr5ittlp6by: require('@/assets/img/token/stfil.png'),
  f410fyxvjnxjwlgb473eq44vwulnmsvrpiwf2c4i4k5i: require('@/assets/img/token/SFT.png'),
  f410fcrysfupl3j3ojeimzxctv23klbqf5nmonbahudi: require('@/assets/img/token/rSFT.png'),
  f410fs6vom2q5fja6vrlthf5xuvswvhht4vqwdcqgtiq: require('@/assets/img/token/rSPD.png'),
  f410fpxccfcxe7attnkkxyqpnss7rj2kvoyduiflzp4y: require('@/assets/img/token/FFD.png'),
  f410fneeqr572sox4aqgpxwp6dxosyjtiviha5gldhpy: require('@/assets/img/token/ifil.svg'),
  f410f2bbxozor3qhc7ikos7jjb4jv57prvcu2hem5fiq: require('@/assets/img/token/clfil.svg'),
  f410fvkutvrzl5t53zekj6kjum255vjfv55umg6kgoni: require('@/assets/img/token/pFIL.svg'),
  f2o3zbxcnfhizscgevmsenmnk7q6lodakty7y74uy: require('@/assets/img/token/wpFIL.svg'),
  f410fk7r3xh3zagc47zymylav5vowxbg46sw3anevrsa: require('@/assets/img/token/wpFIL.svg'),
  f410f5ndggqwe2re3zh2tvbs5ls4qlbxuauqv7owocaa: require('@/assets/img/token/axlUSDC.svg'),
  f410fxq5eiu65kljyedvlcsmmizz4nfgfy3yj563cfri: require('@/assets/img/token/FileBunnies.png'),
  f410f67hkuxnhgbnyonq7tw3kgaf5nv2mm5gsqrl67mq: require('@/assets/img/token/FilPunks.png'),
  f410fuawl6hohkbmmy3zplohhveehijpveshd3z5ciza: require('@/assets/img/token/RICARDO.png'),
  f410fixm5mqenkfm2g6msjt2chs36cxaa7ka745xo2jq: require('@/assets/img/token/FNS_DAO.jpeg'),
  f410fqc4y2ovat777evodxjfcieir74jgf4cfcyah4wq: require('@/assets/img/token/usdfc.svg'),
  f410ffifk7bvs7jsordjxheer453tcbxt5phvnr64xuy: require('@/assets/img/token/Glif.svg'),
  DEFAULT: require('@/assets/img/token/default.png'),
  NFT_DEFAULT: require('@/assets/img/token/nft.png')
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
