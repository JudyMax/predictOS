import {
  FACTORY_ENV,
  INITIAL_FACTORY_VERSION,
  PEOPLE,
  ME,
  initialGrants,
  MANIFEST_V1,
  MANIFEST_V2,
  USERS,
  type FactoryId,
  type Manifest,
  type Role,
} from './data'

export type RegStatus = 'pending' | 'approved' | 'rejected'
export type RunPhase = 'installing' | 'verifying' | 'done' | 'failed'
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
  | { type: 'user'; uid: string }
  | { type: 'audit'; id: number }
  | null
export type Modal =
  | { type: 'reject'; id: string }
  | { type: 'run' }
  | { type: 'usage'; app: string }
  | { type: 'rejectUsage'; reqId: number }
  | { type: 'restrict'; uid: string; app?: string }
  | null
export type View = { name: 'versions' } | { name: 'deploy'; tab: 'status' | 'run' } | { name: 'factory'; id: FactoryId } | { name: 'access'; tab: 'users' | 'requests' } | { name: 'audit' }
export type Notice = { id: number; role: Role; text: string; sub: string; target: 'version' | 'deploy'; versionId: string; read: boolean }

export type UsageReq = { id: number; uid: string; app: string; factory: FactoryId; reason: string; at: string; status: 'pending' | 'approved' | 'rejected'; rejectReason?: string }
export type AuditEntry = {
  id: number; at: string; type: string; target: string; app?: string; version?: string; factory?: FactoryId
  actor: string; before?: string; after?: string; reason?: string
  requester?: string; approver?: string; executor?: string; appliedAt?: string; snapshot?: CheckItem[]
}

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
  raceArmed: string | null
  conflict: { id: string; by: string; at: string } | null
  failPlan: FactoryId[]
  grants: Record<string, string[]>
  requests: UsageReq[]
  disabled: Record<string, boolean>
  audit: AuditEntry[]
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
  raceArmed: null,
  conflict: null,
  failPlan: [],
  grants: initialGrants(),
  requests: [],
  disabled: {},
  audit: ([
    { id: -6, at: '2026-05-20 10:41:52', type: '등록 요청', target: '모터 진단 v1.0.3', app: '모터 진단', version: '1.0.3', actor: USERS.am.name, before: '—', after: '승인 대기', requester: USERS.am.name },
    { id: -5, at: '2026-05-21 09:12:40', type: '승인', target: '모터 진단 v1.0.3', app: '모터 진단', version: '1.0.3', actor: USERS.admin.name, before: '승인 대기', after: '승인됨', requester: USERS.am.name, approver: USERS.admin.name },
    { id: -4, at: '2026-05-22 15:30:05', type: '반영', target: '모터 진단 v1.0.3', app: '모터 진단', version: '1.0.3', factory: 'B', actor: '시스템', before: 'v1.0.2', after: 'v1.0.3', executor: USERS.admin.name, appliedAt: '2026-05-22 15:30:05' },
    { id: -3, at: '2026-08-12 14:03:11', type: '등록 요청', target: '모터 진단 v1.1.1', app: '모터 진단', version: '1.1.1', actor: USERS.am.name, before: '—', after: '승인 대기', requester: USERS.am.name },
    { id: -2, at: '2026-08-13 10:20:44', type: '승인', target: '모터 진단 v1.1.1', app: '모터 진단', version: '1.1.1', actor: USERS.admin.name, before: '승인 대기', after: '승인됨', requester: USERS.am.name, approver: USERS.admin.name },
    { id: -1, at: '2026-08-14 16:02:19', type: '반영', target: '모터 진단 v1.1.1', app: '모터 진단', version: '1.1.1', factory: 'A', actor: '시스템', before: 'v1.1.0', after: 'v1.1.1', executor: USERS.admin.name, appliedAt: '2026-08-14 16:02:19' },
  ] as AuditEntry[]).reverse(),
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
  const stop = items.findIndex((i) => i.status === 'bad')
  if (stop >= 0) for (let i = stop + 1; i < items.length; i++) items[i] = { ...items[i], current: '앞 검사에서 차단되어 확인하지 않음', status: 'na' }
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
  | { type: 'execute'; fail: FactoryId[] }
  | { type: 'armRace'; id: string }
  | { type: 'tick' }
  | { type: 'openNotice'; id: number }
  | { type: 'reset' }
  | { type: 'requestUsage'; app: string; reason: string }
  | { type: 'approveUsage'; reqId: number }
  | { type: 'rejectUsage'; reqId: number; reason: string }
  | { type: 'grant'; uid: string; app: string; reason: string }
  | { type: 'restrict'; uid: string; app?: string; reason: string }

