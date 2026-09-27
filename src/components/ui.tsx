import type { ReactNode } from 'react'
import type { RegStatus, Run } from '../state'

type Tone = 'normal' | 'caution' | 'critical' | 'stopped' | 'progress'

export function Badge({ tone, children, spin }: { tone: Tone; children: ReactNode; spin?: boolean }) {
  return (
    <span className={`badge b-${tone}${spin ? ' spin' : ''}`}>
      {spin && <span className="spinner" />}
      {children}
    </span>
  )
}

export function RegBadge({ status }: { status: RegStatus }) {
  if (status === 'approved') return <Badge tone="normal">승인됨</Badge>
  if (status === 'rejected') return <Badge tone="critical">반려</Badge>
  return <Badge tone="caution">승인 대기</Badge>
}

export function RunBadge({ run }: { run?: Run }) {
  if (!run) return <Badge tone="stopped">미배포</Badge>
  if (run.phase === 'installing') return <Badge tone="progress" spin>설치 중</Badge>
  if (run.phase === 'verifying') return <Badge tone="progress" spin>동작 확인 중</Badge>
  return <Badge tone="normal">완료 · 정상 동작</Badge>
}

export function Drawer({ title, sub, onClose, children, foot }: { title: ReactNode; sub?: ReactNode; onClose: () => void; children: ReactNode; foot?: ReactNode }) {
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label={typeof title === 'string' ? title : undefined}>
        <div className="drawer-head">
          <div>
            <h3>{title}</h3>
            {sub && <div className="caption" style={{ marginTop: 4 }}>{sub}</div>}
          </div>
          <button className="x" onClick={onClose} aria-label="닫기">×</button>
        </div>
        <div className="drawer-body">{children}</div>
        {foot && <div className="drawer-foot">{foot}</div>}
      </aside>
    </>
  )
}

export function Modal({ title, children, foot }: { title: string; children: ReactNode; foot: ReactNode }) {
  return (
    <div className="modal-wrap">
      <div className="modal" role="dialog" aria-label={title}>
        <div className="modal-head"><h3>{title}</h3></div>
        <div className="modal-body">{children}</div>
        <div className="modal-foot">{foot}</div>
      </div>
    </div>
  )
}

export function Stepper({ current, labels }: { current: number; labels: string[] }) {
  return (
    <div className="stepper">
      {labels.map((l, i) => {
        const n = i + 1
        const cls = n < current ? 'done' : n === current ? 'cur' : ''
        return (
          <div key={l} style={{ display: 'contents' }}>
            {i > 0 && <div className="line" />}
            <div className={`st ${cls}`}>
              <span className="circ">{n < current ? '✓' : n}</span>
              {l}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Ico({ status }: { status: 'ok' | 'warn' | 'bad' | 'na' }) {
  const t = { ok: '✓', warn: '!', bad: '×', na: '–' }[status]
  return <span className={`ico ${status}`} aria-label={status}>{t}</span>
}
