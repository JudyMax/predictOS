import {
  FACTORY_ENV,
  INITIAL_FACTORY_VERSION,
  MANIFEST_V1,
  MANIFEST_V2,
  USERS,
  type FactoryId,
  type Manifest,
  type Role,
} from './data'

export type RegStatus = 'pending' | 'approved' | 'rejected'
export type RunPhase = 'installing' | 'verifying' | 'done'
export type Run = { phase: RunPhase; health: number; dataReceived: boolean }
export type HistoryEntry = { at: string; actor: string; text: string }

export type Version = {
  id: string
  version: string
  status: RegStatus
  manifest: Manifest | null
  submitter: string
  submittedAt: string
  approvedBy?: string
  rejectReason?: string
  history: HistoryEntry[]
  seedSummary?: string
}

export type Drawer =
  | { type: 'register'; resubmitOf?: string }
  | { type: 'version'; id: string }
  | { type: 'fill'; factory: FactoryId }
  | null
export type Modal = { type: 'reject'; id: string } | { type: 'run' } | null
export type View = { name: 'versions' } | { name: 'deploy' } | { name: 'factory'; id: FactoryId }
export type Notice = { id: number; role: Role; text: string; versionId: string; read: boolean }

export type State = {
  role: Role
  view: View
  drawer: Drawer
  modal: Modal
  toast: { id: number; text: string } | null
  versions: Version[]
  notices: Notice[]
  factoryVersion: Record<FactoryId, string>
  deploy: {
    versionId: string | null
    selected: FactoryId[]
    checked: boolean
    applied: { perm: boolean; data: boolean }
    reverified: boolean
    runs: Partial<Record<FactoryId, Run>>
    executedAt: string | null
  }
  rejectCount: number
  freshId: string | null
}

export const now = () => {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

export const initialState = (): State => ({
  role: 'am',
  view: { name: 'versions' },
  drawer: null,
  modal: null,
  toast: null,
  versions: [
    {
      id: 'v111', version: '1.1.1', status: 'approved', manifest: null,
      submitter: USERS.am.name, submittedAt: '2026-08-12 14:03:11', approvedBy: USERS.admin.name,
      history: [], seedSummary: '공장 A·C 완료',
    },
    {
      id: 'v103', version: '1.0.3', status: 'approved', manifest: null,
      submitter: USERS.am.name, submittedAt: '2026-05-20 10:41:52', approvedBy: USERS.admin.name,
      history: [], seedSummary: '공장 B 완료',
    },
  ],
  notices: [],
  factoryVersion: { ...INITIAL_FACTORY_VERSION },
  deploy: { versionId: null, selected: [], checked: false, applied: { perm: false, data: false }, reverified: false, runs: {}, executedAt: null },
  rejectCount: 0,
  freshId: null,
})

// ---------- 사전 환경 검증 (임시 결과, 저장하지 않음) ----------
export type CheckItem = { key: string; label: string; declared: string; current: string; status: 'ok' | 'warn' | 'bad' | 'na'; fill?: 'perm' | 'data' }
export type CheckResult = { result: 'pass' | 'conflict' | 'shortage'; items: CheckItem[] }

export function cmpVer(a: string, b: string) {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)
  for (let i = 0; i < 3; i++) if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0)
  return 0
}
const minOf = (range: string) => range.replace('>=', '').trim()

