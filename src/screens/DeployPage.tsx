import { useState } from 'react'
import { FACTORIES, USERS, type FactoryId } from '../data'
import { useApp } from '../store'
import { checkAll, type CheckResult, type Run } from '../state'
import { Badge, Ico, RunBadge, Stepper } from '../components/ui'

const STEP_LABELS = ['공장 선택', '사전 환경 검증', '부족 항목 채우기', '실행·정상 동작 확인']

function ResultBadge({ c, reverified }: { c: CheckResult; reverified: boolean }) {
  if (c.result === 'pass') return <Badge tone="normal">{reverified ? '통과 (재검증)' : '통과'}</Badge>
  if (c.result === 'conflict') return <Badge tone="critical">차단 · 버전 충돌</Badge>
  return <Badge tone="caution">설정 부족 {c.items.filter((i) => i.status === 'warn').length}건</Badge>
}

function CheckRow({ f, c, current, target }: { f: FactoryId; c: CheckResult; current: string; target: string }) {
  const { s, d } = useApp()
  const [open, setOpen] = useState(false)
  const name = FACTORIES.find((x) => x.id === f)!.name
  const tone = c.result === 'conflict' ? 'critical' : c.result === 'shortage' ? 'caution' : ''
  return (
    <div className={`check-row ${tone}`}>
      <div className="top">
        <div style={{ width: 90, fontWeight: 500 }}>{name}</div>
        <div className="mono tnum mute" style={{ width: 150 }}>v{current} → v{target}</div>
        <ResultBadge c={c} reverified={f === 'C' && s.deploy.reverified} />
        <div style={{ flex: 1 }} />
        {c.result === 'shortage' && (
          <button className="btn btn-secondary" onClick={() => d({ type: 'drawer', drawer: { type: 'fill', factory: f } })}>채우기</button>
        )}
        <button className="link" onClick={() => setOpen(!open)}>{open ? '접기' : '자세히'}</button>
      </div>
      {c.result === 'conflict' && (
        <div className="resolve">
          <b style={{ fontWeight: 500 }}>{name}는 v{current}이라 v{target}로 바로 올릴 수 없습니다.</b>
          <div>필요한 선행 버전: <span className="mono">v1.1 이상</span> (예: 승인된 <span className="mono">v1.1.1</span>)</div>
          <div className="mute">해결 방법: 선행 버전을 {name}에 먼저 배포한 뒤, 이 버전의 사전 환경 검증부터 다시 하세요. 다른 공장의 검증·배포에는 영향을 주지 않습니다.</div>
        </div>
      )}
      {open && (
        <div className="items">
          {c.items.map((i) => (
            <div className="check-item" key={i.key}>
              <Ico status={i.status} />
              <span>{i.label}</span>
              <span className="cmp">{i.declared}<span className="arrow">↔</span>{i.current}</span>
              <span className="caption" style={{ textAlign: 'right' }}>
                {{ ok: '통과', bad: '차단', warn: '채우면 해결', na: '확인 안 함' }[i.status]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function progress(r: Run) {
  if (r.phase === 'installing') return { pct: 20, text: '패키지 설치 중' }
  if (r.phase === 'done') return { pct: 100, text: '헬스체크 3/3 · 데이터 수신 확인' }
  return { pct: 35 + r.health * 15 + (r.dataReceived ? 10 : 0), text: `설치 완료 · 헬스체크 ${r.health}/3 · ${r.dataReceived ? '데이터 수신 확인' : '데이터 수신 대기'}` }
}

export default function DeployPage() {
  const { s, d } = useApp()
  const v = s.versions.find((x) => x.id === s.deploy.versionId)

  if (!v?.manifest) {
    return (
      <div className="card empty-state">
        <div>배포할 버전이 선택되지 않았습니다. 앱 버전 관리에서 승인된 버전의 '배포하기'로 시작하세요.</div>
        <button className="btn btn-secondary" onClick={() => d({ type: 'nav', view: { name: 'versions' } })}>앱 버전 관리로 이동</button>
      </div>
    )
  }

  const checks = checkAll(s)
  const selected = s.deploy.selected
  const passed = selected.filter((f) => checks[f]?.result === 'pass')
  const hasShortage = selected.some((f) => checks[f]?.result === 'shortage')
  const runs = s.deploy.runs
  const executed = !!s.deploy.executedAt
  const allDone = executed && Object.values(runs).every((r) => r?.phase === 'done')
  const step = executed ? (allDone ? 5 : 4) : !s.deploy.checked ? 1 : hasShortage ? 3 : 4
  const excluded = FACTORIES.filter((f) => !runs[f.id])

  return (
    <>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="between">
          <div className="row" style={{ gap: 12 }}>
            <span className="caption">배포할 버전</span>
            <span style={{ fontWeight: 500 }}>앱 A · 모터 진단</span>
            <span className="mono tnum">v{v.version}</span>
            <Badge tone="normal">승인됨</Badge>
          </div>
          <span className="caption">'배포하기'에서 선택한 버전으로 고정됩니다</span>
        </div>
        <Stepper current={step} labels={STEP_LABELS} />
      </div>

      {!s.deploy.checked && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="between">
            <h2>대상 공장 선택</h2>
            <span className="caption">공장마다 독립적으로 검증합니다</span>
          </div>
          <div className="fac-grid">
            {FACTORIES.map((f) => {
              const on = selected.includes(f.id)
              return (
                <label key={f.id} className={`fac-opt ${on ? 'on' : ''}`}>
                  <input type="checkbox" checked={on} onChange={() => d({ type: 'toggleFactory', f: f.id })} />
                  <div>
                    <div style={{ fontWeight: 500 }}>{f.name}</div>
                    <div className="caption">{f.site}</div>
                    <div className="mono tnum" style={{ marginTop: 4 }}>현재 v{s.factoryVersion[f.id]}</div>
                  </div>
                </label>
              )
            })}
          </div>
          <div className="between">
            <span className="caption">{selected.length ? `${selected.length}곳 선택됨` : '공장을 1곳 이상 선택해야 검증할 수 있습니다.'}</span>
            <button className="btn btn-primary" disabled={!selected.length} onClick={() => d({ type: 'runCheck' })}>사전 환경 검증</button>
          </div>
        </div>
      )}

      {s.deploy.checked && !executed && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="between">
            <h2>사전 환경 검증 결과</h2>
            <span className="caption">버전 검사(①~③) → 설정 검사(④·⑤) 순서</span>
          </div>
          <div className="banner info"><span>●</span><div>검증 결과는 저장되지 않습니다. <b>실행을 확인해야 배포 이력이 생깁니다.</b></div></div>
          {selected.map((f) => <CheckRow key={f} f={f} c={checks[f]!} current={s.factoryVersion[f]} target={v.version} />)}
          <div className="between">
            <button className="btn btn-secondary" onClick={() => d({ type: 'reselect' })}>공장 다시 선택</button>
            <div className="row" style={{ gap: 12 }}>
              {!passed.length && <span className="caption">통과한 공장이 없어 실행할 수 없습니다.</span>}
              <button className="btn btn-primary" disabled={!passed.length} onClick={() => d({ type: 'modal', modal: { type: 'run' } })}>
                통과 공장 배포 실행 ({passed.length}곳)
              </button>
            </div>
          </div>
        </div>
      )}

      {executed && (
        <>
          {allDone && (
            <div className="final">
              <div className="big">✓</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 500 }}>{Object.keys(runs).map((f) => `공장 ${f}`).join('·')}에서 v{v.version}이 정상 동작 중입니다</div>
                {excluded.length > 0 && (
                  <div className="caption" style={{ marginTop: 4, fontSize: 13 }}>
                    {excluded.map((f) => `${f.name}는 v${s.factoryVersion[f.id]}를 유지합니다`).join(' · ')}. 선행 버전을 먼저 배포한 뒤 다시 검증하세요.
                  </div>
                )}
              </div>
              <button className="btn btn-secondary" onClick={() => d({ type: 'drawer', drawer: { type: 'version', id: v.id } })}>처리 이력 보기</button>
            </div>
          )}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="between">
              <h2>버전×공장 배포 현황</h2>
              <span className="caption tnum">실행 {s.deploy.executedAt} · 실행자 {USERS.admin.name}</span>
            </div>
            <div className="table-wrap">
              <table className="tbl">
                <thead><tr><th>공장</th><th>버전</th><th>배포 상태</th><th>진행</th></tr></thead>
                <tbody>
                  {FACTORIES.map((f) => {
                    const r = runs[f.id]
                    if (!r) {
                      const c = checks[f.id]
                      return (
                        <tr key={f.id}>
                          <td>{f.name}</td>
                          <td className="mono tnum">v{s.factoryVersion[f.id]} 유지</td>
                          <td><Badge tone="stopped">이 버전 배포 이력 없음</Badge></td>
                          <td className="caption">{c?.result === 'conflict' ? '버전 충돌로 제외 · 선행 버전 v1.1 이상 필요' : c ? '검증 미통과로 제외' : '선택하지 않음'}</td>
                        </tr>
                      )
                    }
                    const p = progress(r)
                    return (
                      <tr key={f.id}>
                        <td>{f.name}</td>
                        <td className="mono tnum">{r.phase === 'done' ? `v${v.version}` : `v${s.factoryVersion[f.id]} → v${v.version}`}</td>
                        <td><RunBadge run={r} /></td>
                        <td>
                          <div className="progress-cell">
                            <div className={`pbar ${r.phase === 'done' ? 'ok' : ''}`}><i style={{ width: `${p.pct}%` }} /></div>
                            <span className="caption">{p.text}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="hint-note">정상 동작 확인 기준: 헬스체크 3회 연속 성공 + 데이터 수신, 30분 안(POL-032). 프로토타입에서는 몇 초로 줄였습니다.</div>
          </div>
        </>
      )}
    </>
  )
}
