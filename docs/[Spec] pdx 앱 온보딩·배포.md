---
title: [Spec] pdx 앱 온보딩·배포
product: PDX
owner: 김윤주
generated_at: 2026-09-27T09:26:53Z
status: draft
version: v0.2
gates: pass
adversarial_review: pass
reader_simulation: warn
prd: {path: [PRD] pdx 앱 온보딩·배포.md, version: v0.3}
policy: {path: [Policy] pdx 앱 온보딩·배포.md, version: v2.5}
---

# [Spec] pdx 앱 온보딩·배포 Spec

> **검증 통과** · 적대적 리뷰: pass · 상태: draft · 버전: v0.2 · PRD v0.3 · POLICY v2.5

## Reader Contract

> **읽는 대상:** 기획자(PO)·개발자
> **목적:** PRD를 구현 가능한 사용자 스토리와 요구사항으로 확정해, 설계·개발에 착수할지 결정하게 한다
> **읽고 할 일:** Stories가 PRD 범위와 맞는지 확인한다; 요구사항의 값이 정책과 맞는지, 미해결 정책·gap에 결정을 내려준다; 동의하면 설계·개발 단계로 넘긴다
> **예상 읽기 시간:** 약 8분
> **담당자:** 작성을 요청한 기획자

## 30초 Brief

- **무엇:** pdx에서 앱 버전 등록부터 공장별 배포와 정상 동작 확인까지의 절차를 정의한다. [^1]
- **누가:** Application Manager는 등록·재제출을, Platform Admin은 검토·배포·권한 관리를, Plant Operator는 자기 공장 상태 확인과 사용 권한 요청을 한다. [^2]
- **핵심 규칙:** 모든 값은 정책 대장 v2.0을 인용한다. 형식이 틀린 등록은 받지 않고, 배포 전 점검은 공장마다 따로 하며, 배포 이력은 실행할 때만 만들고, 배포가 실패하면 이전 버전을 유지한 채 새 버전 등록부터 다시 한다. [^3][^4][^5]
- **화면:** '앱 버전 관리'와 '배포 관리' 두 메뉴로 나누고, '배포하기' 버튼으로 잇는다. [^6]
- **범위 밖:** 고객사·외부 업체 앱, 공장 등록과 계정 생성 화면, 반려 사유를 원프레딕트에 전달하는 일. [^7][^8][^9]
- **남은 결정:** 성공 지표의 기준선(MVP 적용 후 첫 측정). [^10]

## Stories

`[기획자 판단 · AI 구조화]`

| Story ID | Category | 주체 | User Story | 유형 | 근거 |
|---|---|---|---|---|---|
| PDX-FO-ACCT-001 | 계정 관리 / 권한 부여 | Platform Admin | 필요한 사람에게 필요한 접근을 주기 위해, 사용자에게 앱 접근 권한을 부여할 수 있다. | Happy | [^1][^11] |
| PDX-FO-ACCT-002 | 계정 관리 / 권한 제한 | Platform Admin | 접근을 막아야 하는 사람을 제때 제한하기 위해, 사용자의 앱 접근 권한을 제한할 수 있다. | Happy | [^1][^12][^11] |
| PDX-FO-ACCT-003 | 계정 관리 / 사용 권한 요청 | Plant Operator | 아직 쓸 수 없는 application을 쓰기 위해, application 사용 권한을 요청할 수 있다. | Happy | [^7][^13] |
| PDX-FO-ACCT-004 | 계정 관리 / 사용 권한 요청 | Platform Admin | 운영자의 사용 권한 요청을 반영하기 위해, 요청된 사용 권한을 부여할 수 있다. | Happy | [^7][^13][^14] |
| PDX-FO-ACCT-004-1 | 계정 관리 / 사용 권한 요청 | Platform Admin | 부여하지 않을 사용 권한 요청을 처리하기 위해, Plant Operator의 사용 권한 요청을 거절할 수 있다. | Edge | [^7][^14] |
| PDX-FO-APRV-001 | 검토·승인 / 표준 절차 | Platform Admin | 승인 이력을 남기고 등록을 확정하기 위해, 등록된 application 버전을 승인할 수 있다. | Happy | [^1][^14] |
| PDX-FO-APRV-001-1 | 검토·승인 / 표준 절차 | 시스템 | 승인된 버전만 공장에 배포하기 위해, 승인이 완료되면 해당 버전의 등록을 확정한다. | Happy | [^1][^14] |
| PDX-FO-APRV-002 | 검토·승인 / 예외 처리 | Platform Admin | 부적합한 등록이 확정되는 것을 막기 위해, 검토 중인 등록을 반려할 수 있다. | Edge | [^1] |
| PDX-FO-APRV-002-1 | 검토·승인 / 예외 처리 | Application Manager | 반려된 등록을 다시 승인받기 위해, 보완한 내용으로 등록을 다시 제출할 수 있다. | Fallback | [^1][^9][^15] |
| PDX-FO-AUDIT-001 | 승인·변경 기록 / 조회 | Platform Admin | 장애 추적과 감사 대응을 위해, 요청자·승인자·실행자·반영 시점이 담긴 변경 기록을 조회할 수 있다. | Happy | [^12][^1] |
| PDX-FO-AUDIT-002 | 승인·변경 기록 / 자동 기록 | 시스템 | 누가 언제 무엇을 승인하고 배포했는지 이력을 남기기 위해, 등록 요청·승인·반려·배포 실행·반영이 일어날 때마다 요청자·승인자·실행자·반영 시점을 자동으로 기록한다. | Happy | [^12][^1][^14] |
| PDX-FO-DEPLOY-001 | 배포 관리 / 대상 선택 | Platform Admin | 배포 대상을 정하기 위해, 배포할 공장(Workspace)을 선택할 수 있다. | Happy | [^1] |
| PDX-FO-DEPLOY-001-1 | 배포 관리 / 대상 선택 | 시스템 | 배포 전 설정 누락을 찾기 위해, 등록 정보와 선택한 공장의 실행 조건·권한·데이터 연결을 자동으로 비교해 보여준다. | Happy | [^1] |
| PDX-FO-DEPLOY-001-2 | 배포 관리 / 예외 처리 | 시스템 | 업그레이드 경로 충돌로 인한 버전 혼선을 막기 위해, 선언된 업그레이드 가능 이전 버전과 공장의 현재 버전을 비교해 조건에 맞지 않으면 해당 공장의 배포를 막는다. | Edge | [^1] |
| PDX-FO-DEPLOY-002 | 배포 관리 / 설정 확인 | Platform Admin | 부족한 부분을 채워 배포 전 설정 누락을 없애기 위해, 자동 비교에서 부족하다고 표시된 항목을 채울 수 있다. | Happy | [^1][^14] |
| PDX-FO-DEPLOY-003 | 배포 관리 / 실행 | Platform Admin | 승인된 버전을 공장에 반영하기 위해, 배포를 실행할 수 있다. | Happy | [^1] |
| PDX-FO-DEPLOY-003-1 | 배포 관리 / 실행 | 시스템 | 설치 명령이 아니라 실제 정상 동작을 확인해야 배포 완료로 보기 위해, 설치 후 실제 정상 동작을 확인해 배포 상태를 갱신한다. | Happy | [^1] |
| PDX-FO-REG-001 | 설정 표준화 / 등록 | Application Manager | 표준 등록 정보로 앱을 등록해 설정 누락을 없애기 위해, application의 새 버전을 등록할 수 있다. | Happy | [^1][^7][^9][^15] |
| PDX-FO-REG-001-1 | 설정 표준화 / 등록 | 시스템 | 등록 단계의 설정 누락을 막기 위해, 패치 파일 안 등록 정보를 자동으로 읽는다. | Happy | [^1][^9][^15] |
| PDX-FO-STAT-001 | 배포 현황 / 조회 | Plant Operator | 정상 동작 여부를 파악하기 위해, 자기 공장에 배포된 application의 상태를 확인할 수 있다. | Happy | [^1] |
| PDX-FO-STAT-002 | 배포 현황 / 조회 | Platform Admin | 기록과 실제 운영 버전의 차이를 파악하기 위해, 공장별 배포 현황을 확인할 수 있다. | Happy | [^1][^7] |
| PDX-FO-STAT-003 | 배포 현황 / 조회 | Application Manager | 등록한 버전이 각 공장에서 어떻게 운영되는지 확인하기 위해, 자신이 등록한 application의 공장별 배포 현황을 pdx 화면에서 확인할 수 있다. | Happy | [^1][^9][^15] |

