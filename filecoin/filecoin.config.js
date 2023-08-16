export const network = {
  multipleNetworks: true,
  currentNetwork: 1, // 切换环境需修改
  networks: [
    {
      name: 'Mainnet',
      url: 'https://filfox.info',
      fns: 'https://app.fns.space'
    },
    {
      name: 'Calibration',
      url: 'https://calibration.filfox.info',
      fns: 'https://testapp.fns.space'
    }
  ]
}

export const wiki = {
  url: 'https://filfox.info/wiki'
}

export const HOST = network.networks[network.currentNetwork].url
export const RPC = `${HOST}/rpc/v1`
export const FNS = network.networks[network.currentNetwork].fns
export const fnsServer = `${FNS}/api`
export const adminServer = `https://admin.filfox.info`
export const filfoxWalletHost = `https://wallet.filfox.info`

export const TOKEN_ICONS = {
  f410fpoidg73f7krlfohnla52dotowde5p2sejxnd4mq: require('@/assets/img/token/filadoge.png'),
  f410fezdlwnrykhjr3sr54bc6b23d2cx6wqt52caxhaq: require('@/assets/img/token/filedoge.png'),
  f410f74s7vn5esqhmglfszihjkztjj3m3wkfbacg26oi: require('@/assets/img/token/sc.png'),
  f410fabpafjfjgqkc3douo3yzfug5tq4bwfvuhsewxji: require('@/assets/img/token/ths.png'),
  f410fiiuetm2vaon4ldzhqdgeqvert7e47l4upp6ugly: require('@/assets/img/token/celerusdt.png'),
  f410fmdqxonrwz5peuit5tlbe6ih6zibu5ys223xctfi: require('@/assets/img/token/wfil.png'),
  f410fhq2qdzwdkpn25xp2sa3ws5ooplhevr5ittlp6by: require('@/assets/img/token/stfil.png'),
  DEFAULT: require('@/assets/img/token/default.png'),
  '': require('@/assets/img/token/default.png')
}

// 切换环境需修改
export const FNS_CONTRACT_ADDRESS = {
  Multicall: '0x486755bC0946ECbB760Af4ed171B2C549812A961',
  FNSRegistry: '0x0381f0c42f542DEcEBC3ea1A27B3eF4ac1F258b6',
  ReverseRegistrar: '0xc2ef6a6dd61529325290894fDC02F7dD3B7D7275',
  Registrar: '0x392d1959CFbdCA10342e7D32BCeF87e2Ac25221e',
  FixedPriceOracle: '0xbbbdf64e9624fb9d1907953fc55a912e31ec4d97',
  RegistrarController: '0xc5b7f7f5dFB7f16F74476564Fe2e3B5a7C182Cd4',
  PublicResolver: '0x7EEa7D977fff536d9B8752a5dF24A00E288c1B43'
}

export const epochsInDay = 2880