let seq = 1

// 동시 검토 충돌: 다른 Platform Admin이 먼저 승인한 뒤 내 승인·반려가 거부된다 (POL-064)
function race(s: State, id: string): State {
  const at = now()
  const by = '한도윤'
  const versions = s.versions.map((v) =>
    v.id === id ? { ...v, status: 'approved' as const, approvedBy: by, history: [...v.history, { at, actor: by, text: '승인 → 등록 확정 (먼저 처리됨)' }] } : v,
  )
  return { ...s, versions, modal: null, raceArmed: null, conflict: { id, by, at } }
}
const toast = (text: string) => ({ id: seq++, text })

function core(s: State, a: Action): State {
  switch (a.type) {
    case 'role': {
      const view: View = a.role === 'op' ? { name: 'factory', id: 'A' } : a.role === 'am' && (s.view.name === 'deploy' || s.view.name === 'access') ? { name: 'versions' } : s.view.name === 'factory' || s.view.name === 'audit' || s.role !== 'op' ? s.view : { name: 'versions' }
      return { ...s, role: a.role, view, drawer: null, modal: null }
    }
    case 'nav':
      return { ...s, view: a.view, drawer: null, modal: null }
    case 'drawer':
      return { ...s, drawer: a.drawer, conflict: a.drawer ? s.conflict : null }
    case 'armRace':
      return { ...s, raceArmed: a.id }
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
      if (s.versions.find((v) => v.id === a.id)?.submitter === USERS.admin.name) return { ...s, toast: toast('자신이 제출한 등록은 승인할 수 없습니다') }
      if (s.raceArmed === a.id) return race(s, a.id)
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
      if (s.raceArmed === a.id) return race(s, a.id)
      const at = now()
      const versions = s.versions.map((v) =>
        v.id === a.id
          ? { ...v, status: 'rejected' as const, rejectReason: a.reason,
              history: [...v.history, { at, actor: USERS.admin.name, text: `반려 · 사유: ${a.reason}` }] }
          : v,
      )
      const n: Notice = { id: seq++, role: 'am', text: `모터 진단 v2.0.1 등록이 반려되었습니다`, sub: '눌러서 반려 사유 확인', target: 'version', versionId: a.id, read: false }
      return { ...s, versions, modal: null, notices: [n, ...s.notices], rejectCount: s.rejectCount + 1, toast: toast('반려했습니다. 사유는 제출자에게만 보입니다') }
    }
    case 'startDeploy':
      if (s.deploy.versionId === a.id && s.deploy.executedAt) return { ...s, view: { name: 'deploy', tab: 'run' }, drawer: null, modal: null }
      return {
        ...s, view: { name: 'deploy', tab: 'run' }, drawer: null, modal: null,
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
      return { ...s, modal: null, versions, failPlan: a.fail.filter((f) => targets.includes(f)), deploy: { ...s.deploy, runs, executedAt: at } }
    }
    case 'tick': {
      const runs = { ...s.deploy.runs }
      let changed = false
      const finished: FactoryId[] = []
      const failed: FactoryId[] = []
      for (const f of Object.keys(runs) as FactoryId[]) {
        const r = runs[f]!
        if (r.phase === 'done' || r.phase === 'failed') continue
        changed = true
        if (r.phase === 'verifying' && r.health >= 1 && s.failPlan.includes(f)) { runs[f] = { ...r, phase: 'failed' }; failed.push(f) }
        else if (r.phase === 'installing') runs[f] = { ...r, phase: 'verifying' }
        else if (r.health < 3) runs[f] = { ...r, health: r.health + 1 }
        else if (!r.dataReceived) runs[f] = { ...r, dataReceived: true }
        else { runs[f] = { ...r, phase: 'done' }; finished.push(f) }
      }
      if (!changed) return s
      let next: State = { ...s, deploy: { ...s.deploy, runs } }
      if (failed.length) {
        const v = s.versions.find((x) => x.id === s.deploy.versionId)!
        const at = now()
        const label = failed.map((f) => `공장 ${f}`).join('·')
        const versions = next.versions.map((x) =>
          x.id === v.id ? { ...x, history: [...x.history, ...failed.map((f) => ({ at, actor: '시스템', text: `공장 ${f} 정상 동작 확인 기준 미충족 → 실패, 이전 버전 v${s.factoryVersion[f]} 유지` }))] } : x,
        )
        const mk = (role: Role, sub: string, target: Notice['target']): Notice => ({ id: seq++, role, text: `${label} 배포 실패 · 모터 진단 v${v.version}`, sub, target, versionId: v.id, read: false })
        next = { ...next, versions, notices: [mk('admin', '눌러서 배포 관리에서 확인', 'deploy'), mk('am', '눌러서 버전 상세에서 확인', 'version'), ...next.notices] }
      }
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
      const notices = s.notices.map((x) => (x.id === a.id ? { ...x, read: true } : x))
      if (n.target === 'deploy') return { ...s, notices, view: { name: 'deploy', tab: 'run' }, drawer: null, modal: null }
      return { ...s, notices, view: { name: 'versions' }, drawer: { type: 'version', id: n.versionId }, modal: null }
    }
    case 'reset':
      return initialState()
    default:
      return s
  }
}

