import { useEffect, useReducer, useState, type ReactNode } from 'react'
import { FACTORIES, ME, OTHER_APPS, USERS, WORKSPACE, type FactoryId, type Role } from './data'
import { initialState, reducer, type State } from './state'
import { AppCtx, useApp } from './store'
import { STEPS, currentStep, roleLabel } from './guide'
import { Badge, RunBadge } from './components/ui'
import VersionList from './screens/VersionList'
import RegisterDrawer from './screens/RegisterDrawer'
import VersionDrawer from './screens/VersionDrawer'
import RejectModal from './screens/RejectModal'
import DeployPage from './screens/DeployPage'
import FillDrawer from './screens/FillDrawer'
import RunModal from './screens/RunModal'
import AccessPage, { RejectUsageModal, RestrictModal, UsageRequestModal, UserDrawer } from './screens/AccessPage'
import AuditPage, { AuditDrawer } from './screens/AuditPage'

function GuidePanel() {
  const { s, d } = useApp()
  const [min, setMin] = useState(false)
  const [list, setList] = useState(false)
  const [pulse, setPulse] = useState(false)
  const cur = currentStep(s)
  const needSwitch = cur.role !== 'system' && cur.role !== s.role
  const last = cur.no === STEPS.length

  // 단계가 바뀌면 패널을 펼치고 잠깐 강조한다
  useEffect(() => {
    setMin(false)
    setPulse(true)
    const t = setTimeout(() => setPulse(false), 1200)
    return () => clearTimeout(t)
  }, [cur.no, needSwitch])

  const cls = `guide ${s.drawer ? 'shifted' : ''} ${pulse ? 'pulse' : ''}`
  if (min) {
    return (
      <button className={`${cls} guide-min`} onClick={() => setMin(false)}>
        시나리오 가이드 <b className="tnum">{cur.no}/{STEPS.length}</b> 열기
      </button>
    )
  }
  return (
    <aside className={cls} aria-label="시나리오 가이드">
      <div className="guide-head">
        <span className="guide-tag">프로토타입 가이드</span>
        <span className="tnum caption">단계 {cur.no}/{STEPS.length}</span>
        <button className="x" onClick={() => setMin(true)} aria-label="접기">–</button>
      </div>
      <div className="guide-prog"><i style={{ width: `${((last ? cur.no : cur.no - 1) / STEPS.length) * 100}%` }} /></div>
      <div className="guide-body">
        <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
          <span className={`who-chip ${cur.role}`}>{roleLabel(cur.role)} 차례</span>
          {cur.exception && <Badge tone="critical">{cur.exception}</Badge>}
        </div>
        <div className="guide-title">{cur.no}. {cur.title}</div>
        {needSwitch ? (
          <>
            <div className="guide-hint">지금은 <b>{roleLabel(s.role)}</b> 화면입니다. 다음 행동은 <b>{roleLabel(cur.role)}</b>가 합니다.</div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => d({ type: 'role', role: cur.role as Role })}>
              {roleLabel(cur.role)} 역할로 전환
            </button>
          </>
        ) : (
          <div className="guide-hint">{cur.hint}</div>
        )}
      </div>
      {list && (
        <ol className="guide-list">
          {STEPS.map((st) => (
            <li key={st.no} className={st.no < cur.no || (last && st.no === cur.no) ? 'done' : st.no === cur.no ? 'cur' : ''}>
              <span className="n">{st.no < cur.no || (last && st.no === cur.no) ? '✓' : st.no}</span>
              <div>
                {st.title} {st.exception && <span className="exc-mini">{st.exception}</span>}
                <div className="role">{roleLabel(st.role)}</div>
              </div>
            </li>
          ))}
          <li className="extra">
            <div>
              <b>추가 예외 둘러보기</b>
              <div className="role">등록 검증 실패: 새 버전 등록 드로어의 '형식 오류 샘플'</div>
              <div className="role">동시 검토 충돌: 승인 대기 버전 상세의 시뮬레이션</div>
              <div className="role">배포 실패: 배포 실행 확인 모달의 시뮬레이션</div>
              <div className="role">Plant Operator: 역할 전환에서 선택, 소속 공장만 보임</div>
              <b style={{ display: 'block', marginTop: 8 }}>다른 흐름 둘러보기</b>
              <div className="role">흐름 2 사용 권한 요청: Plant Operator → 공장 A의 잠긴 앱에서 요청 → Admin의 권한 관리 › 사용 권한 요청 탭에서 승인·거절</div>
              <div className="role">흐름 3 권한 부여·제한: Admin의 권한 관리 › 사용자 → 사용자 선택</div>
              <div className="role">흐름 4 변경 기록: Admin의 변경 기록 (필터·상세, Admin 외 역할은 조회 거부)</div>
            </div>
          </li>
        </ol>
      )}
      <div className="guide-foot">
        <button className="link" onClick={() => setList(!list)}>{list ? '접기' : '전체 단계 · 추가 예외'}</button>
        <button className="link" style={{ color: 'var(--ink-mute)' }} onClick={() => { if (confirm('처음부터 다시 시작할까요?')) d({ type: 'reset' }) }}>처음부터</button>
      </div>
    </aside>
  )
}

