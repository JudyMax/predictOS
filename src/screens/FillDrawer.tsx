import { useEffect, useState } from 'react'
import { FACTORIES, type FactoryId } from '../data'
import { useApp } from '../store'
import { checkAll } from '../state'
import { Drawer, Ico } from '../components/ui'

export default function FillDrawer({ factory }: { factory: FactoryId }) {
  const { s, d } = useApp()
  const c = checkAll(s)[factory]
  const items = c?.items.filter((i) => i.fill) ?? []
  const [done, setDone] = useState<{ perm: boolean; data: boolean }>({ perm: false, data: false })
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    if (!connecting) return
    const t = setTimeout(() => { setConnecting(false); setDone((x) => ({ ...x, data: true })) }, 1200)
    return () => clearTimeout(t)
  }, [connecting])

  const allDone = items.every((i) => done[i.fill!])
  const close = () => d({ type: 'drawer', drawer: null })

  return (
    <Drawer
      title="부족 항목 채우기"
      sub={`${FACTORIES.find((f) => f.id === factory)!.name} · 모터 진단 v2.0.1 · Platform Admin만 채울 수 있습니다`}
      onClose={close}
      foot={
        <>
          {!allDone && <span className="caption" style={{ marginRight: 'auto' }}>부족 항목 {items.filter((i) => !done[i.fill!]).length}개를 채워야 합니다</span>}
          <button className="btn btn-secondary" onClick={close}>취소</button>
          <button className="btn btn-primary" disabled={!allDone} onClick={() => d({ type: 'applyFill', ...done })}>저장 후 재검증</button>
        </>
      }
    >
      <div className="caption" style={{ fontSize: 13 }}>등록 정보 값과 공장 현재 값을 비교해 부족한 항목을 모두 보여 줍니다.</div>
      {items.map((i) => {
        const ok = done[i.fill!]
        return (
          <div key={i.key} className={`fill-item ${ok ? 'done' : ''}`}>
            <div className="row"><Ico status={ok ? 'ok' : 'warn'} /><span className="label">{i.label}</span></div>
            <div className="cmp">
              필요: {i.fill === 'perm' ? 'alarm.write' : 'Motor 전류'}<span className="arrow">↔</span>
              {ok ? (i.fill === 'perm' ? '부여됨' : '연결됨') : i.current}
            </div>
            {!ok && i.fill === 'perm' && (
              <button className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} onClick={() => setDone((x) => ({ ...x, perm: true }))}>필요 권한 부여</button>
            )}
            {!ok && i.fill === 'data' && (
              <button className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} disabled={connecting} onClick={() => setConnecting(true)}>
                {connecting ? '연결 확인 중…' : '필요 데이터 연결'}
              </button>
            )}
            {i.fill === 'data' && !ok && <span className="caption">30초 안에 응답이 없으면 연결되지 않음으로 판정합니다.</span>}
          </div>
        )
      })}
    </Drawer>
  )
}
