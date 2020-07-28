export default {
    shared: {
        tableEmptyText:'暂无数据',
        time: {
            justNow:'刚刚',
            hour:'时',
            min:'分',
            sec:'秒',
            ago:'前',
            day:'天',
            year:'年'
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
            title:'首页'
        },
        blocks: {
            title: '区块链',
            subMenus: ['区块','消息','富豪榜']
        },
        ranks: {
            title: '排行榜',
        },
        charts: {
            title: '图表',
            subMenus: ['挖矿图表','FIL图表']
        },
        resources: {
            title: '资源',
            subMenus: ['常用工具','知识库']
        },
        searchPlaceHolder:'搜索区块/账户/地址/消息...'
    },
    home: {
        overview: {
            title: '全网概览',
            unfoldBtn: '展开全部',
            foldBtn: '收起',
            titles: {
                height:'区块高度',
                timestamp:'最新区块时间',
                qualityAdjPower:'全网有效算力',
                activeMiners:'活跃矿工数',
                price:'最新价格',
                blockReward:'每区块奖励',
                averageRewardPerByte: '24h平均挖矿收益',
                output24h: '近24h产出量',
                circulatingSupply:'FIL流通量',
                totalPledgeCollateral:'FIL质押量',
                // default hide items
                accounts:'总账户数',
                averageTipsetInterval:'平均区块间隔',
                dailyMessages: '24h消息数',
                averageTipsetBlocks:'平均每高度区块数量',
                rawBytePower:'全网原值算力',
                averageGasPrice:'平均gas费率',
                burntSupply:'FIL销毁量',
                totalMarketBalance: '订单锁定量',
                totalMaxSupply:'FIL总供给量',
                circulatingSupplyRate: 'FIL流通率',
                sectorInitialPledge: '当前扇区质押量'
            },
            tips: {
                qualityAdjPower:'当前全网有效算力（有效存储空间）的总和',
                activeMiners: '当前有效算力值大于0的矿工数',
                price:'FIL[IOU]最新价格，数据来源Coingecko',
                blockReward: '当前高度下的区块奖励，每个高度有多个区块，每个区块均可获得该奖励',
                averageRewardPerByte: '近24h每个高度出块奖励与有效算力比值的均值',
                output24h: '近24h累计挖矿产出的FIL数量',
                circulatingSupply: '当前自由流通的FIL总和',
                totalPledgeCollateral: '当前矿工进行挖矿所质押的FIL总和',
                averageTipsetInterval: '近24h出块的平均时间间隔',
                averageTipsetBlocks: '近24h相同高度下的平均区块数量',
                rawBytePower: '当前全网算力（存储空间）的总和',
                averageGasPrice: '近24h网络消耗gas的平均费率',
                totalMarketBalance: '在储存市场内发起订单时被锁定的FIL数量',
                circulatingSupplyRate: '流通率=流通量/总供给量'
            }
        },
        powerDistribution: {
            title: '有效算力分布'
        },
        powerDelta: {
            title: '每日算力增量（Top5）'
        },
        minerRanks: {
            title: '挖矿排行榜',
            rate: '占比',
            filters: {
                qualityAdjPower: '有效算力',
                blocks: '出块数',
                powerDelta: '算力增速'
            },
            tableHeadersByPower: {
                rank:'排名',
                miner:'矿工',
                tag: '标签',
                validPower:'有效算力',
                validPowerRate:'有效算力占比',
                reward: '24h出块奖励',
                miningEfficiency: '24h挖矿效率',
                powerIncrease:'24h算力增量'
            },
            tipsByPower: {
                miningEfficiency: '近24h矿工平均每T算力所挖出的FIL数量',
                powerIncrease: '近24h矿工有效算力的增量'
            },
            tableHeadersByBlock: {
                rank:'排名',
                miner:'矿工',
                tag: '标签',
                blockNums:'出块数',
                luckyValue:'幸运值',
                totalRewards:'出块奖励',
                rewardsRatio:'出块奖励占比',
            },
            tipsByBlock: {
                luckyValue: '实际爆块数量和理论爆块数量的比值',
                rewardsRatio: '在选定周期内，矿工获得出块奖励与累计产出区块奖励的比值'
            },
            tableHeadersByPowerDelta: {
                rank:'排名',
                miner:'矿工',
                tag: '标签',
                powerIncreaseSpeed:'算力增速',
                equivalentMiners:'矿机当量',
                powerDelta:'算力增量',
                validPower:'有效算力'
            },
            tipsByPowerDelta: {
                equivalentMiners: "以官方Benchmark推荐配置（AMD Ryzen Threadripper 3970X、NVidia GTX 2080Ti、128GB 2133mhz）视为1台基准矿机，矿机当量为该矿工换算成标准矿机的数量（矿工的算力增速与该基准矿机增速的比值）。",
                powerIncreaseSpeed: '选定周期内，平均每天矿工的有效算力增量',
                powerDelta: '在选定周期内，矿工的有效算力增量',
            },
            moreBtn: '查看更多'
        },
        recentTipsets: {
            title: '最新区块',
            tableHeaders: {
                height: '高度',
                blockId: '区块ID',
                miner: '矿工',
                tag: '标签',
                message: '消息',
                award: '奖励'
            },
        },
        richManRanks: {
            title: '富豪榜',
            tableHeaders: {
                order:'排名',
                address:'地址',
                tag: '标签',
                balance:'余额',
                balanceRate: '余额占比'
            },
        }
    },
    blockchain: {
        block: {
            title: '区块列表',
            tableHeaders: {
                height:'高度',
                miner: '矿工',
                time: '时间',
                size: '区块大小',
                hash:'哈希',
                miner:'矿工',
                tag: '标签',
                message:'消息',
                award:'奖励'
            }
        },
        message: {
            title: '消息列表',
            info: {
                total: '共',
                messages: '条消息',
            },
            tableHeaders: {
                id: '消息ID',
                height: '区块高度',
                time: '时间',
                from: '发送方',
                to: '接收方',
                method: '方法',
                value: '金额',
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
                accounts: '个账户',
            },
            tableHeaders: {
                order:'排名',
                address:'账户名',
                balance:'余额',
                balanceRate: '余额占比',
                tag: '标签',
                type: '类型',
                createTime: '创建时间',
                lastSeenTime: '最新交易'
            },
            type: {
                all: '全部类型',
                normal: '普通账户',
                miner: '矿工账户'
            }
        },
    },
    detail: {
        message: {
            title: '消息详情',
            headers: {
                cid: '消息ID',
                height: '高度',
                time: '时间',
                inBlocks: '所属区块',
                version: '版本',
                from: '发送方',
                to: '接收方',
                nonce: 'Nonce',
                method: '方法',
                params: '参数',
                value: '金额',
                gasPrice: 'Gas价格',
                gasLimit: 'Gas限额',
                gasUsed: 'Gas使用量',
                exitCode: '状态',
                return: '返回值',
                error: '错误信息'
            },
            null: '(无)'
        },
        tipset: {
            title: '区块高度',
            all: '所有区块',
            headers: {
                time: '区块时间',
                size: '大小',
                totalMsgCount:'累计消息数（去重）',
                id: '区块ID',
                miner: '矿工',
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
                miner: '矿工',
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
                    ownedMiners: '名下矿工',
                    workers: '实际工作矿工'
                }
            },
            miner: {    
                minerOverview: {
                    title: '矿工概览',
                    headers: {
                        balance: '账户余额',
                        availableBalance : '可用余额',
                        pledgeBalance: '质押余额',
                        miningPenalty: '处罚金额',
                        qualityAdjPower: '有效算力',
                        rawBytePower: '原值算力',
                        rate: '占比',
                        rank: '排名',
                        sectorSize: '扇区大小',
                        blockNums: '累计出块数量',
                        blocksReward: '累计出块奖励',
                        qualityAdjPowerDelta24h: '近24h有效算力增量',
                        qualityAdjPowerDeltaSpeed24h:'近24h有效算力增速'

                    }
                },
                accountChange: {
                    title: '账户变化',
                    charts: {
                        balance: '总余额',
                        availableBalance: '可用余额',
                        pledgeBalance: '质押金额',
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
                        sectors: '扇区',
                        createTime: '创建时间'
                    }
                },
                blockList: {
                    total: '共',
                    tipsets: '个区块',
                    height: '区块高度',
                    hash: '区块哈希',
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
                miners: '矿工',
                IP: 'IP列表'
            }
        }
    },
    actor: {
        'fil/1/account': '普通账户',
        'fil/1/cron': '执行定时任务',
        'fil/1/init': '初始化',
        'fil/1/multisig': '多重签名',
        'fil/1/paymentchannel': '支付通道',
        'fil/1/reward': '奖励',
        'fil/1/storagemarket': '存储市场',
        'fil/1/storageminer': '矿工账户',
        'fil/1/storagepower': '存储算力',
        'fil/1/system': '系统',
        'fil/1/verifiedregistry': '注册确认'
    },
    chart: {
        miner: {
            title: '挖矿图表',
            headers: {
                qualityAdjPowerPie: '矿工有效算力分布',
                qualityAdjPowerLine: '矿工有效算力走势',
                qualityAdjPowerDeltaLine: '矿工算力增量走势',
                rewardLine: '挖矿收益变化'
            }
        },
        fil: {
            title: 'FIL图表',
        }
    },
    footer: {
        contact: '联系方式: contact@filfox.info',
        intro: '飞狐浏览器（Filfox）是 Filecoin 区块链浏览器及数据服务平台，提供基于 Filecoin 的各类挖矿排行、区块链数据查询、可视化图表等一站式数据服务。',
    },
    tag: {
        apply: '申领账户',
        sign: '签名验证',
        description: '目前仅对 有效算力 ≥ {power} 的矿工开放自主认证',
        owner: 'Owner地址',
        en_sname: '账户英文简称',
        zh_sname: '账户中文简称',
        en_name: '账户英文全称',
        zh_name: '账户中文全称',
        contact: '联系方式',
        message: '信息',
        signature: '签名',
        snamePlaceholder: '不超过16个字符',
        namePlaceholder: '选填',
        contactPlaceHolder: '邮箱/手机号',
        signaturePlaceHolder: '请复制上面的信息，在filecoin钱包中进行签名，将签名内容粘贴到此处',
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
            block: '区块',
            recentTipsets: '最新区块列表',
            rich: '富豪榜',
            messages: '消息列表',
            ranks: '挖矿排行榜',
            minerCharts: '挖矿图表',
            tools: '常用工具',
            wiki: '知识库',
        },
        description: {
            default: "飞狐浏览器（Filfox）是 Filecoin 区块链浏览器及数据服务平台，为用户稳定地提供 Filecoin 相关的各类数据、信息和可视化图表等内容，具体包括矿工信息、区块信息、消息信息、FIL代币相关信息、常用工具等。"
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
            minerEquivalent: '矿机当量',
            rate: '占比'
        },
        miner: {
            miners: '名下矿工',
            qualityAdjPower: '有效算力',
            powerDelta: '30天算力增速',
            blockReward: '累计出块奖励',
            blocksMined: '累计出块数',
            minerEquivalent: '矿机当量',
        },
        sales: {
            title: '矿机销售信息',
            description: '根据公开信息整理，请以官方公布为准',
            issue: '问题提交',
            price: '售价',
            transparent: '透明指数',
            transparentDesp: '根据矿机厂商官网销售方案中公开指标的数量占比计算得出，透明指数=公开指标数量/指标总数量 * 5 ，满分为5分',
            detail: '了解详情',
            services: '配套服务',
            hardware: '硬件参数',
        },
        unknown: '未公开',
        contact: '请填写内容并发送邮件到contact@filfox.info，我们会有专员和您联系'
    }

}
