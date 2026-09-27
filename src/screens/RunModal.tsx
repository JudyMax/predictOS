import { FACTORIES } from '../data'
import { useApp } from '../store'
import { checkAll } from '../state'
import { Modal } from '../components/ui'

export default function RunModal() {
  const { s, d } = useApp()
  const checks = checkAll(s)
  const name = (f: string) => FACTORIES.find((x) => x.id === f)!.name
  const targets = s.deploy.selected.filter((f) => checks[f]?.result === 'pass')
  const excluded = FACTORIES.filter((f) => !targets.includes(f.id))
  const reason = (f: string) => {
    const c = checks[f as 'A']
    if (!c) return '선택하지 않음'
    return c.result === 'conflict' ? '버전 충돌' : '설정 부족'
  }

  return (
    <Modal
      title="배포를 실행하시겠습니까?"
      foot={
        <>
          <button className="btn btn-secondary" onClick={() => d({ type: 'modal', modal: null })}>취소</button>
          <button className="btn btn-primary" onClick={() => d({ type: 'execute' })}>실행</button>
        </>
      }
    >
      <div className="kv">
        <div className="k">버전</div><div className="mono tnum">앱 A v2.0.1</div>
        <div className="k">실행 대상</div><div>{targets.map(name).join(', ')}</div>
        <div className="k">제외</div>
        <div>{excluded.length ? excluded.map((f) => `${f.name}(${reason(f.id)})`).join(', ') : '없음'}</div>
      </div>
      <div className="caption" style={{ fontSize: 13, color: 'var(--ink-secondary)' }}>
        실행하면 공장별 배포 이력과 실행 직전 점검 결과 스냅샷이 저장되고, 설치 후 정상 동작 확인까지 진행합니다. 실패하면 이전 버전을 유지합니다.
      </div>
    </Modal>
  )
}