export function evaluate(f: FactoryId, m: Manifest, current: string, applied: State['deploy']['applied']): CheckResult {
  const env = FACTORY_ENV[f]
  const items: CheckItem[] = []
  items.push({ key: 'pdx', label: '① pdx 버전', declared: m.pdxVersion, current: env.pdx, status: cmpVer(env.pdx, minOf(m.pdxVersion)) >= 0 ? 'ok' : 'bad' })
  items.push({ key: 'mxfm', label: '② MxFM 버전', declared: m.mxfmVersion, current: env.mxfm, status: cmpVer(env.mxfm, minOf(m.mxfmVersion)) >= 0 ? 'ok' : 'bad' })
  const pathOk = cmpVer(current, minOf(m.upgradableFrom)) >= 0
  items.push({ key: 'path', label: '③ 업그레이드 경로', declared: m.upgradableFrom, current: `현재 v${current}`, status: pathOk ? 'ok' : 'bad' })
  if (items.some((i) => i.status === 'bad')) {
    // 버전 검사에서 막히면 설정 검사는 하지 않는다 (버전 → 설정 순서)
    items.push({ key: 'perm', label: '④ 권한', declared: '—', current: '버전 검사에서 차단되어 확인하지 않음', status: 'na' })
    items.push({ key: 'data', label: '⑤ 데이터 연결', declared: '—', current: '버전 검사에서 차단되어 확인하지 않음', status: 'na' })
    return { result: 'conflict', items }
  }
  const permMissing = applied.perm ? [] : env.missingPermissions
  const dataMissing = applied.data ? [] : env.missingData
  items.push({
    key: 'perm', label: '④ 권한', declared: m.requiredPermissions.join(', '),
    current: permMissing.length ? `${permMissing.join(', ')} 부여 안 됨` : '모두 부여됨',
    status: permMissing.length ? 'warn' : 'ok', fill: permMissing.length ? 'perm' : undefined,
  })
  items.push({
    key: 'data', label: '⑤ 데이터 연결', declared: m.requiredData.join(', '),
    current: dataMissing.length ? `${dataMissing.join(', ')} 연결되지 않음` : '모두 연결됨',
    status: dataMissing.length ? 'warn' : 'ok', fill: dataMissing.length ? 'data' : undefined,
  })
  return { result: permMissing.length || dataMissing.length ? 'shortage' : 'pass', items }
}

export function checkAll(s: State) {
  const v = s.versions.find((x) => x.id === s.deploy.versionId)
  const out: Partial<Record<FactoryId, CheckResult>> = {}
  if (!v?.manifest) return out
  for (const f of s.deploy.selected) out[f] = evaluate(f, v.manifest, s.factoryVersion[f], s.deploy.applied)
  return out
}

// ---------- Actions ----------
export type Action =
  | { type: 'role'; role: Role }
  | { type: 'nav'; view: View }
  | { type: 'drawer'; drawer: Drawer }
  | { type: 'modal'; modal: Modal }
  | { type: 'toast'; text: string | null }
  | { type: 'submit'; resubmitOf?: string }
  | { type: 'approve'; id: string }
  | { type: 'reject'; id: string; reason: string }
  | { type: 'startDeploy'; id: string }
  | { type: 'toggleFactory'; f: FactoryId }
  | { type: 'runCheck' }
  | { type: 'reselect' }
  | { type: 'applyFill'; perm: boolean; data: boolean }
  | { type: 'execute' }
  | { type: 'tick' }
  | { type: 'openNotice'; id: number }
  | { type: 'reset' }

let seq = 1
const toast = (text: string) => ({ id: seq++, text })