## 적용 정책

`[AI 자동 생성 · 기획자 검수]`

> 이번 요구사항이 인용한 정책 항목 목록이다. 정책 문장은 `[Policy] pdx 앱 온보딩·배포.md`에서 POL ID로 찾는다. 상태 열이 정책 개정 여부를 알려 준다.

<details>
<summary>인용한 정책 48건 펼치기</summary>

| POL ID | 정책 버전 | 상태 | 적용 REQ |
|---|---|---|---|
| POL-001 | v2.5 | 현행 | - |
| POL-007 | v2.5 | 현행 | REQ-BE-REG-005, REQ-FE-REG-002 |
| POL-008 | v2.5 | 현행 | REQ-BE-REG-001, REQ-BE-REG-005 |
| POL-009 | v2.5 | 현행 | REQ-BE-REG-003 |
| POL-010 | v2.5 | 현행 | REQ-BE-REG-002, REQ-BE-REG-006 |
| POL-012 | v2.5 | 현행 | REQ-BE-APRV-001 |
| POL-013 | v2.5 | 현행 | REQ-BE-APRV-002 |
| POL-015 | v2.5 | 현행 | REQ-BE-APRV-005, REQ-FE-APRV-003 |
| POL-016 | v2.5 | 현행 | REQ-BE-APRV-006 |
| POL-017 | v2.5 | 현행 | REQ-BE-APRV-007, REQ-FE-APRV-004 |
| POL-018 | v2.5 | 현행 | REQ-BE-REG-001, REQ-BE-APRV-003, REQ-FE-APRV-002, REQ-BE-APRV-004, REQ-FE-DEPLOY-007, REQ-FE-STAT-005 |
| POL-019 | v2.5 | 현행 | REQ-BE-APRV-003, REQ-FE-APRV-002 |
| POL-021 | v2.5 | 현행 | REQ-BE-DEPLOY-003, REQ-BE-DEPLOY-004, REQ-BE-DEPLOY-009 |
| POL-022 | v2.5 | 현행 | REQ-BE-DEPLOY-004, REQ-BE-DEPLOY-005 |
| POL-023 | v2.5 | 현행 | REQ-BE-DEPLOY-006 |
| POL-024 | v2.5 | 현행 | REQ-BE-DEPLOY-007 |
| POL-025 | v2.5 | 현행 | REQ-BE-DEPLOY-009, REQ-BE-DEPLOY-010, REQ-BE-DEPLOY-011 |
| POL-026 | v2.5 | 현행 | REQ-BE-DEPLOY-008, REQ-FE-DEPLOY-003 |
| POL-027 | v2.5 | 현행 | REQ-BE-DEPLOY-012 |
| POL-029 | v2.5 | 현행 | REQ-BE-DEPLOY-013 |
| POL-030 | v2.5 | 현행 | REQ-BE-DEPLOY-012, REQ-BE-DEPLOY-015, REQ-BE-DEPLOY-019, REQ-FE-STAT-002, REQ-BE-STAT-002, REQ-FE-STAT-004, REQ-FE-STAT-005 |
| POL-032 | v2.5 | 현행 | REQ-BE-DEPLOY-016 |
| POL-033 | v2.5 | 현행 | REQ-BE-DEPLOY-017, REQ-BE-DEPLOY-023, REQ-FE-DEPLOY-008 |
| POL-034 | v2.5 | 현행 | REQ-BE-DEPLOY-018, REQ-FE-DEPLOY-009, REQ-FE-DEPLOY-010, REQ-FE-DEPLOY-011 |
| POL-037 | v2.5 | 현행 | REQ-BE-ACCT-001 |
| POL-040 | v2.5 | 현행 | REQ-FE-STAT-003, REQ-BE-STAT-003 |
| POL-042 | v2.5 | 현행 | REQ-FE-STAT-001, REQ-BE-STAT-001 |
| POL-046 | v2.5 | 현행 | REQ-BE-ACCT-002, REQ-BE-ACCT-003 |
| POL-047 | v2.5 | 현행 | REQ-BE-ACCT-004 |
| POL-049 | v2.5 | 현행 | REQ-BE-ACCT-005 |
| POL-050 | v2.5 | 현행 | REQ-BE-ACCT-006 |
| POL-051 | v2.5 | 현행 | REQ-BE-ACCT-007 |
| POL-052 | v2.5 | 현행 | REQ-BE-ACCT-008, REQ-BE-ACCT-009, REQ-FE-ACCT-005 |
| POL-053 | v2.5 | 현행 | REQ-BE-ACCT-010 |
| POL-054 | v2.5 | 현행 | REQ-BE-AUDIT-003 |
| POL-055 | v2.5 | 현행 | REQ-FE-AUDIT-001, REQ-BE-AUDIT-003, REQ-BE-AUDIT-006 |
| POL-056 | v2.5 | 현행 | REQ-BE-AUDIT-001 |
| POL-057 | v2.5 | 현행 | REQ-BE-AUDIT-004 |
| POL-058 | v2.5 | 현행 | REQ-BE-AUDIT-002 |
| POL-059 | v2.5 | 현행 | REQ-BE-AUDIT-005 |
| POL-061 | v2.5 | 현행 | REQ-BE-REG-006 |
| POL-062 | v2.5 | 현행 | REQ-BE-REG-006 |
| POL-063 | v2.5 | 현행 | REQ-BE-REG-006 |
| POL-064 | v2.5 | 현행 | REQ-BE-APRV-008, REQ-FE-APRV-005, REQ-FE-APRV-006 |
| POL-065 | v2.5 | 현행 | REQ-BE-DEPLOY-020 |
| POL-066 | v2.5 | 현행 | REQ-BE-DEPLOY-021 |
| POL-067 | v2.5 | 현행 | REQ-BE-DEPLOY-012, REQ-BE-DEPLOY-022 |
| POL-068 | v2.5 | 현행 | REQ-BE-ACCT-011 |

</details>

## 요구사항

`[AI 작성 · 기획자 검수]`

