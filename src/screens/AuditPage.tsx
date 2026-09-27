import { useState } from 'react'
import { FACTORIES } from '../data'
import { useApp } from '../store'
import { Drawer, Ico } from '../components/ui'

const PERIODS = [
  { k: 'all', label: '전체 기간', days: Infinity },
  { k: '1', label: '오늘', days: 1 },
  { k: '7', label: '최근 7일', days: 7 },
  { k: '30', label: '최근 30일', days: 30 },
]
const EMPTY = { period: 'all', factory: '', app: '', actor: '', type: '' }
const ageDays = (at: string) => (Date.now() - new Date(at.replace(' ', 'T')).getTime()) / 86400000

export function AuditDrawer({ id }: { id: number }) {
  const { s, d } = useApp()
  const e = s.audit.find((x) => x.id === id)!
  const rows: [string, string | undefined][] = [
    ['행위 유형', e.type], ['대상', e.target], ['앱', e.app], ['공장', FACTORIES.find((f) => f.id === e.factory)?.name],
    ['처리자', e.actor], ['요청자', e.requester], ['승인자', e.approver], ['실행자', e.executor],
    ['처리 시각', e.at], ['반영 시점', e.appliedAt], ['변경 전 → 후', e.before || e.after ? `${e.before ?? '—'} → ${e.after ?? '—'}` : undefined], ['사유', e.reason],
  ]
  return (
    <Drawer title="기록 상세" sub="읽기 전용 · 기록은 누구도 고치거나 지울 수 없습니다" onClose={() => d({ type: 'drawer', drawer: null })}>
      <div className="kv">
        {rows.filter(([, v]) => v).map(([k, v]) => (
          <div key={k} style={{ display: 'contents' }}><div className="k">{k}</div><div className={k.includes('시') ? 'tnum' : ''}>{v}</div></div>
        ))}
      </div>
      {e.snapshot && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="label">실행 직전 점검 결과 스냅샷</div>
          <div className="check-row">
            {e.snapshot.map((i) => (
              <div className="check-item" key={i.key} style={{ gridTemplateColumns: '22px 120px 1fr' }}>
                <Ico status={i.status} /><span>{i.label}</span>
                <span className="cmp">{i.declared}<span className="arrow">↔</span>{i.current}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </Drawer>
  )
}

export default function AuditPage() {
  const { s, d } = useApp()
  const [f, setF] = useState(EMPTY)
  if (s.role !== 'admin') {
    return (
      <div className="card empty-state">
        <div style={{ fontSize: 16, color: 'var(--ink)' }}>변경 기록을 조회할 권한이 없습니다</div>
        <div>변경 기록은 Platform Admin만 조회할 수 있습니다.</div>
      </div>
    )
  }
  const uniq = (xs: (string | undefined)[]) => [...new Set(xs.filter(Boolean))] as string[]
  const days = PERIODS.find((p) => p.k === f.period)!.days
  const list = s.audit.filter((e) =>
    ageDays(e.at) <= days && (!f.factory || e.factory === f.factory) && (!f.app || e.app === f.app) && (!f.actor || e.actor === f.actor) && (!f.type || e.type === f.type),
  )
  const sel = (key: keyof typeof EMPTY, all: string, opts: { v: string; l: string }[]) => (
    <select className="sel" value={f[key]} onChange={(e) => setF({ ...f, [key]: e.target.value })}>
      <option value="">{all}</option>
      {opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  )
  const dirty = JSON.stringify(f) !== JSON.stringify(EMPTY)

  return (
    <>
      <div className="filters">
        <select className="sel" value={f.period} onChange={(e) => setF({ ...f, period: e.target.value })}>
          {PERIODS.map((p) => <option key={p.k} value={p.k}>{p.label}</option>)}
        </select>
        {sel('factory', '모든 공장', FACTORIES.map((x) => ({ v: x.id, l: x.name })))}
        {sel('app', '모든 앱', uniq(s.audit.map((e) => e.app)).map((x) => ({ v: x, l: x })))}
        {sel('actor', '모든 행위자', uniq(s.audit.map((e) => e.actor)).map((x) => ({ v: x, l: x })))}
        {sel('type', '모든 행위 유형', uniq(s.audit.map((e) => e.type)).map((x) => ({ v: x, l: x })))}
        {dirty && <button className="btn btn-secondary" onClick={() => setF(EMPTY)}>필터 초기화</button>}
        <span className="caption" style={{ marginLeft: 'auto' }}>{list.length}건 · 편집·삭제 불가 · 조회도 기록됩니다</span>
      </div>
      {list.length === 0 ? (
        <div className="card empty-state">
          <div>조건에 맞는 기록이 없습니다.</div>
          <button className="btn btn-secondary" onClick={() => setF(EMPTY)}>필터 초기화</button>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th className="r">처리 시각</th><th>행위 유형</th><th>대상</th><th>공장</th><th>처리자</th><th>변경 전 → 후</th><th>사유</th></tr></thead>
            <tbody>
              {list.map((e) => (
                <tr key={e.id} className={`clickable ${s.drawer?.type === 'audit' && s.drawer.id === e.id ? 'selected' : ''}`} onClick={() => d({ type: 'drawer', drawer: { type: 'audit', id: e.id } })}>
                  <td className="r tnum mute">{e.at}</td>
                  <td>{e.type}</td>
                  <td>{e.app && e.target !== e.app && !e.target.startsWith(e.app) ? `${e.target} · ${e.app}` : e.target}</td>
                  <td>{FACTORIES.find((x) => x.id === e.factory)?.name ?? '—'}</td>
                  <td>{e.actor}</td>
                  <td className="mute">{e.before || e.after ? `${e.before ?? '—'} → ${e.after ?? '—'}` : '—'}</td>
                  <td className="mute" style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.reason ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
