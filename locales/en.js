export default {
    "shared": {
      tableEmptyText: "N/A",
      time: {
        justNow: "Just Now",
        hour: " hour ",
        min: " min ",
        sec: " sec",
        ago: " ago",
        day: " day ",
        year: " year "
      },
      more: "More",
      unknown: "Unknown",
      noSearchResult: "No Result",
      empty: "Empty",
      notAvailable: 'Coming Soon',
      oldVersion: 'Mini version',
      copySuccess: 'Copied',
      submit: 'Submit',
      backToHome: 'Back to home page',
      currentNetwork: 'Current network: '
    },
    nav: {
      home: {
        title: "Home"
      },
      blocks: {
        title: "Blockchain",
        subMenus: [
          "Tipsets",
          "Messages",
          "Rich List"
        ]
      },
      ranks: {
        title: "Top Miners"
      },
      charts: {
        title: "Charts",
        subMenus: [
          "Mining Charts",
          "FIL Charts"
        ]
      },
      resources: {
        title: "Resources",
        subMenus: [
          "Tools",
          "Wiki"
        ]
      },
      searchPlaceHolder: "Search for Block/Account/Address/Message..."
    },
    "home": {
      "overview": {
        "title": "Network Overview",
        "unfoldBtn": "Unfold",
        "foldBtn": "Fold",
        "titles": {
          "height": "Block Height",
          "timestamp": "Latest Block",
          "qualityAdjPower": "Network Storage Power",
          "activeMiners": "Active Miners",
          "price": "Current Price",
          "blockReward": "Block Reward",
          "averageRewardPerByte": "24h Average Mining Reward",
          "output24h": "24h FIL Production",
          "circulatingSupply": "Circulating Supply",
          "totalPledgeCollateral": "Total Pledge Collateral",
          "accounts": "Total Accounts",
          "averageTipsetInterval": "Average Block Interval",
          "dailyMessages": "24h Messages",
          "averageTipsetBlocks": "Average Blocks per Tipset",
          "rawBytePower": "Network Raw Byte Power",
          "averageGasPrice": "Average Gas Price",
          "burntSupply": "Burnt FIL",
          "totalMarketBalance": "Total Market Balance",
          "totalMaxSupply": "Total Max Supply",
          "circulatingSupplyRate": "Circulating Rate",
          "sectorInitialPledge": "Current Sector Initial Pledge"
        },
        tips: {
            qualityAdjPower:'Total adjusted storage power (storage space) of the network.',
            activeMiners: 'Amount of miners that has a positive storage power.',
            price:'Current price of FIL[IOU]. Data source: coingecko.com',
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
        }
      },
      "powerDistribution": {
        "title": "Storage Power Distribution"
      },
      "powerDelta": {
        "title": "Daily Storage Power Growth (Top 5)"
      },
      "minerRanks": {
        "title": "Top Miners",
        rate: 'Rate',
        "filters": {
          "qualityAdjPower": "Adj. Power",
          "blocks": "Blocks Mined",
          "powerDelta": "Growth"
        },
        "tableHeadersByPower": {
          "rank": "Rank",
          "miner": "Miner",
          "tag": "Tag",
          "validPower": "Adj. Power",
          "validPowerRate": "Adj. Power Ratio",
          reward: "24h Reward",
          miningEfficiency: 'Mining Efficiency',
          "powerIncrease": "Power Growth"
        },
        tipsByPower: {
            miningEfficiency: 'Average FILs minted by 1 TiB storage power in last 24h.',
            powerIncrease: 'Adjusted storage power growth in last 24h.'
        },
        "tableHeadersByBlock": {
          "rank": "Rank",
          "miner": "Miner",
          "tag": "Tag",
          "blockNums": "Blocks Mined",
          "luckyValue": "Lucky Value",
          "totalRewards": "Rewards",
          rewardsRatio: "Rewards Ratio",
        },
        tipsByBlock: {
            luckyValue: 'Ratio of actual blocks produced and theoretical value.',
            rewardsRatio: 'The ratio of block rewards earnd by a certain miner and total block rewards in the selected period.'
        },
        tableHeadersByPowerDelta: {
          "rank": "Rank",
          "miner": "Miner",
          "tag": "Tag",
          "powerIncreaseSpeed": "Daily Power Growth",
          "equivalentMiners": "Miner Equivalent",
          powerDelta:'Power Growth',
          validPower: "Adj. Power"
        },
        tipsByPowerDelta: {
            equivalentMiners: "Take the official benchmark environment as the baseline (AMD Ryzen Threadripper 3970X, NVidia GTX 2080Ti, 128GB 2133mhz), we estamate the miner's machine amount by calculate the ratio of its storage power growth and the baseline.",
            powerIncreaseSpeed: "Daily adjusted storage power growth of a miner.",
            powerDelta: "Miner's adjusted storage power increment in the selected period.",
        },
        "moreBtn": "More"
      },
      "recentTipsets": {
        "title": "Latest Tipsets",
        "tableHeaders": {
          "height": "Height",
          "blockId": "Block ID",
          "miner": "Miner",
          "tag": "Tag",
          "message": "Messages",
          "award": "Reward"
        }
      },
      "richManRanks": {
        "title": "Rich List",
        "tableHeaders": {
          "order": "Rank",
          "address": "Address",
          "tag": "Tag",
          "balance": "Balance",
          "balanceRate": "Balance Ratio"
        }
      }
    },
    "blockchain": {
      "block": {
        "title": "Tipsets List",
        "tableHeaders": {
          "height": "Height",
          miner: 'Miner',
          "time": "Time",
          "size": "Size",
          "hash": "Hash",
          "miner": "Miner",
          "tag": "Tag",
          "message": "Messages",
          "award": "Reward"
        }
      },
      "message": {
        "title": "Message List",
        "info": {
          "total": "Total",
          "messages": "Messages"
        },
        "tableHeaders": {
          "id": "Message ID",
          "height": "Height",
          "time": "Time",
          "from": "From",
          "to": "To",
          "method": "Method",
          "value": "Value",
          "exitCode": "Status"
        },
        "methods": {
          "all": "All"
        }
      },
      "richList": {
        "title": "Rich List",
        "info": {
          "total": "Total",
          "accounts": "Acccounts"
        },
        "tableHeaders": {
          "order": "Rank",
          "address": "Address",
          "balance": "Balance",
          "balanceRate": "Balance Ratio",
          "tag": "Tag",
          "type": "Type",
          "createTime": "Create Time",
          "lastSeenTime": "Last Seen Time"
        },
        "type": {
          "all": "All",
          "normal": "Normal Acccount",
          "miner": "Miner Account"
        }
      }
    },
    "detail": {
      "message": {
        "title": "Message Details",
        "headers": {
          "cid": "Message ID",
          "height": "Height",
          "time": "Time",
          "inBlocks": "Block",
          "version": "Version",
          "from": "From",
          "to": "To",
          "nonce": "Nonce",
          "method": "Method",
          "params": "Parameters",
          "value": "Value",
          "gasPrice": "Gas Price",
          "gasLimit": "Gas Limit",
          "gasUsed": "Gas Used",
          "exitCode": "Status",
          "return": "Return",
          "error": "Error Message"
        },
        "null": "(Null)"
      },
      "tipset": {
        "title": "Tipset Height",
        "all": "All",
        "headers": {
          "time": "Time",
          "size": "Size",
          "totalMsgCount": "Total Messages",
          "id": "Block ID",
          "miner": "Miner",
          "tag": "Tag",
          "bonus": "Reward",
          "messageCount": "Messages"
        }
      },
      "block": {
        "title": "Block Details",
        "overview": "Block Overview",
        "headers": {
          "cid": "Block ID",
          "height": "Height",
          "time": "Time",
          "size": "Size",
          "messages": "Messages",
          "reward": "Reward",
          "miner": "Miner",
          "parents": "Parent Block",
          "parentWeight": "Parent Block Weight",
          "penalty": "Penalty"
        }
      },
      "address": {
        "normal": {
          "title": "Address",
          "headers": {
            "overview": "Address Overview",
            "address": "Address",
            "actor": "Actor",
            "balance": "Balance",
            "messages": "Messages",
            "createTime": "Create Time",
            "lastSeenTime": "Latest Transaction",
            "ownedMiners": "Owned Miner",
            "workers": "Active Miner"
          }
        },
        "miner": {
          "minerOverview": {
            "title": "Miner Overview",
            "headers": {
              "balance": "Address Balance",
              "availableBalance": "Available Balance",
              "pledgeBalance": "Pledged Balance",
              "miningPenalty": "Penalty",
              "qualityAdjPower": "Adjusted Power",
              "rawBytePower": "Raw Byte Power",
              "rate": "Rate",
              "rank": "Rank",
              "sectorSize": "Sector Size",
              "blockNums": "Blocks Mined",
              "blocksReward": "Total Reward",
              "qualityAdjPowerDelta24h": "24h Adj. Power Growth",
              "qualityAdjPowerDeltaSpeed24h": "24h Adj. Power Growth Rate"
            }
          },
          "accountChange": {
            "title": "Account Change",
            "charts": {
              "balance": "Total Balance",
              "availableBalance": "Available Balance",
              "pledgeBalance": "Pledged Balance"
            }
          },
          "powerChange": {
            "title": "Power Change",
            "charts": {
              "qualityAdjPower": "Adj. Storage Power",
              "qualityAdjPowerDelta": "Adj. Storage Power Growth"
            }
          },
          "accountOverview": {
            "title": "Account Overview",
            "headers": {
              "address": "Address",
              "actor": "Actor",
              "messageCount": "Messages",
              "owner": "Owner",
              "worker": "Worker",
              "peerID": "Peer ID",
              "sectors": "Sector",
              "createTime": "Create Time"
            }
          },
          blockList: {
            total: 'Total',
            tipsets: 'Tipsets',
            height: 'Height',
            hash: 'Block Hash',
            reward: 'Reward',
            time: 'Time',
            messages: 'Messages Count',
            blockSize: 'Block Size'
        }
        }
      },
      "peer": {
        "title": "Peer Details",
        "headers": {
          "id": "ID",
          "miners": "Miner",
          "IP": "IP List"
        }
      }
    },
    "actor": {
      "fil/1/account": "Account",
      "fil/1/cron": "Cron",
      "fil/1/init": "Init",
      "fil/1/multisig": "Multisig",
      "fil/1/paymentchannel": "Payment Channel",
      "fil/1/reward": "Reward",
      "fil/1/storagemarket": "Storage Market",
      "fil/1/storageminer": "Storage Miner",
      "fil/1/storagepower": "Storage Power",
      "fil/1/system": "System",
      "fil/1/verifiedregistry": "Verified Registry"
    },
    "chart": {
      "miner": {
        "title": "Mining Charts",
        "headers": {
          "qualityAdjPowerPie": "Adj. Power Distribution",
          "qualityAdjPowerLine": "Adj. Power Variations",
          "qualityAdjPowerDeltaLine": "Power Growth Variations",
          "rewardLine": "Reward Variations"
        }
      },
      "fil": {
        "title": "FIL Charts"
      }
    },
    "footer": {
      "contact": "Contact: contact@filfox.info",
      "intro": 'Filfox is a Filecoin blockchain explorer and data service platform, providing one-stop data services based on Filecoin, including various mining rankings, blockchain data queries, and visualization charts.'
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
      signature: 'Signature',
      snamePlaceholder: 'Cannot over 16 characters',
      namePlaceholder: 'Optional',
      contactPlaceHolder: 'Email, Cell phone...',
      signaturePlaceHolder: 'Please copy the above message, sign it with Filecoin wallet, and enter the signature',
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
          block: 'Block',
          recentTipsets: 'Recent Tipsets',
          rich: 'Rich List',
          messages: 'Message List',
          ranks: 'Top Miners',
          minerCharts: 'Miner Charts',
          tools: 'Tools',
          wiki: 'Wiki',
      },
      description: {
        default: "Filfox is a Filecoin blockchain explorer and data service platform, providing one-stop data services based on Filecoin, including various mining rankings, blockchain data queries, and visualization charts."
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
          minerEquivalent: 'Miner Equivalent',
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
          hardware: 'Hardware info',
      },
      unknown: 'Unknown',
      contact: 'Please send email to contact@filfox.info'
    }
  }
