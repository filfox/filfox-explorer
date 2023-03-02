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
    currentNetwork: '현재 네트워크: ',
    openApp: 'APP 다운로드/열기'
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
        '주문',
        'FNS Lookup',
        'Mempool',
        '계약 확인'
      ]
    },
    ranks: {
      title: '채굴 순위'
    },
    charts: {
      title: '통계량',
      subMenus: [
        '채굴',
        '가스 데이터',
        '버전 배포'
      ]
    },
    resources: {
      title: '사용자 도구',
      subMenus: [
        '도구',
        '정보',
        '웹 지갑',
        'FNS Lookup'
      ]
    },
    searchPlaceHolder: '\b블록/계정/주소/소식 검색',
    language: '언어',
    app: {
      title: '모바일 앱',
      download: '다운로드',
      website: '핸드폰 앱',
      downloadApp: '다운로드 FoxWallet APP',
      description: '블록체인 세계로 안내'
    }
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
        sectorInitialPledge: '현재 부문 서약 금액',
        currentBaseFee: 'Current Base Fee'
      },
      tips: {
        qualityAdjPower: '현재 유효한 채굴파워의 총합',
        activeMiners: '현재 채굴파워가 0보다 큰 채굴자의 수',
        price: 'FIL 최신가격 (데이터소스: Coingecko)',
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
    entireQualityAdjPower: {
      title: '에너지 저장 추세',
      qualityAdjPower: '유효 계산력',
      qualityAdjPowerDelta: '산력 증량'
    },
    powerDistribution: {
      title: '유효 채굴파워 분포 현황'
    },
    powerDelta: {
      title: '일별 채굴파워 증가량 ( Top5）'
    },
    baseFee: {
      title: '24h Base Fee Variations'
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
        rate: '비율',
        validPowerRate: '유효 채굴파워 비율',
        reward: '24시간 블록 보상',
        miningEfficiency: '24시간 채굴 효율',
        powerIncrease: '24시간 채굴파워 증가량',
        location: '위치'
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
        rate: '비율',
        rewardsRatio: '블록 보상 비율',
        validPower: '유효 채굴파워 비율',
        location: '위치'
      },
      tipsByBlock: {
        luckyValue: '실제 채굴 개수에서 이론상 채굴 개수를 나눈 비율',
        rewardsRatio: '특정 기간 채굴한 보상에서 누적 보상을 나눈 비율',
        winCount: 'In Filecoin mining model, there may be multiple blocks under a tipset, and each block may receive multiple win counts. Cumulative win counts = the sum of win counts for each block.',
        blocksMined: 'Blocks mined =  the sum of blocks mined'
      },
      tableHeadersByPowerDelta: {
        rank: '순위',
        miner: '채굴자',
        tag: '서명',
        powerIncreaseSpeed: '채굴파워 증가 속도',
        equivalentMiners: '표준 채굴기 대수',
        powerDelta: '채굴파워 증가량',
        validPower: '유효 채굴파워',
        location: '위치'
      },
      tipsByPowerDelta: {
        equivalentMiners: '채굴자가 보유한 채굴파워를 공식 벤치마크 추천 구성 ( AMD Ryzen Threadripper 3970X、NVidia GTX 2080Ti、128GB 2133mhz）을 기준으로 환산하여 얻은 값.',
        powerIncreaseSpeed: 'Daily total adj. power of the sealed sectors within selected period.',
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
    },
    partner: '파트너'
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
      searchPlaceHolder: '검색 클라이언트/스토리지 사용자',
      verifiedTips: '공식 인증을 받은 클라이언트의 문서입니다. 해당 문서의 유효 채굴파워는 기본 채굴파워의 10배에 해당합니다.',
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
    },
    mempool: {
      title: 'Mempool 메시지 리스트'
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
    contract: {
      title: '계약',
      verifyTip: ['계약 작성자입니까', '확인 및 게시', '계약 소스 코드'],
      codeVerified: '계약 소스 코드가 확인되었습니다',
      contractName: '계약명',
      compilerVersion: '컴파일러 버전',
      optimizeEnabled: '최적화',
      otherSettings: '다른 설정',
      contractSourceCode: '계약 소스 코드',
      contractAbi: '계약 ABI',
      contractCreationCode: '계약 생성 코드',
      exportAbi: '수출 ABI'
    },
    message: {
      title: '메시지 내역',
      replaced: '메시지 {oldCid} 가 메시지 {cid} 에 의해 무시됨',
      testNetOnly: '이 메시지는 Hyperspace 네트워크만 지원합니다',
      modules: {
        overview: '개요',
        logs: '거래 이벤트',
        internaltransfer: '내부 이체',
        transfer: '거래내역',
        others: '기타'
      },
      headers: {
        cid: '메시지 ID',
        height: '높이',
        time: '시간',
        createTime: '생성 시간',
        inBlocks: '연결된 블록',
        version: '버전',
        from: '보낸 이',
        to: '받는 이',
        nonce: 'Nonce',
        method: '방법',
        params: '변수',
        value: '금액',
        address: '주소',
        topics: 'Topics',
        data: '매개변수',
        gasPrice: '가스비용',
        gasLimit: '가스 리밋',
        gasUsed: '가스 사용량',
        exitCode: '상태',
        return: '리턴값',
        error: '오류'
      },
      internaltransfer: {
        contractFrom: '계약',
        contractTo: '부터 계약',
        produced: ' {amount} 건의 메시지가 있습니다',
        method: '방법',
        from: '보내는 이',
        to: '받는 이',
        value: '유형'
      },
      transfer: {
        from: '보내는 이',
        to: '받는 이',
        value: '금액',
        type: '유형'
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
        winCount: '승리 횟수',
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
          workers: '유효 채굴자',
          benefitedMiners: '광부 혜택'
        }
      },
      miner: {
        app: {
          label: '계정 변경 모니터링',
          download: '다운로드 >',
          title: 'Fox Wallet App 으로 계정 변경 모니터링',
          step1: 'APP 다운로드',
          step2: '데이터 페이지 들어가기',
          step3: '광부 ID 또는 주소 찾기 입력',
          step4: '클릭하여 수집'
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
            WinCount: 'Win Count',
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
            winCount: 'Win Count',
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
            ip: '지역 (공개 IP)',
            beneficiary: '수익자'
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
    account: '일반 계정',
    cron: '시간 지정 작업 실행',
    init: '초기화',
    multisig: '다중 서명',
    paymentchannel: '지불 채널',
    reward: '보상',
    storagemarket: '스토리지 마켓',
    storageminer: '채굴자 계정',
    storagepower: '스토리지 파워',
    system: '시스템',
    verifiedregistry: '등록 확인',
    evm: 'EVM',
    eam: 'EAM',
    datacap: 'Datacap',
    placeholder: 'Placeholder',
    ethaccount: 'EthAccount',
    created: 'To be created'
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
    gas: {
      title: '가스 데이터',
      baseFeeChart: {
        title: 'Base Fee Variations',
        tips: 'Base Fee：The real-time rate of the fee charged and burned by Filecoin system.'
      },
      headers: {
        dailyStatistics: '24시간 가스 데이터'
      },
      all: '모두 보기',
      tableHeaders: {
        method: '메시지 유형',
        gasPrice: '평균 가스 비용',
        gasLimit: '평균 가스 리밋',
        gasUsed: '평균 가스 사용량',
        gasFee: '평균 가스 수수료',
        fee: '수수료 합계 / 백분율',
        count: '메시지 합계 / 백분율'
      }
    },
    lotus: {
      pie: 'Lotus Version Distribution'
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
    title: '지갑'
  },
  fns: {
    search: {
      title: 'Filecoin 도메인 이름 검색',
      placeholder: '주소 또는 도메인 이름을 입력하십시오',
      fail: '실패',
      resultFor: '의 질의 결과'
    },
    registrations: {
      title: 'Filecoin 이름 등록',
      address: '주소',
      name: '이름',
      expiration: '만료 날짜',
      handle: '작업',
      moreDetails: '자세한 내용'
    },
    address: {
      overview: '개요',
      names: '이름',
      expirationDate: '만료 날짜',
      reverseRecord: '레코드 반전',
      registrant: '등록자',
      realatedTransactions: '관련 거래',
      block: '청크',
      actions: '작업',
      txHash: '거래 ID'
    },
    name: {
      resolvedAddress: '처리된 주소',
      expiration: '만료 날짜',
      registrant: '등록자',
      controller: '컨트롤러'
    }
  },
  contract: {
    reset: '재설정',
    continue: '지속',
    return: '반환',
    publish: '검증 및 게시',

    guide: {
      title: ['계약 소스 코드 검증 및 게시', '컴파일러 유형 및 버전 선택'],
      tips: [
        '소스 코드 유효성 검사는 스마트 계약과 상호 작용하는 사용자에게 투명도를 제공합니다.소스 코드를 업로드하면 Filfox는 컴파일된 코드를 블록 체인의 코드와 일치시킵니다.계약과 마찬가지로"스마트 계약"은 최종 사용자에게"디지털 서명"에 대한 더 많은 정보를 제공하고 코드가 실제로 해야 할 일을 완료했는지 독립적으로 확인하기 위해 코드를 검토할 수있는 기회를 주어야합니다.',
        'bytecodeHash: "none" 또는 viaIR: "true"와 같은 고급 설정은 Solidity(표준 Json 입력) 인증 방법을 통해 액세스할 수 있습니다.자세한 내용은 Solidity의 컴파일러 JSON 설명 가져오기 및 내보내기 문서 섹션에서 확인할 수 있습니다.'
      ],
      pleaseSelect: '선택하십시오',
      pleaseCenterAddress: '계약 주소를 입력하십시오',
      enterContractAddress: '확인하려는 계약 주소를 입력하십시오',
      selectCompiler: '컴파일러 버전을 선택하십시오',
      selectLicense: '오픈 소스 라이센스 유형을 선택하십시오',
      agreeService: '서비스 약관에 동의합니다'
    },
    verify: {
      title: ['계약 소스 코드 검증 및 게시', '하나 이상의 *.SOL 파일을 선택하십시오.'],
      source: '계약 소스 코드',
      output: '컴파일러 출력',
      tips: [
        '계약이 REMIX에서 올바르게 컴파일된 경우 여기에서도 올바르게 컴파일되어야 합니다.',
        '다른 계약에 의해 작성된 계약의 유효성 검사에 대한 지원은 제한적이며 컴파일된 각 계약의 제한 시간은 최대 45초입니다.',
        '프로그래밍 계약 확인의 경우 계약 API 끝점을 확인합니다.'
      ],
      contractAddress: '계약 주소',
      complier: '준수자',
      optimizations: '최적화',
      selectFiles: '*.sol 파일 선택',
      selectFilesDes: '하나 이상의 Solidity 파일 선택',
      clearFiles: '파일 지우기',
      constructorArg: '생성자 매개변수',
      argTip: '생성자 매개변수에 대한 추가 정보는 기술 자료 항목을 참조하십시오',
      debugLog: '컴파일러 디버그 로그',
      complierVersion: '컴파일러 버전',
      optimizationEnabled: '최적화 오픈',
      runs: '실행',
      argsUsed: '사용된 생성자 매개변수',
      contractName: '계약 이름',
      contractAbi: '계약 ABI',
      contractBytecode: '계약 바이트 코드',
      verifyFailed: '인증 실패',
      verifySuccess: '인증 성공',
      error: {
        1: '소스 코드를 찾을 수 없음',
        2: '계약 바이트 코드를 찾을 수 없음',
        3: '컴파일러 로드 실패',
        4: '인증 실패',
        5: '이 언어는 지원되지 않습니다.',
        6: '계약은 이미 검증되었다'
      }
    }
  }
}