| REQ ID | Category | Story | 요구사항 (EARS) | Layer | 결정 이력 | 연관 정책 · 근거 |
|---|---|---|---|---|---|---|
| REQ-BE-ACCT-001 | 계정 관리 / 권한 부여 | PDX-FO-ACCT-001: 필요한 사람에게 필요한 접근을 주기 위해, 사용자에게 앱 접근 권한을 부여할 수 있다. | **WHEN** Platform Admin이 사용자에게 앱 접근 권한을 부여하면 **THEN** 시스템 **SHALL** 그 사용자의 앱 접근 권한을 앱별로 추가한다(역할은 계정마다 하나다) | BE | - | POL-037 [^16] |
| REQ-FE-ACCT-001 | 계정 관리 / 권한 부여 | PDX-FO-ACCT-001 | **WHEN** Platform Admin이 권한 관리 화면에서 권한을 부여하면 **THEN** 권한 관리 화면 **SHALL** 부여 결과를 표시한다 | FE | - | [^1] |
| REQ-BE-ACCT-002 | 계정 관리 / 권한 제한 | PDX-FO-ACCT-002: 접근을 막아야 하는 사람을 제때 제한하기 위해, 사용자의 앱 접근 권한을 제한할 수 있다. | **WHEN** Platform Admin이 사용자의 앱 접근 권한을 제한하면 **THEN** 시스템 **SHALL** 그 앱의 접근 권한을 제거한다 | BE | - | POL-046 [^17] |
| REQ-BE-ACCT-003 | 계정 관리 / 권한 제한 | PDX-FO-ACCT-002 | **WHEN** Platform Admin이 계정 전체를 차단하면 **THEN** 시스템 **SHALL** 그 계정을 비활성화한다 | BE | - | POL-046 [^17] |
| REQ-BE-ACCT-004 | 계정 관리 / 권한 제한 | PDX-FO-ACCT-002 | **THE** 시스템 **SHALL** 권한 제한과 계정 비활성화를 즉시 적용해 이미 로그인한 세션에도 바로 반영한다 | BE | - | POL-047 [^18] |
| REQ-FE-ACCT-002 | 계정 관리 / 권한 제한 | PDX-FO-ACCT-002 | **WHEN** Platform Admin이 권한 관리 화면에서 제한 또는 비활성화를 선택하면 **THEN** 권한 관리 화면 **SHALL** 처리 결과를 표시한다 | FE | - | [^1] |
| REQ-BE-ACCT-005 | 계정 관리 / 사용 권한 요청 | PDX-FO-ACCT-003: 아직 쓸 수 없는 application을 쓰기 위해, application 사용 권한을 요청할 수 있다. | **WHEN** Plant Operator가 application 사용 권한을 요청하면 **THEN** 시스템 **SHALL** 대상 앱과 요청 사유를 입력받아 사용 권한 요청을 만들고 공장을 요청자의 소속 공장으로 정한다 | BE | - | POL-049 [^19] |
| REQ-BE-ACCT-006 | 계정 관리 / 사용 권한 요청 | PDX-FO-ACCT-003 | **IF** 같은 사람이 같은 앱에 처리 대기 중인 요청을 이미 가지고 있으면 **THEN** 시스템 **SHALL** 새 요청을 거부한다 | BE | - | POL-050 [^20] |
| REQ-FE-ACCT-003 | 계정 관리 / 사용 권한 요청 | PDX-FO-ACCT-003 | **WHEN** Plant Operator가 사용 권한 요청 화면에서 대상 앱과 사유를 입력해 제출하면 **THEN** 사용 권한 요청 화면 **SHALL** 요청 결과를 표시한다 | FE | - | [^7] |
| REQ-BE-ACCT-007 | 계정 관리 / 사용 권한 요청 | PDX-FO-ACCT-004: 운영자의 사용 권한 요청을 반영하기 위해, 요청된 사용 권한을 부여할 수 있다. | **WHEN** Platform Admin이 사용 권한 요청을 승인하면 **THEN** 시스템 **SHALL** 그 즉시 해당 앱의 사용 권한을 부여한다 | BE | - | POL-051 [^21] |
| REQ-BE-ACCT-011 | 계정 관리 / 사용 권한 요청 | PDX-FO-ACCT-004 | **IF** Platform Admin이 처리 대기 상태가 아닌 사용 권한 요청을 승인하거나 거절하려 하면 **THEN** 시스템 **SHALL** 요청을 거부하고 먼저 처리된 결과를 유지한다 | BE | - | POL-068 [^22] |
| REQ-FE-ACCT-004 | 계정 관리 / 사용 권한 요청 | PDX-FO-ACCT-004 | **WHEN** Platform Admin이 사용 권한 요청 화면에서 승인을 선택하면 **THEN** 사용 권한 요청 화면 **SHALL** 승인 결과를 표시한다 | FE | - | [^7] |
| REQ-BE-ACCT-008 | 계정 관리 / 사용 권한 요청 | PDX-FO-ACCT-004-1: 부여하지 않을 사용 권한 요청을 처리하기 위해, Plant Operator의 사용 권한 요청을 거절할 수 있다. | **WHEN** Platform Admin이 Plant Operator의 사용 권한 요청을 거절하면 **THEN** 시스템 **SHALL** 사유와 함께 그 요청을 거절 상태로 바꾼다 | BE | - | POL-052 [^23] |
| REQ-BE-ACCT-009 | 계정 관리 / 사용 권한 요청 | PDX-FO-ACCT-004-1 | **IF** Platform Admin이 거절 사유를 입력하지 않으면 **THEN** 시스템 **SHALL** 거절 처리를 진행하지 않는다 | BE | - | POL-052 [^23] |
| REQ-BE-ACCT-010 | 계정 관리 / 사용 권한 요청 | PDX-FO-ACCT-004-1 | **THE** 시스템 **SHALL** 요청자가 pdx 안에서 자기 요청의 결과와 사유를 확인하게 하고 외부 알림은 보내지 않는다 | BE | - | POL-053 [^24][^25] |
| REQ-FE-ACCT-005 | 계정 관리 / 사용 권한 요청 | PDX-FO-ACCT-004-1 | **WHEN** Platform Admin이 사용 권한 요청 화면에서 거절을 선택하면 **THEN** 사용 권한 요청 화면 **SHALL** 사유 입력 필드를 필수로 표시하고 거절 결과를 표시한다 | FE | - | POL-052 [^23] |
| REQ-BE-APRV-001 | 검토·승인 / 표준 절차 | PDX-FO-APRV-001: 승인 이력을 남기고 등록을 확정하기 위해, 등록된 application 버전을 승인할 수 있다. | **WHEN** Platform Admin이 승인 대기 중인 등록을 승인하면 **THEN** 시스템 **SHALL** 그 등록을 승인됨 상태로 바꾼다 | BE | - | POL-012 [^26] |
| REQ-BE-APRV-002 | 검토·승인 / 표준 절차 | PDX-FO-APRV-001 | **IF** Platform Admin이 자신이 제출한 등록을 승인하려 하면 **THEN** 시스템 **SHALL** 승인을 거부한다 | BE | - | POL-013 [^27] |
| REQ-BE-APRV-008 | 검토·승인 / 표준 절차 | PDX-FO-APRV-001 | **IF** Platform Admin이 승인 대기 상태가 아닌 등록을 승인하거나 반려하려 하면 **THEN** 시스템 **SHALL** 요청을 거부하고 먼저 처리된 결과를 유지한다 | BE | - | POL-064 [^28][^29] |
| REQ-FE-APRV-001 | 검토·승인 / 표준 절차 | PDX-FO-APRV-001 | **WHEN** Platform Admin이 앱 버전 관리 화면에서 승인을 선택하면 **THEN** 앱 버전 관리 화면 **SHALL** 승인 결과와 등록 확정 상태를 표시한다 | FE | - | [^1][^6] |
| REQ-FE-APRV-005 | 검토·승인 / 표준 절차 | PDX-FO-APRV-001 | **IF** 등록이 승인 대기 상태가 아니면 **THEN** 앱 버전 관리 화면 **SHALL** 승인·반려 버튼을 비활성화한다 | FE | - | POL-064 [^28][^29] |
| REQ-FE-APRV-006 | 검토·승인 / 표준 절차 | PDX-FO-APRV-001 | **IF** 승인·반려 요청이 먼저 처리된 결과 때문에 거부되면 **THEN** 앱 버전 관리 화면 **SHALL** 다른 Platform Admin이 이미 처리했다고 안내한다 | FE | - | POL-064 [^28][^29] |
| REQ-BE-APRV-003 | 검토·승인 / 표준 절차 | PDX-FO-APRV-001-1: 승인된 버전만 공장에 배포하기 위해, 승인이 완료되면 해당 버전의 등록을 확정한다. | **WHEN** 등록 승인이 완료되면 **THEN** 시스템 **SHALL** 해당 버전의 등록 상태를 승인됨으로 바꾼다 | BE | - | POL-018, POL-019 [^30][^31] |
| REQ-FE-APRV-002 | 검토·승인 / 표준 절차 | PDX-FO-APRV-001-1 | **WHEN** 등록이 확정되면 **THEN** 앱 버전 관리 화면 **SHALL** 해당 버전의 상태를 승인됨으로 표시한다 | FE | - | POL-018, POL-019 [^30][^31][^6] |
| REQ-BE-APRV-004 | 검토·승인 / 예외 처리 | PDX-FO-APRV-002: 부적합한 등록이 확정되는 것을 막기 위해, 검토 중인 등록을 반려할 수 있다. | **WHEN** Platform Admin이 검토 중인 등록을 반려하면 **THEN** 시스템 **SHALL** 사유와 함께 등록을 반려 상태로 바꾼다 | BE | - | POL-018 [^30] |
| REQ-BE-APRV-005 | 검토·승인 / 예외 처리 | PDX-FO-APRV-002 | **IF** Platform Admin이 반려 사유를 입력하지 않으면 **THEN** 시스템 **SHALL** 반려 처리를 진행하지 않는다 | BE | - | POL-015 [^32] |
| REQ-BE-APRV-006 | 검토·승인 / 예외 처리 | PDX-FO-APRV-002 | **THE** 시스템 **SHALL** 반려 결과와 사유를 그 등록을 제출한 사람이 pdx 안에서 볼 수 있게 한다 | BE | - | POL-016 [^33] |
| REQ-FE-APRV-003 | 검토·승인 / 예외 처리 | PDX-FO-APRV-002 | **WHEN** Platform Admin이 앱 버전 관리 화면에서 반려를 선택하면 **THEN** 앱 버전 관리 화면 **SHALL** 사유 입력 필드를 필수로 표시하고 반려 결과를 표시한다 | FE | - | POL-015 [^32][^6] |
| REQ-BE-APRV-007 | 검토·승인 / 예외 처리 | PDX-FO-APRV-002-1: 반려된 등록을 다시 승인받기 위해, 보완한 내용으로 등록을 다시 제출할 수 있다. | **WHEN** Application Manager가 반려된 등록을 재제출하면 **THEN** 시스템 **SHALL** 등록 정보 전체(고친 패치 파일)를 다시 제출받아 승인 대기 상태로 바꾼다 | BE | - | POL-017 [^34] |
| REQ-FE-APRV-004 | 검토·승인 / 예외 처리 | PDX-FO-APRV-002-1 | **WHEN** Application Manager가 앱 버전 관리 화면에서 고친 패치 파일을 올리면 **THEN** 앱 버전 관리 화면 **SHALL** 재제출 결과를 표시한다 | FE | - | POL-017 [^34][^6] |
| REQ-BE-AUDIT-001 | 승인·변경 기록 / 조회 | PDX-FO-AUDIT-001: 장애 추적과 감사 대응을 위해, 요청자·승인자·실행자·반영 시점이 담긴 변경 기록을 조회할 수 있다. | **IF** Platform Admin이 아닌 사용자가 변경 기록을 조회하려 하면 **THEN** 시스템 **SHALL** 조회를 거부한다 | BE | - | POL-056 [^35] |
| REQ-BE-AUDIT-002 | 승인·변경 기록 / 조회 | PDX-FO-AUDIT-001 | **WHEN** Platform Admin이 변경 기록을 조회하면 **THEN** 시스템 **SHALL** 조회자와 조회 시각을 변경 기록에 남긴다 | BE | - | POL-058 [^36] |
| REQ-FE-AUDIT-001 | 승인·변경 기록 / 조회 | PDX-FO-AUDIT-001 | **WHEN** Platform Admin이 변경 기록 화면을 열면 **THEN** 변경 기록 화면 **SHALL** 처리자·처리 시각·대상·변경 전 값과 변경 후 값·사유가 담긴 변경 기록을 표시한다 | FE | - | POL-055 [^37] |
| REQ-FE-AUDIT-002 | 승인·변경 기록 / 조회 | PDX-FO-AUDIT-001 | **THE** 변경 기록 화면 **SHALL** 기간·공장·앱·행위자·행위 유형 필터를 제공한다 | FE | - | [^38][^39] |
| REQ-FE-AUDIT-003 | 승인·변경 기록 / 조회 | PDX-FO-AUDIT-001 | **IF** 필터 조건에 맞는 변경 기록이 없으면 **THEN** 변경 기록 화면 **SHALL** 조건에 맞는 기록이 없다는 빈 결과 상태를 표시한다 | FE | - | [^38][^39] |
| REQ-BE-AUDIT-003 | 승인·변경 기록 / 자동 기록 | PDX-FO-AUDIT-002: 누가 언제 무엇을 승인하고 배포했는지 이력을 남기기 위해, 등록 요청·승인·반려·배포 실행·반영이 일어날 때마다 요청자·승인자·실행자·반영 시점을 자동으로 기록한다. | **WHEN** 등록 요청·재제출, 승인, 반려, 배포 실행·반영·실패, 역할·접근 권한 부여·제한, 계정 생성·비활성화, 공장 등록·수정·삭제·비활성화, 사용 권한 요청 승인·거절 중 하나가 일어나면 **THEN** 시스템 **SHALL** 요청자·승인자·실행자·반영 시점을 변경 기록에 자동으로 남긴다 | BE | - | POL-054, POL-055 [^40][^37] |
| REQ-BE-AUDIT-004 | 승인·변경 기록 / 자동 기록 | PDX-FO-AUDIT-002 | **THE** 시스템 **SHALL** 변경 기록을 누구도 수정하거나 삭제할 수 없게 한다 | BE | - | POL-057 [^41] |
| REQ-BE-AUDIT-005 | 승인·변경 기록 / 자동 기록 | PDX-FO-AUDIT-002 | **THE** 시스템 **SHALL** 변경 기록을 기본 최소 1년 보관하고, Platform Admin이 고객사 업종 규정에 따라 보관 기간을 늘릴 수 있게 한다(줄일 수는 없다) | BE | - | POL-059 [^42] |
| REQ-BE-AUDIT-006 | 승인·변경 기록 / 자동 기록 | PDX-FO-AUDIT-002 | **WHEN** 역할·접근 권한, 계정 상태, 등록 상태, 배포 상태, 사용 권한 요청 상태가 바뀌면 **THEN** 시스템 **SHALL** 변경 전 값과 변경 후 값을 변경 기록에 남긴다 | BE | - | POL-055 [^37] |
| REQ-BE-DEPLOY-001 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001: 배포 대상을 정하기 위해, 배포할 공장(Workspace)을 선택할 수 있다. | **WHEN** Platform Admin이 배포할 공장(Workspace)을 선택하면 **THEN** 시스템 **SHALL** 그 조합(버전×공장)에 대한 배포 전 점검을 시작한다 | BE | - | [^1] |
| REQ-BE-DEPLOY-002 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001 | **THE** 시스템 **SHALL** 앱 20개·공장 3곳의 모든 조합에 동일한 등록·검토·배포 절차를 적용한다 | BE | - | [^7][^43] |
| REQ-FE-DEPLOY-001 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001 | **WHEN** Platform Admin이 배포 관리 화면에서 대상 공장을 선택하면 **THEN** 배포 관리 화면 **SHALL** 선택된 공장 목록을 표시한다 | FE | - | [^1][^6] |
| REQ-FE-DEPLOY-007 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001 | **WHEN** Platform Admin이 앱 버전 관리 화면에서 승인된 버전의 '배포하기'를 선택하면 **THEN** 배포 관리 화면 **SHALL** 그 버전이 선택된 상태로 열린다 | FE | - | POL-018 [^30][^6] |
| REQ-BE-DEPLOY-003 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001-1: 배포 전 설정 누락을 찾기 위해, 등록 정보와 선택한 공장의 실행 조건·권한·데이터 연결을 자동으로 비교해 보여준다. | **WHEN** 배포 대상 공장이 정해지면 **THEN** 시스템 **SHALL** 앱 팀이 선언한 조건을 대상 공장마다 버전 검사(pdx 버전·MxFM 버전·업그레이드 경로) 다음 설정 검사(권한·데이터 연결) 순서로 검사한다 | BE | - | POL-021 [^44][^45] |
| REQ-BE-DEPLOY-004 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001-1 | **IF** 버전 검사(①pdx 버전 ②MxFM 버전 ③업그레이드 경로) 중 하나가 실패하면 **THEN** 시스템 **SHALL** 그 지점에서 검사를 멈추고 차단 사유를 버전 충돌로 표시한다 | BE | - | POL-021, POL-022 [^44][^46] |
| REQ-BE-DEPLOY-005 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001-1 | **IF** 설정 검사(④권한 ⑤데이터 연결) 중 실패한 항목이 있으면 **THEN** 시스템 **SHALL** 부족한 항목을 모두 한 번에 설정 부족으로 표시한다 | BE | - | POL-022 [^46] |
| REQ-BE-DEPLOY-006 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001-1 | **WHEN** 데이터 연결 여부를 검사할 때 **THEN** 시스템 **SHALL** 항목마다 cyclone 커넥터에 연결을 확인하고 30초 안에 응답이 없으면 그 항목을 연결되지 않음으로 처리한다 | BE | - | POL-023 [^47] |
| REQ-BE-DEPLOY-007 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001-1 | **THE** 시스템 **SHALL** 공장마다 독립으로 검사하여 한 공장의 실패가 다른 공장의 검사·배포에 영향을 주지 않게 한다 | BE | - | POL-024 [^4] |
| REQ-BE-DEPLOY-020 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001-1 | **THE** 시스템 **SHALL** 배포 전 점검 결과를 화면에만 보여 주고 배포 이력으로 저장하지 않는다 | BE | - | POL-065 [^48][^49] |
| REQ-BE-DEPLOY-021 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001-1 | **WHEN** 배포 전 점검이 끝나면 **THEN** 시스템 **SHALL** 점검 시각·버전과 공장·결과·부족한 항목을 점검 로그에 남긴다 | BE | - | POL-066 [^50] |
| REQ-FE-DEPLOY-002 | 배포 관리 / 대상 선택 | PDX-FO-DEPLOY-001-1 | **WHEN** 자동 비교가 끝나면 **THEN** 배포 관리 화면 **SHALL** 공장별 검사 결과(통과·버전 충돌·설정 부족)를 표시한다 | FE | - | [^1][^6] |
| REQ-BE-DEPLOY-008 | 배포 관리 / 예외 처리 | PDX-FO-DEPLOY-001-2: 업그레이드 경로 충돌로 인한 버전 혼선을 막기 위해, 선언된 업그레이드 가능 이전 버전과 공장의 현재 버전을 비교해 조건에 맞지 않으면 해당 공장의 배포를 막는다. | **IF** 선언된 업그레이드 가능한 이전 버전과 공장의 현재 버전이 조건에 맞지 않으면 **THEN** 시스템 **SHALL** 해당 공장의 배포를 막고 필요한 선행 버전을 안내한다 | BE | - | POL-026 [^51] |
| REQ-FE-DEPLOY-003 | 배포 관리 / 예외 처리 | PDX-FO-DEPLOY-001-2 | **WHEN** 버전 충돌로 막힌 공장이 있으면 **THEN** 배포 관리 화면 **SHALL** 필요한 선행 버전과 해결 방법을 표시한다 | FE | - | POL-026 [^51][^6] |
| REQ-BE-DEPLOY-009 | 배포 관리 / 설정 확인 | PDX-FO-DEPLOY-002: 부족한 부분을 채워 배포 전 설정 누락을 없애기 위해, 자동 비교에서 부족하다고 표시된 항목을 채울 수 있다. | **WHEN** Platform Admin이 설정 부족으로 표시된 항목을 채우면(필요 권한을 부여하거나 필요 데이터를 연결하면) **THEN** 시스템 **SHALL** 그 항목을 반영하고 검사를 다시 실행한다 | BE | - | POL-025, POL-021 [^52][^44][^45] |
| REQ-BE-DEPLOY-010 | 배포 관리 / 설정 확인 | PDX-FO-DEPLOY-002 | **WHEN** 다시 실행한 검사를 모두 통과하면 **THEN** 시스템 **SHALL** 그 조합의 배포 실행을 허용한다 | BE | - | POL-025 [^52] |
| REQ-BE-DEPLOY-011 | 배포 관리 / 설정 확인 | PDX-FO-DEPLOY-002 | **IF** 설정 부족 항목을 채우려는 사람이 Platform Admin이 아니면 **THEN** 시스템 **SHALL** 채우기를 허용하지 않는다 | BE | - | POL-025 [^52] |
| REQ-FE-DEPLOY-004 | 배포 관리 / 설정 확인 | PDX-FO-DEPLOY-002 | **WHEN** Platform Admin이 배포 관리 화면에서 부족한 항목을 입력하면 **THEN** 배포 관리 화면 **SHALL** 입력 필드와 재검사 결과를 표시한다 | FE | - | [^1][^6] |
| REQ-BE-DEPLOY-012 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003: 승인된 버전을 공장에 반영하기 위해, 배포를 실행할 수 있다. | **WHEN** Platform Admin이 배포 전 점검을 통과한 조합의 배포 실행을 확인하면 **THEN** 시스템 **SHALL** 그 조합의 배포 이력을 설치 중 상태로 만든다 | BE | - | POL-027, POL-030, POL-067 [^53][^54][^55] |
| REQ-BE-DEPLOY-013 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003 | **IF** 같은 앱을 같은 공장에 배포하는 중(설치 중·동작 확인 중)이면 **THEN** 시스템 **SHALL** 그 조합에 새 배포 시작을 차단한다 | BE | - | POL-029 [^56] |
| REQ-BE-DEPLOY-022 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003 | **WHEN** 배포 이력을 만들 때 **THEN** 시스템 **SHALL** 실행 직전 배포 전 점검 결과(검사별 통과 여부와 비교한 두 값)를 스냅샷으로 함께 저장한다 | BE | - | POL-067 [^55][^49] |
| REQ-FE-DEPLOY-005 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003 | **WHEN** Platform Admin이 배포 관리 화면에서 배포 실행을 선택하면 **THEN** 배포 관리 화면 **SHALL** 배포 상태(설치 중)를 표시한다 | FE | - | [^1][^6] |
| REQ-BE-DEPLOY-015 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003-1: 설치 명령이 아니라 실제 정상 동작을 확인해야 배포 완료로 보기 위해, 설치 후 실제 정상 동작을 확인해 배포 상태를 갱신한다. | **WHEN** 설치가 끝나면 **THEN** 시스템 **SHALL** 배포 상태를 동작 확인 중으로 바꾸고 정상 동작 확인을 시작한다 | BE | - | POL-030 [^54] |
| REQ-BE-DEPLOY-016 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003-1 | **WHEN** 설치 완료 후 30분 안에 헬스체크 요청에 10초 안에 성공 응답을 3회 연속 받고 선언한 데이터를 실제로 받기 시작한 것이 확인되면 **THEN** 시스템 **SHALL** 배포 상태를 완료로 바꾼다 | BE | - | POL-032 [^57] |
| REQ-BE-DEPLOY-017 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003-1 | **IF** 설치 또는 동작 확인이 실패하면 **THEN** 시스템 **SHALL** 그 공장에 이전에 설치돼 있던 버전을 그대로 유지한다 | BE | - | POL-033 [^5] |
| REQ-BE-DEPLOY-018 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003-1 | **WHEN** 배포가 실패하면 **THEN** 시스템 **SHALL** Platform Admin과 그 버전을 등록한 사람에게 pdx 안에서 알린다 | BE | - | POL-034 [^58] |
| REQ-BE-DEPLOY-019 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003-1 | **IF** 설치 또는 동작 확인이 실패하면 **THEN** 시스템 **SHALL** 해당 버전×공장의 배포 상태를 실패로 바꾼다 | BE | - | POL-030 [^54] |
| REQ-BE-DEPLOY-023 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003-1 | **IF** Platform Admin이 실패한 버전을 같은 공장에 다시 실행하려 하면 **THEN** 시스템 **SHALL** 실행을 거부한다 | BE | - | POL-033 [^5][^45] |
| REQ-FE-DEPLOY-006 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003-1 | **WHEN** 동작 확인 결과가 나오면 **THEN** 배포 관리 화면 **SHALL** 배포 상태(완료 또는 실패)와 실패 사유를 표시한다 | FE | - | [^1][^6] |
| REQ-FE-DEPLOY-008 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003-1 | **WHEN** 배포가 실패하면 **THEN** 배포 관리 화면 **SHALL** 다시 시도하려면 원인을 고친 새 버전을 등록해야 한다고 안내한다 | FE | - | POL-033 [^5][^45] |
| REQ-FE-DEPLOY-009 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003-1 | **WHEN** Platform Admin이나 그 버전을 등록한 사람에게 배포 실패 알림이 오면 **THEN** 헤더 알림함 **SHALL** 배포 실패 알림을 표시한다 | FE | - | POL-034 [^58][^59] |
| REQ-FE-DEPLOY-010 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003-1 | **WHEN** 사용자가 헤더 알림함의 배포 실패 알림을 누르면 **THEN** pdx **SHALL** 해당 배포의 상세로 이동한다 | FE | - | POL-034 [^58][^59] |
| REQ-FE-DEPLOY-011 | 배포 관리 / 실행 | PDX-FO-DEPLOY-003-1 | **WHILE** 실패한 배포가 있는 동안 **THE** 배포 관리 화면 **SHALL** 상단 배너에 실패한 배포를 표시한다 | FE | - | POL-034 [^58][^59][^39] |
| REQ-BE-REG-001 | 설정 표준화 / 등록 | PDX-FO-REG-001: 표준 등록 정보로 앱을 등록해 설정 누락을 없애기 위해, application의 새 버전을 등록할 수 있다. | **WHEN** Application Manager가 패치 파일을 pdx에 제출하면 **THEN** 시스템 **SHALL** 앱 ID·버전을 포함한 새 버전 등록 정보를 저장하고 승인 대기 상태로 둔다 | BE | - | POL-008, POL-018 [^60][^30][^1] |
| REQ-BE-REG-002 | 설정 표준화 / 등록 | PDX-FO-REG-001 | **IF** 패치 파일의 등록 정보에 필수 항목이 빠졌거나 형식이 맞지 않으면 **THEN** 시스템 **SHALL** 등록을 받지 않고 어긋난 항목을 표시한다 | BE | - | POL-010 [^3] |
| REQ-BE-REG-003 | 설정 표준화 / 등록 | PDX-FO-REG-001 | **IF** 제출된 앱 ID·버전 조합이 이미 승인된 버전과 같으면 **THEN** 시스템 **SHALL** 등록을 거부한다 | BE | - | POL-009 [^61] |
| REQ-BE-REG-004 | 설정 표준화 / 등록 | PDX-FO-REG-001 | **THE** 시스템 **SHALL** 등록·검토·배포 절차를 앱 20개·공장 3곳의 모든 조합에 동일하게 적용한다 | BE | - | [^7][^43] |
| REQ-BE-REG-006 | 설정 표준화 / 등록 | PDX-FO-REG-001 | **IF** 새 버전이 승인된 최신 버전보다 높지 않거나, 업그레이드 가능한 이전 버전이 승인된 버전이 아니거나 새 버전보다 낮지 않으면 **THEN** 시스템 **SHALL** 등록을 받지 않고 어긋난 버전 규칙을 표시한다 | BE | - | POL-010, POL-061, POL-062, POL-063 [^3][^62][^63][^64][^45] |
| REQ-FE-REG-001 | 설정 표준화 / 등록 | PDX-FO-REG-001 | **WHEN** Application Manager가 앱 버전 관리 화면에서 패치 파일을 업로드하면 **THEN** 앱 버전 관리 화면 **SHALL** 등록 결과(승인 대기로 등록됨 또는 거부 사유)를 표시한다 | FE | - | [^1][^6] |
| REQ-BE-REG-005 | 설정 표준화 / 등록 | PDX-FO-REG-001-1: 등록 단계의 설정 누락을 막기 위해, 패치 파일 안 등록 정보를 자동으로 읽는다. | **WHEN** 패치 파일이 pdx에 도착하면 **THEN** 시스템 **SHALL** 등록 정보(필요 데이터·필요 권한·호환 버전·업그레이드 가능한 이전 버전 등)를 자동으로 읽어 등록 정보에 채운다 | BE | - | POL-007, POL-008 [^65][^60] |
| REQ-FE-REG-002 | 설정 표준화 / 등록 | PDX-FO-REG-001-1 | **WHEN** 등록 정보 자동 읽기가 끝나면 **THEN** 앱 버전 관리 화면 **SHALL** 읽어온 등록 정보 항목을 그대로 보여준다(사람이 입력·수정하지 않는다) | FE | - | POL-007 [^65][^6] |
| REQ-BE-STAT-001 | 배포 현황 / 조회 | PDX-FO-STAT-001: 정상 동작 여부를 파악하기 위해, 자기 공장에 배포된 application의 상태를 확인할 수 있다. | **IF** Plant Operator가 자기 공장이 아닌 공장의 배포 현황을 조회하려 하면 **THEN** 시스템 **SHALL** 조회를 거부한다 | BE | - | POL-042 [^66] |
| REQ-FE-STAT-001 | 배포 현황 / 조회 | PDX-FO-STAT-001 | **WHEN** Plant Operator가 공장 화면을 열면 **THEN** 공장 화면 **SHALL** 자기 공장에 배포된 application의 상태를 표시한다 | FE | - | POL-042 [^66][^67] |
| REQ-BE-STAT-002 | 배포 현황 / 조회 | PDX-FO-STAT-002: 기록과 실제 운영 버전의 차이를 파악하기 위해, 공장별 배포 현황을 확인할 수 있다. | **THE** 시스템 **SHALL** 배포 상태를 승인된 버전×공장 조합마다 하나씩 저장한다 | BE | - | POL-030 [^54] |
| REQ-FE-STAT-002 | 배포 현황 / 조회 | PDX-FO-STAT-002 | **WHEN** Platform Admin이 배포 관리 화면을 열면 **THEN** 배포 관리 화면 **SHALL** 공장별 배포 현황을 버전×공장 조합 단위로 표시한다 | FE | - | POL-030 [^54][^6] |
| REQ-FE-STAT-004 | 배포 현황 / 조회 | PDX-FO-STAT-002 | **WHEN** Platform Admin이 승인된 버전의 상세를 열면 **THEN** 앱 버전 관리 화면 **SHALL** 그 버전의 공장별 배포 상태를 요약해 표시한다 | FE | - | POL-030 [^54][^6] |
| REQ-FE-STAT-005 | 배포 현황 / 조회 | PDX-FO-STAT-002 | **THE** pdx **SHALL** 등록 상태는 앱 버전 관리 화면에, 배포 상태는 배포 관리 화면에 나누어 표시한다 | FE | - | POL-018, POL-030 [^30][^54][^6] |
| REQ-BE-STAT-003 | 배포 현황 / 조회 | PDX-FO-STAT-003: 등록한 버전이 각 공장에서 어떻게 운영되는지 확인하기 위해, 자신이 등록한 application의 공장별 배포 현황을 pdx 화면에서 확인할 수 있다. | **IF** Application Manager가 등록 권한을 받지 않은 앱의 배포 현황을 조회하려 하면 **THEN** 시스템 **SHALL** 조회를 거부한다 | BE | - | POL-040 [^68] |
| REQ-FE-STAT-003 | 배포 현황 / 조회 | PDX-FO-STAT-003 | **WHEN** Application Manager가 앱 버전 관리 화면을 열면 **THEN** 앱 버전 관리 화면 **SHALL** 자신이 등록한 application의 공장별 배포 현황을 표시한다 | FE | - | POL-040 [^68][^6] |

