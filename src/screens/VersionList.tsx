import { FACTORIES, OTHER_APPS, WORKSPACE } from '../data'
import { useApp } from '../store'
import { RegBadge } from '../components/ui'
import { useState } from 'react'
import { cmpVer, type Version } from '../state'

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
  const [open, setOpen] = useState(true)
  const latest = s.versions.filter((v) => v.status === 'approved').sort((x, y) => cmpVer(y.version, x.version))[0]
  const newest = s.versions[0]

  return (
    <>
      {s.role === 'am' && rejected && (
        <div className="banner critical">
          <span>●</span>
          <div style={{ flex: 1 }}>
            <b>모터 진단 v{rejected.version} 등록이 반려되었습니다.</b> 반려 사유를 확인하고 고친 파일로 다시 제출하세요.
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
              <th style={{ width: '20%' }}>앱</th>
              <th style={{ width: '11%' }}>분류</th>
              <th style={{ width: '12%' }} className="r">최신 승인 버전</th>
              <th style={{ width: '13%' }}>등록 상태</th>
              <th>공장별 배포 요약</th>
              <th style={{ width: '10%' }}>제출자</th>
              <th style={{ width: '15%' }} className="r">제출 시각</th>
            </tr>
          </thead>
          <tbody>
            <tr className="clickable" onClick={() => setOpen(!open)}>
              <td><span className="chev">{open ? '▾' : '▸'}</span>모터 진단 <span className="caption">버전 {s.versions.length}개</span></td>
              <td className="mute">설비 진단</td>
              <td className="r mono tnum">v{latest.version}</td>
              <td>{pending.length ? <RegBadge status="pending" /> : rejected ? <RegBadge status="rejected" /> : <RegBadge status="approved" />}</td>
              <td className="mute">{summary(latest, s.deploy, s.factoryVersion)}</td>
              <td>{newest.submitter}</td>
              <td className="r tnum mute">{newest.submittedAt}</td>
            </tr>
            {open && (
              <>
                <tr className="sub-head"><td colSpan={7}>버전별 등록 이력 · 행을 누르면 상세가 열립니다</td></tr>
                {s.versions.map((v) => (
                  <tr
                    key={v.id + v.submittedAt}
                    className={`sub-row clickable ${selectedId === v.id ? 'selected' : ''} ${s.freshId === v.id ? 'fresh' : ''}`}
                    onClick={() => d({ type: 'drawer', drawer: { type: 'version', id: v.id } })}
                  >
                    <td className="mono tnum" style={{ paddingLeft: 40 }}>v{v.version}</td>
                    <td />
                    <td />
                    <td><RegBadge status={v.status} /></td>
                    <td className="mute">{summary(v, s.deploy, s.factoryVersion)}</td>
                    <td>{v.submitter}</td>
                    <td className="r tnum mute">{v.submittedAt}</td>
                  </tr>
                ))}
              </>
            )}
            {s.role === 'admin' &&
              OTHER_APPS.map((o) => (
                <tr key={o.app}>
                  <td><span className="chev" />{o.app}</td><td className="mute">{o.category}</td>
                  <td className="r mono tnum">v{o.version}</td>
                  <td><RegBadge status="approved" /></td>
                  <td className="mute">{o.factories}</td>
                  <td className="mute">—</td>
                  <td className="r mute">—</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {s.role === 'am' && <div className="caption">등록 권한을 받은 앱(모터 진단)만 보입니다.</div>}
    </>
  )
}
