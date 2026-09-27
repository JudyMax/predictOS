export type Role = 'am' | 'admin'
export type FactoryId = 'A' | 'B' | 'C'

export const USERS: Record<Role, { name: string; title: string; initial: string }> = {
  am: { name: '정하늘', title: 'Application Manager', initial: '하' },
  admin: { name: '윤서진', title: 'Platform Admin', initial: '서' },
}

export const FACTORIES: { id: FactoryId; name: string; site: string }[] = [
  { id: 'A', name: '공장 A', site: '여수 1공장' },
  { id: 'B', name: '공장 B', site: '여수 2공장' },
  { id: 'C', name: '공장 C', site: '울산 공장' },
]

// 공장별 현재 설치 버전 (PRD §6 과제 시나리오: 공장 A v1.1.1, 공장 B v1.0.3)
export const INITIAL_FACTORY_VERSION: Record<FactoryId, string> = { A: '1.1.1', B: '1.0.3', C: '1.1.1' }

export type Manifest = {
  fileName: string
  appId: string
  appName: string
  version: string
  requiredData: string[]
  requiredPermissions: string[]
  pdxVersion: string
  mxfmVersion: string
  upgradableFrom: string
  releaseNote: string
}

const base = {
  appId: 'app-a.motor-diagnosis',
  appName: '앱 A · 모터 진단',
  version: '2.0.1',
  requiredData: ['Servo_LoadFactor', 'Gear 진동', 'Motor 전류'],
  requiredPermissions: ['data.read', 'model.run', 'alarm.write'],
  pdxVersion: '>= 3.2.0',
  mxfmVersion: '>= 1.4.0',
  upgradableFrom: '>= 1.1.0',
}

// 첫 제출본: 릴리즈 노트에 알람 기준 변경 내용이 빠져 있다 (반려 사유의 근거)
export const MANIFEST_V1: Manifest = {
  ...base,
  fileName: 'app-a_v2.0.1.patch',
  releaseNote: '진단 모델 v2 적용, 기어 결함 탐지 정확도 개선',
}

// 재제출본: 반려 사유를 반영해 릴리즈 노트를 보완했다
export const MANIFEST_V2: Manifest = {
  ...base,
  fileName: 'app-a_v2.0.1_r2.patch',
  releaseNote: '진단 모델 v2 적용, 기어 결함 탐지 정확도 개선. 알람 기준 변경: 부하율 경고 85% → 80%',
}

export function manifestRaw(m: Manifest) {
  return JSON.stringify(
    {
      app_id: m.appId,
      version: m.version,
      required_data: m.requiredData,
      required_permissions: m.requiredPermissions,
      compatible: { pdx: m.pdxVersion, mxfm: m.mxfmVersion },
      upgradable_from: m.upgradableFrom,
      release_note: m.releaseNote,
    },
    null,
    2,
  )
}

// 공장별 현재 환경 (사전 환경 검증의 비교 대상)
export const FACTORY_ENV: Record<FactoryId, { pdx: string; mxfm: string; missingPermissions: string[]; missingData: string[] }> = {
  A: { pdx: '3.2.4', mxfm: '1.5.0', missingPermissions: [], missingData: [] },
  B: { pdx: '3.2.4', mxfm: '1.4.2', missingPermissions: [], missingData: [] },
  C: { pdx: '3.3.0', mxfm: '1.5.0', missingPermissions: ['alarm.write'], missingData: ['Motor 전류'] },
}

export const WORKSPACE = 'Factory Group A'

// 앱 A(모터 진단) 외 19개 앱은 배경 데이터로만 보여 준다 (공장 3곳 × 앱 20개 전제)
export const OTHER_APPS = [
  { category: '설비 진단', app: '베어링 이상 탐지', version: '1.3.0', installed: ['A', 'B', 'C'] as FactoryId[] },
  { category: '설비 진단', app: '펌프 캐비테이션 감지', version: '2.2.0', installed: ['A', 'B'] as FactoryId[] },
  { category: '설비 진단', app: '감속기 기어 마모 진단', version: '1.8.2', installed: ['A', 'B', 'C'] as FactoryId[] },
  { category: '설비 진단', app: '컨베이어 벨트 장력 진단', version: '1.1.4', installed: ['A', 'C'] as FactoryId[] },
  { category: '설비 진단', app: '압축기 밸브 누설 탐지', version: '3.0.1', installed: ['A', 'B', 'C'] as FactoryId[] },
  { category: '설비 진단', app: '팬 불균형 진단', version: '1.0.9', installed: ['B', 'C'] as FactoryId[] },
  { category: '설비 진단', app: '변압기 절연 열화 진단', version: '2.4.0', installed: ['A', 'B', 'C'] as FactoryId[] },
  { category: '품질 예측', app: '사출 불량 예측', version: '2.1.3', installed: ['A', 'B'] as FactoryId[] },
  { category: '품질 예측', app: '용접 비드 품질 예측', version: '1.6.0', installed: ['A', 'B', 'C'] as FactoryId[] },
  { category: '품질 예측', app: '도장 두께 편차 예측', version: '1.2.7', installed: ['A', 'C'] as FactoryId[] },
  { category: '품질 예측', app: '조립 토크 이상 예측', version: '1.0.2', installed: ['A', 'B', 'C'] as FactoryId[] },
  { category: '품질 예측', app: '치수 공차 이탈 예측', version: '2.0.0', installed: ['B'] as FactoryId[] },
  { category: '품질 예측', app: '원료 배합 품질 예측', version: '1.4.5', installed: ['A', 'B', 'C'] as FactoryId[] },
  { category: '에너지 최적화', app: '공조 에너지 최적화', version: '3.1.0', installed: ['A', 'B', 'C'] as FactoryId[] },
  { category: '에너지 최적화', app: '압축 공기 누설 절감', version: '1.9.1', installed: ['A', 'B'] as FactoryId[] },
  { category: '에너지 최적화', app: '피크 전력 예측', version: '2.3.2', installed: ['A', 'B', 'C'] as FactoryId[] },
  { category: '에너지 최적화', app: '보일러 연소 효율 최적화', version: '1.5.0', installed: ['A', 'C'] as FactoryId[] },
  { category: '에너지 최적화', app: '냉각수 펌프 인버터 제어', version: '1.0.6', installed: ['B', 'C'] as FactoryId[] },
  { category: '에너지 최적화', app: '설비 대기전력 차단 추천', version: '1.1.0', installed: ['A', 'B', 'C'] as FactoryId[] },
].map((a) => ({ ...a, factories: a.installed.length === 3 ? '3곳 완료' : `${a.installed.length}곳 완료 · ${3 - a.installed.length}곳 미배포` }))
