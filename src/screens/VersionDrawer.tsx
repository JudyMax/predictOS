import { FACTORIES } from '../data'
import { useApp } from '../store'
import { Drawer, RegBadge, RunBadge, Badge } from '../components/ui'
import { ManifestView } from './RegisterDrawer'

export default function VersionDrawer({ id }: { id: string }) {
  const { s, d } = useApp()
  const v = s.versions.find((x) => x.id === id)!
  const close = () => d({ type: 'drawer', drawer: null })
  const isAdmin = s.role === 'admin'
  const deployedHere = s.deploy.versionId === v.id && s.deploy.executedAt

  let foot = null
  if (isAdmin && v.status === 'pending') {
    foot = (
      <>
        <button className="btn btn-danger" onClick={() => d({ type: 'modal', modal: { type: 'reject', id: v.id } })}>반려</button>
        <button className="btn btn-primary" onClick={() => d({ type: 'approve', id: v.id })}>승인</button>
      </>
    )
  } else if (isAdmin && v.status === 'approved' && v.manifest) {
    foot = <button className="btn btn-primary" onClick={() => d({ type: 'startDeploy', id: v.id })}>{deployedHere ? '배포 현황 보기' : '배포하기'}</button>
  } else if (!isAdmin && v.status === 'rejected') {
    foot = <button className="btn btn-primary" onClick={() => d({ type: 'drawer', drawer: { type: 'register', resubmitOf: v.id } })}>고친 파일로 재제출</button>
  }

  return (
    <Drawer
      title={<span className="row">앱 A v<span className="tnum">{v.version}</span> <RegBadge status={v.status} /></span>}
      sub={<>제출자 {v.submitter} · <span className="tnum">{v.submittedAt}</span>{v.approvedBy && v.status === 'approved' ? ` · 승인자 ${v.approvedBy}` : ''}</>}
      onClose={close}
      foot={foot}
    >
      {v.status === 'rejected' && (
        <div className="banner critical">
          <span>●</span>
          <div>
            <b>반려 사유</b>
            <div style={{ marginTop: 2 }}>{v.rejectReason}</div>
            {!isAdmin && <div className="caption" style={{ marginTop: 6, color: 'inherit' }}>사유를 반영한 패치 파일로 다시 제출하면 승인 대기로 돌아갑니다. 제출 철회는 지원하지 않습니다.</div>}
            {isAdmin && <div className="caption" style={{ marginTop: 6, color: 'inherit' }}>결과와 사유는 제출자에게만 보입니다.</div>}
          </div>
        </div>
      )}
      {v.status === 'pending' && !isAdmin && (
        <div className="banner info"><span>●</span><div>Platform Admin의 검토를 기다리는 중입니다. 결과는 알림함과 이 화면에서 확인합니다.</div></div>
      )}
      {v.status === 'pending' && isAdmin && s.rejectCount > 0 && (
        <div className="banner info"><span>●</span><div><b>재제출된 등록입니다.</b> 이전 반려 사유를 반영했는지 확인하세요. 달라진 항목은 노란 칸으로 표시했습니다.</div></div>
      )}

      {v.status === 'approved' && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="label">공장별 배포 상태</div>
          <div className="table-wrap">
            <table className="tbl">
              <tbody>
                {FACTORIES.map((f) => {
                  const run = deployedHere ? s.deploy.runs[f.id] : undefined
                  const current = s.factoryVersion[f.id]
                  return (
                    <tr key={f.id}>
                      <td>{f.name}</td>
                      <td className="mono tnum mute">현재 v{current}</td>
                      <td className="r">
                        {v.manifest ? (
                          deployedHere && !run ? <Badge tone="stopped">이 버전 배포 이력 없음</Badge> : <RunBadge run={run} />
                        ) : current === v.version ? <Badge tone="normal">완료 · 정상 동작</Badge> : <Badge tone="stopped">해당 없음</Badge>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {isAdmin && v.manifest && !deployedHere && <div className="caption">배포하려면 공장을 고르고 사전 환경 검증을 통과해야 합니다.</div>}
          {!isAdmin && v.manifest && <div className="caption">배포는 Platform Admin이 진행합니다.</div>}
        </section>
      )}

      {v.manifest ? (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="label">등록 정보 <span className="caption">(패치 파일에서 자동으로 읽음 · 읽기 전용)</span></div>
          <ManifestView m={v.manifest} highlight={s.rejectCount > 0 && v.status !== 'rejected' ? 'releaseNote' : undefined} />
        </section>
      ) : (
        <div className="caption">이전 버전입니다. 이번 프로토타입에서는 상세 정보를 생략했습니다.</div>
      )}

      {v.history.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="label">처리 이력 <span className="caption">(변경 기록에 자동 저장 · 수정 불가)</span></div>
          <ul className="timeline">
            {v.history.map((h, i) => (
              <li key={i}>
                <div>{h.text}</div>
                <div className="caption tnum">{h.at} · {h.actor}</div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Drawer>
  )
}
