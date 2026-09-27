import { useState } from 'react'
import { ALL_APPS, FACTORIES, ME, PEOPLE, appsIn } from '../data'
import { useApp } from '../store'
import { Badge, Drawer, Modal } from '../components/ui'
import { roleLabel } from '../guide'

const nameOf = (uid: string) => PEOPLE.find((p) => p.id === uid)!.name
const facName = (f?: string) => FACTORIES.find((x) => x.id === f)?.name ?? '—'

function ReasonField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <>
      <label className="label">{label} <span style={{ color: 'var(--critical)' }}>(필수)</span></label>
      <textarea rows={3} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} autoFocus />
    </>
  )
}

// ---------- 흐름 2: 사용 권한 요청 (S9) ----------
export function UsageRequestModal({ app }: { app: string }) {
  const { s, d } = useApp()
  const [reason, setReason] = useState('')
  const dup = s.requests.some((r) => r.uid === ME.op && r.app === app && r.status === 'pending')
  const close = () => d({ type: 'modal', modal: null })
  if (dup) {
    return (
      <Modal title="사용 권한 요청" foot={<button className="btn btn-secondary" onClick={close}>닫기</button>}>
        <div className="banner caution"><span>●</span><div><b>이 앱에 처리 대기 중인 요청이 이미 있습니다.</b> 새 요청은 받지 않습니다. 기존 요청의 결과를 기다려 주세요.</div></div>
      </Modal>
    )
  }
  return (
    <Modal
      title="사용 권한 요청"
      foot={
        <>
          <button className="btn btn-secondary" onClick={close}>취소</button>
          <button className="btn btn-primary" disabled={!reason.trim()} onClick={() => d({ type: 'requestUsage', app, reason: reason.trim() })}>요청</button>
        </>
      }
    >
      <div className="kv">
        <div className="k">대상 앱</div><div>{app}</div>
        <div className="k">공장</div><div>공장 A (소속 공장)</div>
      </div>
      <ReasonField label="요청 사유" value={reason} onChange={setReason} placeholder="예: 사출 라인 불량 원인 분석에 필요합니다" />
      {!reason.trim() && <span className="caption" style={{ color: 'var(--critical)' }}>사유를 입력해야 요청할 수 있습니다.</span>}
    </Modal>
  )
}

// ---------- S14 거절 사유 ----------
export function RejectUsageModal({ reqId }: { reqId: number }) {
  const { d } = useApp()
  const [reason, setReason] = useState('')
  return (
    <Modal
      title="사용 권한 요청을 거절하시겠습니까?"
      foot={
        <>
          <button className="btn btn-secondary" onClick={() => d({ type: 'modal', modal: null })}>취소</button>
          <button className="btn btn-danger-fill" disabled={!reason.trim()} onClick={() => d({ type: 'rejectUsage', reqId, reason: reason.trim() })}>거절</button>
        </>
      }
    >
      <ReasonField label="거절 사유" value={reason} onChange={setReason} placeholder="예: 해당 공정 담당자만 사용합니다" />
      {!reason.trim() && <span className="caption" style={{ color: 'var(--critical)' }}>사유를 입력해야 거절할 수 있습니다.</span>}
    </Modal>
  )
}

// ---------- S12 제한·차단 확인 ----------
export function RestrictModal({ uid, app }: { uid: string; app?: string }) {
  const { d } = useApp()
  const [reason, setReason] = useState('')
  return (
    <Modal
      title={app ? `${nameOf(uid)}님의 ${app} 접근 권한을 제한합니다` : `${nameOf(uid)}님의 계정을 차단합니다`}
      foot={
        <>
          <button className="btn btn-secondary" onClick={() => d({ type: 'modal', modal: null })}>취소</button>
          <button className="btn btn-danger-fill" disabled={!reason.trim()} onClick={() => d({ type: 'restrict', uid, app, reason: reason.trim() })}>{app ? '제한' : '차단'}</button>
        </>
      }
    >
      <div className="banner caution"><span>●</span><div><b>로그인 중인 세션에도 바로 적용됩니다.</b> {app ? '그 앱을 바로 쓸 수 없게 됩니다.' : '계정이 비활성화되어 pdx를 쓸 수 없게 됩니다.'}</div></div>
      <ReasonField label="사유" value={reason} onChange={setReason} />
    </Modal>
  )
}