function factoryDot(s: State, f: FactoryId) {
  const r = s.deploy.runs[f]
  if (r && r.phase !== 'done') return 'var(--progress)'
  return f === 'B' ? 'var(--caution-dot)' : 'var(--normal)'
}

function Lnb() {
  const { s, d } = useApp()
  const v = s.view
  return (
    <nav className="lnb">
      <div className="logo"><i />pdx</div>
      {s.role !== 'op' && <button className={`lnb-item ${v.name === 'versions' ? 'active' : ''}`} onClick={() => d({ type: 'nav', view: { name: 'versions' } })}>앱 버전 관리</button>}
      {s.role === 'admin' && (
        <>
          <button className={`lnb-item ${v.name === 'deploy' ? 'active' : ''}`} onClick={() => d({ type: 'nav', view: { name: 'deploy', tab: 'status' } })}>배포 관리</button>
          <button className={`lnb-item ${v.name === 'access' ? 'active' : ''}`} onClick={() => d({ type: 'nav', view: { name: 'access', tab: 'users' } })}>
            권한 관리{s.requests.some((r) => r.status === 'pending') && <span className="lnb-cnt">{s.requests.filter((r) => r.status === 'pending').length}</span>}
          </button>
          <button className={`lnb-item ${v.name === 'audit' ? 'active' : ''}`} onClick={() => d({ type: 'nav', view: { name: 'audit' } })}>변경 기록</button>
        </>
      )}
      <div className="lnb-sep" />
      <div className="lnb-group">{WORKSPACE} · 공장 목록</div>
      {FACTORIES.filter((f) => s.role !== 'op' || f.id === 'A').map((f) => (
        <button key={f.id} className={`lnb-item ${v.name === 'factory' && v.id === f.id ? 'active' : ''}`} onClick={() => d({ type: 'nav', view: { name: 'factory', id: f.id } })}>
          <span className="dot" style={{ background: factoryDot(s, f.id) }} />
          {f.name}
          <span className="soon">{f.site}</span>
        </button>
      ))}
    </nav>
  )
}