## 데이터 모델 델타

`[AI 자동 생성 · 기획자는 관련성만 검수]`

| REQ ID | 엔티티 | 필드 | 타입 | 카디널리티 | 변경 | 근거 |
|---|---|---|---|---|---|---|
| REQ-BE-ACCT-005 | UsageRequest | requester_id/app_id/workspace_id/reason/status | 관계·string·enum(대기\|승인\|거절) | N:1(User), N:1(Application) | add | [^19] |
| REQ-BE-ACCT-008 | UsageRequest | reject_reason | string | 1:1 | add | [^23] |
| REQ-BE-APRV-004 | AppVersion | reject_reason | string | 1:1 | add | [^30] |
| REQ-BE-AUDIT-003 | ChangeLog | requester/approver/executor/processed_at/applied_at/target/before_value/after_value/result/reason/check_snapshot | POL-055 항목 | N:1(대상 엔티티) | add | [^40][^37] |
| REQ-BE-AUDIT-003 | Workspace | is_active | boolean | 1:1 | add | [^40][^37] |
| REQ-BE-DEPLOY-003 | Workspace | pdx_version/mxfm_version | string(major.minor.patch) | 1:1 | add | [^44][^45] |
| REQ-BE-DEPLOY-003 | InstalledApp | workspace_id/app_id/current_version | 관계·string | N:1(Workspace), N:1(Application) | add | [^44][^45] |
| REQ-BE-DEPLOY-021 | CheckLog | checked_at/app_version_id/workspace_id/result/missing_items | datetime·관계·enum(통과\|버전충돌\|설정부족)·json | N:1(AppVersion), N:1(Workspace) | add | [^50] |
| REQ-BE-DEPLOY-009 | DataAccessGrant | workspace_id/app_id/data_item/granted_by/granted_at | 관계·string·datetime | N:1(Workspace), N:1(Application) | add | [^52][^44][^45] |
| REQ-BE-DEPLOY-012 | Deployment | app_version_id/workspace_id/status | 관계·enum(설치중\|동작확인중\|완료\|실패) | N:1(AppVersion), N:1(Workspace) | add | [^53][^54][^55] |
| REQ-BE-DEPLOY-012 | Deployment | check_snapshot | json(검사 ①~⑤별 통과 여부·등록 정보 값·공장 현재 값) | 1:1 | add | [^53][^54][^55] |
| REQ-BE-REG-001 | AppVersion | status | enum(승인대기\|반려\|승인됨) | 1:1 | add | [^60][^30][^1] |
| REQ-BE-REG-001 | AppVersion | app_id/version/필요 데이터/필요 권한/호환 버전/업그레이드 가능한 이전 버전/릴리즈 노트 | POL-008 항목 | 1:1 | add | [^60][^30][^1] |

