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
export const fnsServer = 'https://hyperspace.filfox.info/api/fns'

export const TOKEN_ICONS = {
  '0x7b90337f65faa2b2b8ed583ba1ba6eb0c9d7ea44': 'FILADOGE',
  '0x2646bb363851d31dca3de045e0eb63d0afeb427d': 'FILEDOGE',
  '0xff25fab7a4940ec32cb2ca0e9566694ed9bb28a1': 'SC',
  '0x005e02a4a934142d8dd476f192d0dd9c381b16b4': 'THS',
  '0x60e1773636cf5e4a227d9ac24f20feca034ee25a': 'WFIL',
  '0x3c3501e6c353dbaeddfa90376975ce7ace4ac7a8': 'STFIL',
  '0x422849b355039bc58f2780cc4854919fc9cfaf94': 'CELERUSDT'
}

export const epochsInDay = 2880