export function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'role': {
      const view: View = a.role === 'am' && s.view.name === 'deploy' ? { name: 'versions' } : s.view
      return { ...s, role: a.role, view, drawer: null, modal: null }
    }
    case 'nav':
      return { ...s, view: a.view, drawer: null, modal: null }
    case 'drawer':
      return { ...s, drawer: a.drawer }
    case 'modal':
      return { ...s, modal: a.modal }
    case 'toast':
      return { ...s, toast: a.text ? toast(a.text) : null }
    case 'submit': {
      const at = now()
      const actor = USERS.am.name
      if (a.resubmitOf) {
        const versions = s.versions.map((v) =>
          v.id === a.resubmitOf
            ? { ...v, status: 'pending' as const, manifest: MANIFEST_V2, submittedAt: at, rejectReason: undefined,
                history: [...v.history, { at, actor, text: '고친 패치 파일로 재제출 → 승인 대기' }] }
            : v,
        )
        return { ...s, versions, drawer: null, freshId: a.resubmitOf, toast: toast('재제출했습니다. 승인 대기로 등록됨') }
      }
      const nv: Version = {
        id: 'v201', version: '2.0.1', status: 'pending', manifest: MANIFEST_V1, submitter: actor, submittedAt: at,
        history: [{ at, actor, text: '패치 파일 제출 → 등록 정보 자동 읽기, 검증 통과 → 승인 대기' }],
      }
      return { ...s, versions: [nv, ...s.versions], drawer: null, freshId: nv.id, toast: toast('승인 대기로 등록됨') }
    }
    case 'approve': {
      const at = now()
      const versions = s.versions.map((v) =>
        v.id === a.id
          ? { ...v, status: 'approved' as const, approvedBy: USERS.admin.name,
              history: [...v.history, { at, actor: USERS.admin.name, text: '승인 → 등록 확정' }] }
          : v,
      )
      return { ...s, versions, toast: toast('승인했습니다. 등록이 확정되었습니다') }
    }
    case 'reject': {
      const at = now()
      const versions = s.versions.map((v) =>
        v.id === a.id
          ? { ...v, status: 'rejected' as const, rejectReason: a.reason,
              history: [...v.history, { at, actor: USERS.admin.name, text: `반려 · 사유: ${a.reason}` }] }
          : v,
      )
      const n: Notice = { id: seq++, role: 'am', text: `모터 진단 v2.0.1 등록이 반려되었습니다`, versionId: a.id, read: false }
      return { ...s, versions, modal: null, notices: [n, ...s.notices], rejectCount: s.rejectCount + 1, toast: toast('반려했습니다. 사유는 제출자에게만 보입니다') }
    }
    case 'startDeploy':
      return {
        ...s, view: { name: 'deploy' }, drawer: null, modal: null,
        deploy: { ...s.deploy, versionId: a.id, selected: [], checked: false, runs: {}, executedAt: null },
      }
    case 'toggleFactory': {
      const has = s.deploy.selected.includes(a.f)
      const selected = has ? s.deploy.selected.filter((x) => x !== a.f) : [...s.deploy.selected, a.f].sort() as FactoryId[]
      return { ...s, deploy: { ...s.deploy, selected } }
    }
    case 'runCheck':
      return { ...s, deploy: { ...s.deploy, checked: true } }
    case 'reselect':
      return { ...s, deploy: { ...s.deploy, checked: false } }
    case 'applyFill':
      return {
        ...s, drawer: null,
        deploy: { ...s.deploy, applied: { perm: s.deploy.applied.perm || a.perm, data: s.deploy.applied.data || a.data }, reverified: true },
        toast: toast('저장하고 다시 검증했습니다'),
      }
    case 'execute': {
      const checks = checkAll(s)
      const targets = s.deploy.selected.filter((f) => checks[f]?.result === 'pass')
      const runs: State['deploy']['runs'] = {}
      for (const f of targets) runs[f] = { phase: 'installing', health: 0, dataReceived: false }
      const at = now()
      const versions = s.versions.map((v) =>
        v.id === s.deploy.versionId
          ? { ...v, history: [...v.history, { at, actor: USERS.admin.name, text: `배포 실행 · 대상 ${targets.map((f) => `공장 ${f}`).join('·')} (점검 스냅샷 저장)` }] }
          : v,
      )
      return { ...s, modal: null, versions, deploy: { ...s.deploy, runs, executedAt: at } }
    }
    case 'tick': {
      const runs = { ...s.deploy.runs }
      let changed = false
      const finished: FactoryId[] = []
      for (const f of Object.keys(runs) as FactoryId[]) {
        const r = runs[f]!
        if (r.phase === 'done') continue
        changed = true
        if (r.phase === 'installing') runs[f] = { ...r, phase: 'verifying' }
        else if (r.health < 3) runs[f] = { ...r, health: r.health + 1 }
        else if (!r.dataReceived) runs[f] = { ...r, dataReceived: true }
        else { runs[f] = { ...r, phase: 'done' }; finished.push(f) }
      }
      if (!changed) return s
      let next: State = { ...s, deploy: { ...s.deploy, runs } }
      if (finished.length) {
        const v = s.versions.find((x) => x.id === s.deploy.versionId)!
        const at = now()
        const factoryVersion = { ...s.factoryVersion }
        for (const f of finished) factoryVersion[f] = v.version
        const versions = s.versions.map((x) =>
          x.id === v.id
            ? { ...x, history: [...x.history, ...finished.map((f) => ({ at, actor: '시스템', text: `공장 ${f} 정상 동작 확인 → 완료, v${v.version} 반영` }))] }
            : x,
        )
        next = { ...next, versions, factoryVersion, toast: toast(`${finished.map((f) => `공장 ${f}`).join('·')} 배포 완료 (정상 동작 확인)`) }
      }
      return next
    }
    case 'openNotice': {
      const n = s.notices.find((x) => x.id === a.id)
      if (!n) return s
      return {
        ...s, notices: s.notices.map((x) => (x.id === a.id ? { ...x, read: true } : x)),
        view: { name: 'versions' }, drawer: { type: 'version', id: n.versionId }, modal: null,
      }
    }
    case 'reset':
      return initialState()
  }
}
