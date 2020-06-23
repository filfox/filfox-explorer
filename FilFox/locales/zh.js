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
        unknown: '未知'
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
        searchPlaceHolder:'搜索地址/区块ID/token...'
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
                accounts:'总账户数',
                averageTipsetInterval:'平均区块间隔',
                averageBlockSize: '平均区块大小',
                averageTipsetBlocks:'平均每高度区块数量',
                rawBytePower:'全网原值算力',
                averageGasPrice:'平均gas费率',
                circulatingSupply:'FIL流通量',
                totalPledgeCollateral:'FIL质押量',
                burntSupply:'FIL销毁量',
                totalSupply:'FIL总供给量',
                totalMarketBalance: '订单锁定量'
            }
        },
        powerDistribution: {
            title: '有效算力分布'
        },
        powerDelta: {
            title: '算力增量（Top5）'
        },
        minerRanks: {
            title: '挖矿排行榜',
            filters: {
                qualityAdjPower: '有效算力',
                blocks: '出块数',
                powerDelta: '算力增速'
            },
            tableHeadersByPower: {
                rank:'排名',
                miner:'矿工',
                tag: '标签',
                area:'地区',
                validPower:'有效算力',
                validPowerRate:'有效算力占比',
                blockNums:'出块数量',
                powerIncrease:'算力增量'
            },
            tableHeadersByBlock: {
                rank:'排名',
                miner:'矿工',
                tag: '标签',
                area:'地区',
                blockNums:'出块数',
                blockRate:'出块数占比',
                totalRewards:'出块奖励',
                luckyValue:'幸运值',
            },
            tableHeadersByPowerDelta: {
                rank:'排名',
                miner:'矿工',
                tag: '标签',
                area:'地区',
                validPower:'算力增速',
                validPowerRate:'矿机数量',
                blockNums:'算力增量',
                powerIncreaseSpeed:'有效算力'
            },
            moreBtn: '查看更多'
        },
        recentTipsets: {
            title: '最新区块',
            tableHeaders: {
                height:'高度',
                blockId:'区块ID',
                miner:'矿工',
                message:'消息',
                award:'奖励'
            },
        },
        richManRanks: {
            title: '富豪榜',
            tableHeaders: {
                order:'排名',
                address:'地址',
                balance:'余额'
            },
        }
    },
    blockchain: {
        block: {
            title: '区块列表',
            tableHeaders: {
                height:'高度',
                time: '时间/块龄',
                size: '区块大小',
                hash:'哈希',
                miner:'矿工',
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
                time: '时间/块龄',
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
                error: '错误'
            },
            null: '（无）'
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

            }
        }
    },
    actor: {
        'fil/1/account': '普通账户',
        'fil/1/cron': 'Cron',
        'fil/1/init': '初始化',
        'fil/1/multisig': '多重签名',
        'fil/1/paymentchannel': '付款通道',
        'fil/1/reward': '奖励',
        'fil/1/storagemarket': '存储市场',
        'fil/1/storageminer': '矿工账户',
        'fil/1/storagepower': '存储算力',
        'fil/1/system': '系统',
        'fil/1/verifiedregistry': '注册确认'
    },
    footer: {
        contact: '联系方式: contact@6block.com',
        intro: 'Filfox.io是Filecoin区块链浏览器，提供相关数据查询服务，由6block提供技术支持',
    }

}