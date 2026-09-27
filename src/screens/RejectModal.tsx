import { useState } from 'react'
import { useApp } from '../store'
import { Modal } from '../components/ui'

const EXAMPLE = '릴리즈 노트에 알람 기준 변경 내용(부하율 경고 임계값)이 빠져 있습니다. 변경 내용을 추가해 다시 제출해 주세요.'

export default function RejectModal({ id }: { id: string }) {
  const { d } = useApp()
  const [reason, setReason] = useState('')
  const empty = reason.trim().length === 0

  return (
    <Modal
      title="반려하시겠습니까?"
      foot={
        <>
          <button className="btn btn-secondary" onClick={() => d({ type: 'modal', modal: null })}>취소</button>
          <button className="btn btn-danger-fill btn" disabled={empty} onClick={() => d({ type: 'reject', id, reason: reason.trim() })}>반려</button>
        </>
      }
    >
      <div className="caption" style={{ color: 'var(--ink-secondary)', fontSize: 13 }}>
        모터 진단 v2.0.1이 반려 상태가 되고, 사유는 제출자에게만 보입니다. 반려는 되돌릴 수 없습니다.
      </div>
      <label className="label" htmlFor="reason">반려 사유 <span style={{ color: 'var(--critical)' }}>(필수)</span></label>
      <textarea id="reason" rows={4} value={reason} autoFocus placeholder="제출자가 무엇을 고쳐야 하는지 적어 주세요" onChange={(e) => setReason(e.target.value)} />
      <div className="between">
        <span className="caption" style={{ color: empty ? 'var(--critical)' : 'var(--ink-mute)' }}>
          {empty ? '사유를 입력해야 반려할 수 있습니다.' : `${reason.trim().length}자`}
        </span>
        {empty && <button className="link" onClick={() => setReason(EXAMPLE)}>예시 사유 넣기</button>}
      </div>
    </Modal>
  )
}
