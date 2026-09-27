import { useEffect, useReducer, useState, type ReactNode } from 'react'
import { FACTORIES, OTHER_APPS, USERS, WORKSPACE, type FactoryId, type Role } from './data'
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
        </ol>
      )}
      <div className="guide-foot">
        <button className="link" onClick={() => setList(!list)}>{list ? '전체 단계 접기' : '전체 단계 보기'}</button>
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
      <button className={`lnb-item ${v.name === 'versions' ? 'active' : ''}`} onClick={() => d({ type: 'nav', view: { name: 'versions' } })}>앱 버전 관리</button>
      {s.role === 'admin' && (
        <>
          <button className={`lnb-item ${v.name === 'deploy' ? 'active' : ''}`} onClick={() => d({ type: 'nav', view: { name: 'deploy' } })}>배포 관리</button>
          <button className="lnb-item" disabled title="이번 프로토타입 범위 밖">권한 관리<span className="soon">범위 밖</span></button>
          <button className="lnb-item" disabled title="이번 프로토타입 범위 밖">변경 기록<span className="soon">범위 밖</span></button>
        </>
      )}
      <div className="lnb-sep" />
      <div className="lnb-group">{WORKSPACE} · 공장 목록</div>
      {FACTORIES.map((f) => (
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
              <div className="caption">눌러서 반려 사유 확인</div>
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
        {(['am', 'admin'] as Role[]).map((r) => (
          <button key={r} className={s.role === r ? 'on' : ''} onClick={() => d({ type: 'role', role: r })}>{USERS[r].title}</button>
        ))}
      </div>
      <div className="user"><span className="avatar">{u.initial}</span>{u.name}</div>
    </header>
  )
}

function FactoryPage({ id }: { id: FactoryId }) {
  const { s } = useApp()
  const f = FACTORIES.find((x) => x.id === id)!
  const run = s.deploy.runs[id]
  const cur = s.factoryVersion[id]
  return (
    <>
      <div className="caption">{f.site} · 모든 역할이 같은 화면에서 공장별 상태를 확인합니다. 배포 조작은 배포 관리에서만 합니다.</div>
      <div className="table-wrap">
        <table className="tbl">
          <thead><tr><th>설치된 앱</th><th>분류</th><th className="r">버전</th><th>배포 상태</th></tr></thead>
          <tbody>
            <tr>
              <td>모터 진단</td><td className="mute">설비 진단</td>
              <td className="r mono tnum">v{cur}</td>
              <td>{run ? <RunBadge run={run} /> : <Badge tone="normal">완료 · 정상 동작</Badge>}</td>
            </tr>
            {OTHER_APPS.filter((o) => o.installed.includes(id)).map((o) => (
              <tr key={o.app}><td>{o.app}</td><td className="mute">{o.category}</td><td className="r mono tnum">v{o.version}</td><td><Badge tone="normal">완료 · 정상 동작</Badge></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      {id === 'B' && cur === '1.0.3' && (
        <div className="banner caution"><span>●</span><div>모터 진단 v2.0.1로 올리려면 선행 버전(v1.1 이상)을 먼저 배포해야 합니다.</div></div>
      )}
    </>
  )
}

function Shell() {
  const { s, d } = useApp()
  const v = s.view
  const title = v.name === 'versions' ? '앱 버전 관리' : v.name === 'deploy' ? '배포 관리' : FACTORIES.find((f) => f.id === v.id)!.name
  const action = v.name === 'versions' && s.role === 'am'
    ? <button className="btn btn-primary" onClick={() => d({ type: 'drawer', drawer: { type: 'register' } })}>새 버전 등록</button>
    : undefined

  // 설치·동작 확인 진행 (타이머 시뮬레이션)
  const running = Object.values(s.deploy.runs).some((r) => r && r.phase !== 'done')
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
            {v.name === 'deploy' && <DeployPage />}
            {v.name === 'factory' && <FactoryPage id={v.id} />}
          </div>
        </main>
      </div>
      {s.drawer?.type === 'register' && <RegisterDrawer key={s.drawer.resubmitOf ?? 'new'} resubmitOf={s.drawer.resubmitOf} />}
      {s.drawer?.type === 'version' && <VersionDrawer id={s.drawer.id} />}
      {s.drawer?.type === 'fill' && <FillDrawer factory={s.drawer.factory} />}
      {s.modal?.type === 'reject' && <RejectModal id={s.modal.id} />}
      {s.modal?.type === 'run' && <RunModal />}
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
