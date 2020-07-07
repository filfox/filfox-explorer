export default {
    "shared": {
      tableEmptyText: "N/A",
      time: {
        justNow: "Just now",
        hour: " hour ",
        min: " min ",
        sec: " sec",
        ago: " ago",
        day: " day ",
        year: " year "
      },
      more: "More",
      unknown: "Unknown",
      noSearchResult: "No result",
      empty: "Empty",
      notAvailable: 'Coming Soon'
    },
    nav: {
      home: {
        title: "Home"
      },
      blocks: {
        title: "Blockchain",
        subMenus: [
          "Block",
          "Message",
          "Rich list"
        ]
      },
      ranks: {
        title: "Top miners"
      },
      charts: {
        title: "Charts",
        subMenus: [
          "Mining charts",
          "FIL charts"
        ]
      },
      resources: {
        title: "Resources",
        subMenus: [
          "Tools",
          "Wiki"
        ]
      },
      searchPlaceHolder: "Search for Address/Block ID/Token..."
    },
    "home": {
      "overview": {
        "title": "Network overview",
        "unfoldBtn": "Unfold",
        "foldBtn": "Fold",
        "titles": {
          "height": "Block height",
          "timestamp": "Latest block",
          "qualityAdjPower": "Network storage power",
          "activeMiners": "Active miners",
          "price": "Latest price",
          "blockReward": "Block reward",
          "averageRewardPerByte": "24h average mining reward",
          "output24h": "24h FIL production",
          "circulatingSupply": "Circulating FIL",
          "totalPledgeCollateral": "Pledged FIL",
          "accounts": "Total accounts",
          "averageTipsetInterval": "Average block interval",
          "dailyMessages": "24h messages",
          "averageTipsetBlocks": "Average blocks per tipset",
          "rawBytePower": "Network raw byte power",
          "averageGasPrice": "Average gas price",
          "burntSupply": "Burnt FIL",
          "totalMarketBalance": "FIL market balance",
          "totalMaxSupply": "FIL max supply",
          "circulatingSupplyRate": "FIL circulating rate"
        }
      },
      "powerDistribution": {
        "title": "Storage power distribution"
      },
      "powerDelta": {
        "title": "24h storage power growth (Top5)"
      },
      "minerRanks": {
        "title": "Top miners",
        rate: 'Rate',
        "filters": {
          "qualityAdjPower": "Adj. power",
          "blocks": "Blocks mined",
          "powerDelta": "Growth"
        },
        "tableHeadersByPower": {
          "rank": "Rank",
          "miner": "Miner",
          "tag": "Tag",
          "validPower": "Adj. power",
          "validPowerRate": "Adj. power ratio",
          "blockNums": "24h mined blocks",
          "powerIncrease": "24h Power growth"
        },
        "tableHeadersByBlock": {
          "rank": "Rank",
          "miner": "Miner",
          "tag": "Tag",
          "blockNums": "Blocks mined",
          "blockRate": "Ratio",
          "totalRewards": "Rewards",
          "luckyValue": "Lucky value"
        },
        "tableHeadersByPowerDelta": {
          "rank": "Rank",
          "miner": "Miner",
          "tag": "Tag",
          "validPower": "Daily power growth",
          "equivalentMiners": "Miner equivalent",
          powerDelta:'Power growth',
          "powerIncreaseSpeed": "Adj. Power"
        },
        "moreBtn": "More"
      },
      "recentTipsets": {
        "title": "Latest tipsets",
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
          "balanceRate": "Balance ratio"
        }
      }
    },
    "blockchain": {
      "block": {
        "title": "Block List",
        "tableHeaders": {
          "height": "Height",
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
        "title": "Message list",
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
          "exitCode": "Exit code"
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
          "balanceRate": "Balance ratio",
          "tag": "Tag",
          "type": "Type",
          "createTime": "Create time",
          "lastSeenTime": "Last seen time"
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
        "title": "Message detail",
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
          "gasPrice": "Gas price",
          "gasLimit": "Gas limit",
          "gasUsed": "Gas used",
          "exitCode": "Status",
          "return": "Return",
          "error": "Error"
        },
        "null": "Null"
      },
      "tipset": {
        "title": "Tipset height",
        "all": "All",
        "headers": {
          "time": "Time",
          "size": "Size",
          "totalMsgCount": "Total messages",
          "id": "Block ID",
          "miner": "Miner",
          "tag": "Tag",
          "bonus": "Reward",
          "messageCount": "Messages"
        }
      },
      "block": {
        "title": "Block detail",
        "overview": "Block overview",
        "headers": {
          "cid": "Block ID",
          "height": "Height",
          "time": "Time",
          "size": "Size",
          "messages": "Messages",
          "reward": "Reward",
          "miner": "Miner",
          "parents": "Parent block",
          "parentWeight": "Parent weight",
          "penalty": "Penalty"
        }
      },
      "address": {
        "normal": {
          "title": "Address",
          "headers": {
            "overview": "Address overview",
            "address": "Address",
            "actor": "Actor",
            "balance": "Balance",
            "messages": "Messages",
            "createTime": "Create time",
            "lastSeenTime": "Latest seen time",
            "ownedMiners": "Owned Miner",
            "workers": "Active miner"
          }
        },
        "miner": {
          "minerOverview": {
            "title": "Miner overview",
            "headers": {
              "balance": "Address balance",
              "availableBalance": "Available balance",
              "pledgeBalance": "Pledged balance",
              "miningPenalty": "Penalty",
              "qualityAdjPower": "Adjusted power",
              "rawBytePower": "Raw byte power",
              "rate": "Rate",
              "rank": "Rank",
              "sectorSize": "Sector size",
              "blockNums": "Blocks mined",
              "blocksReward": "Total reward",
              "qualityAdjPowerDelta24h": "24h Adj. power growth",
              "qualityAdjPowerDeltaSpeed24h": "24h Adj. power growth rate"
            }
          },
          "accountChange": {
            "title": "Account Change",
            "charts": {
              "balance": "Total balance",
              "availableBalance": "Available balance",
              "pledgeBalance": "Pledged balance"
            }
          },
          "powerChange": {
            "title": "Power change",
            "charts": {
              "qualityAdjPower": "Adj. storage power",
              "qualityAdjPowerDelta": "Adj. storage power growth"
            }
          },
          "accountOverview": {
            "title": "Account overview",
            "headers": {
              "address": "Address",
              "actor": "Actor",
              "messageCount": "Messages",
              "owner": "Owner",
              "worker": "Worker",
              "peerID": "Peer ID",
              "sectors": "Sector",
              "createTime": "Create time"
            }
          }
        }
      },
      "peer": {
        "title": "Peer detail",
        "headers": {
          "id": "ID",
          "miners": "Miner",
          "IP": "IP list"
        }
      }
    },
    "actor": {
      "fil/1/account": "Normal account",
      "fil/1/cron": "Execute scheduled task",
      "fil/1/init": "Initiation",
      "fil/1/multisig": "Multi-Sig",
      "fil/1/paymentchannel": "Payment channel",
      "fil/1/reward": "Reward",
      "fil/1/storagemarket": "Storage market",
      "fil/1/storageminer": "Miner account",
      "fil/1/storagepower": "Storage power",
      "fil/1/system": "System",
      "fil/1/verifiedregistry": "Registry verified"
    },
    "chart": {
      "miner": {
        "title": "Mining Charts",
        "headers": {
          "qualityAdjPowerPie": "Adj. Power distribution",
          "qualityAdjPowerLine": "Adj. Power veriation",
          "qualityAdjPowerDeltaLine": "Power growth veriation",
          "rewardLine": "Reward veriation"
        }
      },
      "fil": {
        "title": "FIL charts"
      }
    },
    "footer": {
      "contact": "Contact: contact@6block.com",
      "intro": "Filfox.io is a Filecoin blockchain explorer powered by 6Block.com."
    }
  }