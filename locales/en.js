export default {
  shared: {
    tableEmptyText: 'N/A',
    time: {
      justNow: 'Just Now',
      hour: ' hour ',
      min: ' min ',
      sec: ' sec',
      ago: ' ago',
      day: ' day ',
      month: ' month ',
      year: ' year '
    },
    more: 'More',
    unknown: 'Unknown',
    noSearchResult: 'No Result',
    empty: 'Empty',
    notAvailable: 'Coming Soon',
    oldVersion: 'Mini version',
    copySuccess: 'Copied',
    submit: 'Submit',
    backToHome: 'Back to home page',
    currentNetwork: 'Current network: ',
    openApp: 'DOWNLOAD/OPEN APP',
    select: 'Select',
    amount: 'Amount',
    value: 'Value',
    item: 'NFT ID'
  },
  nav: {
    home: {
      title: 'Home'
    },
    blocks: {
      title: 'Blockchain',
      subMenus: [
        'Tipsets',
        'Messages',
        'Rich List',
        'Deal List',
        'Mempool',
        'FNS Lookup',
        'Verify Contract'
      ]
    },
    ranks: {
      title: 'Top Miners'
    },
    charts: {
      title: 'Stats',
      subMenus: [
        'Mining Charts',
        'Gas Stats',
        'FEVM Stats',
        'Verified Contracts',
        'Lotus Version Distribution'
      ]
    },
    resources: {
      title: 'Resources',
      subMenus: [
        'Tools',
        'Wiki',
        'Web Wallet',
        'FNS Lookup'
      ]
    },
    searchPlaceHolder: 'Search for Block/Account/Address/Message...',
    language: 'Language',
    app: {
      title: 'Mobile APP',
      download: 'Download',
      website: 'Website',
      downloadApp: 'Download FoxWallet APP',
      description: 'Leading you to the world of blockchain'
    }
  },
  home: {
    browserCloseTip: 'The domain filfox.info will be suspended immediately due to the filing process. During the suspension of domain resolution, please use the IP address to access',
    overview: {
      title: 'Network Overview',
      unfoldBtn: 'Unfold',
      foldBtn: 'Fold',
      titles: {
        height: 'Block Height',
        timestamp: 'Latest Block',
        qualityAdjPower: 'Network Storage Power',
        activeMiners: 'Active Miners',
        price: 'Current Price',
        blockReward: 'Block Reward',
        averageRewardPerByte: '24h Average Mining Reward',
        output24h: '24h FIL Production',
        circulatingSupply: 'Circulating Supply',
        totalPledgeCollateral: 'Total Pledge Collateral',
        accounts: 'Total Accounts',
        averageTipsetInterval: 'Average Block Interval',
        dailyMessages: '24h Messages',
        averageTipsetBlocks: 'Average Blocks per Tipset',
        rawBytePower: 'Network Raw Byte Power',
        averageGasPrice: 'Average Gas Price',
        burntSupply: 'Burnt FIL',
        totalMarketBalance: 'Total Market Balance',
        totalMaxSupply: 'Total Supply',
        circulatingSupplyRate: 'Circulating Rate',
        sectorInitialPledge: 'Current Sector Initial Pledge',
        currentBaseFee: 'Current Base Fee',
        sealCost: 'Cost of Sealing Sectors'
      },
      tips: {
        qualityAdjPower: 'Total adjusted storage power (storage space) of the network.',
        activeMiners: 'Amount of miners that has a positive storage power.',
        price: 'Current price of FIL. Data source: coingecko.com',
        blockReward: 'Block reward of current tipset height. Every tipset could have multiple blocks, and every block receives the same reward.',
        averageRewardPerByte: 'Average value in last 24h of the ratio of total block rewards at every tipset and corresponding adjusted storage power.',
        output24h: 'New FILs minted in last 24h.',
        circulatingSupply: 'Circulating supply of FIL.',
        totalPledgeCollateral: 'FILs pledged by miners.',
        averageTipsetInterval: 'Average block interval in last 24h.',
        averageTipsetBlocks: 'Average blocks produced per tipset in last 24h.',
        rawBytePower: 'Total storage power (storage space) of the network.',
        averageGasPrice: 'Average gas fee for the last 24h.',
        totalMarketBalance: 'FILs locked in storage market by placing order.',
        circulatingSupplyRate: 'Circulating rate = circulating supply / max supply',
        sealCost: 'The cost of sealing sectors, including sector initial pledge and message fees'
      }
    },
    fvmOverview: {
      title: 'FEVM Overview',
      totalAddressCount: 'Total Address',
      totalBalance: 'Total Balance',
      evmCount: 'EVM Address Count',
      evmBalance: 'EVM Address Balance',
      ethaccountCount: 'Ethaccount Address Count',
      ethaccountBalance: 'Ethaccount Address Balance',
      placeholderCount: 'Placeholder Address Count',
      placeholderBalance: 'Placeholder Address Balance'
    },
    fvmTopContracts: {
      title: 'Top Contracts',
      latest24: 'Latest 24H',
      orderBy: 'Order By',
      more: 'More',
      contractAddress: 'Contract Address',
      transactions: 'Transactions',
      uniqueUsers: 'Unique Users',
      balance: 'Balance',
      gasCost: 'Gas cost'
    },
    verifiedContracts: {
      title: 'Verified Contracts',
      address: 'Address',
      contractName: 'Contract Name',
      language: 'Language',
      compiler: 'Compiler',
      optimization: 'Optimization',
      license: 'License'
    },
    entireQualityAdjPower: {
      title: 'Storage power trend',
      qualityAdjPower: 'AdjPower',
      qualityAdjPowerDelta: 'AdjPower Delta'
    },
    powerDistribution: {
      title: 'Storage Power Distribution'
    },
    powerDelta: {
      title: 'Daily Storage Power Growth (Top 5)'
    },
    baseFee: {
      title: '24h Base Fee Variations'
    },
    minerRanks: {
      title: 'Top Miners',
      rate: 'Rate',
      filters: {
        qualityAdjPower: 'Adj. Power',
        blocks: 'Blocks Mined',
        powerDelta: 'Growth'
      },
      tableHeadersByPower: {
        rank: 'Rank',
        miner: 'Miner',
        tag: 'Tag',
        validPower: 'Adj. Power',
        rate: 'Ratio',
        validPowerRate: 'Adj. Power Ratio',
        reward: '24h Reward',
        miningEfficiency: 'Mining Efficiency',
        powerIncrease: 'Power Growth',
        location: 'Location'
      },
      tipsByPower: {
        miningEfficiency: 'Average FILs minted by 1 TiB storage power in last 24h.',
        powerIncrease: 'Adjusted storage power growth in last 24h.'
      },
      tableHeadersByBlock: {
        rank: 'Rank',
        miner: 'Miner',
        tag: 'Tag',
        blockNums: 'Win Count',
        luckyValue: 'Lucky Value',
        totalRewards: 'Rewards',
        rate: 'Ratio',
        rewardsRatio: 'Rewards Ratio',
        validPower: 'Adj. Power Ratio',
        location: 'Location'
      },
      tipsByBlock: {
        luckyValue: 'Ratio of actual blocks produced and theoretical value. If the miner\'s Adj. Power is less than 1PiB, the value has a large randomness and is for reference only.',
        rewardsRatio: 'The ratio of block rewards earnd by a certain miner and total block rewards in the selected period.',
        winCount: 'In Filecoin mining model, there may be multiple blocks under a tipset, and each block may receive multiple win counts. Cumulative win counts = the sum of win counts for each block.',
        blocksMined: 'Blocks mined =  the sum of blocks mined',
        miningEfficiency: "The ratio of miner's cumulative block reward to the adjusted storage power in the selected period."
      },
      tableHeadersByPowerDelta: {
        rank: 'Rank',
        miner: 'Miner',
        tag: 'Tag',
        powerIncreaseSpeed: 'Daily Power Growth',
        equivalentMiners: 'Miner Equivalent',
        powerDelta: 'Power Growth',
        validPower: 'Adj. Power',
        location: 'Location'
      },
      tipsByPowerDelta: {
        equivalentMiners: "Take the official benchmark environment as the baseline (AMD Ryzen Threadripper 3970X, NVidia GTX 2080Ti, 128GB 2133mhz), we estimate the miner's machine amount by calculate the ratio of its storage power growth and the baseline.",
        powerIncreaseSpeed: 'Daily total adj. power of the sealed sectors within selected period.',
        powerDelta: "Miner's adjusted storage power increment in the selected period."
      },
      moreBtn: 'More'
    },
    recentTipsets: {
      title: 'Latest Tipsets',
      tableHeaders: {
        height: 'Height',
        blockId: 'Block ID',
        miner: 'Miner',
        tag: 'Tag',
        message: 'Messages',
        award: 'Reward'
      }
    },
    richManRanks: {
      title: 'Rich List',
      tableHeaders: {
        order: 'Rank',
        address: 'Address',
        tag: 'Tag',
        balance: 'Balance',
        balanceRate: 'Balance Ratio'
      }
    },
    partner: 'Partners',
    dappRanks: {
      title: 'FVEM TOP Dapps(24H)',
      tableFilterOptions: {
        sort: {
          uniqueAdders: 'Number of Unique Addressed',
          contractBalance: 'Contract Balance',
          transactionBalance: 'Transaction Balance',
          transactionAmount: 'Transactions'
        },
        category: {
          all: 'All',
          defi: 'Defi',
          nft: 'NFT',
          lsd: 'LSD',
          marketPlace: 'MarketPlace',
          game: 'Game',
          did: 'DID',
          others: 'Other'
        },
        time: {
          day: '1Day',
          week: '7Day',
          month: '30Day',
          year: '1Year'
        }
      },
      tableHeaders: {
        name: 'Name',
        category: 'Category',
        contractBalance: 'Contract Balance',
        uniqueAdders: 'Number of Unique Addressed',
        transactionAmount: 'Transaction Amount',
        transactionBalance: 'Transaction Balance'
      },
      titleHeader: {
        sortBy: 'Sort By',
        category: 'Category',
        time: 'Time'
      }
    }
  },
  blockchain: {
    block: {
      title: 'Tipsets List',
      tableHeaders: {
        height: 'Height',
        miner: 'Miner',
        time: 'Time',
        size: 'Size',
        hash: 'ID',
        tag: 'Tag',
        message: 'Messages',
        award: 'Reward'
      }
    },
    message: {
      title: 'Message List',
      info: {
        total: 'Total',
        messages: 'Messages'
      },
      tableHeaders: {
        id: 'Message ID',
        height: 'Height',
        time: 'Time',
        from: 'From',
        to: 'To',
        method: 'Method',
        value: 'Value',
        gasPrice: 'Gas Price',
        gasLimit: 'Gas Limit',
        exitCode: 'Status'
      },
      methods: {
        all: 'All'
      }
    },
    richList: {
      title: 'Rich List',
      info: {
        total: 'Total',
        accounts: 'Acccounts'
      },
      tableHeaders: {
        order: 'Rank',
        address: 'Address',
        balance: 'Balance',
        balanceRate: 'Balance Ratio',
        tag: 'Tag',
        type: 'Type',
        createTime: 'Create Time',
        lastSeenTime: 'Last Seen Time'
      },
      type: {
        all: 'All',
        normal: 'Normal Acccount',
        miner: 'Miner Account'
      }
    },
    dealList: {
      title: 'Deal List',
      searchPlaceHolder: 'Search Client/Provider',
      verifiedTips: 'This deal is initiated by the official certified client, the adjusted power is about ten times raw power',
      info: {
        total: 'Total',
        deals: 'Deals'
      },
      tableHeaders: {
        id: 'Deal ID',
        createdTime: 'Create Time',
        client: 'Client',
        provider: 'Provider',
        verifiedDeal: 'Verified Deal',
        size: 'Piece Size',
        storagePrice: 'Storage Fee',
        status: 'Status'
      }
    },
    mempool: {
      title: 'Mempool Message List'
    }
  },
  detail: {
    deal: {
      title: 'Deal Detail',
      overview: 'Deal Overview',
      storageDetail: 'Storage Detail',
      headers: {
        id: 'Deal ID',
        createTime: 'Create Time',
        block: 'Block',
        message: 'Message',
        cid: 'Piece Cid',
        verified: 'Verified Deal',
        status: 'Status',
        client: 'Client',
        provider: 'Provider',
        collateral: 'Collateral',
        fee: 'Storage Fee',
        to: 'to'
      }
    },
    transfer: {
      title: 'Transaction List',
      tableHeaders: {
        time: 'Time',
        message: 'Message ID',
        from: 'From',
        to: 'To',
        income: 'Net Income',
        type: 'Type'
      },
      types: {
        genesis: 'Genesis',
        fee: 'Fee',
        burn: 'Burn',
        reward: 'Reward',
        send: 'Send',
        receive: 'Receive',
        transfer: 'Transfer',
        'miner-fee': 'Miner Fee',
        'burn-fee': 'Burn Fee',
        penalty: 'Penalty',
        rebalance: 'Rebalance'
      },
      total: 'Total',
      transaction: 'transactions'
    },
    contract: {
      title: 'Contract',
      verifyTip: ['Are you the contract creator', 'Verify and Publish', 'your contract source code today'],
      codeVerified: 'Contract Source Code Verified',
      contractName: 'Contract Name',
      compilerVersion: 'Compiler Version',
      optimizeEnabled: 'Optimization Enabled',
      runs: 'Runs(Optimizer)',
      otherSettings: 'Other Settings',
      contractSourceCode: 'Contract Source Code',
      contractAbi: 'Contract ABI',
      contractCreationCode: 'Contract Creation Code',
      exportAbi: 'Export ABI',
      parameters: 'Constructor Arguments',
      parametersTip: 'ABI-Encoded and is the last bytes of the Contract Creation Code above'
    },
    eventLogs: {
      title: 'Event Logs'
    },
    tokenTransfer: {
      title: 'Token Transactions'
    },
    message: {
      title: 'Message Details',
      replaced: 'Message {oldCid} was replaced by {cid}',
      testNetOnly: 'This is a Calibration Testnet transaction only',
      modules: {
        overview: 'Overview',
        logs: 'Logs',
        internaltransfer: 'Internal Transfer',
        tokenTransfer: 'Token Transfer',
        transfer: 'Transactions',
        others: 'Others'
      },
      headers: {
        cid: 'Message ID',
        ethTransactionHash: 'ETH Transaction Hash',
        height: 'Height',
        time: 'Time',
        createTime: 'Create Time',
        inBlocks: 'Block',
        version: 'Version',
        from: 'From',
        to: 'To',
        nonce: 'Nonce',
        method: 'Method',
        params: 'Parameters',
        value: 'Value',
        address: 'Address',
        name: 'Name',
        topics: 'Topics',
        data: 'Data',
        logIndex: 'Log Index',
        removed: 'Removed',
        gasPrice: 'Gas Price',
        gasLimit: 'Gas Limit',
        gasUsed: 'Gas Used',
        exitCode: 'Status',
        return: 'Return',
        error: 'Error Message'
      },
      internaltransfer: {
        contractFrom: 'The contract call from',
        contractTo: 'to',
        produced: 'produces {amount} internal transactions',
        method: 'Method',
        from: 'From',
        to: 'To',
        value: 'Value'
      },
      transfer: {
        from: 'From',
        to: 'To',
        value: 'Value',
        type: 'Type'
      },
      description: {
        transfer: '{sender} sends {value} to {receiver}',
        'create-account': '{createBy} creates {actor} {idAddress}',
        'create-account:transfer': '{createBy} creates {actor} {idAddress} with initial balance {value}'
      },
      tips: {
        gasFeeCap: 'The total fee rate set by sender',
        gasPremium: 'The fee rate paid to miners set by sender',
        gasLimit: 'The maximum amount of gas used',
        gasUsed: 'The actual amount of gas used',
        baseFee: 'The base fee updated in real time according to the congestion of blockchain network',
        baseFeeBurn: 'The basic burn fee of the transaction',
        overEstimationBurn: 'Due to the gas limit exceeds 10% of the gas used,  required additioinal fee (Over Estimation Burn) to burn',
        minerTip: 'Fee received by miners. Miner Tip = Gas Premium * Gas used',
        minerPenalty: 'When the Gas Fee Cap is lower than the base fee, the difference will be deducted as Miner Penalty'
      },
      null: '(Null)'
    },
    tipset: {
      title: 'Tipset Height',
      all: 'All',
      headers: {
        time: 'Time',
        size: 'Size',
        totalMsgCount: 'Total Messages',
        id: 'Block ID',
        miner: 'Miner',
        tag: 'Tag',
        bonus: 'Reward',
        messageCount: 'Messages'
      }
    },
    block: {
      title: 'Block Details',
      overview: 'Block Overview',
      headers: {
        cid: 'Block ID',
        height: 'Height',
        time: 'Time',
        size: 'Size',
        messages: 'Messages',
        reward: 'Reward',
        winCount: 'Win Count',
        miner: 'Miner',
        parents: 'Parent Block',
        parentWeight: 'Parent Block Weight',
        penalty: 'Penalty'
      }
    },
    address: {
      holdings: {
        searchTokenName: 'Search Token Name',
        noTokens: 'No Tokens Found'
      },
      normal: {
        title: 'Address',
        headers: {
          overview: 'Address Overview',
          address: 'Address',
          ethAddress: 'ETH Address',
          robustAddress: 'Robust Address',
          actor: 'Actor',
          balance: 'Balance',
          messages: 'Messages',
          createTime: 'Create Time',
          lastSeenTime: 'Latest Transaction',
          ownedMiners: 'Owned Miner',
          workers: 'Active Miner',
          benefitedMiners: 'Benefited Miners',
          tokenInfo: 'Token Information',
          tokenHoldings: 'Token Holdings'
        }
      },
      miner: {
        app: {
          label: 'Watch accounts change',
          download: 'DOWNLOAD >',
          title: 'Use Fox Wallet App to watch accounts',
          step1: 'Download APP',
          step2: 'Enter data page',
          step3: 'Search by miner ID or address',
          step4: 'Collect'
        },
        sectors: {
          total: 'total',
          active: 'active',
          faults: 'faults',
          recoveries: 'recoveries'
        },
        tips: {
          lotus: 'The current version of Lotus which the miner is using. Green means the latest version and red means lower version. Click to see the releases of Lotus.'
        },
        minerOverview: {
          title: 'Miner Overview',
          headers: {
            balance: 'Address Balance',
            availableBalance: 'Available Balance',
            sectorPledge: 'Initial Pledge',
            lockedRewards: 'Locked Rewards',
            feeDebt: 'Fee Debt',
            pledgeBalance: 'Pledged Balance',
            miningPenalty: 'Penalty',
            qualityAdjPower: 'Adjusted Power',
            rawBytePower: 'Raw Byte Power',
            rate: 'Rate',
            rank: 'Rank',
            sectorSize: 'Sector Size',
            sectors: 'Sector Status',
            blockNums: 'Blocks Mined',
            WinCount: 'Win Count',
            blocksReward: 'Total Reward'
          },
          tips: {
            availableBalance: 'Available Balance = Address Balance - Initial Pledged - Rewards Locked'
          }
        },
        miningOverview: {
          title: 'Mining Data',
          headers: {
            qualityAdjPowerDelta: 'Power Growth',
            qualityAdjPowerDeltaSpeed: 'Daily Power Growth',
            minerEquivalent: 'Miner Equivalent',
            blockNums: 'Blocks Mined',
            blocksReward: 'Rewards',
            blocksRewardRate: 'Rewards Ratio',
            blocksRewardWithRate: 'Rewards (Ratio)',
            winCount: 'Win Count',
            miningEfficiency: 'Mining Efficiency',
            luckyValue: 'Lucky Value'
          }
        },
        accountChange: {
          title: 'Account Change',
          charts: {
            balance: 'Total Balance',
            availableBalance: 'Available Balance',
            sectorPledge: 'Initial Pledge',
            lockedRewards: 'Locked Rewards'
          }
        },
        powerChange: {
          title: 'Power Change',
          charts: {
            qualityAdjPower: 'Adj. Storage Power',
            qualityAdjPowerDelta: 'Adj. Storage Power Growth'
          }
        },
        accountOverview: {
          title: 'Account Overview',
          headers: {
            address: 'Address',
            actor: 'Actor',
            messageCount: 'Messages',
            owner: 'Owner',
            worker: 'Worker',
            peerID: 'Peer ID',
            createTime: 'Create Time',
            ip: 'Region(Public IP)',
            beneficiary: 'Beneficiary'
          }
        },
        blockList: {
          total: 'Total',
          tipsets: 'Tipsets',
          height: 'Height',
          hash: 'Block ID',
          reward: 'Reward',
          time: 'Time',
          messages: 'Messages Count',
          blockSize: 'Block Size'
        }
      }
    },
    peer: {
      title: 'Peer Details',
      headers: {
        id: 'ID',
        miners: 'Miner',
        IP: 'IP List'
      }
    },
    token: {
      title: 'Token',
      overview: {
        title: 'Token Overview',
        totalSupply: 'Total Supply',
        numberOfHolders: 'Holders',
        totalTransactionVolume: 'Total Transactions',
        contractAddress: 'Contract Address'
      },
      holder: {
        filteredByTokenHolder: 'Filtered By Token Holder',
        balance: 'Balance',
        nfts: 'NFTs',
        backToOverview: 'Back To Overview',
        filterAddress: 'Filter Address'
      },
      data: {
        totalOfTxs: '{amount} Total Transactions',
        totalOfHolders: '{amount} Total Holders',
        tx: {
          title: 'Transaction',
          time: 'Time',
          id: 'Message ID',
          sender: 'From',
          receiver: 'To',
          tokenId: 'Token ID'
        },
        holder: {
          title: 'Holder',
          rank: 'Rank',
          address: 'Address',
          proportion: 'Proportion'
        },
        info: {
          title: 'Information',
          noIntroductionYet: 'No Introduction Yet',
          f410fpoidg73f7krlfohnla52dotowde5p2sejxnd4mq: '',
          f410fezdlwnrykhjr3sr54bc6b23d2cx6wqt52caxhaq: "In February 2023, FILEDOGE was born, it is a MEME token on Filecoin. Based on FIL's smart contract, the FILEDOGE project made its fair release of Genesis. It is a 100% community-based project dedicated to bringing the spirit of DOGE's MEME culture to the FIL ecology and beyond. There are no centralized teams but only a level playing field that welcomes everyone.The community members of FILEDOGE legion are a bunch of adventurous lunatics, shouting 「EAT ZERO OR RETURN TO ZERO!」",
          f410f74s7vn5esqhmglfszihjkztjj3m3wkfbacg26oi: 'SC is the contribution value token of the Themis protocol. The maximum supply is 100 million. The contribution token generated by users who make contributions by inviting stake is the only generation channel.',
          f410fabpafjfjgqkc3douo3yzfug5tq4bwfvuhsewxji: 'THS is the platform token of Themis Pro, with a maximum supply of 10 million. THS is completely minted and issued by users with stablecoin assets, THS-USDT LP assets and mainstream blue-chip assets.',
          f410fiiuetm2vaon4ldzhqdgeqvert7e47l4upp6ugly: '',
          f410fmdqxonrwz5peuit5tlbe6ih6zibu5ys223xctfi: '',
          f410fhq2qdzwdkpn25xp2sa3ws5ooplhevr5ittlp6by: 'Staked FIL(stFIL) is a cryptocurrency token designed to represent "staked" or depositing tokens as collateral to support the Filecoin storage network. The token is designed on the decentralized finance protocol STFIL. It is designed as a liquidity token, where you can deposit FIL into the smart contract of STFIL on the blockchain and receive an equivalent amount of stFIL, which can be traded, exchanged, borrowed against, or used for any other liquidity purposes.'
        },
        contract: {
          title: 'Contract'
        }
      }
    }
  },
  actor: {
    account: 'Account',
    cron: 'Cron',
    init: 'Init',
    multisig: 'Multisig',
    paymentchannel: 'Payment Channel',
    reward: 'Reward',
    storagemarket: 'Storage Market',
    storageminer: 'Storage Miner',
    storagepower: 'Storage Power',
    system: 'System',
    verifiedregistry: 'Verified Registry',
    evm: 'EVM',
    eam: 'EAM',
    datacap: 'Datacap',
    placeholder: 'Placeholder',
    ethaccount: 'EthAccount',
    created: 'To be created'
  },
  chart: {
    miner: {
      title: 'Mining Charts',
      headers: {
        qualityAdjPowerPie: 'Adj. Power Distribution',
        qualityAdjPowerLine: 'Adj. Power Variations',
        qualityAdjPowerDeltaLine: 'Power Growth Variations',
        rewardLine: 'Reward Variations',
        sectorInitialPledgeVariations: 'Sector Initial Pledge Variations'
      }
    },
    gas: {
      title: 'Gas Statistics',
      baseFeeChart: {
        title: 'Base Fee Variations',
        tips: 'Base Fee：The real-time rate of the fee charged and burned by Filecoin system.'
      },
      headers: {
        dailyStatistics: '24h Gas Data'
      },
      all: 'All',
      tableHeaders: {
        method: 'Message Type',
        gasPrice: 'Avg. Gas Price',
        gasLimit: 'Avg. Gas Limit',
        gasFee: 'Avg. Gas Fee',
        gasUsed: 'Avg. Gas Used',
        fee: 'Total Fees/Pencentage',
        count: 'Total Messages/Pencentage'
      }
    },
    lotus: {
      pie: 'Lotus Version Distribution'
    }
  },
  footer: {
    contact: 'Contact: contact@filfox.io',
    intro: 'Filfox is a Filecoin blockchain explorer and data service platform, providing one-stop data services based on Filecoin, including various mining rankings, blockchain data queries, and visualization charts.'
  },
  tag: {
    apply: 'Claim account',
    edit: 'Edit Signature',
    sign: 'Signature verification',
    description: 'Only open claim for accounts with storage power ≥ {power}',
    owner: 'Owner address',
    en_sname: 'Account abbreviation(En)',
    zh_sname: 'Account abbreviation(Zh)',
    en_name: 'Account name(En)',
    zh_name: 'Account name(Zh)',
    contact: 'Contact',
    message: 'Message',
    command: 'Sign code',
    signature: 'Signature',
    snamePlaceholder: 'Cannot over 16 characters',
    namePlaceholder: 'Optional',
    contactPlaceHolder: 'Email, Cell phone...',
    signaturePlaceHolder: 'Please copy the above sign code, sign it with Filecoin wallet, and enter the signature',
    specialNotes: 'Special notes: sensitive words, prohibited words, celebrity names, etc. are not allowed in account names. If there is any violation, the signature will be deleted and prohibited. Thank you for your cooperation.',
    errorInput: 'Please input',
    success: 'Successfully signed! Please reload this page to see.',
    signed: 'V icon indicates that the account has completed the signature verification of the owner.'
  },
  meta: {
    titles: {
      filfox: 'Filfox',
      indexTitle: 'Filfox - Filecoin explorer',
      address: 'Address',
      peer: 'Peer',
      tipset: 'Tipset',
      message: 'Message',
      mempool: 'Mempool',
      block: 'Block',
      recentTipsets: 'Recent Tipsets',
      rich: 'Rich List',
      dealList: 'Deal List',
      deal: 'Deal Detail',
      messages: 'Message List',
      ranks: 'Top Miners',
      minerCharts: 'Miner Charts',
      tools: 'Tools',
      wiki: 'Wiki',
      notify: 'In-station notification',
      fevm: 'FEVM Stats',
      dapp: 'FEVM Dapp Status',
      token: 'Token'
    },
    description: {
      default: 'Filfox is a Filecoin blockchain explorer and data service platform, providing one-stop data services based on Filecoin, including various mining rankings, blockchain data queries, and visualization charts.'
    }
  },
  merchant: {
    website: 'Official website',
    overview: {
      title: 'Power Overview',
      qualityAdjPower: 'Adj. Storage Power',
      rank: 'Rank',
      powerDelta: '30 Days Power Growth',
      blockReward: 'Total Block Reward',
      blocksMined: 'Total Block Mined',
      minerEquivalent: 'Miner Equivalent',
      rate: 'Rate'
    },
    miner: {
      miners: 'Miners',
      qualityAdjPower: 'Adj. Storage Power',
      powerDelta: '30 Days Power Growth',
      blockReward: 'Block Reward',
      blocksMined: 'Block Mined',
      minerEquivalent: 'Miner Equivalent'
    },
    sales: {
      title: 'Sales information',
      description: 'According to the public information, please refer to the official announcement',
      issue: 'Submit issue',
      price: 'Price',
      transparent: 'Transparency Rating',
      transparentDesp: 'According to the number of public parameters in the official website,  Transparency Rating = the number of public parameters / the total number of parameters * 5, the full score is 5 points',
      detail: 'Details',
      services: 'Services',
      hardware: 'Hardware info'
    },
    unknown: 'Unknown',
    contact: 'Please send email to contact@filfox.io'
  },
  spaceRace: {
    title: 'Space Race',
    ratio: 'Percentage',
    overview: {
      title: 'Race Overview',
      headers: {
        unlockRewards: 'Unlocked Rewards',
        rawBytePower: 'Raw Byte Power',
        activeMiner: 'Active Miners',
        qualifiedMiners: 'Qualified Entities',
        entity: 'Registered Entities'
      }
    },
    ranks: {
      title: 'Ranking List',
      headers: {
        rank: 'Rank',
        entity: 'Entity',
        area: 'Region',
        minerCount: 'Miner Count',
        estimatedGlobalReward: 'Global Rewards',
        estimatedRegionRewards: 'Regional Rewards',
        estimatedBlockRewards: 'Block Rewards',
        dailyPowerDelta: '24h Power Growth',
        equivalentMiners: 'Miner Equivalent',
        totalBlockNums: 'Total Blocks Mined',
        totalBlockReward: 'Total Blocks Rewards',
        miner: 'Miners',
        rawBytePower: 'Raw Power/Percentage',
        blockNums: 'Blocks Mined/Percentage',
        dealSuccessRate: 'Storage Deal Success Rate',
        retrievalDealSuccessRate: 'Retrieval Deal Success Rate',
        sectorLifeCycle: 'Sector Life Cycle',
        done: 'OK',
        dealRetrievalRate: 'Storage/Retrieval Success Rate',
        totalReward: 'Total Rewards',
        smallMinerReward: 'Small Miner Rewards'
      },
      tips: {
        activeMiners: 'Amount of miners that has a positive raw power.',
        qualifiedMiners: 'The number of entities completed the sector life cycle and whose order successful rate is greater than 80%',
        registeredEntities: 'The number of entities that have been officially registered and verified.',
        estimatedGlobalReward: 'An estimated value. The global top 100 miners will share a total of up to 1.5 million FIL rewards based on the proportion of the miners\' raw power during the competition.',
        estimatedRegionRewards: 'An estimated value. The top 50 miners on each continent will share a total of up to 500,000 FIL rewards based on the proportion of the miners\' raw power during the competition.',
        estimatedBlockRewards: 'An estimated value. The top 20 miners with block rewards will share an additional 100,000 FIL rewards based on the proportion of block rewards',
        smallMinerReward: 'An estimated value. All miners who submitted competition registration and committed a sector before September 2nd 1200 UTC, miners who finish the competition with at least 1TiB of committed storage and qualified for rewards, will be rewarded with 500FIL (power <= 10TiB) or 1000FIL (power > 10TiB) for a minimum total reward.',
        totalReward: 'Estimated Total Rewards = Global Rewards + Regional Rewards +  Block Rewards + Small Miner Rewards'
      }
    },
    distribution: {
      title: 'Continent Distribution',
      continents: {
        all: 'All',
        AS: 'Asia',
        NA: 'North America',
        EU: 'Europe',
        SA: 'South America',
        OA: 'Oceania',
        AF: 'Africa'
      },
      headers: {
        unlockRewards: 'Unlocked Rewards',
        rawBytePower: 'Raw Byte Power',
        activeMiners: 'Active Miners'
      }
    }
  },
  wallet: {
    title: 'Wallet'
  },
  fns: {
    search: {
      title: 'Filecoin Name Lookup',
      placeholder: 'Search FNS name or address',
      failWords: 'Please enter effective domain name or address',
      resultFor: 'Result for '
    },
    registrations: {
      title: 'Filecoin Name Registrations',
      address: 'Address',
      name: 'Filecoin Name',
      expiration: 'Expiration Date',
      handle: 'Handle',
      moreDetails: 'More Details',
      seeMore: 'See More',
      fnsRecordShow: 'FNS Record',
      filecoinName: 'Filecoin Name',
      projectName: 'Project Name',
      description: 'Description'
    },
    address: {
      overview: 'Overview',
      expirationDate: 'Expiration Date',
      names: 'Names',
      reverseRecord: 'Reverse Record',
      registrant: 'Registrant',
      realatedTransactions: 'Realated Transactions',
      block: 'Block',
      actions: 'Actions',
      txHash: 'Tx Hash'
    },
    name: {
      resolvedAddress: 'Resolved Address',
      expiration: 'Expiration Date',
      registrant: 'Registrant',
      controller: 'Controller'
    }
  },
  contract: {
    reset: 'Reset',
    continue: 'Continue',
    return: 'Return to Main',
    publish: 'Verify and Publish',
    verifiedContractList: 'Verified Contract List',
    guide: {
      title: ['Verify & Publish Contract Source Code', 'COMPILER TYPE AND VERSION SELECTION'],
      tips: [
        'Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, Filfox will match the compiled code with that on the blockchain. Just like contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is supposed to do.',
        'Please be informed that advanced settings (e.g. bytecodeHash: "none" or viaIR: "true") can be accessed via Solidity (Standard-Json-Input) verification method. More information can be found under Solidity\'s \"Compiler Input and Output JSON Description\" documentation section.'
      ],
      pleaseSelect: 'Please Select',
      pleaseCenterAddress: 'Please center address',
      enterContractAddress: 'Please enter the Contract Address you would like to verify',
      selectCompiler: 'Please select Compiler Version',
      selectLicense: 'Please select Open Source License Type',
      agreeService: 'I agree to the terms of service'
    },
    verify: {
      title: ['Verify & Publish Contract Source Code', 'SELECT ONE OR MORE *.SOL FILES'],
      source: 'Contract Source Code',
      output: 'Compiler Output',
      tips: [
        'If the contract compiles correctly at REMIX, it should also compile correctly here.',
        'We have limited support for verifying contracts created by another contract and there is a timeout of up to 45 seconds for each contract compiled.',
        'For programatic contract verification, check out the Contract API Endpoint.'
      ],
      contractAddress: 'Contract Address',
      complier: 'Complier',
      optimizations: 'Optimizations',
      selectFiles: 'Select *.sol files',
      selectFilesDes: 'Select single or multiple Solidity files',
      clearFiles: 'Clear files',
      uploadMetadataFile: 'Upload a metadata.json file',
      uploadMetadataFileTo: 'to set optimizer in detail',
      uploadMetadataFileError: 'Invalid file format',
      onlyAllowOneMetadataFile: 'Only one metadata.json file can be uploaded',
      constructorArg: 'Constructor Argument',
      argTip: 'For additition information on Constructor Arguments See Our KB Entry',
      debugLog: 'Compiler debug log',
      complierVersion: 'Complier Version',
      optimizationEnabled: 'Optimization Enabled',
      evmVersion: 'Evm Version',
      viaIR: 'Via IR',
      optimizerDetails: 'Optimizer Details(Optional)',
      runs: 'Runs(Optimizer)',
      argsUsed: 'Consturctor Arguments Used',
      contractName: 'Contract Name',
      contractAbi: 'Contract ABI',
      contractBytecode: 'Contract Bytecode',
      verifyFailed: 'Verification failed',
      verifySuccess: 'Verification success',
      whatWeGot: 'What we got',
      whatWeLookingFor: 'What we looking for',
      error: {
        1: 'Source code not found: source code was not provided when calling the API',
        2: 'Contract initcode not found: backend failed to parse the initcode of the contract; the provided address when calling the API is not an EVM address',
        3: 'Compiler loading failed: invalid compiler version provided when calling the API',
        4: 'Verification failed: mismatch between source code, compiler version, optimization parameters, contract constructor arguments, EVM version, etc.; the backend verification logic is incomplete and may not consider all scenarios',
        5: 'Unsupported language: currently only supporting verification of Solidity source code files',
        6: 'Contract already verified: the contract has already been verified, no need to repeat the process',
        7: 'Compilation error'
      }
    }
  },
  notify: {
    news: 'News',
    documents: 'Documents',
    announcements: 'Announcements',
    tutorial: 'Tutorial',
    markAllRead: 'Mark all as read',
    hideReaded: 'Hide readed notifications',
    cancelHideReaded: 'Unhide'
  },
  dapp: {
    accessDapp: 'Access Dapp',
    share: 'Share',
    category: 'Category',
    description: 'Description',
    data: 'Data',
    social: 'Social',
    copyLink: 'Copy Link',
    transactionBalance: 'Gas Fee',
    activeUniqueAddress: 'Unique Address'
  }
}
