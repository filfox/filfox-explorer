export default {
  shared: {
    tableEmptyText: '데이터 없음',
    time: {
      justNow: '조금 전',
      hour: '시간',
      min: '분',
      sec: '초',
      ago: '전',
      day: '일',
      year: '년'
    },
    more: '더 보기',
    unknown: '알수 없음',
    noSearchResult: '관련 내용 없음',
    empty: '없음',
    notAvailable: '아직 지원하지 않는 기능입니다.',
    oldVersion: '이전 버전으로 보기',
    copySuccess: '복사 되었습니다',
    submit: '제출',
    backToHome: '홈페이지로 돌아 가기',
    currentNetwork: '현재 네트워크: '
  },
  nav: {
    home: {
      title: '홈페이지'
    },
    blocks: {
      title: '블록체인',
      subMenus: [
        '블록',
        '메시지',
        '자산 순위',
        '주문'
      ]
    },
    ranks: {
      title: '채굴 순위'
    },
    charts: {
      title: '도표',
      subMenus: [
        '채굴',
        'FIL'
      ]
    },
    resources: {
      title: '사용자 도구',
      subMenus: [
        '도구',
        '정보'
      ]
    },
    searchPlaceHolder: '\b블록/계정/주소/소식 검색'
  },
  home: {
    overview: {
      title: '네트워크 현황',
      unfoldBtn: '전체 보기',
      foldBtn: '전체 보기 닫기',
      titles: {
        height: '블록 높이',
        timestamp: '최신 블록 생성 시간',
        qualityAdjPower: '네트워크 채굴파워(헤시레이트)',
        activeMiners: '참여중인 채굴자',
        price: '실시간 가격',
        blockReward: '블록 보상',
        averageRewardPerByte: '24시간 평균 채굴 수익',
        output24h: '최근 24시간 채굴량',
        circulatingSupply: 'FIL 유통량',
        totalPledgeCollateral: 'FIL 담보량',
        accounts: '총 계정수',
        averageTipsetInterval: '블록간 평균 간격',
        dailyMessages: '24시간 메시지 수량',
        averageTipsetBlocks: '평균 블록 팁셋 수량',
        rawBytePower: '네트워크 로우바이트 채굴파워',
        averageGasPrice: '평균 가스비용',
        burntSupply: 'FIL 소각량',
        totalMarketBalance: '주문으로 잠긴 수량',
        totalMaxSupply: 'FIL 총 공급량',
        circulatingSupplyRate: 'FIL 유통비율',
        sectorInitialPledge: '현재 부문 서약 금액'
      },
      tips: {
        qualityAdjPower: '현재 유효한 채굴파워의 총합',
        activeMiners: '현재 채굴파워가 0보다 큰 채굴자의 수',
        price: 'FIL[IOU] 최신가격 (데이터소스: Coingecko)',
        blockReward: '현재 블록 높이에서의 보상, 모든 같은 높이의 블록은 같은 보상을 받을 예정',
        averageRewardPerByte: '최근 24시간 블록 보상을 유효 채굴파워로 나눈 값',
        output24h: '최근 24시간 블록 채굴해서 얻은 FIL 수량',
        circulatingSupply: '현재 자유롭게 유통되는 FIL의 총합',
        totalPledgeCollateral: '현재 채굴자가 채굴을 위해 담보한 FIL의 총량',
        averageTipsetInterval: '최근 24시간 동안 블록 간 평균 소요 시간',
        averageTipsetBlocks: '최근 24시간 동안 같은 높이에서 생성된 블록 개수의 평균',
        rawBytePower: '현재 네트워크 채굴퍄워의 총합',
        averageGasPrice: '최근 24시간 소모된 가스비용의 평균값',
        totalMarketBalance: '스토리지 마켓에서 주문을 넣을 때 락업되는 FIL 개수',
        circulatingSupplyRate: '유통비율=유통량/총공급량'
      }
    },
    powerDistribution: {
      title: '유효 채굴파워 분포 현황'
    },
    powerDelta: {
      title: '일별 채굴파워 증가량 ( Top5）'
    },
    minerRanks: {
      title: '채굴 순위표',
      rate: '점유률',
      filters: {
        qualityAdjPower: '유효 채굴파워',
        blocks: '블록 생성 개수',
        powerDelta: '채굴파워 증가속도'
      },
      tableHeadersByPower: {
        rank: '순위',
        miner: '채굴자',
        tag: '서명',
        validPower: '유효 채굴파워',
        validPowerRate: '유효 채굴파워 비율',
        reward: '24시간 블록 보상',
        miningEfficiency: '24시간 채굴 효율',
        powerIncrease: '24시간 채굴파워 증가량'
      },
      tipsByPower: {
        miningEfficiency: '최근 24시간 채굴파워 1T마다 채굴한 FIL 개수',
        powerIncrease: '최근 24시간 유효 채굴파워 증가량'
      },
      tableHeadersByBlock: {
        rank: '순위',
        miner: '채굴자',
        tag: '서명',
        blockNums: '블록 생성 개수',
        luckyValue: '행운값',
        totalRewards: '블록 보상',
        rewardsRatio: '블록 보상 비율'
      },
      tipsByBlock: {
        luckyValue: '실제 채굴 개수에서 이론상 채굴 개수를 나눈 비율',
        rewardsRatio: '특정 기간 채굴한 보상에서 누적 보상을 나눈 비율'
      },
      tableHeadersByPowerDelta: {
        rank: '순위',
        miner: '채굴자',
        tag: '서명',
        powerIncreaseSpeed: '채굴파워 증가 속도',
        equivalentMiners: '표준 채굴기 대수',
        powerDelta: '채굴파워 증가량',
        validPower: '유효 채굴파워'
      },
      tipsByPowerDelta: {
        equivalentMiners: '채굴자가 보유한 채굴파워를 공식 벤치마크 추천 구성 ( AMD Ryzen Threadripper 3970X、NVidia GTX 2080Ti、128GB 2133mhz）을 기준으로 환산하여 얻은 값.',
        powerIncreaseSpeed: '해당 기간 채굴 파워 증가량의 평균치',
        powerDelta: '해당 기간 채굴자의 유효 채굴파워 증가량'
      },
      moreBtn: '더 보기'
    },
    recentTipsets: {
      title: '블록 현황',
      tableHeaders: {
        height: '높이',
        blockId: '블록 ID',
        miner: '채굴자',
        tag: '서명',
        message: '메시지',
        award: '블록 보상'
      }
    },
    richManRanks: {
      title: '자산 순위',
      tableHeaders: {
        order: '순위',
        address: '주소',
        tag: '서명',
        balance: '잔액',
        balanceRate: '잔액 비율'
      }
    }
  },
  blockchain: {
    block: {
      title: '블록 리스트',
      tableHeaders: {
        height: '높이',
        miner: '채굴자',
        time: '시간',
        size: '블록 크기',
        hash: 'ID',
        tag: '서명',
        message: '메시지',
        award: '블록 보상'
      }
    },
    message: {
      title: '메시지 리스트',
      info: {
        total: '총',
        messages: '개의 메시지'
      },
      tableHeaders: {
        id: '메시지 ID',
        height: '블록 높이',
        time: '시간',
        from: '보낸 이',
        to: '받는 이',
        method: '방법',
        value: '금액',
        exitCode: '상태'
      },
      methods: {
        all: '모두 보기'
      }
    },
    richList: {
      title: '자산 순위',
      info: {
        total: '총',
        accounts: '개의 계정'
      },
      tableHeaders: {
        order: '순위',
        address: '계정 이름',
        balance: '잔액',
        balanceRate: '잔액 비율',
        tag: '서명',
        type: '유형',
        createTime: '생성 시간',
        lastSeenTime: '최근 거래'
      },
      type: {
        all: '모든 유형',
        normal: '일반 계정',
        miner: '채굴자 계정'
      }
    },
    dealList: {
      title: '주문 리스트',
      info: {
        total: '총',
        deals: '주문'
      },
      tableHeaders: {
        id: '주문 아이디 ',
        createdTime: '시간 생성',
        client: '클라이언트',
        provider: '스토리지 사용자',
        verifiedDeal: '검증된 주문',
        size: '문서 크기',
        storagePrice: '스토리지 수수료',
        status: '상태'
      }
    }
  },
  detail: {
    deal: {
      title: '주문 내역',
      overview: '주면 개요',
      storageDetail: '스토리지 내역',
      headers: {
        id: '주문 아이디',
        createTime: '시간 생성',
        block: '블록',
        message: '메시지',
        cid: '문서 Cid',
        verified: '검증된 주문',
        status: '상태',
        client: '클라이언트',
        provider: '스토리지 채굴자',
        collateral: '담보 금액',
        fee: '스토리지 비용',
        to: '에'
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
        genesis: 'genesis',
        fee: 'fee',
        burn: 'burn',
        reward: 'reward',
        send: 'send',
        receive: 'receive',
        transfer: 'transfer'
      },
      total: 'Total',
      transaction: 'transactions'
    },
    message: {
      title: '메시지 내역',
      headers: {
        cid: '메시지 ID',
        height: '높이',
        time: '시간',
        inBlocks: '연결된 블록',
        version: '버전',
        from: '보낸 이',
        to: '받는 이',
        nonce: 'Nonce',
        method: '방법',
        params: '변수',
        value: '금액',
        gasPrice: '가스비용',
        gasLimit: '가스 리밋',
        gasUsed: '가스 사용량',
        exitCode: '상태',
        return: '리턴값',
        error: '오류'
      },
      null: '없음'
    },
    tipset: {
      title: '블록 높이',
      all: '모든 블록',
      headers: {
        time: '블록 시간',
        size: '크기',
        totalMsgCount: '누적된 메시지 개수 (중복 내용 제거)',
        id: '블록 ID',
        miner: '채굴자',
        tag: '서명',
        bonus: '블록 보상',
        messageCount: '메시지 개수'
      }
    },
    block: {
      title: '블록 내역',
      overview: '블록 개요',
      headers: {
        cid: '블록 ID',
        height: '높이',
        time: '시간',
        size: '크기',
        messages: '메시지',
        reward: '블록 보상',
        miner: '채굴자',
        parents: '페런트 블록',
        parentWeight: '페런트 블록 무게',
        penalty: '벌금'
      }
    },
    address: {
      normal: {
        title: '계정',
        headers: {
          overview: '계정 개요',
          address: '주소',
          actor: '유형',
          balance: '잔액',
          messages: '메시지 개수',
          createTime: '생성 시간',
          lastSeenTime: '최근 거래',
          ownedMiners: '보유 채굴자',
          workers: '유효 채굴자'
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
          title: '채굴자 개요',
          headers: {
            balance: '계정 잔액',
            availableBalance: '사용 가능한 잔액',
            pledgeBalance: '담보 잔액',
            miningPenalty: '벌금 금액',
            qualityAdjPower: '유효 채굴파워',
            rawBytePower: '로우바이트 채굴파워',
            rate: '비율',
            rank: '순위',
            sectorSize: '섹터 크기',
            sectors: '섹터 현황',
            blockNums: '누적된 채굴 개수',
            blocksReward: '누적된 채굴 보상'
          }
        },
        miningOverview: {
          title: '채굴 데이터',
          headers: {
            qualityAdjPowerDelta: '채굴파워 증가량',
            qualityAdjPowerDeltaSpeed: '채굴파워 증가 속도',
            minerEquivalent: '채굴기 개수',
            blockNums: '블록 채굴 개수',
            blocksReward: '블록 리워드',
            blocksRewardRate: '블록 리워드 비율',
            miningEfficiency: '채굴 효율',
            luckyValue: '럭키 벨류'
          }
        },
        accountChange: {
          title: '계정 변화',
          charts: {
            balance: '총 잔액',
            availableBalance: '사용 가능한 잔액',
            pledgeBalance: '담보 금액'
          }
        },
        powerChange: {
          title: '채굴파워 변화',
          charts: {
            qualityAdjPower: '유효 채굴파워',
            qualityAdjPowerDelta: '유효 채굴파워 증가량'
          }
        },
        accountOverview: {
          title: '계정 개요',
          headers: {
            address: '주소',
            actor: '유형',
            messageCount: '메시지 개수',
            owner: 'Owner',
            worker: 'Worker',
            peerID: '노드 ID',
            createTime: '생성 시간',
            ip: '지역 (공개 IP)'
          }
        },
        blockList: {
          total: '총',
          tipsets: '블록',
          height: '블록 높이',
          hash: '블록 ID',
          reward: '보상',
          time: '시간',
          messages: '메시지 개수',
          blockSize: '블록 크기'
        }
      }
    },
    peer: {
      title: '노드 내역',
      headers: {
        id: 'ID',
        miners: '채굴자',
        IP: 'IP 리스트'
      }
    }
  },
  actor: {
    'fil/1/account': '일반 계정',
    'fil/1/cron': '시간 지정 작업 실행',
    'fil/1/init': '초기화',
    'fil/1/multisig': '다중 서명',
    'fil/1/paymentchannel': '지불 채널',
    'fil/1/reward': '보상',
    'fil/1/storagemarket': '스토리지 마켓',
    'fil/1/storageminer': '채굴자 계정',
    'fil/1/storagepower': '스토리지 파워',
    'fil/1/system': '시스템',
    'fil/1/verifiedregistry': '등록 확인'
  },
  chart: {
    miner: {
      title: '채굴 도표',
      headers: {
        qualityAdjPowerPie: '유효 채굴파워 분표',
        qualityAdjPowerLine: '유효 채굴파워 추세',
        qualityAdjPowerDeltaLine: '채굴파워 증가량 추세',
        rewardLine: '채굴 보상 변화'
      }
    },
    fil: {
      title: 'FIL 도표'
    }
  },
  footer: {
    contact: '연락처: contact@filfox.io',
    intro: 'Filfox는 파일코인(Filecoin)의 익스플로러이자 데이터 서비스 플랫폼으로 파일코인과 관련된 채굴 랭킹, 블록 데이터 조회, 차트 등을 제공합니다.'
  },
  tag: {
    apply: '계정 신청',
    sign: '서명 검증',
    description: '현재 유효 채굴파워가 {power} 보다 큰 채굴자에게만 자체 인증을 허용하고 있습니다.',
    owner: 'Owner 주소',
    en_sname: '계정 닉네임 (영어)',
    zh_sname: '계정 닉네임 (중국어)',
    en_name: '계정 풀네임 (영어)',
    zh_name: '계정 풀네임 (중국어)',
    contact: '연락처',
    message: '메시지',
    command: '암호',
    signature: '서명',
    snamePlaceholder: '16자를 넘기지 마세요',
    namePlaceholder: '옵션',
    contactPlaceHolder: '이메일 / 전화번호',
    signaturePlaceHolder: '해당 내용을 복사하여 파일코인 (filecoin) 지갑에서 서명을 하고 얻은 값을 여기에 입력하세요.',
    specialNotes: '주의 사항 : 계정 이름에는 민감한 단어, 금지 단어, 유명인 이름 등이 허용되지 않으며 위반이있을 경우 서명이 삭제되고 금지됩니다. 협조 해 주셔서 감사합니다.',
    errorInput: '입력하세요',
    success: '서명 검증 성공. 새로고침을 통해 인증 내용을 확인하세요.',
    signed: 'V자는 계정 인증이 완료되었다는 의미입니다.'
  },
  meta: {
    titles: {
      filfox: 'filfox 블록 익스플로러',
      indexTitle: 'filfox 익스플로러 - Filecoin 블록체인 익스플로러',
      address: '주소',
      peer: '노드',
      tipset: '블록 높이',
      message: '메시지',
      block: '블록',
      recentTipsets: '최신 블록 리스트',
      rich: '자산 순위',
      dealList: '주문 리스트',
      deal: '주문 내역',
      messages: '메시지 리스트',
      ranks: '채굴 순위',
      minerCharts: '채굴 도표',
      tools: '도구',
      wiki: '위키'
    },
    description: {
      default: 'Filfox는 파일코인(Filecoin)의 익스플로러이자 데이터 서비스 플랫폼으로 파일코인과 관련된 채굴 랭킹, 블록 데이터 조회, 차트 등을 제공합니다.'
    }
  },
  merchant: {
    website: '홈페이지로 가기',
    overview: {
      title: '채굴파워 개요',
      qualityAdjPower: '유효 채굴파워',
      rank: '순위',
      powerDelta: '30일 채굴파워 증가속도',
      blockReward: '누적된 채굴 보상',
      blocksMined: '누적된 채굴 블록',
      minerEquivalent: '표준 채굴기 대수',
      rate: '비율'
    },
    miner: {
      miners: '보유 채굴기',
      qualityAdjPower: '유효 채굴파워',
      powerDelta: '30일 채굴파워 증가속도',
      blockReward: ' 누적된 채굴 보상 ',
      blocksMined: ' 누적된 채굴 블록 ',
      minerEquivalent: ' 표준 채굴기 대수 '
    },
    sales: {
      title: '채굴기 판매 정보',
      description: '공개된 정보를 기반으로 정리된 내용입니다. 최종 내용은 공식 발표를 확인하세요 ',
      issue: '문제 제기',
      price: '판매가',
      transparent: '투명도',
      transparentDesp: '판매 내역 중 공개된 변수를 기반으로 계산된 수치입니다. 투명도=공개지표 수량/총 지표 수량 * 5, 만점은 5점입니다. ',
      detail: '자세히 알아보기',
      services: '서비스',
      hardware: '하드웨어'
    },
    unknown: '미공개',
    contact: '내용을 contact@filfox.io 주소로 보내주시면 담당자가 연락을 드릴 예정입니다. '
  }
}