// ---------- S11 사용자 권한 ----------
export function UserDrawer({ uid }: { uid: string }) {
  const { s, d } = useApp()
  const p = PEOPLE.find((x) => x.id === uid)!
  const granted = s.grants[uid] ?? []
  const pool = p.factory ? appsIn(p.factory) : ALL_APPS
  const grantable = pool.filter((a) => !granted.includes(a))
  const [pick, setPick] = useState(grantable[0] ?? '')
  const [reason, setReason] = useState('')
  const off = !!s.disabled[uid]
  const isAdmin = p.role === 'admin'

  return (
    <Drawer
      title={<span className="row">{p.name} {off ? <Badge tone="critical">비활성</Badge> : <Badge tone="normal">활성</Badge>}</span>}
      sub={`${roleLabel(p.role)}${p.factory ? ` · ${facName(p.factory)}` : ''}`}
      onClose={() => d({ type: 'drawer', drawer: null })}
      foot={!isAdmin && <button className="btn btn-danger" disabled={off} onClick={() => d({ type: 'modal', modal: { type: 'restrict', uid } })}>계정 차단</button>}
    >
      {off && <div className="banner critical"><span>●</span><div><b>차단된 계정입니다.</b> 모든 세션이 종료되었습니다.</div></div>}
      {isAdmin ? (
        <div className="caption">Platform Admin은 모든 앱에 접근합니다. 관리자 권한 변경은 이번 범위 밖입니다.</div>
      ) : (
        <>
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="label">앱 권한 부여</div>
            {grantable.length ? (
              <>
                <select className="sel" value={pick} onChange={(e) => setPick(e.target.value)} disabled={off}>
                  {grantable.map((a) => <option key={a}>{a}</option>)}
                </select>
                <input type="text" placeholder="사유 (선택)" value={reason} onChange={(e) => setReason(e.target.value)} disabled={off} />
                <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} disabled={off || !pick}
                  onClick={() => { d({ type: 'grant', uid, app: pick, reason: reason.trim() }); setReason(''); setPick(grantable.filter((a) => a !== pick)[0] ?? '') }}>
                  부여
                </button>
              </>
            ) : <div className="caption">부여할 수 있는 앱이 없습니다.</div>}
          </section>
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="label">사용 가능한 앱 <span className="caption">{granted.length}개</span></div>
            <div className="table-wrap">
              <table className="tbl">
                <tbody>
                  {granted.map((a) => (
                    <tr key={a}>
                      <td>{a}</td>
                      <td className="r"><button className="link" style={{ color: 'var(--critical)' }} disabled={off} onClick={() => d({ type: 'modal', modal: { type: 'restrict', uid, app: a } })}>권한 제한</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
      <div className="caption">부여·제한·차단은 처리자·대상·변경 전후 값·사유·시각이 변경 기록에 자동으로 남습니다.</div>
    </Drawer>
  )
}

// ---------- S10 권한 관리 / S13 사용 권한 요청 탭 ----------
export default function AccessPage({ tab }: { tab: 'users' | 'requests' }) {
  const { s, d } = useApp()
  const pending = s.requests.filter((r) => r.status === 'pending').length
  return (
    <>
      <div className="tabs">
        <button className={tab === 'users' ? 'on' : ''} onClick={() => d({ type: 'nav', view: { name: 'access', tab: 'users' } })}>사용자</button>
        <button className={tab === 'requests' ? 'on' : ''} onClick={() => d({ type: 'nav', view: { name: 'access', tab: 'requests' } })}>사용 권한 요청{pending ? ` (${pending})` : ''}</button>
      </div>
      {tab === 'users' ? (
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>사용자</th><th>역할</th><th>소속 공장</th><th>앱 권한</th><th>계정 상태</th></tr></thead>
            <tbody>
              {PEOPLE.map((p) => (
                <tr key={p.id} className={`clickable ${s.drawer?.type === 'user' && s.drawer.uid === p.id ? 'selected' : ''}`} onClick={() => d({ type: 'drawer', drawer: { type: 'user', uid: p.id } })}>
                  <td>{p.name}</td>
                  <td>{roleLabel(p.role)}</td>
                  <td>{facName(p.factory)}</td>
                  <td className="mute">{p.role === 'admin' ? '모든 앱 (관리자)' : `${(s.grants[p.id] ?? []).length}개 사용 가능`}</td>
                  <td>{s.disabled[p.id] ? <Badge tone="critical">비활성</Badge> : <Badge tone="normal">활성</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : s.requests.length === 0 ? (
        <div className="card empty-state">
          <div>처리할 사용 권한 요청이 없습니다.</div>
          <div className="caption">Plant Operator가 공장 화면의 잠긴 앱에서 요청하면 여기에 표시됩니다.</div>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>요청자</th><th>앱</th><th>공장</th><th>사유</th><th className="r">요청 시각</th><th>상태</th><th className="r">처리</th></tr></thead>
            <tbody>
              {s.requests.map((r) => (
                <tr key={r.id}>
                  <td>{nameOf(r.uid)}</td>
                  <td>{r.app}</td>
                  <td>{facName(r.factory)}</td>
                  <td className="mute">{r.reason}</td>
                  <td className="r tnum mute">{r.at}</td>
                  <td>{r.status === 'pending' ? <Badge tone="caution">대기</Badge> : r.status === 'approved' ? <Badge tone="normal">승인</Badge> : <Badge tone="critical">거절</Badge>}</td>
                  <td className="r">
                    {r.status === 'pending' ? (
                      <span className="row" style={{ justifyContent: 'flex-end', gap: 12 }}>
                        <button className="link" onClick={() => d({ type: 'approveUsage', reqId: r.id })}>승인</button>
                        <button className="link" style={{ color: 'var(--critical)' }} onClick={() => d({ type: 'modal', modal: { type: 'rejectUsage', reqId: r.id } })}>거절</button>
                      </span>
                    ) : <span className="caption">처리 완료</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
