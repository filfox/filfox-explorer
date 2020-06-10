export default {
    shared: {
        tableEmptyText:'暂无数据',
        time: {
            justNow:'刚刚',
            hour:'时',
            min:'分',
            sec:'秒',
            ago:'前',
        }
    },
    nav: {
        home: {
            title:'首页'
        },
        blocks: {
            title: '区块链',
            subMenus: ['区块','消息','账户']
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
            foldBtn: '展开全部',
            unfoldBtn: '收起',
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
        }
            //['区块高度','最新区块时间','全网有效算力','活跃矿工数','最新价格','每区块奖励','总账户数','平均区块间隔','平均区块大小','平均每高度区块数量','全网原值算力','平均gas费率','FIL流通量','FIL质押量','FIL销毁量','FIL总供给量','FIL流通率'],
        },
        minerRanks: {
            title: '挖矿排行榜',
            tableHeaders: {
                rank:'排名',
                miner:'矿工',
                area:'地区',
                validPower:'有效算力',
                validPowerRate:'有效算力占比',
                blockNums:'出块数量',
                powerIncreaseSpeed:'算力增速'
            },
        },
        recentTipsets: {
            title: '最新区块',
            tableHeaders: {
                height: '高度',
                blockId: '区块ID',
                miner: '矿工',
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
    }
}