// ---------- 흐름 2·3: 사용 권한 요청, 권한 부여·제한·차단 ----------
const nameOf = (uid: string) => PEOPLE.find((p) => p.id === uid)!.name
let aseq = 1
const entry = (e: Omit<AuditEntry, 'id' | 'at'>, at = now()): AuditEntry => ({ id: aseq++, at, ...e })
const addAudit = (s: State, ...es: AuditEntry[]): State => ({ ...s, audit: [...es.reverse(), ...s.audit] })

function access(s: State, a: Action): State | null {
  const admin = USERS.admin.name
  switch (a.type) {
    case 'requestUsage': {
      const uid = ME.op
      const r: UsageReq = { id: seq++, uid, app: a.app, factory: 'A', reason: a.reason, at: now(), status: 'pending' }
      return { ...s, requests: [r, ...s.requests], modal: null, toast: toast('사용 권한을 요청했습니다') }
    }
    case 'approveUsage': {
      const r = s.requests.find((x) => x.id === a.reqId)!
      if (r.status !== 'pending') return { ...s, toast: toast('이미 처리된 요청입니다') }
      const requests = s.requests.map((x) => (x.id === r.id ? { ...x, status: 'approved' as const } : x))
      const grants = { ...s.grants, [r.uid]: [...(s.grants[r.uid] ?? []), r.app] }
      return addAudit({ ...s, requests, grants, toast: toast(`${nameOf(r.uid)}님에게 ${r.app} 사용 권한을 주었습니다`) },
        entry({ type: '사용 권한 승인', target: nameOf(r.uid), app: r.app, factory: r.factory, actor: admin, before: '사용 권한 없음', after: '사용 가능', reason: r.reason, requester: nameOf(r.uid), approver: admin }))
    }
    case 'rejectUsage': {
      const r = s.requests.find((x) => x.id === a.reqId)!
      if (r.status !== 'pending') return { ...s, modal: null, toast: toast('이미 처리된 요청입니다') }
      const requests = s.requests.map((x) => (x.id === r.id ? { ...x, status: 'rejected' as const, rejectReason: a.reason } : x))
      return addAudit({ ...s, requests, modal: null, toast: toast('거절했습니다. 요청자는 공장 화면에서 사유를 봅니다') },
        entry({ type: '사용 권한 거절', target: nameOf(r.uid), app: r.app, factory: r.factory, actor: admin, before: '요청 대기', after: '거절됨', reason: a.reason, requester: nameOf(r.uid), approver: admin }))
    }
    case 'grant': {
      const grants = { ...s.grants, [a.uid]: [...(s.grants[a.uid] ?? []), a.app] }
      return addAudit({ ...s, grants, toast: toast(`${a.app} 권한을 부여했습니다`) },
        entry({ type: '권한 부여', target: nameOf(a.uid), app: a.app, actor: admin, before: '사용 권한 없음', after: '사용 가능', reason: a.reason || '—' }))
    }
    case 'restrict': {
      if (a.app) {
        const grants = { ...s.grants, [a.uid]: (s.grants[a.uid] ?? []).filter((x) => x !== a.app) }
        return addAudit({ ...s, grants, modal: null, toast: toast(`${a.app} 권한을 제한했습니다. 세션에 즉시 반영됩니다`) },
          entry({ type: '권한 제한', target: nameOf(a.uid), app: a.app, actor: admin, before: '사용 가능', after: '사용 권한 없음', reason: a.reason }))
      }
      return addAudit({ ...s, disabled: { ...s.disabled, [a.uid]: true }, modal: null, toast: toast(`${nameOf(a.uid)} 계정을 차단했습니다. 세션에 즉시 반영됩니다`) },
        entry({ type: '계정 차단', target: nameOf(a.uid), actor: admin, before: '활성', after: '비활성', reason: a.reason }))
    }
  }
  return null
}

