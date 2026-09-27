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

// 다른 앱은 배경 데이터로만 보여 준다
export const OTHER_APPS = [
  { app: '앱 B · 베어링 이상 탐지', version: '1.3.0', factories: '3곳 완료' },
  { app: '앱 C · 펌프 캐비테이션', version: '2.2.0', factories: '2곳 완료 · 1곳 미배포' },
]