## Evidence gaps

`[AI 정리 · 기획자 결정]`

| 항목 | 구분 | 상태 | 추적 | 결정일 | 결정 내용 | 근거 |
|---|---|---|---|---|---|---|
| 성공 지표의 기준선 | 정보 부족 | 미해결 | 본인, MVP 적용 후 첫 측정 | - | - | [^69][^70][^71][^72][^10] |
| 고객사·외부 업체 앱, 중앙 등록·배포, 공장별 관리자 Role, 협력사 임시 권한, 인사 정보 연동, 현장 시험 라인 검증 | 결정 필요 | 결정됨 | - | 2026-09-27 | MVP 범위에서 제외하고 후속 범위로 둔다. Story를 만들지 않는다 | [^7][^73] |
| 앱 20개 × 공장 3곳 전부에 같은 절차 적용을 Story가 아닌 REQ 전역 조건으로 표현 | 결정 필요 | 결정됨 | - | 2026-09-27 | PDX-FO-DEPLOY-004는 Story에서 빼고, 4단계에서 모든 앱·공장 조합에 같은 절차를 적용하는 REQ로 쓴다 | [^43] |
| 고객사 IT 엔지니어가 등록하고 반려받았을 때 반려 사유를 원프레딕트에 전달하는 일 | 결정 필요 | 결정됨 | - | 2026-09-27 | 등록·재제출 주체는 Application Manager다. 반려 사유 전달은 pdx 밖의 일이므로 범위 밖이며, 시나리오 예시에는 현장의 원프레딕트 PM을 쓴다 | [^9] |
| 배포 현황 화면 구성: 버전×공장 한 줄로 이어 보이는 통합 흐름 vs '앱 버전 관리'·'배포 관리' 화면 분리 | 결정 필요 | 결정됨 | - | 2026-09-27 | '앱 버전 관리'와 '배포 관리' 두 화면으로 나눈다. 승인된 버전에 '배포하기'(버전이 선택된 채 배포 관리로 이동)와 버전 상세의 공장별 배포 상태 요약을 연결 장치로 둔다 | [^74][^30][^54][^6] |
| 공장(Workspace) 등록·수정·비활성화와 계정 생성의 Story·REQ | 결정 필요 | 결정됨 | - | 2026-09-27 | 이번 과제 범위 밖이다. 정책(POL-005·006·045)은 유지하되 Story·REQ는 만들지 않는다 | [^8] |
| 배포 실패 뒤 다시 시도하는 방식 | 결정 필요 | 결정됨 | - | 2026-09-27 | 실패한 공장은 이전 버전을 유지하고, 같은 버전은 다시 실행하지 않는다. 다시 시도하려면 원인을 고친 새 버전을 등록부터 한다. 같은 버전 재실행은 후속 개선 범위다 | [^45][^5] |
| 배포 전 점검 결과를 저장하지 않을 때 PRD 성공 지표(설정 누락 발견율·충돌 배포 전 차단율)의 측정 | 결정 필요 | 결정됨 | - | 2026-09-27 | 점검 결과는 배포 이력·변경 기록·알림에 넣지 않고, 지표 집계용 점검 로그로만 남긴다 | [^39][^50] |
| WG-06의 '실패·차단 배너'와 차단 알림 제외(POL-034)의 충돌 | 결정 필요 | 결정됨 | - | 2026-09-27 | 배너와 알림함은 배포 실패만 보여 준다. 차단은 배포 관리 화면의 점검 결과 영역에만 표시한다 | [^39][^58] |
| 공통 플랫폼 기능과 앱 팀 책임 경계의 Spec 반영 | 결정 필요 | 결정됨 | - | 2026-09-27 | 책임 경계는 PRD(원칙)와 정책(POL-011·014·028)에만 둔다. Spec에는 별도 절·REQ를 만들지 않는다 | [^75] |

