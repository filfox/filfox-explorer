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
    currentNetwork: 'Current network: '
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
        'Mempool'
      ]
    },
    ranks: {
      title: 'Top Miners'
    },
    charts: {
      title: 'Stats',
      subMenus: [
        'Mining Charts',
        'Gas Stats'
      ]
    },
    resources: {
      title: 'Resources',
      subMenus: [
        'Tools',
        'Wiki'
      ]
    },
    searchPlaceHolder: 'Search for Block/Account/Address/Message...'
  },
  home: {
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
        totalMaxSupply: 'Total Max Supply',
        circulatingSupplyRate: 'Circulating Rate',
        sectorInitialPledge: 'Current Sector Initial Pledge',
        currentBaseFee: 'Current Base Fee'
      },
      tips: {
        qualityAdjPower: 'Total adjusted storage power (storage space) of the network.',
        activeMiners: 'Amount of miners that has a positive storage power.',
        price: 'Current price of FIL[IOU]. Data source: coingecko.com',
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
        circulatingSupplyRate: 'Circulating rate = circulating supply / max supply'
      }
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
        validPowerRate: 'Adj. Power Ratio',
        reward: '24h Reward',
        miningEfficiency: 'Mining Efficiency',
        powerIncrease: 'Power Growth'
      },
      tipsByPower: {
        miningEfficiency: 'Average FILs minted by 1 TiB storage power in last 24h.',
        powerIncrease: 'Adjusted storage power growth in last 24h.'
      },
      tableHeadersByBlock: {
        rank: 'Rank',
        miner: 'Miner',
        tag: 'Tag',
        blockNums: 'Blocks Mined',
        luckyValue: 'Lucky Value',
        totalRewards: 'Rewards',
        rewardsRatio: 'Rewards Ratio',
        validPower: 'Adj. Power Ratio'
      },
      tipsByBlock: {
        luckyValue: 'Ratio of actual blocks produced and theoretical value.',
        rewardsRatio: 'The ratio of block rewards earnd by a certain miner and total block rewards in the selected period.'
      },
      tableHeadersByPowerDelta: {
        rank: 'Rank',
        miner: 'Miner',
        tag: 'Tag',
        powerIncreaseSpeed: 'Daily Power Growth',
        equivalentMiners: 'Miner Equivalent',
        powerDelta: 'Power Growth',
        validPower: 'Adj. Power'
      },
      tipsByPowerDelta: {
        equivalentMiners: "Take the official benchmark environment as the baseline (AMD Ryzen Threadripper 3970X, NVidia GTX 2080Ti, 128GB 2133mhz), we estamate the miner's machine amount by calculate the ratio of its storage power growth and the baseline.",
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
        penalty: 'Penalty'
      },
      total: 'Total',
      transaction: 'transactions'
    },
    message: {
      title: 'Message Details',
      modules: {
        overview: 'Overview',
        transfer: 'Transactions',
        others: 'Others'
      },
      headers: {
        cid: 'Message ID',
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
        gasPrice: 'Gas Price',
        gasLimit: 'Gas Limit',
        gasUsed: 'Gas Used',
        exitCode: 'Status',
        return: 'Return',
        error: 'Error Message'
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
      normal: {
        title: 'Address',
        headers: {
          overview: 'Address Overview',
          address: 'Address',
          actor: 'Actor',
          balance: 'Balance',
          messages: 'Messages',
          createTime: 'Create Time',
          lastSeenTime: 'Latest Transaction',
          ownedMiners: 'Owned Miner',
          workers: 'Active Miner'
        }
      },
      miner: {
        sectors: {
          total: 'total',
          active: 'active',
          faults: 'faults',
          recoveries: 'recoveries'
        },
        minerOverview: {
          title: 'Miner Overview',
          headers: {
            balance: 'Address Balance',
            availableBalance: 'Available Balance',
            pledgeBalance: 'Pledged Balance',
            miningPenalty: 'Penalty',
            qualityAdjPower: 'Adjusted Power',
            rawBytePower: 'Raw Byte Power',
            rate: 'Rate',
            rank: 'Rank',
            sectorSize: 'Sector Size',
            sectors: 'Sector Status',
            blockNums: 'Blocks Mined',
            blocksReward: 'Total Reward'
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
            miningEfficiency: 'Mining Efficiency',
            luckyValue: 'Lucky Value'
          }
        },
        accountChange: {
          title: 'Account Change',
          charts: {
            balance: 'Total Balance',
            availableBalance: 'Available Balance',
            pledgeBalance: 'Pledged Balance'
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
            ip: 'Region(Public IP)'
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
    }
  },
  actor: {
    'fil/1/account': 'Account',
    'fil/1/cron': 'Cron',
    'fil/1/init': 'Init',
    'fil/1/multisig': 'Multisig',
    'fil/1/paymentchannel': 'Payment Channel',
    'fil/1/reward': 'Reward',
    'fil/1/storagemarket': 'Storage Market',
    'fil/1/storageminer': 'Storage Miner',
    'fil/1/storagepower': 'Storage Power',
    'fil/1/system': 'System',
    'fil/1/verifiedregistry': 'Verified Registry'
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
    }
  },
  footer: {
    contact: 'Contact: contact@filfox.io',
    intro: 'Filfox is a Filecoin blockchain browser and data service platform, providing one-stop data services based on Filecoin, including various mining rankings, blockchain data queries, and visualization charts.'
  },
  tag: {
    apply: 'Claim account',
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
    specialNotes: 'Special notes: sensitive workds, prohibited words, celebrity names, etc. are not allowed in account names. If there is any violation, the signature will be deleted and prohibited. Thank you for your cooperation.',
    errorInput: 'Please input',
    success: 'Successfully signed! Please reload this page to see.',
    signed: 'V icon indicates that the account has completed the signature verification of the owner.'
  },
  meta: {
    titles: {
      filfox: 'Filfox',
      indexTitle: 'Filfox - Filecoin browser',
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
      wiki: 'Wiki'
    },
    description: {
      default: 'Filfox is a Filecoin blockchain browser and data service platform, providing one-stop data services based on Filecoin, including various mining rankings, blockchain data queries, and visualization charts.'
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
    overview: {
      title: 'Overview',
      headers: {
        unlockRewards: '已解锁全球',
        counting: '结束倒计时',
        rawBytePower: '全网原值算力',
        activeMiner: '活跃矿工'
      }
    },
    ranks: {
      title: '矿工排行榜',
      headers: {
        rank: '排名',
        entity: '实体',
        area: '地区',
        minerCount: '矿工数',
        rawBytePower: '原值算力/占比',
        estimatedReward: '预计大洲奖励',
        estimatedBlocksRewards: '预计区块奖励',
        dailyPowerDelta: '24h算力增速',
        equivalentMiners: '矿机当量',
        totalBlockNums: '总出块数',
        totalBlockReward: '总出块奖励',
        miner: '名下矿工',
        blockNums: '累计出块数/占比',
        dealSuccessRate: '储存成功率',
        retrievalDealSuccessRate: '检索成功率',
        sectorUpgrade: '扇区升级'
      }
    },
    distribution: {
      title: '大洲分布',
      continents: {
        all: '全部',
        AS: '亚洲',
        NA: '北美洲',
        EU: '欧洲',
        SA: '南美洲',
        OA: '大洋洲',
        AF: '非洲'
      },
      headers: {
        unlockRewards: '解锁奖励',
        rawBytePower: '原值算力',
        activeMiners: '活跃矿工'
      }
    }
  }
}
