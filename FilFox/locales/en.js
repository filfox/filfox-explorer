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
      oldVersion: 'Mini version'
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
      searchPlaceHolder: "Search for Address/Block ID/Token..."
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
          "price": "Latest Price",
          "blockReward": "Block Reward",
          "averageRewardPerByte": "24h Average Mining Reward",
          "output24h": "24h FIL Production",
          "circulatingSupply": "Circulating FIL",
          "totalPledgeCollateral": "Pledged FIL",
          "accounts": "Total Accounts",
          "averageTipsetInterval": "Average Block Interval",
          "dailyMessages": "24h Messages",
          "averageTipsetBlocks": "Average Blocks per Tipset",
          "rawBytePower": "Network Raw Byte Power",
          "averageGasPrice": "Average Gas Price",
          "burntSupply": "Burnt FIL",
          "totalMarketBalance": "FIL Market Balance",
          "totalMaxSupply": "FIL Max Supply",
          "circulatingSupplyRate": "FIL Circulating Rate"
        }
      },
      "powerDistribution": {
        "title": "Storage Power Distribution"
      },
      "powerDelta": {
        "title": "24h Storage Power Growth (Top5)"
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
          "blockNums": "24h Mined Blocks",
          "powerIncrease": "24h Power Growth"
        },
        "tableHeadersByBlock": {
          "rank": "Rank",
          "miner": "Miner",
          "tag": "Tag",
          "blockNums": "Blocks Mined",
          "blockRate": "Ratio",
          "totalRewards": "Rewards",
          "luckyValue": "Lucky value"
        },
        "tableHeadersByPowerDelta": {
          "rank": "Rank",
          "miner": "Miner",
          "tag": "Tag",
          "validPower": "Daily Power Growth",
          "equivalentMiners": "Miner Equivalent",
          powerDelta:'Power growth',
          "powerIncreaseSpeed": "Adj. Power"
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
          "exitCode": "Exit Code"
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
        "title": "Message Detail",
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
          "error": "Error"
        },
        "null": "Null"
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
        "title": "Block Detail",
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
          }
        }
      },
      "peer": {
        "title": "Peer Detail",
        "headers": {
          "id": "ID",
          "miners": "Miner",
          "IP": "IP List"
        }
      }
    },
    "actor": {
      "fil/1/account": "Normal Account",
      "fil/1/cron": "Execute Scheduled Task",
      "fil/1/init": "Initiation",
      "fil/1/multisig": "Multi-Sig",
      "fil/1/paymentchannel": "Payment Channel",
      "fil/1/reward": "Reward",
      "fil/1/storagemarket": "Storage Market",
      "fil/1/storageminer": "Miner Account",
      "fil/1/storagepower": "Storage Power",
      "fil/1/system": "System",
      "fil/1/verifiedregistry": "Registry Verified"
    },
    "chart": {
      "miner": {
        "title": "Mining Charts",
        "headers": {
          "qualityAdjPowerPie": "Adj. Power Distribution",
          "qualityAdjPowerLine": "Adj. Power Veriation",
          "qualityAdjPowerDeltaLine": "Power Growth Veriation",
          "rewardLine": "Reward Veriation"
        }
      },
      "fil": {
        "title": "FIL Charts"
      }
    },
    "footer": {
      "contact": "Contact: contact@6block.com",
      "intro": "Filfox.io is a Filecoin blockchain explorer powered by 6Block.com."
    }
  }