## Sources

`[AI 자동 생성 · 확인용]`

[^1]: prd/Solution @ v0.3
[^2]: prd/Users @ v0.3
[^3]: policy/POL-010 @ v2.5
[^4]: policy/POL-024 @ v2.5
[^5]: policy/POL-033 @ v2.5
[^6]: interview/SQ8 @ 2026-09-27
[^7]: prd/Scope @ v0.3
[^8]: interview/SQ11 @ 2026-09-27
[^9]: interview/SQ4 @ 2026-09-27
[^10]: interview/SQ12 @ 2026-09-27
[^11]: interview/Q31 @ 2026-09-27
[^12]: prd/Problem @ v0.3
[^13]: interview/Q25 @ 2026-09-27
[^14]: interview/SQ6 @ 2026-09-27
[^15]: interview/SQ7 @ 2026-09-27
[^16]: policy/POL-037 @ v2.5
[^17]: policy/POL-046 @ v2.5
[^18]: policy/POL-047 @ v2.5
[^19]: policy/POL-049 @ v2.5
[^20]: policy/POL-050 @ v2.5
[^21]: policy/POL-051 @ v2.5
[^22]: policy/POL-068 @ v2.5
[^23]: policy/POL-052 @ v2.5
[^24]: policy/POL-053 @ v2.5
[^25]: file/Wireframe-인터뷰.md#WG-08 @ 2026-09-27
[^26]: policy/POL-012 @ v2.5
[^27]: policy/POL-013 @ v2.5
[^28]: policy/POL-064 @ v2.5
[^29]: file/Wireframe-인터뷰.md#WG-05 @ 2026-09-27
[^30]: policy/POL-018 @ v2.5
[^31]: policy/POL-019 @ v2.5
[^32]: policy/POL-015 @ v2.5
[^33]: policy/POL-016 @ v2.5
[^34]: policy/POL-017 @ v2.5
[^35]: policy/POL-056 @ v2.5
[^36]: policy/POL-058 @ v2.5
[^37]: policy/POL-055 @ v2.5
[^38]: file/Wireframe-인터뷰.md#구조검토-변경기록조회 @ 2026-09-27
[^39]: interview/SQ19 @ 2026-09-27
[^40]: policy/POL-054 @ v2.5
[^41]: policy/POL-057 @ v2.5
[^42]: policy/POL-059 @ v2.5
[^43]: interview/SQ5 @ 2026-09-27
[^44]: policy/POL-021 @ v2.5
[^45]: interview/SQ18 @ 2026-09-27
[^46]: policy/POL-022 @ v2.5
[^47]: policy/POL-023 @ v2.5
[^48]: policy/POL-065 @ v2.5
[^49]: file/Wireframe-인터뷰.md#WG-10 @ 2026-09-27
[^50]: policy/POL-066 @ v2.5
[^51]: policy/POL-026 @ v2.5
[^52]: policy/POL-025 @ v2.5
[^53]: policy/POL-027 @ v2.5
[^54]: policy/POL-030 @ v2.5
[^55]: policy/POL-067 @ v2.5
[^56]: policy/POL-029 @ v2.5
[^57]: policy/POL-032 @ v2.5
[^58]: policy/POL-034 @ v2.5
[^59]: file/Wireframe-인터뷰.md#WG-06 @ 2026-09-27
[^60]: policy/POL-008 @ v2.5
[^61]: policy/POL-009 @ v2.5
[^62]: policy/POL-061 @ v2.5
[^63]: policy/POL-062 @ v2.5
[^64]: policy/POL-063 @ v2.5
[^65]: policy/POL-007 @ v2.5
[^66]: policy/POL-042 @ v2.5
[^67]: file/Wireframe-인터뷰.md#WG-07 @ 2026-09-27
[^68]: policy/POL-040 @ v2.5
[^69]: interview/Q20 @ 2026-09-27
[^70]: interview/Q22 @ 2026-09-27
[^71]: prd/EvidenceGaps @ v0.3
[^72]: interview/SQ9 @ 2026-09-27
[^73]: interview/SQ10 @ 2026-09-27
[^74]: interview/PQ11 @ 2026-09-27
[^75]: interview/SQ17 @ 2026-09-27

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 변경 사유 |
|---|---|---|---|
| v0.1 | 2026-09-27 | 최초 작성 | - |
| v0.2 | 2026-10-01 | REQ-BE-ACCT-001에서 역할을 앱별로 추가하던 문구를 접근 권한만 앱별로 추가하도록 수정, 인용 정책 버전 v2.5로 갱신 | 정책 v2.5 개정(한 계정은 역할 하나) |
