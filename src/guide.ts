import type { Role } from './data'
import { checkAll, type State } from './state'

export type GuideStep = { no: number; role: Role | 'system'; title: string; hint: string; exception?: string }

export const STEPS: GuideStep[] = [
  { no: 1, role: 'am', title: '새 버전 등록', hint: "'새 버전 등록'을 눌러 패치 파일(app-a_v2.0.1.patch)을 올리고 제출하세요" },
  { no: 2, role: 'admin', title: '검토 후 반려', hint: "모터 진단의 버전별 이력에서 승인 대기(v2.0.1) 행을 열고 '반려'를 눌러 사유를 입력하세요", exception: '예외 ② 승인 반려' },
  { no: 3, role: 'am', title: '반려 사유 확인·재제출', hint: "알림함이나 목록에서 반려된 버전을 열어 사유를 확인하고 '고친 파일로 재제출'을 누르세요" },
  { no: 4, role: 'admin', title: '재검토 후 승인', hint: "다시 승인 대기가 된 v2.0.1 행을 열어 바뀐 릴리즈 노트를 확인하고 '승인'을 누르세요" },
  { no: 5, role: 'admin', title: '배포하기', hint: "승인된 버전 상세에서 '배포하기'를 누르세요" },
  { no: 6, role: 'admin', title: '공장 선택·사전 환경 검증', hint: "공장 A·B·C를 모두 고른 뒤 '사전 환경 검증'을 누르세요" },
  { no: 7, role: 'admin', title: '차단 확인·부족 항목 채우기', hint: "공장 B의 차단 사유를 확인하고, 공장 C의 '채우기'로 부족 항목을 채우세요", exception: '예외 ④ 버전 충돌' },
  { no: 8, role: 'admin', title: '통과 공장 배포 실행', hint: "'통과 공장 배포 실행'을 누르고, 확인 모달에서 대상·제외 공장을 확인한 뒤 실행하세요" },
  { no: 9, role: 'system', title: '설치·정상 동작 확인', hint: '설치 → 헬스체크 3회 → 데이터 수신을 확인하는 중입니다 (프로토타입은 30분 기준을 몇 초로 줄였습니다)' },
  { no: 10, role: 'admin', title: '공장별 배포 현황 확인', hint: "시나리오 완료. 공장 B는 이전 버전(v1.0.3)을 유지하며 선행 버전 배포가 필요합니다. '공장별 배포 현황' 탭에서 앱 20개의 버전×공장 상태를 확인해 보세요" },
]

export function currentStep(s: State): GuideStep {
  const v = s.versions.find((x) => x.id === 'v201')
  const at = (n: number) => STEPS[n - 1]
  if (!v) return at(1)
  if (v.status === 'pending') return s.rejectCount === 0 ? at(2) : at(4)
  if (v.status === 'rejected') return at(3)
  if (s.deploy.versionId !== v.id) return at(5)
  const runs = Object.values(s.deploy.runs)
  if (s.deploy.executedAt) return runs.every((r) => r?.phase === 'done' || r?.phase === 'failed') ? at(10) : at(9)
  if (!s.deploy.checked) return at(6)
  const checks = checkAll(s)
  if (Object.values(checks).some((c) => c?.result === 'shortage')) return at(7)
  return at(8)
}

export const roleLabel = (r: Role | 'system') => (r === 'am' ? 'Application Manager' : r === 'admin' ? 'Platform Admin' : r === 'op' ? 'Plant Operator' : '시스템')
