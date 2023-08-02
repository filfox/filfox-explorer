export const network = {
  multipleNetworks: true,
  currentNetwork: 1,
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

export const DOMAIN = network.networks[network.currentNetwork].url
export const RPC = `${DOMAIN}/rpc/v1`
export const FNS = network.networks[network.currentNetwork].fns
export const fnsServer = 'https://app.fns.space/api/lookup'

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

export const epochsInDay = 2880
