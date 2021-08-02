export default {
  shared: {
    tableEmptyText: '暂无数据',
    time: {
      justNow: '刚刚',
      hour: '时',
      min: '分',
      sec: '秒',
      ago: '前',
      day: '天',
      year: '年'
    },
    more: '更多',
    unknown: '未知',
    noSearchResult: '无法搜寻到此内容',
    empty: '无',
    notAvailable: '功能暂未开放，敬请期待',
    oldVersion: '旧版入口',
    copySuccess: '复制成功',
    submit: '确定并提交',
    backToHome: '回到首页',
    currentNetwork: '当前网络:'
  },
  nav: {
    home: {
      title: '首页'
    },
    blocks: {
      title: '区块链',
      subMenus: ['区块', '消息', '富豪榜', '订单', '内存池']
    },
    ranks: {
      title: '排行榜'
    },
    charts: {
      title: '统计',
      subMenus: ['存储服务图表', 'Gas 统计', 'Lotus版本分布']
    },
    resources: {
      title: '资源',
      subMenus: ['常用工具', '知识库']
    },
    searchPlaceHolder: '搜索区块/账户/地址/消息...'
  },
  home: {
    overview: {
      title: '全网概览',
      unfoldBtn: '展开全部',
      foldBtn: '收起',
      titles: {
        height: '区块高度',
        timestamp: '最新区块时间',
        qualityAdjPower: '全网有效算力',
        activeMiners: '活跃存储提供者',
        price: '最新价格',
        blockReward: '每区块奖励',
        averageRewardPerByte: '24h平均提供存储服务收益',
        output24h: '近24h产出量',
        circulatingSupply: 'FIL流通量',
        totalPledgeCollateral: 'FIL质押量',
        accounts: '总账户数',
        averageTipsetInterval: '平均区块间隔',
        dailyMessages: '24h消息数',
        averageTipsetBlocks: '平均每高度区块数量',
        rawBytePower: '全网原值算力',
        averageGasPrice: '平均gas费率',
        burntSupply: 'FIL销毁量',
        totalMarketBalance: '订单锁定量',
        totalMaxSupply: 'FIL总供给量',
        circulatingSupplyRate: 'FIL流通率',
        sectorInitialPledge: '当前扇区质押量',
        currentBaseFee: '当前基础费率',
        sealCost: '新增算力成本'
      },
      tips: {
        qualityAdjPower: '当前全网有效算力（有效存储空间）的总和',
        activeMiners: '当前有效算力值大于0的矿工数',
        price: 'FIL最新价格，数据来源Coingecko',
        blockReward: '当前高度下的区块奖励，每个高度有多个区块，每个区块均可获得该奖励',
        averageRewardPerByte: '近24h每个高度出块奖励与有效算力比值的均值',
        output24h: '近24h累计提供存储服务产出的FIL数量',
        circulatingSupply: '当前自由流通的FIL总和',
        totalPledgeCollateral: '当前提供存储服务所质押的FIL总和',
        averageTipsetInterval: '近24h出块的平均时间间隔',
        averageTipsetBlocks: '近24h相同高度下的平均区块数量',
        rawBytePower: '当前全网算力（存储空间）的总和',
        averageGasPrice: '近24h网络消耗gas的平均费率',
        totalMarketBalance: '在储存市场内发起订单时被锁定的FIL数量',
        circulatingSupplyRate: '流通率=流通量/总供给量',
        sealCost: '新增算力锁需要花费的成本，包括扇区质押和封装手续费'
      }
    },
    powerDistribution: {
      title: '有效算力分布'
    },
    powerDelta: {
      title: '每日算力增量（Top5）'
    },
    baseFee: {
      title: '24h基础手续费率走势'
    },
    minerRanks: {
      title: '存储服务排行榜',
      rate: '占比',
      filters: {
        qualityAdjPower: '有效算力',
        blocks: '出块数',
        powerDelta: '算力增速'
      },
      tableHeadersByPower: {
        rank: '排名',
        miner: '存储提供者',
        tag: '标签',
        validPower: '有效算力',
        rate: '占比',
        validPowerRate: '有效算力占比',
        reward: '24h出块奖励',
        miningEfficiency: '24h存储效率',
        powerIncrease: '24h算力增量',
        location: '地区'
      },
      tipsByPower: {
        miningEfficiency: '近24h存储服务提供者平均每T算力所产出的FIL数量',
        powerIncrease: '近24h存储服务提供者有效算力的增量'
      },
      tableHeadersByBlock: {
        rank: '排名',
        miner: '存储提供者',
        tag: '标签',
        blockNums: '出块份数',
        luckyValue: '幸运值',
        totalRewards: '出块奖励',
        rate: '占比',
        rewardsRatio: '出块奖励占比',
        validPower: '有效算力占比',
        location: '地区'
      },
      tipsByBlock: {
        luckyValue: '实际爆块数量和理论爆块数量的比值。若存储提供者有效算力低于1PiB，则该值存在较大随机性，仅供参考。',
        rewardsRatio: '在选定周期内，存储提供者获得出块奖励与累计产出区块奖励的比值',
        winCount: 'Filecoin提供存储服务模型中，一个高度（tipset）下可能有多个区块（block），每个区块可能获得多份奖励（win count）。累计出块份数=每次出块获得奖励份数的总和',
        blocksMined: '出块数 = 提供存储服务出块数量（block）的总和',
        miningEfficiency: '选定周期内，存储提供者累计出块奖励与有效算力的比值'
      },
      tableHeadersByPowerDelta: {
        rank: '排名',
        miner: '存储提供者',
        tag: '标签',
        powerIncreaseSpeed: '算力增速',
        equivalentMiners: '存储节点当量',
        powerDelta: '算力增量',
        validPower: '有效算力',
        location: '地区'
      },
      tipsByPowerDelta: {
        equivalentMiners: '以官方Benchmark推荐配置（AMD Ryzen Threadripper 3970X、NVidia GTX 2080Ti、128GB 2133mhz）视为1台基准存储节点，存储节点当量为该存储提供者换算成标准存储节点的数量（存储提供者的算力增速与该基准存储节点增速的比值）。',
        powerIncreaseSpeed: '选定周期内，平均每天完成封装扇区的有效算力总和',
        powerDelta: '在选定周期内，存储提供者的有效算力增量'
      },
      moreBtn: '查看更多'
    },
    recentTipsets: {
      title: '最新区块',
      tableHeaders: {
        height: '高度',
        blockId: '区块ID',
        miner: '存储提供者',
        tag: '标签',
        message: '消息',
        award: '奖励'
      }
    },
    richManRanks: {
      title: '富豪榜',
      tableHeaders: {
        order: '排名',
        address: '地址',
        tag: '标签',
        balance: '余额',
        balanceRate: '余额占比'
      }
    },
    partner: '合作伙伴'
  },
  blockchain: {
    block: {
      title: '区块列表',
      tableHeaders: {
        height: '高度',
        miner: '存储提供者',
        time: '时间',
        size: '区块大小',
        hash: 'ID',
        tag: '标签',
        message: '消息',
        award: '奖励'
      }
    },
    message: {
      title: '消息列表',
      info: {
        total: '共',
        messages: '条消息'
      },
      tableHeaders: {
        id: '消息ID',
        height: '区块高度',
        time: '时间',
        from: '发送方',
        to: '接收方',
        method: '方法',
        value: '金额',
        gasPrice: 'Gas 价格',
        gasLimit: 'Gas 限额',
        exitCode: '状态'
      },
      methods: {
        all: '全部'
      }
    },
    richList: {
      title: '富豪榜',
      info: {
        total: '共',
        accounts: '个账户'
      },
      tableHeaders: {
        order: '排名',
        address: '账户名',
        balance: '余额',
        balanceRate: '余额占比',
        tag: '标签',
        type: '类型',
        createTime: '创建时间',
        lastSeenTime: '最新交易'
      },
      type: {
        all: '全部类型',
        normal: '普通账户',
        miner: '存储提供者账户'
      }
    },
    dealList: {
      title: '订单列表',
      searchPlaceHolder: '搜索 客户/托管者',
      verifiedTips: '表示官方认证客户发起的文件订单，该订单有效算力约等于十倍原算力',
      info: {
        total: '共',
        deals: '个订单'
      },
      tableHeaders: {
        id: '订单ID',
        createdTime: '创建时间',
        client: '客户',
        provider: '托管者',
        verifiedDeal: '已验证',
        size: '文件大小',
        storagePrice: '存储费用',
        status: '状态'
      }
    },
    mempool: {
      title: '内存池消息列表'
    }
  },
  detail: {
    deal: {
      title: '订单详情',
      overview: '订单概览',
      storageDetail: '托管详情',
      headers: {
        id: '订单ID',
        createTime: '创建时间',
        block: '所属区块',
        message: '所属消息',
        cid: '文件Cid',
        verified: '已验证',
        status: '状态',
        client: '客户',
        provider: '托管存储提供者',
        collateral: '质押金额',
        fee: '托管费用',
        to: '至'
      }
    },
    transfer: {
      title: '转账列表',
      tableHeaders: {
        time: '时间',
        message: '消息ID',
        from: '发送方',
        to: '接收方',
        income: '净收入',
        type: '类型'
      },
      types: {
        genesis: '创世块生成',
        fee: '手续费',
        burn: '销毁',
        reward: '区块奖励',
        send: '发出',
        receive: '接收',
        transfer: '转账',
        'miner-fee': '存储提供者手续费',
        'burn-fee': '销毁手续费',
        penalty: '惩罚',
        rebalance: '余额重置'
      },
      total: '共',
      transaction: '条转账'
    },
    message: {
      title: '消息详情',
      modules: {
        overview: '消息概览',
        transfer: '转账信息',
        others: '其他信息'
      },
      headers: {
        cid: '消息ID',
        height: '高度',
        time: '时间',
        createTime: '创建时间',
        inBlocks: '所属区块',
        version: '版本',
        from: '发送方',
        to: '接收方',
        nonce: 'Nonce',
        method: '方法',
        params: '参数',
        value: '金额',
        gasPrice: 'Gas 价格',
        gasLimit: 'Gas 限额',
        gasUsed: 'Gas 使用量',
        exitCode: '状态',
        return: '返回值',
        error: '错误信息'
      },
      transfer: {
        from: '发送方',
        to: '接收方',
        value: '金额',
        type: '类型'
      },
      description: {
        transfer: '{sender} 将 {value} 转入 {receiver}',
        'create-account': '{createBy} 创建了{actor} {idAddress}',
        'create-account:transfer': '{createBy} 创建了{actor} {idAddress} 并转入 {value}'
      },
      tips: {
        gasFeeCap: '用户选择支付的总手续费率',
        gasPremium: '用户选择支付给存储提供者的手续费率',
        gasLimit: '该笔交易能消耗的最大Gas量',
        gasUsed: '完成这笔交易真实消耗的Gas量',
        baseFee: '根据区块链网络拥堵状况实时更新的基础手续费率',
        baseFeeBurn: '该笔交易的基础销毁手续费',
        overEstimationBurn: '因Gas限额超出Gas使用量的10%，需要额外销毁的手续费',
        minerTip: '存储提供者获得的手续费。Miner Tip = Gas Premium * Gas 使用量',
        minerPenalty: '当Gas Fee Cap低于基础手续费率时，其消耗手续费的差额将作为Miner Penalty来抵扣'
      },
      null: '(无)'
    },
    tipset: {
      title: '区块高度',
      all: '所有区块',
      headers: {
        time: '区块时间',
        size: '大小',
        totalMsgCount: '累计消息数（去重）',
        id: '区块ID',
        miner: '存储提供者',
        tag: '标签',
        bonus: '奖励',
        messageCount: '消息数'
      }
    },
    block: {
      title: '区块详情',
      overview: '区块概览',
      headers: {
        cid: '区块ID',
        height: '高度',
        time: '时间',
        size: '大小',
        messages: '消息',
        reward: '奖励',
        winCount: '奖励份数',
        miner: '存储提供者',
        parents: '父区块',
        parentWeight: '父区块权重',
        penalty: '罚金'
      }
    },
    address: {
      normal: {
        title: '账户',
        headers: {
          overview: '账户概览',
          address: '地址',
          actor: '类型',
          balance: '余额',
          messages: '消息数',
          createTime: '创建时间',
          lastSeenTime: '最新交易',
          ownedMiners: '名下存储提供者',
          workers: '实际工作存储提供者'
        }
      },
      miner: {
        sectors: {
          total: '全部',
          active: '有效',
          faults: '错误',
          recoveries: '恢复中'
        },
        tips: {
          lotus: '该存储提供者当前使用的lotus版本，绿色代表使用的是最新版本的Lotus代码，红色代表非最新版本，点击可查看官方最新版本代码发布情况'
        },
        minerOverview: {
          title: '存储提供者概览',
          headers: {
            balance: '账户余额',
            availableBalance: '可用余额',
            sectorPledge: '扇区抵押',
            lockedRewards: '提供存储服务锁仓',
            feeDebt: '欠款',
            pledgeBalance: '质押余额',
            miningPenalty: '处罚金额',
            qualityAdjPower: '有效算力',
            rawBytePower: '原值算力',
            rate: '占比',
            rank: '排名',
            sectorSize: '扇区大小',
            sectors: '扇区状态',
            WinCount: '累计出块份数',
            blockNums: '出块数',
            blocksReward: '累计出块奖励'
          },
          tips: {
            availableBalance: '可用余额 = 账户余额 - 扇区抵押 - 提供存储服务锁仓'
          }
        },
        miningOverview: {
          title: '提供存储服务统计',
          headers: {
            qualityAdjPowerDelta: '算力增量',
            qualityAdjPowerDeltaSpeed: '算力增速',
            minerEquivalent: '存储节点当量',
            blockNums: '出块数量',
            blocksReward: '出块奖励',
            blocksRewardRate: '出块奖励占比',
            blocksRewardWithRate: '出块奖励 (占比)',
            winCount: '出块份数',
            miningEfficiency: '存储服务效率',
            luckyValue: '幸运值'
          }
        },
        accountChange: {
          title: '账户变化',
          charts: {
            balance: '总余额',
            availableBalance: '可用余额',
            sectorPledge: '扇区抵押',
            lockedRewards: '提供存储服务锁仓'
          }
        },
        powerChange: {
          title: '算力变化',
          charts: {
            qualityAdjPower: '有效算力',
            qualityAdjPowerDelta: '有效算力增量'
          }
        },
        accountOverview: {
          title: '账户概览',
          headers: {
            address: '地址',
            actor: '类型',
            messageCount: '消息数',
            owner: 'Owner',
            worker: 'Worker',
            peerID: '节点ID',
            createTime: '创建时间',
            ip: '地区（公开IP）'
          }
        },
        blockList: {
          total: '共',
          tipsets: '个区块',
          height: '区块高度',
          hash: '区块ID',
          reward: '奖励',
          time: '时间',
          messages: '消息数',
          blockSize: '区块大小'
        }
      }
    },
    peer: {
      title: '节点详情',
      headers: {
        id: 'ID',
        miners: '存储提供者',
        IP: 'IP列表'
      }
    }
  },
  actor: {
    account: '普通账户',
    cron: '定时任务',
    init: '初始化',
    multisig: '多重签名',
    paymentchannel: '支付通道',
    reward: '奖励',
    storagemarket: '存储市场',
    storageminer: '存储提供者账户',
    storagepower: '存储算力',
    system: '系统',
    verifiedregistry: '注册确认'
  },
  chart: {
    miner: {
      title: '存储服务图表',
      headers: {
        qualityAdjPowerPie: '存储提供者有效算力分布',
        qualityAdjPowerLine: '存储提供者有效算力走势',
        qualityAdjPowerDeltaLine: '存储提供者算力增量走势',
        rewardLine: '提供存储服务收益变化',
        sectorInitialPledgeVariations: '扇区质押量变化'
      }
    },
    gas: {
      title: 'Gas 统计',
      baseFeeChart: {
        title: '基础费率走势',
        tips: '基础手续费率：由系统收取并销毁的手续费的实时费率'
      },
      headers: {
        dailyStatistics: '24h Gas 数据'
      },
      all: '全部',
      tableHeaders: {
        method: '消息类型',
        gasPrice: '平均Gas费率',
        gasLimit: '平均Gas限额',
        gasFee: '平均手续费',
        gasUsed: '平均Gas消耗',
        fee: '手续费合计/占比',
        count: '消息数合计/占比'
      }
    },
    lotus: {
      pie: 'Lotus版本分布'
    }
  },
  footer: {
    contact: '联系方式: contact@filfox.io',
    intro: '飞狐浏览器（Filfox）是 Filecoin 区块链浏览器及数据服务平台，提供基于 Filecoin 的各类排行、区块链数据查询、可视化图表等一站式数据服务。'
  },
  tag: {
    apply: '申领账户',
    edit: '修改签名',
    sign: '签名验证',
    description: '目前仅对 有效算力 ≥ {power} 的存储提供者开放自主认证',
    owner: 'Owner地址',
    en_sname: '账户英文简称',
    zh_sname: '账户中文简称',
    en_name: '账户英文全称',
    zh_name: '账户中文全称',
    contact: '联系方式',
    message: '信息',
    command: '签名代码',
    signature: '签名',
    snamePlaceholder: '不超过16个字符',
    namePlaceholder: '选填',
    contactPlaceHolder: '邮箱/手机号',
    signaturePlaceHolder: '请复制上面的代码，在filecoin钱包中进行签名，将签名内容粘贴到此处',
    specialNotes: '特别提示：账户名称不得使用敏感词、违禁词、名人姓名等，如有违规将进行删除和禁用签名处理，谢谢配合。',
    errorInput: '请填写',
    success: '验签成功，请刷新页面后查看您的认证',
    signed: '加V表示账户已完成所有者的签名验证'
  },
  meta: {
    titles: {
      filfox: '飞狐区块浏览器',
      indexTitle: '飞狐浏览器 - Filecoin区块链浏览器',
      address: '地址',
      peer: '节点',
      tipset: '区块高度',
      message: '消息',
      mempool: '内存池',
      block: '区块',
      recentTipsets: '最新区块列表',
      rich: '富豪榜',
      dealList: '订单列表',
      deal: '订单详情',
      messages: '消息列表',
      ranks: '存储服务排行榜',
      minerCharts: '提供存储服务图表',
      tools: '常用工具',
      wiki: '知识库'
    },
    description: {
      default: '飞狐浏览器（Filfox）是 Filecoin 区块链浏览器及数据服务平台，为用户稳定地提供 Filecoin 相关的各类数据、信息和可视化图表等内容，具体包括矿工信息、区块信息、消息信息、FIL代币相关信息、常用工具等。'
    }
  },
  merchant: {
    website: '进入官网',
    overview: {
      title: '算力概览',
      qualityAdjPower: '有效算力',
      rank: '排名',
      powerDelta: '30天算力增速',
      blockReward: '累计出块奖励',
      blocksMined: '累计出块数',
      minerEquivalent: '存储节点当量',
      rate: '占比'
    },
    miner: {
      miners: '名下存储提供者',
      qualityAdjPower: '有效算力',
      powerDelta: '30天算力增速',
      blockReward: '累计出块奖励',
      blocksMined: '累计出块数',
      minerEquivalent: '存储节点当量'
    },
    sales: {
      title: '存储节点销售信息',
      description: '根据公开信息整理，请以官方公布为准',
      issue: '问题提交',
      price: '售价',
      transparent: '透明指数',
      transparentDesp: '根据存储节点厂商官网销售方案中公开指标的数量占比计算得出，透明指数=公开指标数量/指标总数量 * 5 ，满分为5分',
      detail: '了解详情',
      services: '配套服务',
      hardware: '硬件参数'
    },
    unknown: '未公开',
    contact: '请填写内容并发送邮件到contact@filfox.io，我们会有专员和您联系'
  },
  spaceRace: {
    title: '太空竞赛',
    ratio: '占比',
    overview: {
      title: '竞赛概览',
      headers: {
        unlockRewards: '已解锁奖励',
        rawBytePower: '原值算力',
        activeMiner: '活跃存储提供者',
        qualifiedMiners: '已达标实体',
        entity: '注册实体数'
      }
    },
    ranks: {
      title: '存储提供者排行榜',
      headers: {
        rank: '排名',
        entity: '实体',
        area: '地区',
        minerCount: '存储提供者数量',
        estimatedGlobalReward: '预估全球奖励',
        estimatedRegionRewards: '预估大洲奖励',
        estimatedBlockRewards: '预估出块奖励',
        dailyPowerDelta: '24h算力增速',
        equivalentMiners: '存储节点当量',
        totalBlockNums: '总出块数',
        totalBlockReward: '总出块奖励',
        miner: '名下存储提供者',
        rawBytePower: '原值算力/占比',
        blockNums: '累计出块数/占比',
        dealSuccessRate: '储存成功率',
        retrievalDealSuccessRate: '检索成功率',
        sectorLifeCycle: '扇区生命周期',
        done: '已完成',
        dealRetrievalRate: '存储/检索成功率',
        totalReward: '预计奖励合计',
        smallMinerReward: '预估小存储提供者奖励'
      },
      tips: {
        activeMiners: '当前原值算力值大于0的存储提供者数',
        qualifiedMiners: '已完成扇区生命周期并订单成功率均大于80%实体数量',
        registeredEntities: '已在官方完成注册验证的实体数量',
        estimatedGlobalReward: '全球排名前100名的存储提供者将根据比赛期间存储提供者原值算力比例瓜分总计高达150万FIL的奖励',
        estimatedRegionRewards: '各大洲排名前50名的存储提供者将根据比赛期间存储提供者原值算力比例瓜分各洲总计高达50万FIL的奖励',
        estimatedBlockRewards: '获得出块奖励数在前20名的存储提供者，将根据所获区块奖励数按比例瓜分额外10万FIL的奖励',
        smallMinerReward: '在9月2日12:00UTC前完成登记并封装1个扇区的存储提供者，若竞赛结束前完成至少1TiB扇区封装并条件合格的存储提供者，最少将获得500FIL（算力<=10TiB）或1000FIL（算力>10TiB）的奖励',
        totalReward: '预计奖励合计=全球奖励+大洲奖励+出块奖励+小存储提供者奖励'
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
        activeMiners: '活跃存储提供者'
      }
    }
  },
  wallet: {
    title: '钱包'
  }
}
