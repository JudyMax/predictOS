import { FACTORIES, OTHER_APPS, WORKSPACE } from '../data'
import { useApp } from '../store'
import { RegBadge } from '../components/ui'
import type { Version } from '../state'

function summary(v: Version, runs: ReturnType<typeof useApp>['s']['deploy'], currentVersionOf: Record<string, string>) {
  if (v.seedSummary) return v.seedSummary
  if (v.status !== 'approved') return '—'
  if (runs.versionId !== v.id || !runs.executedAt) return '공장 3곳 미배포'
  const done = FACTORIES.filter((f) => currentVersionOf[f.id] === v.version).map((f) => f.id)
  const inProgress = Object.entries(runs.runs).filter(([, r]) => r && r.phase !== 'done').map(([f]) => f)
  const parts = []
  if (done.length) parts.push(`공장 ${done.join('·')} 완료`)
  if (inProgress.length) parts.push(`공장 ${inProgress.join('·')} 진행 중`)
  const rest = 3 - done.length - inProgress.length
  if (rest) parts.push(`${rest}곳 이력 없음`)
  return parts.join(' · ')
}

export default function VersionList() {
  const { s, d } = useApp()
  const selectedId = s.drawer?.type === 'version' ? s.drawer.id : null
  const rejected = s.versions.find((v) => v.status === 'rejected')
  const pending = s.versions.filter((v) => v.status === 'pending')

  return (
    <>
      {s.role === 'am' && rejected && (
        <div className="banner critical">
          <span>●</span>
          <div style={{ flex: 1 }}>
            <b>앱 A v{rejected.version} 등록이 반려되었습니다.</b> 반려 사유를 확인하고 고친 파일로 다시 제출하세요.
          </div>
          <button className="link" onClick={() => d({ type: 'drawer', drawer: { type: 'version', id: rejected.id } })}>사유 보기</button>
        </div>
      )}
      {s.role === 'admin' && pending.length > 0 && (
        <div className="banner caution">
          <span>●</span>
          <div style={{ flex: 1 }}><b>검토할 등록 {pending.length}건</b>이 승인 대기 중입니다.</div>
        </div>
      )}

      {s.role === 'admin' && <div className="caption">{WORKSPACE} · 공장 3곳 · 앱 20개 (설비 진단 · 품질 예측 · 에너지 최적화)</div>}
      <div className="table-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: '26%' }}>앱</th>
              <th style={{ width: '10%' }} className="r">버전</th>
              <th style={{ width: '13%' }}>등록 상태</th>
              <th>공장별 배포 요약</th>
              <th style={{ width: '12%' }}>제출자</th>
              <th style={{ width: '16%' }} className="r">제출 시각</th>
            </tr>
          </thead>
          <tbody>
            {s.versions.map((v) => (
              <tr
                key={v.id + v.submittedAt}
                className={`clickable ${selectedId === v.id ? 'selected' : ''} ${s.freshId === v.id ? 'fresh' : ''}`}
                onClick={() => d({ type: 'drawer', drawer: { type: 'version', id: v.id } })}
              >
                <td>앱 A · 모터 진단 <span className="caption">설비 진단</span></td>
                <td className="r mono tnum">v{v.version}</td>
                <td><RegBadge status={v.status} /></td>
                <td className="mute">{summary(v, s.deploy, s.factoryVersion)}</td>
                <td>{v.submitter}</td>
                <td className="r tnum mute">{v.submittedAt}</td>
              </tr>
            ))}
            {s.role === 'admin' &&
              OTHER_APPS.map((o) => (
                <tr key={o.app}>
                  <td className="mute">{o.app} <span className="caption">{o.category}</span></td>
                  <td className="r mono tnum mute">v{o.version}</td>
                  <td><RegBadge status="approved" /></td>
                  <td className="mute">{o.factories}</td>
                  <td className="mute">—</td>
                  <td className="r mute">—</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {s.role === 'am' && <div className="caption">등록 권한을 받은 앱(앱 A)만 보입니다.</div>}
    </>
  )
}
