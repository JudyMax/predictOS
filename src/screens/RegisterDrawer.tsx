import { useEffect, useRef, useState } from 'react'
import { MANIFEST_V1, MANIFEST_V2, manifestRaw, type Manifest } from '../data'
import { useApp } from '../store'
import { Drawer } from '../components/ui'

export function ManifestView({ m, highlight }: { m: Manifest; highlight?: string }) {
  const [raw, setRaw] = useState(false)
  const rows: [string, string, boolean?][] = [
    ['앱 ID', m.appId],
    ['버전', `v${m.version}`],
    ['필요 데이터', m.requiredData.join(', ')],
    ['필요 권한', m.requiredPermissions.join(', ')],
    ['호환 버전', `pdx ${m.pdxVersion} · MxFM ${m.mxfmVersion}`],
    ['업그레이드 가능한 이전 버전', m.upgradableFrom],
    ['릴리즈 노트', m.releaseNote, highlight === 'releaseNote'],
  ]
  return (
    <div>
      <div className="kv">
        {rows.map(([k, v, hl]) => (
          <div key={k} style={{ display: 'contents' }}>
            <div className={`k ${hl ? 'changed' : ''}`}>{k}</div>
            <div className={`${k.includes('버전') || k === '앱 ID' ? 'mono tnum' : ''} ${hl ? 'changed' : ''}`}>{v}</div>
          </div>
        ))}
      </div>
      <button className="link" style={{ marginTop: 8 }} onClick={() => setRaw(!raw)}>{raw ? '원문 접기 ▲' : '원문 보기 ▼'}</button>
      {raw && <pre className="code">{manifestRaw(m)}</pre>}
    </div>
  )
}

export default function RegisterDrawer({ resubmitOf }: { resubmitOf?: string }) {
  const { d } = useApp()
  const sample = resubmitOf ? MANIFEST_V2 : MANIFEST_V1
  const [file, setFile] = useState<string | null>(null)
  const [reading, setReading] = useState(false)
  const [over, setOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!reading) return
    const t = setTimeout(() => setReading(false), 900)
    return () => clearTimeout(t)
  }, [reading])

  const pick = (name?: string) => {
    setFile(name ?? sample.fileName)
    setReading(true)
  }
  const close = () => d({ type: 'drawer', drawer: null })

  return (
    <Drawer
      title={resubmitOf ? '재제출' : '새 버전 등록'}
      sub={resubmitOf ? '재제출 대상: 모터 진단 v2.0.1' : '모터 진단'}
      onClose={close}
      foot={
        <>
          <button className="btn btn-secondary" onClick={close}>취소</button>
          <button className="btn btn-primary" disabled={!file || reading} onClick={() => d({ type: 'submit', resubmitOf })}>제출</button>
        </>
      }
    >
      {!file ? (
        <div
          className={`drop ${over ? 'over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setOver(true) }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); pick(e.dataTransfer.files[0]?.name) }}
        >
          <div style={{ fontSize: 28, lineHeight: 1 }}>⇪</div>
          <div>패치 파일을 끌어 놓거나</div>
          <button className="btn btn-secondary" onClick={() => pick()}>샘플 파일 선택: <span className="mono">{sample.fileName}</span></button>
          <button className="link" onClick={() => inputRef.current?.click()}>내 컴퓨터에서 선택</button>
          <input ref={inputRef} type="file" hidden onChange={(e) => pick(e.target.files?.[0]?.name)} />
          <div className="caption">등록 정보는 패치 파일에서 자동으로 읽습니다. 직접 입력하거나 고치지 않습니다.</div>
        </div>
      ) : (
        <>
          <div className="file-chip">
            <span className="ic">.patch</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="mono">{file}</div>
              <div className="caption">{reading ? '등록 정보를 읽는 중…' : '필수 항목 · 형식 · 버전 규칙 검증 통과'}</div>
            </div>
            {reading ? <span className="spinner" /> : <button className="link" onClick={() => setFile(null)}>다른 파일</button>}
          </div>
          {!reading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="label">읽어 온 등록 정보 <span className="caption">(읽기 전용)</span></div>
              <ManifestView m={sample} highlight={resubmitOf ? 'releaseNote' : undefined} />
              {resubmitOf && <div className="caption">노란 칸: 이전 제출본과 달라진 항목</div>}
              {file !== sample.fileName && (
                <div className="hint-note">프로토타입: 올린 파일과 관계없이 샘플 등록 정보를 읽은 것으로 표시합니다.</div>
              )}
            </div>
          )}
        </>
      )}
    </Drawer>
  )
}
