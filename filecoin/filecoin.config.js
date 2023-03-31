export const network = {
  // Index of networks
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

export const FNS = network.networks[network.currentNetwork]
export const fnsServer = `${FNS}/api/lookup`

export const epochsInDay = 2880
