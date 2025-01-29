import 'dotenv/config'
import connectDB from '../lib/mongodb'
import StreamerModel from '../models/Streamer'

const dummyStreamers = [
  {
    name: "Alex Thompson",
    title: "선물/옵션 전문가",
    tradingStyle: "스윙 트레이딩",
    description: "10년 이상의 선물 거래 경험을 바탕으로 안정적인 수익을 추구합니다. 리스크 관리와 기술적 분석을 중심으로 한 트레이딩 전략을 공유합니다.",
    followers: 15000,
    averageViewers: 800,
    socialLinks: {
      twitter: "https://twitter.com/alexthompson",
      discord: "https://discord.gg/alexthompson",
      youtube: "https://youtube.com/alexthompson"
    }
  },
  {
    name: "Sarah Kim",
    title: "암호화폐 애널리스트",
    tradingStyle: "데이 트레이딩",
    description: "비트코인과 알트코인의 단기 트레이딩에 특화되어 있습니다. 실시간 시장 분석과 매매 신호를 제공합니다.",
    followers: 25000,
    averageViewers: 1200,
    socialLinks: {
      twitter: "https://twitter.com/sarahkim",
      discord: "https://discord.gg/sarahkim",
      youtube: "https://youtube.com/sarahkim"
    }
  },
  {
    name: "Mike Chen",
    title: "기술적 분석가",
    tradingStyle: "스캘핑",
    description: "고급 차트 패턴과 기술적 지표를 활용한 단타 매매 전략을 전문으로 합니다. 실시간 차트 분석과 매매 포인트를 공유합니다.",
    followers: 18000,
    averageViewers: 950,
    socialLinks: {
      twitter: "https://twitter.com/mikechen",
      discord: "https://discord.gg/mikechen",
      youtube: "https://youtube.com/mikechen"
    }
  },
  {
    name: "Emma Davis",
    title: "퀀트 트레이더",
    tradingStyle: "알고리즘 트레이딩",
    description: "수학적 모델과 통계적 분석을 기반으로 한 자동화 트레이딩 시스템을 운영합니다. 퀀트 전략 개발과 백테스팅 결과를 공유합니다.",
    followers: 12000,
    averageViewers: 600,
    socialLinks: {
      twitter: "https://twitter.com/emmadavis",
      discord: "https://discord.gg/emmadavis",
      youtube: "https://youtube.com/emmadavis"
    }
  },
  {
    name: "David Park",
    title: "매크로 트레이더",
    tradingStyle: "포지션 트레이딩",
    description: "거시경제 분석과 장기 트렌드 분석을 통한 중장기 포지션 트레이딩을 전문으로 합니다. 글로벌 마켓 인사이트를 제공합니다.",
    followers: 20000,
    averageViewers: 1000,
    socialLinks: {
      twitter: "https://twitter.com/davidpark",
      discord: "https://discord.gg/davidpark",
      youtube: "https://youtube.com/davidpark"
    }
  },
  {
    name: "Lisa Wang",
    title: "차트 전문가",
    tradingStyle: "브레이크아웃 트레이딩",
    description: "주요 지지/저항 레벨과 브레이크아웃 포인트를 분석하여 고수익 매매 기회를 포착합니다. 실시간 차트 분석을 제공합니다.",
    followers: 16000,
    averageViewers: 850,
    socialLinks: {
      twitter: "https://twitter.com/lisawang",
      discord: "https://discord.gg/lisawang",
      youtube: "https://youtube.com/lisawang"
    }
  },
  {
    name: "James Wilson",
    title: "파생상품 전문가",
    tradingStyle: "헤지 트레이딩",
    description: "옵션과 선물을 활용한 헤지 전략과 변동성 트레이딩을 전문으로 합니다. 리스크 관리와 포트폴리오 최적화 방법을 공유합니다.",
    followers: 14000,
    averageViewers: 700,
    socialLinks: {
      twitter: "https://twitter.com/jameswilson",
      discord: "https://discord.gg/jameswilson",
      youtube: "https://youtube.com/jameswilson"
    }
  },
  {
    name: "Nina Rodriguez",
    title: "ICO/IDO 분석가",
    tradingStyle: "이벤트 드리븐",
    description: "새로운 프로젝트와 토큰 런칭 기회를 분석하고 초기 투자 전략을 제시합니다. 프로젝트 실사와 투자 타이밍을 공유합니다.",
    followers: 22000,
    averageViewers: 1100,
    socialLinks: {
      twitter: "https://twitter.com/ninarodriguez",
      discord: "https://discord.gg/ninarodriguez",
      youtube: "https://youtube.com/ninarodriguez"
    }
  },
  {
    name: "Tom Lee",
    title: "온체인 분석가",
    tradingStyle: "온체인 데이터 트레이딩",
    description: "블록체인 데이터 분석을 통한 시장 인사이트와 투자 기회를 포착합니다. 온체인 지표와 월렛 분석 결과를 공유합니다.",
    followers: 19000,
    averageViewers: 900,
    socialLinks: {
      twitter: "https://twitter.com/tomlee",
      discord: "https://discord.gg/tomlee",
      youtube: "https://youtube.com/tomlee"
    }
  },
  {
    name: "Rachel Kim",
    title: "심리분석 전문가",
    tradingStyle: "센티먼트 트레이딩",
    description: "시장 심리와 투자자 행동 분석을 통한 매매 전략을 제시합니다. 공포/탐욕 지수와 시장 심리 지표를 활용한 분석을 공유합니다.",
    followers: 17000,
    averageViewers: 850,
    socialLinks: {
      twitter: "https://twitter.com/rachelkim",
      discord: "https://discord.gg/rachelkim",
      youtube: "https://youtube.com/rachelkim"
    }
  }
]

async function seedStreamers() {
  try {
    await connectDB()
    
    // 기존 데이터 삭제
    await StreamerModel.deleteMany({})
    console.log('기존 스트리머 데이터가 삭제되었습니다.')
    
    // 더미 데이터 추가
    const streamers = await StreamerModel.insertMany(dummyStreamers)
    console.log(`${streamers.length}명의 스트리머 데이터가 추가되었습니다.`)
    
    process.exit(0)
  } catch (error) {
    console.error('데이터베이스 시딩 중 오류가 발생했습니다:', error)
    process.exit(1)
  }
}

seedStreamers() 