// ---------- 흐름 1 처리를 변경 기록으로 남긴다 (REQ-BE-AUDIT-003) ----------
function withAudit(s: State, n: State, a: Action): State {
  const v = n.versions.find((x) => x.id === 'v201')
  const tgt = v ? `모터 진단 v${v.version}` : ''
  const base = { target: tgt, app: '모터 진단', version: v?.version }
  const am = USERS.am.name
  switch (a.type) {
    case 'submit':
      if (n.versions === s.versions) return n
      return addAudit(n, entry({ ...base, type: a.resubmitOf ? '재제출' : '등록 요청', actor: am, before: a.resubmitOf ? '반려' : '—', after: '승인 대기', requester: am }))
    case 'approve':
    case 'reject': {
      if (n.conflict && !s.conflict) return addAudit(n, entry({ ...base, type: '승인', actor: n.conflict.by, before: '승인 대기', after: '승인됨', requester: am, approver: n.conflict.by }))
      if (a.type === 'approve') return addAudit(n, entry({ ...base, type: '승인', actor: USERS.admin.name, before: '승인 대기', after: '승인됨', requester: am, approver: USERS.admin.name }))
      return addAudit(n, entry({ ...base, type: '반려', actor: USERS.admin.name, before: '승인 대기', after: '반려', reason: a.reason, requester: am, approver: USERS.admin.name }))
    }
    case 'execute': {
      const checks = checkAll(s)
      const es = (Object.keys(n.deploy.runs) as FactoryId[]).map((f) =>
        entry({ ...base, type: '배포 실행', factory: f, actor: USERS.admin.name, before: `v${s.factoryVersion[f]}`, after: '설치 중', requester: am, approver: v?.approvedBy, executor: USERS.admin.name, snapshot: checks[f]?.items }),
      )
      return addAudit(n, ...es)
    }
    case 'tick': {
      const es: AuditEntry[] = []
      for (const f of Object.keys(n.deploy.runs) as FactoryId[]) {
        const was = s.deploy.runs[f]?.phase
        const is = n.deploy.runs[f]?.phase
        if (was === is) continue
        const at = now()
        if (is === 'done') es.push(entry({ ...base, type: '반영', factory: f, actor: '시스템', before: `v${s.factoryVersion[f]}`, after: `v${v?.version}`, executor: USERS.admin.name, appliedAt: at }, at))
        if (is === 'failed') es.push(entry({ ...base, type: '배포 실패', factory: f, actor: '시스템', before: `v${s.factoryVersion[f]}`, after: `v${s.factoryVersion[f]} 유지`, reason: '정상 동작 확인 기준 미충족', executor: USERS.admin.name }, at))
      }
      return es.length ? addAudit(n, ...es) : n
    }
    case 'nav':
      if (a.view.name === 'audit' && s.view.name !== 'audit' && n.role === 'admin') return addAudit(n, entry({ type: '기록 조회', target: '변경 기록', actor: USERS.admin.name }))
      return n
  }
  return n
}

export function reducer(s: State, a: Action): State {
  if (a.type === 'reset') return initialState()
  const acc = access(s, a)
  if (acc) return acc
  return withAudit(s, core(s, a), a)
}
