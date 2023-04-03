export const network = {
  multipleNetworks: true,
  currentNetwork: 2,
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
    },
    {
      name: 'Hyperspace',
      url: 'https://hyperspace.filfox.info',
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
export const fnsServer = `${network.networks[network.currentNetwork][network.currentNetwork ? 'url' : 'fns']}/api/${network.currentNetwork ? 'fns' : 'lookup'}`

export const epochsInDay = 2880