function Bell() {
  const { s, d } = useApp()
  const [open, setOpen] = useState(false)
  const mine = s.notices.filter((n) => n.role === s.role)
  const unread = mine.filter((n) => !n.read).length
  return (
    <div style={{ position: 'relative' }}>
      <button className="bell" aria-label="알림함" onClick={() => setOpen(!open)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
        {unread > 0 && <span className="cnt">{unread}</span>}
      </button>
      {open && (
        <div className="notif-pop">
          {mine.length === 0 && <div className="empty">새 알림이 없습니다</div>}
          {mine.map((n) => (
            <button key={n.id} className={`item ${n.read ? '' : 'unread'}`} onClick={() => { setOpen(false); d({ type: 'openNotice', id: n.id }) }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{n.text}</div>
              <div className="caption">{n.sub}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Header({ title, action }: { title: string; action?: ReactNode }) {
  const { s, d } = useApp()
  const u = USERS[s.role]
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="spacer" />
      {action}
      <Bell />
      <div className="role-switch" title="프로토타입 전용: 역할을 바꿔 인계 과정을 확인합니다">
        <span className="cap">역할 전환</span>
        {(['am', 'admin', 'op'] as Role[]).map((r) => (
          <button key={r} className={s.role === r ? 'on' : ''} onClick={() => d({ type: 'role', role: r })}>{USERS[r].title}</button>
        ))}
      </div>
      <div className="user"><span className="avatar">{u.initial}</span>{u.name}</div>
    </header>
  )
}

function UsageCell({ app }: { app: string }) {
  const { s, d } = useApp()
  if ((s.grants[ME.op] ?? []).includes(app)) return <Badge tone="normal">사용 가능</Badge>
  const req = s.requests.find((r) => r.uid === ME.op && r.app === app)
  const ask = (label: string) => <button className="link" onClick={() => d({ type: 'modal', modal: { type: 'usage', app } })}>{label}</button>
  if (req?.status === 'pending') return <span className="cell-stack"><Badge tone="caution">요청 대기 중</Badge>{ask('다시 요청')}</span>
  if (req?.status === 'rejected') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span className="cell-stack"><Badge tone="critical">잠김 · 거절됨</Badge>{ask('다시 요청')}</span>
        <span className="caption">사유: {req.rejectReason}</span>
      </div>
    )
  }
  return <span className="cell-stack"><Badge tone="stopped">잠김 · 사용 권한 없음</Badge>{ask('사용 권한 요청')}</span>
}

function FactoryPage({ id }: { id: FactoryId }) {
  const { s } = useApp()
  const op = s.role === 'op'
  const f = FACTORIES.find((x) => x.id === id)!
  const run = s.deploy.runs[id]
  const cur = s.factoryVersion[id]
  return (
    <>
      <div className="caption">{s.role === 'op' && '소속 공장만 보입니다 · '}{f.site} · 모든 역할이 같은 화면에서 공장별 상태를 확인합니다. 배포 조작은 배포 관리에서만 합니다.</div>
      <div className="table-wrap">
        <table className="tbl">
          <thead><tr><th>설치된 앱</th><th>분류</th><th className="r">버전</th><th>배포 상태</th>{op && <th>내 사용 권한</th>}</tr></thead>
          <tbody>
            <tr>
              <td>모터 진단</td><td className="mute">설비 진단</td>
              <td className="r mono tnum">v{cur}</td>
              <td>{run ? <RunBadge run={run} /> : <Badge tone="normal">완료 · 정상 동작</Badge>}</td>
              {op && <td><UsageCell app="모터 진단" /></td>}
            </tr>
            {OTHER_APPS.filter((o) => o.installed.includes(id)).map((o) => (
              <tr key={o.app}><td>{o.app}</td><td className="mute">{o.category}</td><td className="r mono tnum">v{o.version}</td><td><Badge tone="normal">완료 · 정상 동작</Badge></td>{op && <td><UsageCell app={o.app} /></td>}</tr>
            ))}
          </tbody>
        </table>
      </div>
      {op && <div className="caption">잠긴 앱은 사용 권한을 요청할 수 있고, 결과는 이 표의 앱 행에 표시됩니다. 메일·문자 알림은 없습니다.</div>}
      {id === 'B' && cur === '1.0.3' && (
        <div className="banner caution"><span>●</span><div>모터 진단 v2.0.1로 올리려면 선행 버전(v1.1 이상)을 먼저 배포해야 합니다.</div></div>
      )}
    </>
  )
}

function Shell() {
  const { s, d } = useApp()
  const v = s.view
  const title = v.name === 'versions' ? '앱 버전 관리' : v.name === 'deploy' ? '배포 관리' : v.name === 'access' ? '권한 관리' : v.name === 'audit' ? '변경 기록' : FACTORIES.find((f) => f.id === v.id)!.name
  const action = v.name === 'versions' && s.role === 'am'
    ? <button className="btn btn-primary" onClick={() => d({ type: 'drawer', drawer: { type: 'register' } })}>새 버전 등록</button>
    : undefined

  // 설치·동작 확인 진행 (타이머 시뮬레이션)
  const running = Object.values(s.deploy.runs).some((r) => r && r.phase !== 'done' && r.phase !== 'failed')
  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => d({ type: 'tick' }), 1100)
    return () => clearTimeout(t)
  }, [s.deploy.runs, running, d])

  useEffect(() => {
    if (!s.toast) return
    const t = setTimeout(() => d({ type: 'toast', text: null }), 4000)
    return () => clearTimeout(t)
  }, [s.toast, d])

  return (
    <>
      
      <div className="shell">
        <Lnb />
        <main className="main">
          <Header title={title} action={action} />
          <div className="content">
            {v.name === 'versions' && <VersionList />}
            {v.name === 'deploy' && <DeployPage tab={v.tab} />}
            {s.role === 'op' && s.disabled[ME.op] ? (
              <div className="card empty-state">
                <div style={{ fontSize: 16, color: 'var(--ink)' }}>계정이 비활성화되었습니다</div>
                <div>Platform Admin이 이 계정을 차단해 세션이 즉시 종료되었습니다. 관리자에게 문의하세요.</div>
              </div>
            ) : (
              v.name === 'factory' && <FactoryPage id={v.id} />
            )}
            {v.name === 'access' && <AccessPage tab={v.tab} />}
            {v.name === 'audit' && <AuditPage />}
          </div>
        </main>
      </div>
      {s.drawer?.type === 'register' && <RegisterDrawer key={s.drawer.resubmitOf ?? 'new'} resubmitOf={s.drawer.resubmitOf} />}
      {s.drawer?.type === 'version' && <VersionDrawer id={s.drawer.id} />}
      {s.drawer?.type === 'fill' && <FillDrawer factory={s.drawer.factory} />}
      {s.modal?.type === 'reject' && <RejectModal id={s.modal.id} />}
      {s.modal?.type === 'run' && <RunModal />}
      {s.drawer?.type === 'user' && <UserDrawer key={s.drawer.uid} uid={s.drawer.uid} />}
      {s.drawer?.type === 'audit' && <AuditDrawer id={s.drawer.id} />}
      {s.modal?.type === 'usage' && <UsageRequestModal app={s.modal.app} />}
      {s.modal?.type === 'rejectUsage' && <RejectUsageModal reqId={s.modal.reqId} />}
      {s.modal?.type === 'restrict' && <RestrictModal uid={s.modal.uid} app={s.modal.app} />}
      <GuidePanel />
      {s.toast && <div className="toast" key={s.toast.id}>{s.toast.text}</div>}
    </>
  )
}

export default function App() {
  const [s, d] = useReducer(reducer, undefined, initialState)
  return (
    <AppCtx.Provider value={{ s, d }}>
      <Shell />
    </AppCtx.Provider>
  )
}
