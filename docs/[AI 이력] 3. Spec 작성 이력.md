# Spec 작성 이력

> 세션 'AI Factory OS_SPEC 작성'의 대화다. 🙋 사용자 메시지와 💬 Claude 답변을 순서대로 담았고, 선택형 질문(❓)과 답(🙋)도 함께 넣었다. 도구 실행과 서브에이전트 보고는 접힌 상자(▶)에 있다. 시각은 UTC다.

---

## 🙋 사용자 · 2026-09-27 03:51

> C:\Users\pca02\Works\projects\codex-onepredict/[PRD] pdx 앱 온보딩·배포.md
> 를 기반으로 
> /general-spec-writer  를 적용하여 유저스토리와 상사 기능 명세서(요구사항)을 작성해줘

<details><summary>🔧 작업 1건</summary>

- 🧩 스킬 실행: general-spec-writer

</details>

## 💬 Claude · 2026-09-27 03:51

스킬 절차에 따라 0단계(입력 확인)부터 진행하겠습니다.

<details><summary>🔧 작업 3건</summary>

- Bash: List project files and skill structure
- Bash: Run PRD hints and read the PRD
- Read: C:\Users\pca02\.claude\projects\C--Users-pca02-Works-projects-codex-onepredict\fe8ae245-2ca2-4f6c-81b0-dc2655af4558\tool

</details>

PRD 검사를 통과했습니다(status가 draft라서 경고만 있습니다). 1단계 질문을 준비하기 위해 ID 규칙을 확인하겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Check ID and module conventions in skill references

</details>

1단계 최소 인터뷰입니다. 세 가지를 확인하겠습니다.

**❓ Claude 질문**

- SQ1. Story·REQ ID 앞에 붙일 PRODUCT 코드를 무엇으로 할까요? (ID 형식: {PRODUCT}-{FO|BO}-{MODULE}-{SEQ})
  - *PDX (Recommended)*: 제품명 pdx를 그대로 쓴다. 예: PDX-BO-DEPLOY-001
  - *PAAM*: 스크립트 추천값(pdx AI Application Management 약어). 예: PAAM-BO-DEPLOY-001
  - *PAOD*: pdx App Onboarding·Deploy 약어
- SQ2. 모듈 약어를 이렇게 나누려 합니다. REG(앱·버전 등록), APRV(검토·승인), DEPLOY(대상 공장 선택·자동 비교·배포), STAT(공장별 배포 현황), ACCT(계정·역할·권한 부여/제한·사용 요청), AUDIT(승인·변경 기록). 이 구성으로 갈까요?
  - *제안대로 (Recommended)*: REG / APRV / DEPLOY / STAT / ACCT / AUDIT 6개 모듈
  - *점검 모듈 분리*: 자동 비교·배포 차단을 CHECK 모듈로 따로 떼고 DEPLOY는 실행만 담당(7개 모듈)
  - *사용 요청 모듈 분리*: Plant Operator의 권한 요청을 ACCESS 모듈로 떼고 ACCT는 계정·역할 관리만 담당(7개 모듈)
- SQ3. FO/BO 구분 기준을 어떻게 둘까요? 모든 기능에 pdx 화면이 있다고 가정합니다.
  - *Operator만 FO (Recommended)*: Plant Operator의 상태 확인·사용 요청은 FO, Platform Admin·Application PM의 등록·승인·배포·권한 관리는 BO
  - *전부 BO*: pdx 자체가 운영 콘솔이므로 세 역할 모두 BO로 본다
  - *PM·Operator는 FO*: 고객사 운영 권한을 가진 Platform Admin만 BO, Application PM 등록과 Operator 활동은 FO

**🙋 사용자 답변**

- SQ1. Story·REQ ID 앞에 붙일 PRODUCT 코드를 무엇으로 할까요? (ID 형식: {PRODUCT}-{FO|BO}-{MODULE}-{SEQ})  
  → **PDX (Recommended)**
- SQ2. 모듈 약어를 이렇게 나누려 합니다. REG(앱·버전 등록), APRV(검토·승인), DEPLOY(대상 공장 선택·자동 비교·배포), STAT(공장별 배포 현황), ACCT  
  → **제안대로 (Recommended)**
- SQ3. FO/BO 구분 기준을 어떻게 둘까요? 모든 기능에 pdx 화면이 있다고 가정합니다.  
  → **Platform Admin 도 고객사 > Platform Admin/Operator는 고객사 ApplicationPM은 개발솔루션 사.**

<details><summary>🔧 작업 2건</summary>

- Bash: Check PRD interview file header format
- Bash: Create Spec interview file, SQ answers, and meta

</details>

2단계로 넘어가 spec-author(모드 A)에 Stories 초안을 맡기겠습니다.

<details><summary>🔧 작업 1건</summary>

- 🤖 서브에이전트 호출: Spec author mode A stories

</details>

<details><summary>🤖 서브에이전트 보고</summary>

spec.json 작성 완료: C:/Users/pca02/Works/projects/codex-onepredict/.spec-work/spec.json

Story 수: 21개
- REG 2 (등록 1 + 시스템 자동 후속 1)
- APRV 4 (승인 1 + 확정 자동 후속 1 + 반려 예외 1 + 재제출 1)
- DEPLOY 7 (공장 선택 1 + 자동 비교 1 + 버전 충돌 차단 예외 1 + 부족 항목 채움 1 + 배포 실행 1 + 정상 동작 확인 자동 후속 1 + 전체 적용 1)
- STAT 3 (Plant Operator 1 + Platform Admin 1 + Application PM 1)
- ACCT 4 (권한 부여 1 + 권한 제한 1 + 사용 요청 1 + 요청 승인·부여 1)
- AUDIT 1 (기록 조회 1)

policy_needs: 19건, 전부 status "pending". PRD가 "Spec에서 정한다"로 넘긴 항목(반려 후 재제출 방식, 충돌 공장 해결 경로, 배포 상태 단계·완료 인정 기준, 권한 부여·제한 상세 범위, 핵심 객체 연결 구조, 등록 정보 필수 항목·형식, 감사 기록 항목·조회 권한 등)을 값 이름으로만 담고 값은 지어내지 않았습니다.

gaps: 2건
1. 성공 지표의 기준선 — 정보 부족/미해결, story_id 없음, interview/Q20·Q22 근거 (PRD 부록 결정 기록과 동일 유지)
2. Scope Out 6개 항목(고객사·외부 앱, 중앙 등록·배포, 공장별 관리자 Role, 협력사 임시 권한, 인사 정보 연동, 현장 시험 라인 검증) — 결정됨(제외), story_id 없음

PRD의 예외 시나리오 2개(예외② 승인 반려→재제출, 예외④ 공장 B 버전 충돌 차단)는 각각 PDX-FO-APRV-002/PDX-BO-APRV-002-1, PDX-FO-DEPLOY-001-2로 하위 Story에 포함했습니다. mode A 규칙에 따라 reqs·policy_refs는 빈 배열, policy·brief는 null로 두었습니다(모드 B에서 채움).

참고: 입력에 spec_interview_md 경로가 주어졌으나 mode A(stories) 절차에는 쓰이지 않아 사용하지 않았습니다. 자가 점검(규칙 §10) 체크리스트 전 항목 통과 확인했습니다.

</details>

2.5단계로 Stories 미리보기를 렌더링하겠습니다.

<details><summary>🔧 작업 3건</summary>

- Bash: Render stories preview table
- Bash: Inspect expected source schema and spec.json
- Bash: Find expected source object schema

</details>

출처가 문자열로 들어가 있어 스크립트가 요구하는 객체 형식(`{store, key, ref}`)으로 변환하겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Convert sources to objects and render preview

</details>

User Story 열이 비어 있습니다. 렌더러가 기대하는 필드 이름을 확인하겠습니다.

<details><summary>🔧 작업 2건</summary>

- Bash: Inspect story render fields
- Bash: Check story sentence format rule

</details>

Story 문장은 `why + what`을 합쳐 `story` 필드로 두고, 인터뷰 출처의 날짜도 채우겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Add story sentence field and re-render

</details>

**❓ Claude 질문**

- PDX-BO-STAT-001(Application PM이 자기 앱의 공장별 배포 현황을 확인)은 PRD의 '원프레딕트는 고객사 배포 현황을 원격으로 보지 않는다' 전제와 충돌합니다. 어떻게 할까요?
  - *제외 (Recommended)*: PRD 전제(Q16 유지 결정)를 따른다. Story를 excluded로 두고 gaps에 '결정됨(제외)'로 기록한다
  - *고객사 IT 엔지니어로 바꿈*: 주체를 '앱 등록 Role을 가진 고객사 IT 엔지니어'로 바꾸고 FO로 옮긴다
  - *유지*: 현장 반입 뒤 pdx 화면 안에서 보는 것은 원격 조회가 아니라고 보고 그대로 둔다
- PDX-FO-DEPLOY-004(앱 20개 × 공장 3곳에 같은 절차 적용)를 어떻게 둘까요?
  - *REQ 전역 조건으로 (Recommended)*: Story에서는 빼고(excluded), 4단계에서 모든 앱·공장 조합에 같은 절차를 적용한다는 REQ로 표현한다
  - *Story로 유지*: 시스템 주체 Story로 그대로 둔다
- 행동이 두 개인 Story 4개(ACCT-004, APRV-001, APRV-001-1, DEPLOY-002)를 어떻게 할까요?
  - *주 행동만 남김 (Recommended)*: 앞 행동은 전제로 흡수한다. 예: '요청된 사용 권한을 부여할 수 있다', '등록된 버전을 승인할 수 있다', '승인 시점·승인자를 기록한다', '부족 항목을 채울 수 있다'
  - *Story를 둘로 쪼갬*: 규칙대로 행동마다 Story를 하나씩 만든다(Story 4개 증가)
  - *그대로 둠*: PRD 문장 표현을 유지한다
- 그 밖에 Story 문장·주체·Category에서 고치거나 뺄 것이 있나요?
  - *없음, 진행 (Recommended)*: 위 결정만 반영하고 3단계(정책)로 넘어간다
  - *수정 사항 있음*: Other에 직접 적어 주세요

**🙋 사용자 답변**

- PDX-BO-STAT-001(Application PM이 자기 앱의 공장별 배포 현황을 확인)은 PRD의 '원프레딕트는 고객사 배포 현황을 원격으로 보지 않는다' 전제와 충돌합니다  
  → **현장 반입 뒤 pdx 화면 안에서 보는 건 원격이 아니라고 본다 + 온프레미스 기반이니 고객사 서버에 계정이 존재할 것이다. + Application PM을 전제로 하고 있기는 하지만, 그 Application 등록 하는 것은 Role로 둔다
시나리오의 ① 등록 행위자 →**
- PDX-FO-DEPLOY-004(앱 20개 × 공장 3곳에 같은 절차 적용)를 어떻게 둘까요?  
  → **REQ 전역 조건으로 (Recommended)**
- 행동이 두 개인 Story 4개(ACCT-004, APRV-001, APRV-001-1, DEPLOY-002)를 어떻게 할까요?  
  → **주 행동이 아니라 다른 행동도 있어?**
- 그 밖에 Story 문장·주체·Category에서 고치거나 뺄 것이 있나요?  
  → **일단 이전 질문 답변 보고 확인**

**❓ Claude 질문**

- 위 표대로 행동 분리를 반영할까요? (ACCT-004·APRV-001·DEPLOY-002는 주 행동만 남기고, 사용 요청 거절 Story와 AUDIT 시스템 기록 Story를 추가)
  - *표대로 반영 (Recommended)*: Story 2개(PDX-FO-ACCT-004-1 요청 거절, PDX-FO-AUDIT-002 시스템 자동 기록)가 추가된다
  - *거절 Story는 빼고 반영*: PRD가 요청 거절을 말하지 않았으므로 거절은 gap으로만 남긴다
- 등록·재제출 주체를 '앱 등록 Role 보유자'로 바꾸면, 이 Story들의 FO/BO는 어떻게 둘까요? (보유자는 현장의 원프레딕트 PM일 수도, 고객사 IT 엔지니어일 수도 있습니다)
  - *BO 유지 (Recommended)*: 등록 내용의 책임이 원프레딕트(솔루션 개발사)에 있으므로 BO로 둔다. 예: PDX-BO-REG-001
  - *FO로 변경*: 고객사 pdx 안에서 일어나는 행동이므로 FO로 둔다. 예: PDX-FO-REG-001

**🙋 사용자 답변**

- 위 표대로 행동 분리를 반영할까요? (ACCT-004·APRV-001·DEPLOY-002는 주 행동만 남기고, 사용 요청 거절 Story와 AUDIT 시스템 기록 Story를 추가  
  → **위 표가 어디있어??**
- 등록·재제출 주체를 '앱 등록 Role 보유자'로 바꾸면, 이 Story들의 FO/BO는 어떻게 둘까요? (보유자는 현장의 원프레딕트 PM일 수도, 고객사 IT 엔지니어일 수도 있  
  → **FO로 변경**

질문 창에서는 앞서 쓴 표가 보이지 않았던 것 같습니다. 표 내용을 질문 안에 직접 넣어 다시 여쭙겠습니다.

**❓ Claude 질문**

- 행동이 두 개인 Story를 이렇게 고칠까요?  
    
  1) ACCT-004 '요청된 권한을 승인하고 부여' → pdx에서는 요청을 받아들이는 순간 권한이 부여되니 사실상 한 행동입니다. '부여할 수 있다'로 줄이고, 빠져 있던 짝인 '요청 거절' Story(ACCT-004-1)를 추가합니다.  
  2) APRV-001 '검토하고 승인' → 검토는 등록 정보를 열람하는 것이라 승인의 전제입니다. '승인할 수 있다'로 줄입니다.  
  3) APRV-001-1 '확정하고 승인자를 기록' → 기록은 요청·승인·실행·반영 전체에 걸친 공통 행동입니다. '확정한다'로 줄이고, 기록은 AUDIT 모듈의 시스템 Story(AUDIT-002) 하나로 모읍니다.  
  4) DEPLOY-002 '부족 항목을 확인하고 채움' → 확인은 이미 DEPLOY-001-1(시스템이 비교 결과를 보여 줌)이 담당합니다. '채울 수 있다'로 줄입니다.
  - *1~4 모두 반영 (Recommended)*: Story 2개(ACCT-004-1 요청 거절, AUDIT-002 시스템 자동 기록)가 추가된다
  - *거절 Story만 빼고 반영*: PRD가 요청 거절을 말하지 않았으므로 거절은 gap으로만 남기고, 나머지 2~4는 반영한다
  - *그대로 둠*: PRD 문장 표현을 유지한다

**🙋 사용자 답변**

- 행동이 두 개인 Story를 이렇게 고칠까요?  
  → **2) 에서 승인할 수 있다 > 짝꿍으로 반려할수 있다 스토리도 있어?
나머지는 동의**

<details><summary>🔧 작업 1건</summary>

- Bash: Apply user decisions to spec.json stories

</details>

gaps 필드 이름이 기존 행과 다르게 들어갔습니다. 기존 형식에 맞추겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Normalize gap fields and re-render stories

</details>

Stories 22개(제외 1개)로 정리했습니다. 인터뷰 기록에 결정 사항을 남기고 3단계(정책)로 넘어가겠습니다.

<details><summary>🔧 작업 2건</summary>

- Bash: Log interview answers and export policy needs
- 🧩 스킬 실행: general-policy-writer

</details>

정책 스킬 0~1단계(준비·대조)를 진행하겠습니다. Policy 파일이 없으므로 신규로 만듭니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Prepare policy work dir and resolve needs

</details>

2단계로 policy-author(모드 A)에게 판정과 질문 생성을 맡기겠습니다.

<details><summary>🔧 작업 1건</summary>

- 🤖 서브에이전트 호출: Policy author mode A plan

</details>

<details><summary>🤖 서브에이전트 보고</summary>

plan.json 작성 완료: C:/Users/pca02/Works/projects/codex-onepredict/.policy-work/plan.json

요약:
- 판정: 21개 need 전부 `없음` (POLICY.md가 없어 대조할 기존 항목 자체가 없음). `not_policy`는 0건 — 21개 모두 사람이 정하는 값·여러 Story/기능에 적용·구현 무관이라는 정책 3조건을 통과.
- 필수/권장: 21개 need 모두 이번 Spec의 Story REQ가 직접 요구하는 값이라 전부 `필수`로 분류. `recommended`(권장, 8항목 점검표상 비어 있지만 이번 REQ엔 안 걸리는 것)는 3건 — 변경 기록 보관 기간, 등록 검토 대기 상한, 사용 요청 처리 기한(SLA).
- questions: 21개(QP1~QP21), 필수 need와 1:1. 이 중 `주제A_결정Task리스트.md`(P-5·U-1·VC-1)나 PRD/Spec 인터뷰(Q9·Q14·Q31·SQ4)와 Spec Story 본문(주체가 이미 명시된 경우)에 이미 결정된 값이 있는 문항(QP3, QP5, QP8, QP10, QP13, QP14, QP15, QP18, QP19, QP21)은 새로 묻지 않고 그 결정을 출처와 함께 첫 번째 선택지에 "(추천)"으로 제시했다. 근거가 전혀 없는 need(QP12 정상 동작 확인 기준, QP16 사용 요청 입력 항목)는 추천 없이 "직접 입력/지금 결정 못 함" 2개 선택지만 남겼다. 그 외 근거 약한 need(반려 사유 필수 여부, 재제출 방식, 버전 충돌 해결 경로, 배포 상태 단계, 거절 처리)는 자료에 있는 후보값을 선택지로만 제시하고 "(추천)" 태그는 붙이지 않았다.
- regulation_check: 전 문항 null — 이번 need 중 개인정보 보관·광고 통지·환불 기한처럼 법령이 걸릴 수 있는 값은 없다고 판단.
- chapters: 5개 장(조직 구조/등록/배포/계정 및 권한/기록 및 감사) 아래 13개 절을 신설 제안. 기존 POLICY.md가 없어 전부 `new: true`.

값·조건·주체는 입력 자료(PRD·인터뷰·결정 Task 리스트·Spec Story)에 있는 것만 사용했고 지어낸 값은 없다.

</details>

<details><summary>🔧 작업 2건</summary>

- Bash: Read plan questions and options
- Bash: Inspect question object keys

</details>

**❓ Claude 질문**

- 아래 12개 정책은 PRD·인터뷰·결정 기록에 이미 근거가 있습니다. 이대로 확정할까요?  
    
  PQ1 등록 정보 필수 항목 = 필요 데이터·필요 권한·호환 버전·업그레이드 가능 이전 버전 (용어집, S-3)  
  PQ2 핵심 객체 연결 = 조직은 여러 공장(Workspace)을 가지고, 앱은 여러 버전을 가지며, 배포는 한 버전을 한 공장에 설치한 관계 (용어집에서 유추)  
  PQ3 등록 승인 권한 = Platform Admin만 (P-5·U-1)  
  PQ5 반려 사유 열람 = 등록한 사람(앱 등록 Role 보유자) (SQ4)  
  PQ8 호환 판정 = 앱 팀이 등록 정보에 선언하고 pdx가 공장 실행 조건과 비교 (VC-1, Q14)  
  PQ10 부족 항목 채움 권한 = Platform Admin만  
  PQ13 Operator 현황 조회 범위 = 자기 공장만 (U-1)  
  PQ14 권한 부여 단위 = 앱별 역할로 필요한 만큼 (Q31)  
  PQ15 권한 제한 범위 = 평소에는 앱별, 퇴사처럼 전체 차단이 필요하면 계정 비활성화 (Q31)  
  PQ18·PQ21 변경·자동 기록 항목 = 요청자·승인자·실행자·반영 시점 (Q9)  
  PQ19 변경 기록 조회 권한 = Platform Admin
  - *모두 확정 (Recommended)*: 12개를 제시된 값으로 정책 대장에 올린다
  - *일부 수정*: Other에 'PQ번호: 수정 내용' 형식으로 적어 주세요. 나머지는 확정한다
- PQ4. 등록을 반려할 때 사유 입력을 필수로 할까요? (사유가 없으면 등록자가 무엇을 보완할지 알 수 없습니다)
  - *필수 (Recommended)*: 반려하려면 사유를 반드시 입력해야 한다
  - *선택*: 사유 없이도 반려할 수 있다
  - *지금 결정 못 함*: 미해결로 남긴다
- PQ6. 반려된 등록을 재제출할 때 무엇을 보완해야 하나요?
  - *등록 정보 전체 재제출 (Recommended)*: 등록 정보는 패치 파일 안에 들어 있어 자동으로 읽히므로, 고친 패치 파일을 다시 올리는 방식이 자연스럽다. 항목 간 정합성도 다시 확인된다
  - *지적된 항목만 수정*: 반려 사유에서 지적된 항목만 고쳐 다시 제출한다
  - *지금 결정 못 함*: 미해결로 남긴다
- PQ7. 데이터가 연결됐다고 판정하는 기준은 무엇인가요?
  - *선언 데이터 모두 연결 (Recommended)*: 앱이 등록 정보에 선언한 데이터 항목이 공장에서 모두 실제로 이어진 상태를 연결됨으로 본다(용어집의 '데이터 연결' 정의)
  - *데이터 접근 권한만 확인*: 실제 연결까지 보지 않고, 선언한 데이터에 대한 접근 권한이 있는지만 본다
  - *지금 결정 못 함*: 미해결로 남긴다

**🙋 사용자 답변**

- 아래 12개 정책은 PRD·인터뷰·결정 기록에 이미 근거가 있습니다. 이대로 확정할까요?  
  → **위 내용 모두 확정은 맞는데, 이거 나중에 우리가 어떤 정책 잡아야 되는지 정리해서 한번에 부족한부분 구조화해서 제안도 해주는거지?**
- PQ4. 등록을 반려할 때 사유 입력을 필수로 할까요? (사유가 없으면 등록자가 무엇을 보완할지 알 수 없습니다)  
  → **필수 (Recommended)**
- PQ6. 반려된 등록을 재제출할 때 무엇을 보완해야 하나요?  
  → **등록 정보 전체 재제출 (Recommended)**
- PQ7. 데이터가 연결됐다고 판정하는 기준은 무엇인가요?  
  → **선언 데이터 모두 연결 (Recommended)**

**❓ Claude 질문**

- (앞 질문에 대한 답) 네, 맞습니다. 끝나면 정책 대장의 '미해결' 표와 '다음에 걸릴 항목'(미룬 권장 항목)을 묶어, 앞으로 잡아야 할 정책을 영역별로 구조화해 제안하겠습니다.  
    
  PQ9. 버전 충돌로 배포가 막힌 공장(예: v1.0.3인 공장 B)은 어떻게 해결하나요? (VC-3의 후보, 미결정)
  - *선행 업데이트 안내 (Recommended)*: pdx가 '먼저 v1.1 이상으로 올리세요'처럼 필요한 선행 버전을 안내하고, 그 버전을 먼저 배포한 뒤 다시 배포한다. PRD 책임 경계의 'pdx는 선행 업데이트 안내를 제공한다'와 맞는다
  - *예외 승인 후 배포*: Platform Admin의 예외 승인을 받으면 그대로 배포한다. PRD의 '충돌 시 배포를 막는다' 결정과 부딪힐 수 있다
  - *지금 결정 못 함*: 미해결로 남긴다
- PQ11. 배포 상태를 어떤 단계로 나눌까요? ('실제 정상 동작 확인 = 완료' 원칙은 이미 결정됨)
  - *대기·설치 중·동작 확인 중·완료·실패 (Recommended)*: 설치 명령과 정상 동작 확인을 구분하려면 '동작 확인 중' 단계가 필요하다. 승인은 등록의 상태이므로 배포 상태에서는 뺀다
  - *요청됨·승인됨·설치 중·완료·실패*: 결정 기록 DS-1의 후보 목록 그대로
  - *지금 결정 못 함*: 미해결로 남긴다
- PQ12. '정상 동작을 확인했다'고 인정하는 기준은 무엇인가요? (PRD·결정 기록에 근거가 없습니다)
  - *헬스체크 + 데이터 수신*: 설치된 앱이 상태 점검(헬스체크)에 응답하고, 선언한 데이터를 실제로 받기 시작한 것을 확인하면 완료로 본다
  - *헬스체크만*: 앱이 상태 점검에 정상 응답하면 완료로 본다
  - *지금 결정 못 함*: 미해결로 남기고 담당·시점을 적는다(기술 검토 필요)
- PQ16. Plant Operator가 사용 권한을 요청할 때 무엇을 입력해야 하나요? (근거 없음)
  - *대상 앱 + 요청 사유 (Recommended)*: 어떤 앱의 사용 권한을 원하는지와 이유만 받는다. 공장은 요청자의 소속 공장으로 자동 지정된다
  - *대상 앱만*: 사유 없이 대상 앱만 선택한다
  - *지금 결정 못 함*: 미해결로 남긴다

**🙋 사용자 답변**

- (앞 질문에 대한 답) 네, 맞습니다. 끝나면 정책 대장의 '미해결' 표와 '다음에 걸릴 항목'(미룬 권장 항목)을 묶어, 앞으로 잡아야 할 정책을 영역별로 구조화해 제안하겠습니다  
  → **선행 업데이트 안내 (Recommended)**
- PQ11. 배포 상태를 어떤 단계로 나눌까요? ('실제 정상 동작 확인 = 완료' 원칙은 이미 결정됨)  
  → **대기 = 승인 대기 인거지?**
- PQ12. '정상 동작을 확인했다'고 인정하는 기준은 무엇인가요? (PRD·결정 기록에 근거가 없습니다)  
  → **헬스체크 + 데이터 수신**
- PQ16. Plant Operator가 사용 권한을 요청할 때 무엇을 입력해야 하나요? (근거 없음)  
  → **대상 앱 + 요청 사유 (Recommended)**

**❓ Claude 질문**

- PQ11 다시 여쭘니다. 제안한 '대기'는 승인 대기가 아니라 '배포 대기'입니다. 즉 승인된 버전에 대상 공장까지 정했지만 아직 배포를 실행하지 않은 상태입니다. 승인 대기·반려·승인됨은 '등록'의 상태로 따로 둡니다. 어떻게 할까요?
  - *등록·배포 상태 분리 (Recommended)*: 등록 상태 = 승인 대기·반려·승인됨 / 배포 상태 = 배포 대기·차단됨(충돌·미연결)·설치 중·동작 확인 중·완료·실패
  - *배포 상태만 정함*: 배포 대기·설치 중·동작 확인 중·완료·실패. 등록 상태는 정책으로 정하지 않는다
  - *지금 결정 못 함*: 미해결로 남긴다
- PQ17. Plant Operator의 사용 요청이 받아들여지면 어떤 절차로 이어지나요?
  - *Admin이 바로 부여 (Recommended)*: Platform Admin이 요청을 받아들이면 곧바로 해당 앱의 사용 권한이 부여되고, 별도 승인 단계는 없다
  - *지금 결정 못 함*: 미해결로 남긴다
- PQ20. 사용 요청을 거절할 때 사유 입력과 요청자 통지는 어떻게 할까요?
  - *사유 필수 + pdx에서 확인 (Recommended)*: 거절 사유는 반드시 입력하고, 요청자는 pdx의 자기 요청 목록에서 결과·사유를 확인한다(폐쇄망이라 외부 알림은 두지 않음)
  - *사유 선택 + pdx에서 확인*: 사유 없이도 거절할 수 있다
  - *지금 결정 못 함*: 미해결로 남긴다
- 다음 3개는 지금 REQ에는 안 걸리지만 보통 같이 정하는 권장 항목입니다: ① 변경 기록 보관 기간 ② 동시 검토 대기 등록 건수 상한 ③ 사용 요청 처리 기한. 지금 정할까요, 미룰까요?
  - *모두 미룸 (Recommended)*: 부칙 '다음에 걸릴 항목'에 메모로 남기고, 마지막 구조화 제안에 포함한다
  - *지금 정함*: Other에 항목별 값을 적어 주세요

**🙋 사용자 답변**

- PQ11 다시 여쭘니다. 제안한 '대기'는 승인 대기가 아니라 '배포 대기'입니다. 즉 승인된 버전에 대상 공장까지 정했지만 아직 배포를 실행하지 않은 상태입니다. 승인 대기·반려  
  → **등록 상태와 배포 상태의 정의를 잡아야할 것 같은데**
- PQ17. Plant Operator의 사용 요청이 받아들여지면 어떤 절차로 이어지나요?  
  → **Admin이 요청이 받아들이다 = 승인한다 지?**
- PQ20. 사용 요청을 거절할 때 사유 입력과 요청자 통지는 어떻게 할까요?  
  → **사유 필수 + pdx에서 확인 (Recommended)**
- 다음 3개는 지금 REQ에는 안 걸리지만 보통 같이 정하는 권장 항목입니다: ① 변경 기록 보관 기간 ② 동시 검토 대기 등록 건수 상한 ③ 사용 요청 처리 기한. 지금 정할까요,  
  → **1) 기록 보관 기간은 보통 Audit log 보관 기간이 법으로 정해져 있지 않나?
2) 동시 검토 대기 등록 건수 상한은 일단 없어. 필요시 추후 결정
3) 사용 요청 처리 기한 상한도 일단 없어. 필요시 추후 결정**

**❓ Claude 질문**

- PQ11. 등록 상태와 배포 상태를 이렇게 정의할까요?  
    
  [등록 상태: 버전 1개에 하나]  
  - 승인 대기: 앱 등록 Role 보유자가 제출했고 Platform Admin의 결정을 기다리는 상태  
  - 반려: Admin이 사유와 함께 돌려보낸 상태(재제출하면 다시 승인 대기)  
  - 승인됨: 등록이 확정돼 배포 대상으로 고를 수 있는 상태  
    
  [배포 상태: 승인된 버전 × 공장 1곳마다 하나]  
  - 배포 대기: 대상 공장을 정했고 자동 비교를 통과했지만 아직 실행하지 않은 상태  
  - 차단됨: 버전 충돌이나 데이터 미연결로 pdx가 배포를 막은 상태  
  - 설치 중: 배포를 실행해 설치가 진행되는 상태  
  - 동작 확인 중: 설치는 끝났고 헬스체크·데이터 수신을 확인하는 상태  
  - 완료: 정상 동작이 확인된 상태  
  - 실패: 설치 또는 동작 확인이 실패한 상태
  - *이 정의로 확정 (Recommended)*: 등록 3단계, 배포 6단계를 정책으로 올린다
  - *수정해서 확정*: Other에 고칠 내용을 적어 주세요
  - *지금 결정 못 함*: 미해결로 남긴다
- PQ17. 네, 맞습니다. '받아들인다 = 승인한다'입니다. 그러면 'Platform Admin이 사용 요청을 승인하면 그 즉시 해당 앱의 사용 권한이 부여되고, 별도 단계는 없다'로 확정할까요?
  - *확정 (Recommended)*: 승인 = 즉시 부여
  - *지금 결정 못 함*: 미해결로 남긴다
- 변경 기록(감사 로그) 보관 기간: 모든 시스템에 일괄 적용되는 법정 기간은 없고, 업종·기록 내용에 따라 다릅니다. 참고로 개인정보 처리시스템의 접속기록은 '개인정보의 안전성 확보조치 기준'에 따라 최소 1년(대규모·민감정보는 2년) 보관합니다. 또 결정 기록 P-2에 따르면 고객사 내부 운영 정책은 Platform Admin이 관리합니다. 어떻게 둘까요? (정확한 법적 의무는 고객사 법무 확인이 필요합니다)
  - *최소 1년 + 고객사 연장 (Recommended)*: pdx 기본값은 최소 1년 보관이고, 고객사 업종 규정에 따라 Platform Admin이 늘릴 수 있다(줄일 수는 없음)
  - *고객사 설정에 맡김*: pdx는 보관 기간을 정하지 않고 고객사 내부 정책을 따른다
  - *미룸*: 다음에 걸릴 항목에 메모로 남기고, 마지막 구조화 제안에 포함한다

**🙋 사용자 답변**

- PQ11. 등록 상태와 배포 상태를 이렇게 정의할까요?  
  → **등록 부터 배포가 사실 하나의 프로세스 일 것 같은데, 나누어 관리하는것이 좋다고 판단한 이유가 있을까? 내가 이렇게 질문한다고 해서 무작정 받아들이지 말고 합리적인지 따져서 비판적으로 리뷰해줘**
- PQ17. 네, 맞습니다. '받아들인다 = 승인한다'입니다. 그러면 'Platform Admin이 사용 요청을 승인하면 그 즉시 해당 앱의 사용 권한이 부여되고, 별도 단계는 없다  
  → **확정 (Recommended)**
- 변경 기록(감사 로그) 보관 기간: 모든 시스템에 일괄 적용되는 법정 기간은 없고, 업종·기록 내용에 따라 다릅니다. 참고로 개인정보 처리시스템의 접속기록은 '개인정보의 안전성 확  
  → **최소 1년 + 고객사 연장 (Recommended)**

**❓ Claude 질문**

- 비판적으로 따져 보았습니다.  
    
  [나눠야 하는 이유: 개수가 다릅니다]  
  등록·승인은 버전마다 한 번이고, 배포는 공장마다 따로 일어납니다(1:N). PRD의 예외 시나리오가 그 예입니다. v2.0.1은 한 번 승인됐지만 공장 A는 완료, 공장 B는 차단됩니다. 그리고 B는 선행 업데이트 뒤 며칠 뒤에 배포될 수 있습니다. 상태를 하나로 두면 이 버전의 상태를 '완료'라고도 '차단'이라고도 할 수 없고, 성공 지표인 '기록–실제 버전 일치율'도 공장 단위 상태가 있어야 계산됩니다.  
    
  [사용자 지적이 맞는 부분]  
  사용자에게는 하나의 프로세스로 보여야 합니다. 따라서 화면에서는 '버전 × 공장' 한 줄에 승인 대기 → … → 완료를 이어 보여 주고, 내부 정의만 둘로 나누는 것이 맞습니다(화면 표현은 Spec REQ에서 정합니다).  
    
  [제 제안의 허점]  
  데이터 미연결은 Admin이 채우면 풀리지만, 버전 충돌은 선행 업데이트가 있어야 풀립니다. 둘 다 '차단됨'으로 묶으면 해결할 사람이 보이지 않습니다. 그래서 차단됨에 사유(버전 충돌 / 설정 부족)를 반드시 붙이는 것으로 보완하겠습니다.  
    
  어떻게 할까요?
  - *분리 + 차단 사유 보완 (Recommended)*: 등록 3단계, 배포 6단계(차단됨에 사유 필수)로 확정하고, 화면에서는 버전×공장 한 줄로 이어 보여 준다
  - *하나의 상태로 통합*: 버전×공장마다 승인 대기~완료를 하나의 상태로 관리한다. 단, 승인이 공장 수만큼 반복되는 문제가 생긴다
  - *지금 결정 못 함*: 미해결로 남긴다

**🙋 사용자 답변**

- 비판적으로 따져 보았습니다.  
  → **이해 했어 정책적으로는 등록/배포의 상태를 나누어 관리하되, 화면상에서는 하나의 프로세스 처럼 이어져 보일 방법 고민이 필요하겠네**

<details><summary>🔧 작업 2건</summary>

- Bash: Check answers.json disposition format
- Bash: Write policy answers.json and interview log

</details>

3단계로 policy-author(모드 B)에게 changes.json 작성을 맡기겠습니다.

<details><summary>🔧 작업 1건</summary>

- 🤖 서브에이전트 호출: Policy author mode B changes

</details>

---

## 🙋 사용자 (작업 중 보낸 메시지) · 2026-09-27 05:14

> 이해 했어 정책적으로는 등록/배포의 상태를 나누어 관리하되, 화면상에서는 하나의 프로세스 처럼 이어져 보일 방법 고민이 필요하겠네
>
> > 아니면 일단 정책적으로는 상태를 나누어 관리하되 / 화면에서는 메뉴 두개 나눠서 App버전 관리화면 - 배포 관리화면 나눠서 만들거나??

<details><summary>🤖 서브에이전트 보고</summary>

changes.json 작성 완료: C:/Users/pca02/Works/projects/codex-onepredict/.policy-work/changes.json

- 추가 항목 수: 24개 (모두 add op; QP1~QP10, QP13~QP20 각 1개, QP11은 등록 상태/배포 상태 목록/차단 사유 필수 3개로 분리, QP12 1개, QP18·QP19·QP21 각 1개, REC-1(감사 로그 보관기간) 1개)
- 장·절 구성 (4장 13절): 조직 구조(핵심 객체 연결) / 등록(등록 정보, 검토·승인, 재제출, 상태[신설]) / 배포(대상 선택, 예외 처리, 설정 확인, 실행, 현황) / 계정 및 권한(권한 부여, 권한 제한, 사용 요청) / 기록 및 감사(기록)
- deferred_notes(부칙 "다음에 걸릴 항목") 2건: 동시 검토 대기 등록 건수 상한(REC-2), 사용 요청 처리 기한 SLA(REC-3) — 둘 다 "김윤주, 필요 시"로 tracking

세부 처리 메모:
- QP11 답변에서 "화면에서 하나의 흐름으로 보인다"는 Spec 화면 요구이므로 정책 항목에서 제외했고, 등록 상태(3단계)와 배포 상태(6단계+차단 사유 필수)를 별도 항목 3개로 나눠 같은 need_ref(PDX-FO-DEPLOY-003 / "배포 상태 단계 구분")를 공유시켰다. 등록 상태 항목은 계획서의 "배포"/"실행" 대신 "등록"/"상태"(신설 절)에 배치했다 — 내용상 등록 객체의 상태이기 때문.
- preamble.관련 규정에 지시받은 두 규정(제품 전역 정책=원프레딕트 관리·고객사 내부 운영=Platform Admin 관리, 감사 로그 보관기간=고객사 업종 규정 확인 필요)을 표로 넣었다.
- 값·조건·주체는 answers.json 원문 그대로 옮겼고 지어낸 값은 없다. 각 op의 sources는 해당 interview/PQ<n>를 달았다.
- python으로 JSON 유효성만 확인했고(24 ops, 2 deferred), apply_changes.py는 실행하지 않았다(POLICY.md 생성은 이 에이전트의 범위 밖).

</details>

<details><summary>🔧 작업 1건</summary>

- Bash: Apply policy changes and run policy gates

</details>

## 💬 Claude · 2026-09-27 05:18

총칙 두 줄에 근거 각주가 빠졌습니다. changes.json의 preamble을 확인해 고치겠습니다.

<details><summary>🔧 작업 3건</summary>

- Bash: Inspect preamble format in changes.json
- Bash: Check policy footnotes and preamble
- Bash: Fix preamble citations, reapply, re-gate

</details>

정책 게이트를 통과했고, 미해결 항목은 0개입니다. 5단계 적대적 리뷰를 실행하겠습니다.

<details><summary>🔧 작업 1건</summary>

- 🤖 서브에이전트 호출: Policy adversarial review

</details>

<details><summary>🤖 서브에이전트 보고</summary>

review.json 작성 완료 (C:/Users/pca02/Works/projects/codex-onepredict/.policy-work/review.json).

verdict: fail (Hard 위반 3건)

errors (Hard):
1. A2 · POL-019 — "별도의 등록·승인 절차는 거치지 않는다"는 PQ17 해석 원문("별도 단계는 없다")에 없던 구체 표현('등록·승인 절차')을 지어 넣음.
2. B3 · POL-023 — 5-1-3 "시스템은 승인 처리를 기록할 때 요청자·승인자·실행자·반영 시점을 자동으로 남긴다"가 같은 절(기록 및 감사/기록)의 POL-021과 필드가 완전히 동일한 중복. 승인 처리는 변경 기록의 하위 사건이라 POL-021이 이미 포괄함.
3. B4 · POL-020 — 한 항목에 "거절 사유 입력 필수"와 "거절 통지 방식(외부 알림 없음)" 두 규칙이 섞여 있음. 같은 문서 POL-004/POL-005가 이미 이런 경우를 두 항목으로 나눈 선례가 있어 일관성 어긋남.

warnings (Warn):
1. C1 · POL-013 — "그 선행 버전을 먼저 배포한 뒤에 원래 배포를 다시 진행한다"의 주체(시스템 자동인지 Platform Admin 수동인지)가 불명확.
2. C5 · POL-024 — "정확한 법적 의무는 고객사 법무팀 확인이 필요하다"는 예외/미확정 문구가 확정 규칙 문장에 섞여 있고, 총칙 §관련 규정 표와 내용이 중복됨.

question_for_user가 채워진 항목: POL-019, POL-023, POL-020, POL-013 (4건). POL-024는 정보성 지적으로 question_for_user는 null.

stats: reviewed 24, needs_total 21, needs_unmapped 0.

참고: 총칙의 [^23]·[^24] 각주는 안내대로 이번 실행 항목(POL-001~024)이 아니므로 점검 범위에서 제외했습니다. A1(근거 없는 값 창작), A3(각주-PQ 불일치), A4(미해결-인터뷰 기록 불일치), A5(reuse 충돌), B1(정책 3조건 위반), B2(장·절 배치 오류), B5(중복 장·절), D1~D3은 이번 24개 항목에서 위반을 찾지 못했습니다.

오케스트레이터 후속 규칙(fail): errors를 작성자 모드 C로 넘겨 changes.json 수정 → 백업본에 재적용 → gates → 재리뷰(최대 2회).

</details>

리뷰에서 Hard 위반 3건과 경고 2건이 나왔습니다. 모두 문장 수준의 수정이라 changes.json을 직접 고치겠습니다. 해당 항목의 원문부터 확인합니다.

<details><summary>🔧 작업 2건</summary>

- Bash: Show flagged policy items
- Bash: Apply review fixes, reapply policy, re-gate

</details>

리뷰 지적 5건을 모두 반영했고, 게이트도 다시 통과했습니다. 6단계로 정책 대장 전체 항목을 보여 드리고 확인을 받겠습니다.

<details><summary>🔧 작업 2건</summary>

- Bash: List policy items and deferred notes
- Bash: Fix POL-005 scope wording

</details>

**❓ Claude 질문**

- 정책 대장 v1.0 초안입니다(25개 항목, 미해결 0개). 수정할 항목이 있나요?  
    
  1 조직 구조: [001] 조직→여러 공장, 앱→여러 버전, 배포 = 버전 1개를 공장 1곳에 설치  
  2 등록: [002] 필수 항목 = 필요 데이터·필요 권한·호환 버전·업그레이드 가능 이전 버전 / [003] 승인은 Platform Admin만 / [004] 반려 사유 필수 / [005] 반려 사유는 등록한 사람이 볼 수 있음 / [006] 재제출 = 등록 정보 전체 / [007] 등록 상태 = 승인 대기·반려·승인됨  
  3 배포: [008] 배포 상태(버전×공장) = 배포 대기·차단됨·설치 중·동작 확인 중·완료·실패 / [009] 차단 사유(버전 충돌·설정 부족) 필수 표시 / [010] 정상 동작 = 헬스체크 + 데이터 수신 / [011] 데이터 연결됨 = 선언 데이터 모두 연결 / [012] 호환 = 앱 팀 선언 + pdx 비교 / [013] 충돌 시 선행 버전 안내 → Admin이 선행 버전 배포 후 재실행 / [014] 부족 항목은 Admin만 채움 / [015] Operator는 자기 공장 현황만  
  4 계정·권한: [016] 앱별 역할 단위 부여 / [017] 평소 앱별 제한, 퇴사 등은 계정 비활성화 / [018] 요청 입력 = 대상 앱 + 사유(공장은 소속 공장) / [019] 요청 승인 = 즉시 부여 / [020] 거절 사유 필수 / [025] 거절 결과는 pdx 자기 요청 목록에서 확인, 외부 알림 없음  
  5 기록·감사: [021] 기록 항목 = 요청자·승인자·실행자·반영 시점 / [022] 조회는 Platform Admin / [023] 등록 요청·승인·반려·배포 실행·반영마다 자동 기록 / [024] 최소 1년 보관, Admin이 연장 가능  
  미룬 항목: 동시 검토 대기 상한, 사용 요청 처리 기한
  - *이대로 확정 (Recommended)*: 정책 대장 v1.0을 확정하고 Spec 4단계(REQ 작성)로 넘어간다
  - *수정 있음*: Other에 'POL 번호: 수정 내용'으로 적어 주세요

**🙋 사용자 답변**

- 정책 대장 v1.0 초안입니다(25개 항목, 미해결 0개). 수정할 항목이 있나요?  
  → **이대로 확정하는데 Spec 작성하기 전에 나한테 초안 문서 보여줘**

<details><summary>🔧 작업 3건</summary>

- Bash: Apply policy map to spec.json
- 📎 파일 전달: C:/Users/pca02/Works/projects/codex-onepredict/[Policy] pdx 앱 온보딩·배포.md
- Bash: Log policy confirmation in interview

</details>

정책 대장 v1.0 초안을 보내 드렸습니다. 말씀하신 대로 Spec 문서는 아직 쓰지 않았고, 요구사항(REQ) 작성은 확인을 받은 뒤에 시작하겠습니다.

**지금까지 한 일**
- **유저 스토리 22개**(제외 1개)를 확정했습니다. 모듈별로는 등록 2, 검토·승인 4, 배포 6, 현황 3, 계정·권한 5, 기록 2개입니다. 확정 표는 [.spec-work/stories-preview.md](.spec-work/stories-preview.md)에 있고, 최종 Spec 문서에 그대로 들어갑니다.
- **정책 대장** [[Policy] pdx 앱 온보딩·배포.md]([Policy] pdx 앱 온보딩·배포.md): 5장 13절, 25개 항목입니다. 미해결 항목은 없고, 미룬 권장 항목은 2개(동시 검토 대기 상한, 사용 요청 처리 기한)입니다. 정책이 스토리를 고치게 만든 경우는 없었습니다.
- **정책 검증**: 형식 검증(gates)은 통과했습니다. 반대 입장에서 점검하는 리뷰(적대적 리뷰)는 Hard 위반 3건과 경고 2건을 냈습니다. 5건을 모두 고치고 형식 검증을 다시 통과했지만, 리뷰 자체는 다시 돌리지 않았습니다.
- **추가로 직접 고친 부분**
  - 총칙에 에이전트가 "두 정책이 충돌하면 제품 전역 정책이 우선한다"는 문장을 넣었습니다. 근거가 없는 문장이라 뺐습니다.
  - POL-005는 "등록한 사람**만** 볼 수 있다"로 범위가 답변보다 좁아져 있었습니다. 답변대로 "등록한 사람이 볼 수 있다"로 되돌렸습니다.
- 인터뷰 기록은 [[Spec] 인터뷰]([Spec] pdx 앱 온보딩·배포 - 인터뷰.md)(SQ1~SQ7)와 [[Policy] 인터뷰]([Policy] pdx 앱 온보딩·배포 - 인터뷰.md)(PQ1~PQ25)에 남겼습니다.

**REQ 작성 때 이어서 물어볼 것**
- **화면 구성**: 상태를 둘로 나눈 흐름을 화면에서 하나로 이어 보여 줄지, 말씀하신 대로 "앱 버전 관리"와 "배포 관리" 두 메뉴로 나눌지 정해야 합니다. 저는 두 메뉴로 나누는 안이 합리적이라고 봅니다. 다만 승인된 버전에서 바로 넘어가는 "배포하기" 버튼과, 버전 상세에 공장별 배포 상태 요약을 함께 두는 조건입니다. 이 결정은 Spec의 미결 사항(gap)으로 올려 REQ 단계에서 확정하겠습니다.
- **REQ 전역 조건**: "앱 20개 × 공장 3곳에 같은 절차 적용"은 스토리에서 빼고 REQ 전역 조건으로 옮기기로 했습니다.
- **감사 로그 보관 기간**: "최소 1년"은 개인정보 접속기록 기준을 참고해 정한 값입니다. 고객사 업종에 따른 법적 의무는 고객사 법무 확인이 따로 필요합니다.

정책 문서를 보시고 고칠 곳이 있으면 알려 주세요. 없으면 "진행"이라고 해 주시면 REQ 작성을 시작합니다.

---

## 🙋 사용자 · 2026-09-27 06:34

> policy 스킬로 문서정리 한번만 더해볼래? 가독성이 너무 떨어져서

<details><summary>🔧 작업 1건</summary>

- 🧩 스킬 실행: general-policy-writer

</details>

## 💬 Claude · 2026-09-27 06:34

Step 0 기준으로 기존 대장이 옛 형식인지 확인하겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Back up policy and inspect format

</details>

옛 형식(legacy)으로 확인됐습니다. 원본은 `.policy-work/POLICY.v1.0-legacy.md`에 백업해 두었습니다. 먼저 migrate로 본문과 출처 정보를 분리하겠습니다.

<details><summary>🔧 작업 6건</summary>

- Bash: Migrate policy to new format and view
- Bash: Check supported change ops and formats
- Bash: Build restructured changes and render preview
- Bash: Move proposed items into role topic and re-render
- Bash: Fix matrix placeholders and re-render preview
- 📎 파일 전달: C:/Users/pca02/AppData/Local/Temp/claude/C--Users-pca02-Works-projects-codex-onepredict/fe8ae245-2ca2-4f6c-81b0-dc2655af4558/scratchpad/[Policy 미리보기] pdx 앱 온보딩·배포.md

</details>

**❓ Claude 질문**

- 재정리한 구조(미리보기 파일)를 원본에 반영할까요?  
    
  바뀐 점: 본문에서 근거 줄·각주를 빼고 부칙 대장으로 옮김 / 장마다 목적 한 줄 / 용어 정의 10개 / 열거는 하위 목록(등록 필수 항목, 등록·배포 상태 정의, 차단 사유, 기록 대상·항목) / 배포 장을 '배포 전 점검 → 차단과 해결 → 배포 상태 → 배포 현황' 순서로 재배치 / 4장 머리에 역할 매트릭스(역할 × 할 수 있다/없다) 추가. POL id는 읽는 순서대로 다시 발급합니다(아직 인용한 Spec이 없어 안전합니다).
  - *반영 (Recommended)*: 미리보기를 원본 [Policy] 파일에 적용한다
  - *고칠 곳 있음*: Other에 적어 주세요
- 역할 매트릭스를 만들면서 새로 제안한 규칙 2개입니다. 스킬 규칙상 역할마다 '할 수 없는 것'을 최소 하나 두어야 하기 때문입니다. 어느 것을 확정할까요?  
    
  POL-016 Platform Admin은 자신이 제출한 등록을 승인할 수 없다. (직무 분리. 고객사 IT 엔지니어가 Admin과 앱 등록 Role을 함께 가질 수 있어 자기 승인이 가능해집니다)  
  POL-017 배포 실행은 Platform Admin만 할 수 있다. (PRD 메인 시나리오에서 배포는 Admin이 실행하지만 v1.0에는 이 규칙이 빠져 있었습니다)
  - *POL-016 자기 승인 금지*: 똑같은 사람이 제출과 승인을 모두 하지 못하게 한다. 1인 운영 고객사에서는 승인이 막힐 수 있다
  - *POL-017 배포 실행은 Admin만*: 등록자·Operator는 배포를 실행할 수 없다
- 새로 제안한 용어 정의 2개입니다(나머지 8개는 PRD 용어집·사용자 정의·SQ4에서 옮겨 왔습니다).  
    
  · 선행 버전: 공장이 업그레이드 조건을 만족하려면 먼저 설치해야 하는 버전이다.  
  · 헬스체크: 설치된 앱이 정상적으로 실행 중인지 시스템이 확인하는 상태 점검 요청이다.
  - *이대로 승인 (Recommended)*: 두 정의를 그대로 둔다
  - *고칠 곳 있음*: Other에 적어 주세요

**🙋 사용자 답변**

- 재정리한 구조(미리보기 파일)를 원본에 반영할까요?  
  → **반영 (Recommended)**
- 역할 매트릭스를 만들면서 새로 제안한 규칙 2개입니다. 스킬 규칙상 역할마다 '할 수 없는 것'을 최소 하나 두어야 하기 때문입니다. 어느 것을 확정할까요?  
  → **Something else,POL-016 자기 승인 금지,POL-017 배포 실행은 Admin만**
- 새로 제안한 용어 정의 2개입니다(나머지 8개는 PRD 용어집·사용자 정의·SQ4에서 옮겨 왔습니다).  
  → **이대로 승인 (Recommended)**

<details><summary>🔧 작업 3건</summary>

- Bash: View preview appendix and header
- Bash: Write v1.1 policy, log answers, remap spec needs
- Bash: Show gate errors

</details>

History row needs explicit ids listed. Fix that.

<details><summary>🔧 작업 2건</summary>

- Bash: List ids in history row and re-gate
- 📎 파일 전달: C:/Users/pca02/Works/projects/codex-onepredict/[Policy] pdx 앱 온보딩·배포.md

</details>

정책 대장을 v1.1로 다시 정리해 원본에 반영했습니다. 항목은 27개이고 게이트 검증을 통과했습니다. v1.0 원본은 [.policy-work/POLICY.v1.0-legacy.md](.policy-work/POLICY.v1.0-legacy.md)에 백업해 두었습니다.

**가독성을 위해 바꾼 점**
- **본문에는 규칙 문장만 남겼습니다.** 항목마다 붙어 있던 "적용 Story · 결정 · 근거" 줄과 각주는 부칙의 정책 항목 대장으로 옮겼습니다.
- **장마다 목적을 한 줄로 적었습니다.** 예: "이 장은 배포 전 점검 기준, 배포 실행 권한, 차단과 해결, 배포 상태와 현황 조회 범위를 정한다."
- **용어 정의 10개를 추가했습니다.** Workspace, Platform Admin, 앱 등록 Role 보유자, 실행 조건, 자동 비교, 헬스체크 등입니다.
- **한 문장에 나열했던 값은 하위 목록으로 풀었습니다.** 등록 필수 항목, 등록 상태 3개와 배포 상태 6개의 정의, 차단 사유 2개, 기록 대상과 기록 항목이 해당합니다.
- **배포 장을 업무 순서대로 재배치했습니다.** 배포 전 점검 → 차단과 해결 → 배포 상태 → 배포 현황 순서입니다. 이전에는 "실행" 절 안에 상태 정의가 섞여 있었습니다.
- **4장 머리에 역할 매트릭스를 추가했습니다.** 역할마다 할 수 있는 것과 할 수 없는 것을 POL id와 함께 한눈에 볼 수 있습니다.

**값이 바뀐 부분**
- 기존 25개 항목의 값과 조건은 그대로입니다.
- 새로 확정한 규칙은 두 개입니다. POL-016은 "Platform Admin은 자신이 제출한 등록을 승인할 수 없다", POL-017은 "배포 실행은 Platform Admin만 할 수 있다"입니다.
- 새로 확정한 용어 정의도 두 개(선행 버전, 헬스체크)입니다. 부칙 대장에는 이 넷의 근거가 `PQ26(제안)`으로 표시됩니다.
- POL id는 읽는 순서대로 다시 발급했습니다. 아직 이 id를 인용한 Spec이 없어서 깨지는 참조는 없고, spec.json의 정책 매핑도 새 id로 갱신했습니다.

**알아 두실 점**
- 이번 재정리는 policy-author 에이전트 대신 제가 직접 changes.json을 작성해 스크립트로 적용했습니다. 새로 추가한 두 규칙에 대해서는 적대적 리뷰를 다시 돌리지 않았습니다.
- POL-016(자기 승인 금지)은 Platform Admin이 한 명뿐인 고객사라면 스스로 등록한 버전을 아무도 승인할 수 없게 됩니다. 이런 경우의 예외 처리가 필요해지면 추후 정책 개정으로 다루면 됩니다.

문서를 보시고 괜찮으면 "진행"이라고 해 주세요. 요구사항(REQ) 작성을 시작하겠습니다.

---

## 🙋 사용자 · 2026-09-27 06:45

> 3-1-1. 앱 팀은 등록 정보에 호환 조건을 선언하고, 시스템은 이를 공장의 실행 조건과 비교해 호환 여부를 판정한다. [POL-008] 3-1-2. 앱이 등록 정보에 선언한 데이터 항목이 공장에서 모두 실제로 이어진 상태를 시스템은 데이터 연결됨으로 판정한다. [POL-009] 3-1-3. 자동 비교에서 부족하다고 표시된 항목은 Platform Admin만 채울 수 있다. [POL-010]
>
> > 이런것 줄바꿈 필요해

## 💬 Claude · 2026-09-27 06:45

마크다운에서는 빈 줄 없이 이어진 줄이 한 문단으로 합쳐져 보입니다. 항목 사이에 빈 줄을 넣고, 스크립트가 이 형식을 그대로 읽는지 확인하겠습니다.

<details><summary>🔧 작업 2건</summary>

- Bash: Insert blank lines between items and re-verify
- Bash: Count parsed items and locate item renderer

</details>

항목 사이에 빈 줄을 넣어 [[Policy] pdx 앱 온보딩·배포.md]([Policy] pdx 앱 온보딩·배포.md)에 반영했습니다. 이제 `3-1-1.`, `3-1-2.`, `3-1-3.`이 각각 별도 줄로 보입니다. 하위 목록이 있는 항목도 목록이 끝난 뒤 한 줄을 띄우고 다음 항목이 시작됩니다.

- **확인한 것:** 게이트 검증을 다시 통과했습니다. 스크립트도 27개 항목을 모두 정상적으로 읽습니다. 따라서 빈 줄 때문에 이후 정책 갱신이 깨지지는 않습니다.
- **바꾸지 않은 것:** 문장과 값은 그대로이고 줄바꿈만 추가했습니다. 수정 전 파일은 [.policy-work/POLICY.v1.1-before-linebreak.md](.policy-work/POLICY.v1.1-before-linebreak.md)에 백업했습니다.

한 가지 알려 드릴 점이 있습니다. 이 붙어 보이는 문제는 스킬의 항목 추가 함수(`general-policy-writer/scripts/policy_doc.py`의 `add_item`)가 빈 줄 없이 항목을 쓰기 때문에 생깁니다. 그래서 다음에 정책을 추가하면 새 항목이 다시 붙어서 나올 수 있습니다. 원하시면 스킬 스크립트도 항목 사이에 빈 줄을 넣도록 고치겠습니다.

REQ 작성을 시작하려면 "진행"이라고 해 주세요.

---

## 🙋 사용자 · 2026-09-27 07:30

> 내가 policy 일부 수정했어. Req진행

## 💬 Claude · 2026-09-27 07:30

직접 수정하신 내용부터 확인하겠습니다. 줄바꿈을 넣은 직후 버전과 현재 파일을 비교하고 게이트를 돌립니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Diff user policy edits and run gates

</details>

정책이 v2.0(59개 항목)으로 크게 바뀌었습니다. 현재 문서 전체와 검증 결과를 읽겠습니다.

<details><summary>🔧 작업 3건</summary>

- Bash: Run gates and read current policy body
- Bash: Check policy work files, interview, register
- Bash: Apply v2.0 map, snapshot policies, export items

</details>

매핑 21건이 모두 v2.0 id로 연결됐고, 스냅샷도 누락 없이 만들어졌습니다. 이제 4단계로 spec-author(모드 B)에게 REQ 작성을 맡기겠습니다.

<details><summary>🔧 작업 1건</summary>

- 🤖 서브에이전트 호출: Spec author mode B reqs

</details>

<details><summary>🤖 서브에이전트 보고</summary>

Spec REQ 작성을 마쳤다. `C:/Users/pca02/Works/projects/codex-onepredict/.spec-work/spec.json`을 갱신했고, `assemble_spec.py`/`gates_spec.py`로 렌더링·검증까지 돌려 구조 오류 없음(verdict: warn, error 0)을 확인했다.

**REQ 수**: 총 69개 (BE 48 / FE 21). 22개 살아있는 Story 전체에 REQ ≥1, ui_surface Story는 모두 FE REQ 포함(AUDIT-002만 화면 없음이라 BE만).

**Story별 REQ 수**: REG-001(5) REG-001-1(2) APRV-001(3) APRV-001-1(2) APRV-002(4) APRV-002-1(2) DEPLOY-001(3) DEPLOY-001-1(6) DEPLOY-001-2(2) DEPLOY-002(4) DEPLOY-003(4) DEPLOY-003-1(5) STAT-001(2) STAT-002(2) STAT-003(2) ACCT-001(2) ACCT-002(4) ACCT-003(3) ACCT-004(2) ACCT-004-1(4) AUDIT-001(3) AUDIT-002(3)

**인용한 POL**: 41개 (`policy_refs`에 스냅샷). 지시받은 예시 항목(POL-010, POL-019, POL-021/022, POL-024, POL-029, POL-033, POL-034, POL-047, POL-050, POL-052, POL-057)을 모두 실제 REQ에 인용했다.

**gaps 추가**: 1행 — "배포 현황 화면 구성: 버전×공장 통합 흐름 vs '앱 버전 관리'·'배포 관리' 화면 분리"(결정 필요/미해결), 근거는 policy interview `PQ11` + `POL-018`·`POL-030`.

**SQ5 전역 조건**: `PDX-FO-DEPLOY-001`에 ubiquitous REQ-BE-DEPLOY-002("앱 20개·공장 3곳의 모든 조합에 동일한 등록·검토·배포 절차를 적용한다")로 반영. 근거는 `prd/Scope`·`interview/SQ5`.

brief와 brief_sources도 채웠다 (30초 요약: 등록→검토·승인/반려→대상 공장 선택→배포 전 자동 점검→배포 실행·정상 동작 확인 흐름, 영향받는 세 역할, 정책 값 인용 요지, 범위 밖, 남은 결정).

**스스로 판단이 애매했던 점**
1. 데이터 연결 판정(POL-023)의 30초 타임아웃, 헬스체크(POL-032)의 "10초/3회/30분" 등 숫자가 REQ 문장 하나에 여러 개 겹쳐 다소 길어졌다 — "한 REQ에 동작 하나" 규칙상 분리하지 않고 하나의 판정 로직으로 묶는 게 맞다고 판단.
2. 기존 spec.json의 `gaps[]`가 `type` 키를 쓰고 있었는데 `assemble_spec.py`/`gates_spec.py` 스키마는 `kind`를 요구해 게이트가 fail 했다. Mode B 범위 밖(Mode A 산출물)이지만 구조적 결함이라 `type`→`kind`로, 그리고 소스 키 `"Evidence Gaps"`(공백 포함, cite.py 파싱 불가)를 `"EvidenceGaps"`로 최소 수정했다 — 값·내용은 그대로 두고 키 형식만 고쳤다. 되돌릴 필요가 있으면 알려달라.
3. 남은 draft-stage 경고 3건(C4b: SQ 형식 아닌 인터뷰 인용)은 기존 2건(PRD 인터뷰 Q20/Q22, 손대지 않음)과 신규 1건(내가 추가한 gap의 PQ11)이며, gap 인터뷰 단계에서 다뤄질 항목이라 그대로 두었다.

stories·policy_refs(기존 21개)·policy_needs는 값 변경 없이 보존했다(policy_refs는 신규 20개 항목만 추가, 기존 21개는 그대로).

</details>

REQ 69개(BE 48 / FE 21)가 작성됐습니다. 4단계 마무리로 스냅샷을 한 번 더 돌려 `used_by`를 채우고, 4.5단계 렌더링과 기계 검증을 하겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Snapshot, render Spec, run draft gates

</details>

PRD가 v0.2에서 v0.3으로 바뀌어 있습니다. Story와 REQ가 v0.2를 근거로 썼기 때문에, 무엇이 바뀌었는지 먼저 확인하겠습니다.

<details><summary>🔧 작업 2건</summary>

- Bash: Diff PRD v0.2 to v0.3
- Bash: Bump PRD refs to v0.3 and extract gaps

</details>

아직 사용자에게 묻지 않은 gap이 3건 있습니다. 4.7단계 규칙상 묻지 않은 채로 남길 수 없으므로 한 번에 여쭙겠습니다.

**❓ Claude 질문**

- [gap 1] 배포 현황 화면 구성을 어떻게 할까요? 정책은 등록 상태(POL-018)와 배포 상태(POL-030)를 나누어 관리합니다. 두 메뉴로 나누는 안의 약점은 승인 뒤 배포하려면 메뉴를 옮겨야 한다는 점이고, 두 가지 연결 장치로 보완할 수 있습니다.
  - *두 메뉴 + 연결 장치 (Recommended)*: '앱 버전 관리'와 '배포 관리' 화면을 나눈다. 승인된 버전에 '배포하기' 버튼(버전이 선택된 채 배포 관리로 이동)과, 버전 상세에 공장별 배포 상태 요약을 둔다
  - *하나의 흐름 화면*: 버전×공장 한 줄에 승인 대기부터 완료까지 이어 보여 주는 통합 화면 하나로 둔다
  - *와이어프레임에서 결정*: 미해결로 남기고 와이어프레임 단계에서 정한다
- [gap 2] 성공 지표의 기준선은 PRD에서 '본인, MVP 적용 후 첫 측정'으로 미해결 상태입니다. Spec에서도 그대로 둘까요?
  - *미해결 유지 (Recommended)*: 추적: 김윤주, MVP 적용 후 첫 측정. REQ에는 영향이 없다
  - *다른 담당·시점*: Other에 적어 주세요
- [gap 3] PRD의 범위 밖 항목(고객사·외부 앱, 중앙 등록·배포, 공장별 관리자 Role, 협력사 임시 권한, 인사 정보 연동, 현장 시험 라인 검증)은 Spec에서도 Story를 만들지 않고 후속 범위로 둡니다. 맞나요?
  - *맞음 (Recommended)*: 제외 결정을 확정한다
  - *일부 포함*: Other에 포함할 항목을 적어 주세요

**🙋 사용자 답변**

- [gap 1] 배포 현황 화면 구성을 어떻게 할까요? 정책은 등록 상태(POL-018)와 배포 상태(POL-030)를 나누어 관리합니다. 두 메뉴로 나누는 안의 약점은 승인 뒤 배  
  → **두 메뉴 + 연결 장치 (Recommended)**
- [gap 2] 성공 지표의 기준선은 PRD에서 '본인, MVP 적용 후 첫 측정'으로 미해결 상태입니다. Spec에서도 그대로 둘까요?  
  → **미해결 유지 (Recommended)**
- [gap 3] PRD의 범위 밖 항목(고객사·외부 앱, 중앙 등록·배포, 공장별 관리자 Role, 협력사 임시 권한, 인사 정보 연동, 현장 시험 라인 검증)은 Spec에서도 St  
  → **맞음 (Recommended)**

<details><summary>🔧 작업 2건</summary>

- Bash: Inspect REQ schema and STAT reqs
- Bash: List FE requirement screens

</details>

화면 구성 결정(SQ8)에 맞춰 FE REQ의 화면 이름을 "앱 버전 관리 화면"과 "배포 관리 화면"으로 통일하겠습니다. 연결 장치 REQ 3개도 추가하겠습니다.

<details><summary>🔧 작업 2건</summary>

- Bash: Apply gap answers, add screen REQs, final gates
- Bash: Inspect GAP gate logic

</details>

`--open-gaps`는 "묻지 않은 gap 수"를 받는 인자인데, 제가 "미해결 gap 수"로 잘못 넘겼습니다. 3건을 모두 물었으므로 0으로 다시 검증하겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Rerun final gates with zero unasked gaps

</details>

Final 게이트를 통과했습니다. 5단계로 적대적 리뷰를 실행하겠습니다.

<details><summary>🔧 작업 1건</summary>

- 🤖 서브에이전트 호출: Spec adversarial review

</details>

<details><summary>🤖 서브에이전트 보고</summary>

review.json 작성 완료 (C:\Users\pca02\Works\projects\codex-onepredict\.spec-work\review.json).

**verdict: fail** (Hard 위반 1건)

**errors (Hard, 1건)**
- [C5] REQ-BE-DEPLOY-017: "이전에 설치돼 있던 버전을 그대로 유지하고 배포 상태를 실패로 바꾼다" — 서로 다른 정책(POL-033 유지, POL-030 상태전이)에서 온 두 동작이 한 REQ에 묶임. 두 REQ로 분리 권장.

**warnings (Warn, 2건)**
- [A4] REQ-BE-APRV-003 / REQ-FE-APRV-002: "배포 대상으로 선택 가능하게 한다" 문구는 POL-019가 아니라 POL-018의 '승인됨' 하위 항목에서 온 값인데 POL-018을 인용하지 않음 → 사용자 확인 필요(question_for_user 포함).
- [D2] REQ-BE-STAT-002: 동사 "관리해 제공한다"가 관찰 불가능(룰 D2 예시어 '관리한다'와 동일) — 확인 가능한 동사로 교체 권장.

**그 외 확인한 점 (문제 없음)**
- A1~A3, B1~B3, C1~C4, C6, E1~E2: 위반 없음. Story 22개 전부 최소 1개 이상 REQ로 덮여 있고(누락 없음), PRD Scope In 항목 5개 모두 Story로 커버, Scope Out(DEPLOY-004)은 gaps에 결정됨으로 기록됨. REQ 값들은 대체로 인용한 POL 문장과 일치(30초/10초/3회/30분/1년 등 수치 그대로 인용).
- gates_result는 이미 pass였으나, 이번 적대적 리뷰는 기계 검사가 못 잡는 의미 위반(C5, A4, D2)을 추가로 발견함.

verdict별 후속 규칙(오케스트레이터 처리): fail → errors를 작성자 모드 C로 반영 → 재렌더 → gates → 재리뷰(최대 2회). review.json은 문서를 고치지 않고 순수 JSON 결과만 담았습니다.

</details>

<details><summary>🔧 작업 3건</summary>

- Bash: Show REQs flagged by review
- Bash: Fix review findings and re-gate
- SendMessage: 

</details>

리뷰어가 확인하는 동안 6단계 정책 대조(policy check)를 먼저 돌리겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Run policy check and prepare reader contract

</details>

정책 대조 결과 개정·폐지·누락은 모두 0건입니다. 리뷰어의 재확인 결과를 기다리겠습니다.

재리뷰를 통과했습니다. 6단계로 메타 정보를 채워 최종 조립하겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Assemble final Spec with contract and policy check

</details>

6R단계로 독자 이해도 점검(warn-only)을 실행하겠습니다.

<details><summary>🔧 작업 1건</summary>

- 🤖 서브에이전트 호출: Spec reader simulation

</details>

<details><summary>🤖 서브에이전트 보고</summary>

```json
{
  "understood_purpose": "이 Spec은 pdx 앱 온보딩·배포 절차(등록→검토·승인→배포 대상 선택→배포 전 점검→배포 실행)를 사용자 스토리와 요구사항으로 확정해, 개발팀이 설계·구현에 착수할지를 의사결정하도록 한다.",
  "decision_required": "없음 (Evidence gaps의 모든 미해결·결정필요 항목이 이미 결정되었거나 개발 후 측정 대상으로 명시됨)",
  "reader_action": "Stories와 요구사항이 PRD 및 Policy와 일치하는지 검증하고, 데이터 모델 델타가 기술적으로 구현 가능한지 확인한 뒤, 설계·개발 단계로 진행한다",
  "top_risks": [
    "성공 지표의 기준선이 MVP 적용 후 첫 측정 시 정해지는데, 개발 설계 단계에서 이를 미리 고려하지 않으면 배포 후 지표 계측이 누락될 수 있음",
    "앱 20개·공장 3곳의 모든 조합에 동일 절차를 적용할 때 배포 병렬 처리, 상태 관리, 동시성 제어의 복잡도가 예상보다 높을 가능성",
    "배포 실패 시 이전 버전 자동 유지(POL-033) 구현 시 데이터 일관성, 부분 실패 처리(일부 공장만 성공), 롤백 순서 등이 명확하지 않음"
  ],
  "open_questions": [
    "Evidence gaps의 '성공 지표의 기준선'이 구체적으로 어느 메트릭을 의미하는가? (배포 성공률, 배포 소요 시간, 앱 안정성, 업타임?)",
    "POL-032의 헬스체크 '성공 응답'이 HTTP 상태 코드만 의미하는가, 아니면 응답 바디의 특정 필드까지 검증하는가?",
    "Deployment 엔티티의 상태(status enum)를 DB에 저장할 때, 상태 전이 규칙(예: 어떤 상태에서만 어느 상태로 이동 가능)을 검증하는 로직이 어디에 구현되는가?"
  ],
  "confusing_sections": [
    "30초 Brief — 한 문단에 여섯 개 각주([^1]~[^6])가 몰려있어 처음 읽을 때 어느 부분이 어느 근거인지 파악하기 어려움",
    "Stories 테이블의 근거 열 — 각주 번호만 있고, 실제 내용은 맨 아래 Sources 섹션에서 따로 찾아야 해 독서 흐름이 끊김",
    "데이터 모델 델타 — Entity와 필드만 나열되어 있고, 실제 API 응답 스키마나 입력 검증 규칙(예: nullable 여부, 길이 제한, 형식)이 명시되지 않음"
  ],
  "unnecessary_repetition": [
    "버전 검사(①pdx 버전 ②MxFM 버전 ③업그레이드 경로) vs 설정 검사(④권한 ⑤데이터 연결)의 개념이 POL-021·022 → Stories → 요구사항 3단계에서 반복되며, 마지막 요구사항 섹션만으로 충분할 듯함",
    "배포 상태(배포대기·차단됨·설치중·동작확인중·완료·실패)가 POL-030 → 데이터 모델 델타 → 요구사항 여러 곳에서 반복 언급됨"
  ],
  "verdict": "warn"
}
```

JSON이 C:/Users/pca02/Works/projects/codex-onepredict/.spec-work/reader.json에 저장되었습니다.

</details>

<details><summary>🔧 작업 1건</summary>

- Bash: Add reader result and reassemble Spec

</details>

30초 Brief에 "남은 결정: 화면 구성"이 아직 남아 있습니다. 이 항목은 SQ8에서 이미 결정했으므로 현재 상태에 맞게 고치겠습니다.

<details><summary>🔧 작업 2건</summary>

- Bash: Update brief, reassemble, final gate
- 📎 파일 전달: C:/Users/pca02/Works/projects/codex-onepredict/[Spec] pdx 앱 온보딩·배포.md

</details>

**❓ Claude 질문**

- Spec v0.1 초안을 보내 드렸습니다. 독자 이해도 점검에서는 이런 지적이 나왔습니다.  
  · 30초 Brief 한 문단에 각주 6개가 몰려 있어 읽기 어렵다  
  · 버전 검사·설정 검사, 배포 상태 6개가 정책·Story·REQ에 반복된다(정책 스냅샷은 스킬 구조상 의도된 것)  
  · 공장(Workspace) 등록·비활성화, 계정 생성은 정책에는 있지만 Story가 없어 REQ도 없다(PRD Scope가 다루지 않음)  
    
  수정할 섹션이 있나요?
  - *수정 없음, v0.1 확정 (Recommended)*: status는 draft로 두고 마무리한다
  - *공장·계정 Story 추가*: 정책의 공장 관리(POL-005·006)와 계정 생성(POL-045)에 맞는 Story·REQ를 추가한다(PRD Scope 밖이라 범위 결정이 먼저 필요)
  - *다른 수정*: Other에 섹션과 내용을 적어 주세요
- 미해결 gap 재확인: '성공 지표의 기준선'은 계속 미해결(추적: 김윤주, MVP 적용 후 첫 측정)로 둘까요?
  - *미해결 유지 (Recommended)*: REQ에는 영향이 없다
  - *지금 정함*: Other에 기준선을 적어 주세요

**🙋 사용자 답변**

- Spec v0.1 초안을 보내 드렸습니다. 독자 이해도 점검에서는 이런 지적이 나왔습니다.  
  → **1. 30초 brief 내용 좀 더 간결하게 문장 정리 / 문장or문단 줄바꿈 필요
2. 우리 정책은 원래도 표로 나오는거야? 근거 링크로 나오고 끝나는줄.. 그리고 별도 문서 확인하는 줄 알았어. 지금 내용 반복이 너무 많은 느낌이야. WireFrame 스킬 쓸때 저 표가 꼭 필요해?
3. 공장(Workspace) 등록·비활성화, 계정 생성은 정책에는 있지만 Story가 없어 REQ도 없다(PRD Scope가 다루지 않음) > ㅇㅇ 공장 등록은 이번 우리 과제 Scope밖이야**
- 미해결 gap 재확인: '성공 지표의 기준선'은 계속 미해결(추적: 김윤주, MVP 적용 후 첫 측정)로 둘까요?  
  → **미해결 유지 (Recommended)**

<details><summary>🔧 작업 3건</summary>

- Bash: Check wireframe skill inputs and policy render
- Bash: Rewrite brief, log scope decision, re-gate
- Bash: Show gate errors

</details>

Brief는 줄마다 근거 각주가 있어야 게이트를 통과합니다. Brief 근거가 [^1]부터 순서대로 번호를 받으므로, 각 줄에 맞는 각주를 달겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Add per-line brief footnotes, re-render, gate

</details>

Brief는 항목별로 한 줄씩 끊어 짧게 고쳤고, 게이트를 통과했습니다. 이제 2번 질문에 답하고 방향을 여쭙겠습니다.

**❓ Claude 질문**

- '적용 정책' 표에 대한 답입니다.  
    
  · 원래 표로 나오나: 네. spec-writer 스킬이 의도적으로 넣는 블록입니다. REQ가 인용한 정책 문장을 원문 그대로 복사해 'Spec 한 장만 봐도 값을 알 수 있게' 하고, 정책이 바뀌면 '정책 개정됨'을 표시합니다. 이번에는 41개 행이라 길어졌습니다.  
  · 와이어프레임에 필요한가: 아닙니다. 와이어프레임 스킬은 Stories와 REQ를 spec.json에서 직접 읽고, 정책은 필요할 때만 정책 대장에서 참조합니다. 이 표를 없애거나 접어도 와이어프레임 작업에는 영향이 없습니다.  
  · 제약: 지금 스킬 검증(gates)은 '적용 정책' 제목과 표가 있어야 통과합니다. 표를 없애려면 스킬(템플릿·조립·검증 스크립트와 테스트)을 함께 고쳐야 합니다.  
    
  어떻게 할까요?
  - *접기 + 문장 빼고 링크만 (Recommended)*: 스킬을 고쳐 표를 기본으로 접고(<details>), 정책 문장 열은 빼서 'POL ID · 상태 · 적용 REQ'만 남긴다. 개정 추적 기능은 유지되고, 문장은 정책 대장에서 본다
  - *블록 제거*: 스킬에서 '적용 정책' 블록 자체를 뺀다. REQ의 '연관 정책' 열의 POL ID만 남는다. 정책 개정 시 어느 REQ가 영향받는지는 Spec 문서에서 보이지 않게 된다
  - *이번엔 그대로*: 스킬은 나중에 고치고, 이번 Spec은 현재 형식으로 둔다

**🙋 사용자 답변**

- '적용 정책' 표에 대한 답입니다.  
  → **접기 + 문장 빼고 링크만 (Recommended)**

스킬을 고치겠습니다. 먼저 '적용 정책' 표에 기대고 있는 코드와 테스트를 찾겠습니다.

<details><summary>🔧 작업 6건</summary>

- Bash: Find policy table dependencies and run tests
- Bash: Inspect table check and policy row usage
- Read: C:\Users\pca02\.claude\skills\general-spec-writer\scripts\assemble_spec.py
- Bash: Check policy path field in spec
- Edit: C:\Users\pca02\.claude\skills\general-spec-writer\scripts\assemble_spec.py
- Edit: C:\Users\pca02\.claude\skills\general-spec-writer\scripts\assemble_spec.py

</details>

Now update the template and evals docs to match.

<details><summary>🔧 작업 7건</summary>

- Bash: View template and eval lines to update
- Bash: Update template and evals, run skill tests
- Bash: Show failing test details
- Bash: View failing test block
- Edit: C:\Users\pca02\.claude\skills\general-spec-writer\scripts\tests\test_spec_scripts.py
- Bash: Run tests, re-render Spec, gate, preview
- Read: C:\Users\pca02\.claude\skills\general-spec-writer\scripts\tests\test_spec_scripts.py

</details>

스킬 테스트의 기대값 하나만 새 표 형식으로 고치면 됩니다. 이어서 마무리하겠습니다.

<details><summary>🔧 작업 2건</summary>

- Edit: C:\Users\pca02\.claude\skills\general-spec-writer\scripts\tests\test_spec_scripts.py
- Bash: Rerun skill tests

</details>

스킬 테스트 30개가 모두 통과했습니다. 인터뷰 기록에 이번 결정을 남기고 최종 Spec 문서를 보내 드리겠습니다.

<details><summary>🔧 작업 2건</summary>

- Bash: Log SQ14 decision in interview
- 📎 파일 전달: C:/Users/pca02/Works/projects/codex-onepredict/[Spec] pdx 앱 온보딩·배포.md

</details>

Spec v0.1을 완성했습니다. 리뷰에서 요청하신 세 가지도 반영했습니다. 형식 검증(gates final), 적대적 리뷰, 스킬 테스트(30개)를 모두 통과했습니다.

**산출물**
- [[Spec] pdx 앱 온보딩·배포.md]([Spec] pdx 앱 온보딩·배포.md): 상태는 draft입니다.
- 인터뷰 기록: [[Spec] 인터뷰]([Spec] pdx 앱 온보딩·배포 - 인터뷰.md)에 SQ1~SQ14를 남겼습니다.

**구성**
- **Story:** 22개이며, PRD 범위(In) 5개 항목을 모두 덮습니다. 제외한 Story는 1개로, "앱 20개 × 공장 3곳" 조건은 전역 REQ로 옮겼습니다.
- **REQ:** 73개(BE 49 / FE 24)이고, 모든 Story에 REQ가 하나 이상 있습니다.
- **인용 정책:** 정책 대장 v2.0의 41개 항목이며, 모두 현행 상태입니다. 개정·폐지된 항목은 없습니다.
- **미결 사항(gaps):** 6개 가운데 5개는 결정됐습니다. 화면 두 메뉴 분리, 공장 등록·계정 생성은 범위 밖 등입니다. 미해결은 "성공 지표의 기준선"(김윤주, MVP 적용 후 첫 측정) 1개뿐입니다.

**리뷰 반영**
1. **Brief:** 무엇·누가·핵심 규칙·화면·범위 밖·남은 결정의 6줄로 나누고, 줄마다 근거 각주를 달았습니다.
2. **적용 정책 표:** general-spec-writer 스킬을 고쳤습니다. 이제 표는 기본으로 접혀 있고, POL ID·버전·상태·적용 REQ만 보여 줍니다. 정책 문장은 정책 대장에서 POL ID로 찾으면 됩니다. 개정 추적용 스냅샷은 spec.json에 그대로 남아 있습니다. 함께 고친 파일은 [assemble_spec.py](../../skills/general-spec-writer/scripts/assemble_spec.py), 템플릿, 평가 문서, 테스트 1개입니다.
3. **범위:** 공장 등록과 계정 생성은 범위 밖이라는 결정을 기록했습니다.

**과정에서 알게 된 점**
- PRD가 작업 도중 v0.3으로 올라갔습니다. 바뀐 내용이 Spec 결정(SQ4)과 같아서 근거 버전만 v0.3으로 갱신했습니다.
- 리뷰어가 지적한 3건(한 REQ에 두 동작, 정책 인용 누락, 확인할 수 없는 동사)을 고쳤고, 재확인에서 통과했습니다.

**남은 문제**
- Brief 끝의 각주 중복은 조립 스크립트가 Brief 끝에 각주 묶음을 한 번 더 붙이기 때문에 생깁니다. 이번 문서에서는 제가 직접 지웠지만, Spec을 다시 조립하면 중복이 다시 생깁니다. 원하시면 이것도 스킬에서 고치겠습니다.

**다음 단계:** `status: ready`로 올리려면 말씀해 주세요. 와이어프레임 작업은 `/general-wireframe-writer`로 이어서 진행할 수 있습니다. 스킬 수정 사항을 포함해 커밋이 필요하면 말씀해 주세요.

---

## 🙋 사용자 · 2026-09-27 08:33

> Policy보고 있는데
> 앱 등록 Role 보유자	Plant Operator	도 본인 역할 R는 되어야하지 않아?

## 💬 Claude · 2026-09-27 08:33

맞습니다. 지금 매트릭스에서 "역할·접근 권한" 행은 두 역할이 모두 `-`(권한 없음)로 되어 있습니다. 그러면 자기가 어떤 앱을 쓸 수 있는지조차 확인할 수 없습니다. POL-043이 금지하는 것은 역할·권한을 "관리"하는 일이고, 자기 것을 "보는" 일은 아니므로 서로 충돌하지 않습니다. 다만 이 내용을 규칙 문장으로 쓴 항목이 아직 없으니 정책 항목을 하나 추가해야 합니다. 범위를 한 가지만 확인하겠습니다.

**❓ Claude 질문**

- 앞 등록 Role 보유자와 Plant Operator가 볼 수 있는 '본인 정보'의 범위를 어디까지 둘까요? (수정·삭제는 계속 Platform Admin만 합니다)
  - *본인 계정 + 역할·접근 권한 (Recommended)*: 매트릭스의 '계정'과 '역할·접근 권한' 두 행을 R (본인)으로 바꾼다. 자기 소속 공장·역할·쓸 수 있는 앱을 한 화면에서 확인하는 것이 일반적이다
  - *역할·접근 권한만*: '역할·접근 권한' 행만 R (본인)으로 바꾼다. 계정 행은 그대로 둔다

**🙋 사용자 답변**

- 앞 등록 Role 보유자와 Plant Operator가 볼 수 있는 '본인 정보'의 범위를 어디까지 둘까요? (수정·삭제는 계속 Platform Admin만 합니다)  
  → **본인 계정 + 역할·접근 권한 (Recommended)**

<details><summary>🔧 작업 2건</summary>

- Bash: Back up policy and read matrix section
- Bash: Apply own-info view rule and gate policy

</details>

정책 대장이 v2.1로 올라갔고 게이트도 통과했습니다. 줄바꿈이 유지됐는지 확인하고, Spec의 정책 스냅샷도 v2.1 기준으로 맞추겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Check spacing, refresh Spec snapshot to v2.1, gate

</details>

말씀하신 대로 반영했습니다. 정책 대장은 v2.1로 올라갔습니다.

- **매트릭스:** 앱 등록 Role 보유자와 Plant Operator의 "계정"·"역할·접근 권한" 행을 `-`에서 `R (본인)`으로 바꿨습니다.
- **새 규칙:** 매트릭스는 요약이므로 규칙 문장도 하나 추가했습니다.
  - 6-2-7. 앱 등록 Role 보유자와 Plant Operator는 자기 계정 정보와 자기 역할·접근 권한을 볼 수 있다. 수정과 회수는 Platform Admin만 한다. [POL-060]
- **다른 규칙과의 관계:** POL-043(두 역할은 계정·역할·접근 권한을 "관리"할 수 없다)과 충돌하지 않습니다. 보기는 허용하고 관리는 계속 막는 구조입니다.
- **기록:** 개정 이력에 v2.1 행을 추가했고, 인터뷰 기록에 PQ42로 남겼습니다. 정책 게이트는 통과했습니다.
- **Spec 영향:** Spec의 정책 기준 버전을 v2.1로 갱신했습니다. 기존에 인용한 41개 항목은 바뀌지 않았고, Spec 게이트도 다시 통과했습니다.

한 가지 알아 두실 점이 있습니다. POL-060을 쓰는 Story가 아직 없어서, "내 계정·권한 보기" 화면에 대한 REQ는 Spec에 없습니다. 와이어프레임에서 이 화면이 필요하면 Story를 하나 추가하겠습니다. 예를 들면 "Plant Operator는 쓸 수 있는 앱을 확인하기 위해, 자기 역할과 접근 권한을 볼 수 있다" 같은 Story입니다.

---

## 🙋 사용자 · 2026-09-27 08:36

> 앱 등록 Role 이름을 Application Manager라고 하자
> 그리고 Role을 부여받을수 있는 사람 예시는 이미 있어서 괜찮아

## 💬 Claude · 2026-09-27 08:36

정책 대장과 Spec에 "앱 등록 Role 보유자"가 몇 곳에 나오는지 먼저 확인하겠습니다.

<details><summary>🔧 작업 3건</summary>

- Bash: Count role-name occurrences across docs
- Bash: Back up policy and inspect item structure
- Bash: Log rename and build revise changes

</details>

하위 목록 문장이 어색하게 바뀌었습니다. 예시 부분은 원문 그대로 두고 이름만 바꾸도록 고쳐서 적용하겠습니다.

<details><summary>🔧 작업 3건</summary>

- Bash: Apply rename to policy and verify
- Bash: Rename in Spec, resnapshot v2.2, reassemble, gate
- Bash: Log rename in Spec interview

</details>

역할 이름을 **Application Manager**로 바꿨습니다. 역할을 받을 수 있는 사람의 예시(현장의 원프레딕트 Application PM, 고객사 IT 엔지니어)는 말씀대로 그대로 두었습니다.

**정책 대장: v2.2**
- 이름이 들어간 규칙 6개를 개정했습니다. POL-035(역할 목록), POL-039·040·041·043·060입니다.
- 역할 매트릭스의 열 이름과 용어 정의도 바꿨고, 옛 용어 행은 지웠습니다.
- 개정 이력에 v2.2 행을 추가했습니다. v2.1 행의 옛 이름은 과거 기록이라 그대로 두었습니다.
- 인터뷰 기록에는 PQ43으로 남겼고, 정책 게이트를 통과했습니다.

**Spec**
- Story 주체, Story 문장, REQ, gap, Brief에서 이름을 모두 바꿨습니다. 문서에 옛 이름은 0건이고, Application Manager는 11건입니다.
- 정책 스냅샷을 v2.2로 갱신했습니다. 이름 변경 때문에 인용 정책 1건이 "개정됨"으로 잡혔지만 값은 그대로이며, 갱신 뒤에는 0건입니다.
- 인터뷰 기록에 SQ15로 남겼고, Spec 게이트도 통과했습니다.

**확인이 필요한 점**
- **PRD:** [[PRD] pdx 앱 온보딩·배포.md]([PRD] pdx 앱 온보딩·배포.md)에는 옛 이름이 4곳 남아 있습니다. PRD는 이번 지시 범위에 넣지 않았습니다. 세 문서의 이름을 맞추려면 말씀해 주세요. 그때 v0.4로 올려 수정하겠습니다.
- **비슷한 이름:** "Application Manager"(pdx 역할)와 "Application PM"(원프레딕트의 직무)은 이름이 비슷해서, 와이어프레임이나 발표 자료에서 헷갈릴 수 있습니다. 지금 용어 정의에서는 "Application PM이 Application Manager 역할을 받을 수 있다"로 둘을 구분해 두었습니다.

---

## 🙋 사용자 · 2026-09-27 08:38

> 그리고 용어중에 사용 요청 이런얘기가 좀 어색해서 접근 권한 요청 이런식으로 바꾸자

## 💬 Claude · 2026-09-27 08:38

먼저 "사용 요청"과 그와 짝을 이루는 "사용 권한"이 어디에 어떻게 쓰였는지 확인하겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Find usage-request terms in policy and spec

</details>

**❓ Claude 질문**

- '사용 요청' → '접근 권한 요청'으로 바꾸면서, 사람이 앱을 쓰는 권한을 부르는 '사용 권한'도 '접근 권한'으로 통일할까요? (앱이 데이터를 읽는 '데이터 접근 권한'과 등록 정보의 '필요 권한'은 별개 개념이라 그대로 둡니다)
  - *접근 권한으로 통일 (Recommended)*: 예: '접근 권한을 받은 앱만 쓸 수 있다', '접근 권한 요청을 승인하면 곧바로 접근 권한이 부여된다'. 장 제목은 '계정과 접근 권한 요청'이 된다
  - *'사용 요청'만 변경*: '사용 권한'은 그대로 둔다(PRD 용어집의 '사용 권한' 정의와 맞음)

**🙋 사용자 답변**

- '사용 요청' → '접근 권한 요청'으로 바꾸면서, 사람이 앱을 쓰는 권한을 부르는 '사용 권한'도 '접근 권한'으로 통일할까요? (앱이 데이터를 읽는 '데이터 접근 권한'과 등록  
  → **음.. 사용 권한 요청... 그렇게 바꾸자**

<details><summary>🔧 작업 3건</summary>

- Bash: Rename usage request term in policy
- Bash: Fix deferred row, rename in Spec, resnapshot, gate
- Bash: Verify remaining occurrence and no duplicated words

</details>

"사용 요청"을 "**사용 권한 요청**"으로 바꿨습니다. 처음에는 "접근 권한 요청"을 말씀하셨지만, 이어진 답에 따라 "사용 권한"은 그대로 두었습니다. PRD 용어집의 "사용 권한"(사람이 앱을 쓰는 권한) 정의와 맞추기 위해서입니다.

**정책 대장: v2.3**
- 규칙 5개를 개정했습니다. POL-041·043·051·052·054입니다.
- 함께 바꾼 곳: 장 제목 "7. 계정과 사용 권한 요청", 절 제목 "7-2. 사용 권한 요청", 총칙의 목적, Plant Operator 용어 정의, 매트릭스의 "사용 권한 요청" 행, 부칙의 "다음에 걸릴 항목" 표입니다.
- 옛 이름은 v2.3 개정 이력의 "사용 요청 → 사용 권한 요청" 설명에만 남아 있습니다.
- 인터뷰 기록에 PQ44로 남겼고, 정책 게이트를 통과했습니다.

**Spec**
- Story 문장, Category(`계정 관리 / 사용 권한 요청`), REQ 문장, 화면 이름("사용 권한 요청 화면")을 바꿨습니다.
- 정책 스냅샷을 v2.3으로 갱신했습니다. 값은 바뀐 것이 없습니다.
- 문서에서 옛 용어는 0건이고, "권한 권한"처럼 단어가 겹친 곳도 없습니다.
- 인터뷰 기록에 SQ16으로 남겼고, Spec 게이트를 통과했습니다.

PRD에는 "사용 요청"과 옛 역할 이름(앱 등록 Role 보유자)이 그대로 남아 있습니다. 두 용어를 PRD까지 맞추려면 말씀해 주세요. 그때 v0.4로 함께 수정하겠습니다.

---

## 🙋 사용자 · 2026-09-27 09:07

> SPEC안에 과제 범위 모두 포함한 것이 맞는지 재검토
>
> 반드시다룰범위
>
> * application등록→검토/승인→대상Workspace선택→설정·권한확인→배포→상태확인의핵심흐름
> * application버전,환경,데이터접근권한,배포상태,변경·감사이력
> * 공통플랫폼기능과application팀책임의경계
> * 실패·승인반려·권한부족·버전충돌중최소2개예외상황
> * MVP와후속범위의구분

## 💬 Claude · 2026-09-27 09:07

과제의 필수 범위 5개 항목을 기준으로 현재 Spec 전문을 대조하겠습니다. 먼저 최신 Spec을 읽습니다.

<details><summary>🔧 작업 3건</summary>

- Bash: Read current Spec body for scope review
- Read: C:\Users\pca02\.claude\projects\C--Users-pca02-Works-projects-codex-onepredict\d5a4357b-4292-4f62-ab28-a0e5ad4a3312\tool
- Bash: List uncited policies and PRD boundary lines

</details>

대조를 마쳤습니다. 결론부터 말씀드리면, 5개 항목 가운데 핵심 흐름·예외 상황·MVP 구분은 충족합니다. 반면 **책임 경계**와 **환경·데이터 접근 권한**은 Spec에서 비어 있거나 약합니다.

| 필수 범위 | 판정 | Spec 근거 / 빠진 것 |
|---|---|---|
| ① 등록 → 검토·승인 → 대상 Workspace 선택 → 설정·권한 확인 → 배포 → 상태 확인 | ✅ 충족 | 순서대로 REG-001 → APRV-001 → DEPLOY-001 → DEPLOY-001-1·002 → DEPLOY-003 → DEPLOY-003-1·STAT-001~003. 6단계가 모두 Story와 REQ로 있습니다 |
| ② 버전 | ✅ | AppVersion 엔티티, 등록 형식(POL-008), 등록 상태 3단계 |
| ② 환경 | ⚠️ 약함 | 점검 REQ는 공장의 pdx 버전·MxFM 버전·설치된 앱 버전과 비교합니다. 그런데 데이터 모델에 이 값을 담는 필드가 없습니다(Workspace에는 `is_active`만 있음). 비교 대상이 정의되지 않은 상태입니다 |
| ② 데이터 접근 권한 | ⚠️ 약함 | 점검 ④·⑤와 "설정 부족 채우기"(DEPLOY-002)는 있습니다. 하지만 "앱이 공장의 어떤 데이터에 접근을 허락받았는가"를 담는 모델이 없고, 채우기 REQ도 "항목을 채운다"로만 되어 있습니다 |
| ② 배포 상태 | ✅ | 버전×공장 6단계 상태, 차단 사유, 완료 기준(헬스체크 + 데이터 수신) |
| ② 변경·감사 이력 | ✅ | 자동 기록, 기록 항목, 수정·삭제 불가, 조회 기록, 1년 보관 |
| ③ 공통 플랫폼 기능과 앱 팀 책임 경계 | ❌ 부족 | 정책에는 있지만 Spec이 인용하지 않았습니다. POL-011(등록 정보 내용은 앱 팀 책임), POL-014(Admin은 내용, 시스템은 형식을 검토), POL-028(pdx 밖 설치 금지)이 해당합니다. PRD가 "Spec에서 정한다"고 넘긴 핵심 객체 연결(POL-001)도 인용되지 않았습니다. PRD 책임 경계의 "**등록 시 충돌 알림**"은 Spec에 아예 없습니다 |
| ④ 예외 최소 2개 | ✅ 4개 모두 | 승인 반려(APRV-002·002-1), 버전 충돌(DEPLOY-001-2), 권한 부족(설정 부족·권한 거부 REQ), 실패(DEPLOY-017·019). 다만 실패 뒤 Admin이 다시 실행하는 REQ(POL-033)는 빠져 있습니다 |
| ⑤ MVP와 후속 범위 구분 | ✅ | gap 표에 범위 밖 항목들(결정됨)과 Brief의 "범위 밖" 줄이 있습니다. 미룬 정책(동시 대기 상한, 처리 기한)은 정책 대장 부칙에 있습니다 |

과제 평가 관점에서 보면 ③이 가장 위험합니다. 과제가 이름을 들어 요구한 항목인데, Spec 문서만 읽어서는 경계가 보이지 않기 때문입니다.

**❓ Claude 질문**

- 부족한 부분을 어떻게 보완할까요? 아래는 모두 정책 대장에 이미 있는 값만 인용하므로 새 값을 지어내지 않습니다.
  - *③ 책임 경계 Story·REQ*: 시스템 Story 1개와 REQ를 추가한다. 인용할 정책은 등록 정보 내용은 앱 팀 책임(POL-011), pdx는 형식 검증·Admin은 내용 검토(POL-014), pdx 밖 설치 금지(POL-028)다. Brief에 '책임 경계' 줄도 추가한다 (Recommended)
  - *② 환경·데이터 접근 권한 모델*: 데이터 모델에 Workspace 환경(pdx 버전·MxFM 버전), 공장별 설치 앱 버전, 공장×앱 데이터 접근 허용을 추가한다(POL-001·021 근거). 채우기 REQ를 '권한 부여·데이터 연결'로 구체화한다 (Recommended)
  - *④ 실패 후 재실행 REQ*: 실패 상태에서 Platform Admin이 다시 실행하면 설치 중으로 바뀐다. 자동 재시도는 하지 않는다(POL-030·033) (Recommended)
- PRD 책임 경계에 'pdx는 등록 시 충돌 알림을 제공한다'가 있지만, 지금 Spec과 정책은 충돌을 배포 대상을 고를 때만 검사합니다. 어떻게 할까요?
  - *등록 시 미리 알림 추가 (Recommended)*: 등록이 들어오면 시스템이 모든 공장에 버전 검사(①~③)를 미리 돌려, 충돌이 예상되는 공장을 검토 화면에 알린다. 등록은 막지 않는다(막는 것은 배포 때). 정책 항목이 새로 필요하다
  - *배포 시 검사로 충분*: 등록 단계에서는 알리지 않는다. PRD 문구를 '배포 전 충돌 차단'으로 고칠지는 따로 정한다

**🙋 사용자 답변**

- 부족한 부분을 어떻게 보완할까요? 아래는 모두 정책 대장에 이미 있는 값만 인용하므로 새 값을 지어내지 않습니다.  
  → **1. 이거 책임 경계 부분은.. SPEC에서 정리하는게 맞나?? PRD로 올라가야하는게 아닐까??
2. 실패 후에는 등록 과정부터 재시도,② 환경·데이터 접근 권한 모델**
- PRD 책임 경계에 'pdx는 등록 시 충돌 알림을 제공한다'가 있지만, 지금 Spec과 정책은 충돌을 배포 대상을 고를 때만 검사합니다. 어떻게 할까요?  
  → **이 부분 내가 헷갈리는데 등록 시에는 등록을 위한 정보가 부족한지 여부를 확인하는 게 우선 순위고, 충돌이 예상되는 공장 안내는 Admin이 승인하는 것과는 별개로 WorkSpace에 선택해서 설정 권한 확인 하는 과정에서 나와야하는게 아닐까 싶었거든??
그런데 등록하는 것 자체도 충돌할 수도 있겠다 싶기도 하네...??
한번 비판적 피드백 부탁해**

세 가지 모두 판단이 갈리는 지점이라, 제 의견을 비판적으로 정리했습니다.

**1. 책임 경계는 Spec이 아니라 PRD에 둬야 하지 않나?**

절반은 맞습니다. 책임 경계를 세 층으로 나눠 보면 이렇습니다.
- **원칙**(누가 무엇을 책임지는가): PRD의 일입니다. 이미 PRD "책임 경계"에 있습니다.
- **규칙**(판정 기준): 정책의 일입니다. 이미 POL-011·014·028에 있습니다.
- **시스템 행동**: Spec의 일입니다. 지금 비어 있는 곳이 여기입니다. 예를 들어 "pdx 밖 설치 금지(POL-028)"를 시스템이 어떻게 막는지에 대한 REQ가 없습니다.

따라서 Spec에 "책임 경계" 절을 새로 쓰는 것은 중복이고, 행동 REQ만 보완하면 됩니다. 오히려 고쳐야 할 곳은 PRD입니다. PRD의 "핵심 객체 연결과 고객 설정의 책임은 Spec 문서에서 정한다"는 실제로는 정책 대장(POL-001, 6장)에서 정했으므로, 이 문구가 틀렸습니다.

**2. 실패하면 등록부터 다시?**

이렇게 정하면 현재 정책 세 개와 부딪힙니다.
- POL-033: 원인을 해결한 뒤 Admin이 다시 실행한다.
- POL-009: 승인된 버전은 다시 등록할 수 없다.
- POL-019: 승인됨은 종료 상태다.

실무에서도 문제가 생깁니다.
- 실패 원인이 **환경**(데이터 커넥터 중단, 서버 문제)이면 패키지는 멀쩡합니다. 그런데도 새 버전을 만들어 재승인을 받아야 합니다.
- 공장 1곳만 실패해도 새 버전이 되므로 나머지 공장까지 버전이 갈라집니다.

반대로 원인이 **패키지 자체**(앱 결함)라면 등록부터 다시 하는 것이 맞습니다. 그래서 **원인별로 나누는 안**을 추천합니다.

**3. 등록 시 충돌 알림**

처음 판단이 맞습니다. 충돌은 두 종류로 나뉩니다.
- **(a) 공장과 무관한 충돌**: 등록 정보가 그 앱 자신의 버전 이력과 모순되는 경우입니다. 예를 들어 v2.1이 이미 승인됐는데 v2.0.1이 들어오거나, "업그레이드 가능한 이전 버전"이 존재하지 않는 버전을 가리키는 경우입니다. 이런 충돌은 공장을 고르기 전에도 판정할 수 있으므로 **등록 시점**에 잡는 것이 맞습니다. 이것이 "등록 자체도 충돌할 수 있다"고 느끼신 부분입니다.
- **(b) 공장에 따라 다른 충돌**: pdx·MxFM 버전, 설치된 버전과의 경로가 해당합니다. 이런 충돌은 공장을 골라야 판정할 수 있으므로 **배포 대상 선택 단계**에 두는 것이 맞습니다(현재 구조).

다만 (a)는 아직 정책에 규칙이 없습니다. 그래서 규칙을 정해야 합니다.

**❓ Claude 질문**

- 책임 경계를 어떻게 처리할까요?
  - *PRD 원칙 + Spec은 행동 REQ만 (Recommended)*: Spec에 경계 절을 만들지 않고, POL-014(형식은 시스템·내용은 Admin)와 POL-028(pdx 밖 설치 금지)을 구현하는 REQ만 추가한다. PRD의 'Spec에서 정한다' 문구는 '정책 대장에서 정한다'로 고친다
  - *PRD에만 둠*: Spec은 손대지 않고 PRD 문구만 고친다. POL-028은 REQ 없이 정책으로만 남는다
- 배포가 실패하면 어떻게 다시 시도할까요? (어느 경우든 실패한 공장은 이전 버전을 유지합니다)
  - *원인별 분기 (Recommended)*: 환경 원인(데이터 연결·서버)은 Admin이 원인을 해결하고 같은 버전을 다시 실행한다. 패키지 원인(앱 결함)은 앱 팀이 고친 새 버전을 등록부터 다시 한다. 원인 구분은 실패 단계(설치/헬스체크/데이터 수신)로 표시하고 판단은 Admin이 한다
  - *항상 등록부터*: 모든 실패는 새 버전 등록부터 다시 한다. 환경 문제여도 재승인이 필요하다
  - *현행 유지*: Admin이 원인을 해결하고 같은 버전을 다시 실행한다(POL-033 그대로). 앱 결함이면 자연스럽게 새 버전이 등록된다
- 등록 시점에 검사할 '공장과 무관한 충돌' 규칙을 골라 주세요. 위반하면 형식 위반처럼 등록을 받지 않고 어긋난 항목을 표시합니다.
  - *새 버전 > 최신 승인 버전*: 같은 앱에서 이미 승인된 가장 높은 버전보다 낮은 버전은 등록할 수 없다 (Recommended)
  - *이전 버전은 실제 있는 버전*: '업그레이드 가능한 이전 버전'은 그 앱에 이미 승인된 버전이어야 한다(첫 버전은 예외) (Recommended)
  - *이전 버전 < 새 버전*: '업그레이드 가능한 이전 버전'은 새 버전보다 낮아야 한다 (Recommended)

**🙋 사용자 답변**

- 책임 경계를 어떻게 처리할까요?  
  → **PRD에만 두자. 최종 제출할때는 원래 PRD부터 SPec까지 전체 제출할거니까, PRD에만 있으면 돼. 원래 PRD에 Out of Scope인건 그 다음단계로 안넘기기로 했으니까**
- 배포가 실패하면 어떻게 다시 시도할까요? (어느 경우든 실패한 공장은 이전 버전을 유지합니다)  
  → **모두 등록부터한다. 재실행은 필요시 추후 개선 업데이트 (MVP범위는 아님)**
- 등록 시점에 검사할 '공장과 무관한 충돌' 규칙을 골라 주세요. 위반하면 형식 위반처럼 등록을 받지 않고 어긋난 항목을 표시합니다.  
  → **새 버전 > 최신 승인 버전,이전 버전은 실제 있는 버전,이전 버전 < 새 버전**

---

## 🙋 사용자 (작업 중 보낸 메시지) · 2026-09-27 09:16

> pdx 앱 온보딩·배포 정책 개정 요청 (v2.3 → v2.4)
> 근거: `[Wireframe] pdx 앱 온보딩·배포` 인터뷰 기록 WG-05, WG-08, WG-10, 구조 검토 의견 5건 (2026-09-27)
> A. 배포 이력 생성 시점 (WG-10)
> 결정 요약: 배포 전 점검 결과는 저장하지 않는 임시 결과로 둡니다. Platform Admin이 실행을 확인할 때만 배포 이력을 만들고, 그때의 점검 결과를 스냅샷으로 함께 저장합니다. 변경 기록은 상태를 바꾼 행위만 남기므로, 점검 단계의 차단은 기록하지도 알리지도 않습니다.
> A-1. POL-030 개정 (5-2-1 배포 상태)
>
> * 현행: "배포는 승인된 버전과 공장의 조합마다 다음 여섯 상태 중 하나를 가진다." 상태는 배포 대기·차단됨·설치 중·동작 확인 중·완료·실패입니다.
> * 개정안: "배포 이력은 Platform Admin이 실행을 확인한 승인된 버전과 공장의 조합에만 생기며, 다음 네 상태 중 하나를 가진다."
>    * 설치 중: 설치가 진행된다. 끝나면 동작 확인 중, 실패하면 실패
>    * 동작 확인 중: 정상 동작을 확인한다. 확인되면 완료, 기한 안에 확인되지 않으면 실패
>    * 완료: 정상 동작이 확인됐다(종료 상태)
>    * 실패: 설치 또는 동작 확인이 실패했다
> * 이유: 공장을 고르고 점검만 해도 '배포 대기'나 '차단됨'이 저장되면, 실행하지 않은 배포가 이력에 남습니다.
>
> A-2. 신설 (4장 배포 전 점검, 4-1-5)
>
> * 신설안: "배포 전 점검 결과(통과·버전 충돌·설정 부족)는 화면에 보여 주는 임시 결과이며 저장하지 않는다. 점검만으로는 배포 이력이 생기지 않는다."
> * 이유: '대상 공장 선택·점검'과 '배포 실행·이력'의 경계를 정책 문장으로 고정합니다.
>
> A-3. 신설 (5-1 실행, 5-1-4)
>
> * 신설안: "Platform Admin이 배포 실행을 확인하면 시스템은 그때 배포 이력을 만들고, 실행 직전의 배포 전 점검 결과(검사 항목별 결과와 비교한 값)를 스냅샷으로 함께 저장한다."
> * 이유: 차단 기록을 없애는 대신, 이 공장에 배포해도 된다고 본 근거를 실행 이력에 남깁니다.
>
> A-4. POL-025 개정 (4-2-1)
>
> * 현행: "설정 부족으로 표시된 항목은 Platform Admin만 채울 수 있고, 채운 뒤 검사를 다시 통과해야 배포 대기가 된다."
> * 개정안: "설정 부족으로 표시된 항목은 Platform Admin만 채울 수 있고, 채운 뒤 검사를 다시 통과해야 배포를 실행할 수 있다."
> * 이유: '배포 대기' 상태가 없어지기 때문입니다.
>
> A-5. POL-026 개정 (4-2-2)
>
> * 현행: "…Platform Admin이 그 선행 버전을 먼저 배포한 뒤 원래 배포를 다시 실행한다."
> * 개정안: "…Platform Admin이 그 선행 버전을 먼저 배포한 뒤, 원래 버전의 배포 전 점검부터 다시 한다."
> * 이유: 원래 배포가 이력으로 남아 있지 않으므로, 다시 실행할 대상이 없습니다.
>
> A-6. POL-031 폐지 (5-2-2)
>
> * 현행: "배포 상태가 차단됨이면 사유를 버전 충돌 또는 설정 부족 중에서 반드시 표시해야 한다."
> * 개정안: 폐지합니다. 사유를 표시하는 규칙은 POL-022(4-1-2)에 이미 있습니다.
> * 이유: '차단됨'이 배포 상태에서 빠지고, POL-022와 내용이 겹칩니다.
>
> A-7. POL-033 개정 (5-3-1)
>
> * 현행: "…시스템은 자동으로 재시도하지 않고, Platform Admin이 원인을 해결한 뒤 다시 실행한다."
> * 개정안: "…시스템은 자동으로 재시도하지 않고, Platform Admin이 원인을 해결한 뒤 배포 전 점검부터 다시 거쳐 실행한다."
> * 이유: 새 실행에는 새 점검 스냅샷이 필요합니다.
>
> A-8. POL-034 개정 (5-3-2)
>
> * 현행: "배포가 차단되거나 실패하면 시스템은 Platform Admin과 그 버전을 등록한 사람에게 pdx 안에서 알린다…"
> * 개정안: "배포가 실패하면 시스템은 Platform Admin과 그 버전을 등록한 사람에게 pdx 안에서 알린다. 외부 알림(메일·문자)은 보내지 않는다."
> * 이유: 점검 단계의 차단은 이력이 아니므로 알림 대상도 아닙니다.
> * 감수하는 점: 등록한 사람(Application Manager)은 "공장 B에서 버전 충돌로 막혔다"는 신호를 받지 못합니다.
>
> A-9. POL-054 개정 (8-1-1)
>
> * 현행 둘째 항목: "배포 실행, 반영(완료), 차단, 실패"
> * 개정안 둘째 항목: "배포 실행, 반영(완료), 실패"
> * 이유: 변경 기록은 상태를 바꾼 행위만 남깁니다.
>
> B. 변경 기록 항목 (구조 검토 4번)
> B-1. POL-055 개정 (8-1-2)
>
> * 현행: 요청자·승인자·실행자·반영 시점 / 대상 / 처리 결과, 반려·거절·제한일 때 그 사유
> * 개정안: "변경 기록에는 다음 항목을 남긴다."
>    * 요청자, 승인자, 실행자(처리자), 처리 시각과 반영 시점
>    * 대상(앱·버전·공장 또는 계정)
>    * 변경 전 값과 변경 후 값(역할·접근 권한·계정 상태·등록 상태·배포 상태·사용 권한 요청 상태)
>    * 처리 결과, 반려·거절·제한일 때 그 사유
>    * 배포 실행이면 실행 당시 배포 전 점검 결과 스냅샷(A-3)
> * 이유: 권한 부여·제한·차단과 사용 권한 요청 승인·거절 처리 직후, 처리자·대상·변경 전후 값·사유·시각을 공통으로 기록하기 위해서입니다. 현행 항목에는 '변경 전후 값'이 없습니다.
>
> C. 동시 처리 (WG-05, 구조 검토 5번)
> C-1. 신설 (3-1 검토·승인, 3-1-7)
>
> * 신설안: "승인·반려는 승인 대기 상태의 등록에만 할 수 있다. 다른 Platform Admin이 먼저 승인하거나 반려한 등록에는 다시 승인·반려할 수 없으며, 시스템은 먼저 처리된 결과를 유지한다."
> * 이유: 여러 Admin이 같은 등록을 동시에 처리할 때 결과가 덮어쓰이는 것을 막습니다. 화면에서는 이미 처리됐다고 안내하고 승인·반려 버튼을 비활성화합니다.
>
> C-2. 신설 후보 (7-2 사용 권한 요청, 7-2-6) (적용 여부 확인 필요)
>
> * 신설안: "사용 권한 요청의 승인·거절은 처리 대기 상태의 요청에만 할 수 있다. 먼저 처리된 요청에는 다시 승인·거절할 수 없다."
>
> D. 사용 권한 요청 결과 확인 위치 (WG-08)
> D-1. POL-053 개정 (7-2-5)
>
> * 현행: "요청자는 pdx의 자기 요청 목록에서 결과와 사유를 확인하며, 시스템은 별도의 외부 알림을 보내지 않는다."
> * 개정안: "요청자는 pdx 안에서 자기 요청의 결과와 사유를 확인하며, 시스템은 별도의 외부 알림을 보내지 않는다."
> * 이유: 와이어프레임에서는 별도 목록을 두지 않고 공장 화면의 앱 행에 결과를 표시합니다. 정책에는 화면 위치를 적지 않습니다.
>
> 정책 개정 뒤 Spec에서 따라 고칠 항목
>
> * REQ-BE-DEPLOY-010(배포 대기 전환)과 REQ-BE-DEPLOY-014(차단됨 사유)를 A-2와 A-3에 맞춰 고치거나 없앱니다.
> * REQ-BE-DEPLOY-018에서 차단 알림을 뺍니다.
> * REQ-BE-AUDIT-003에서 '차단'을 빼고, REQ-FE-STAT-004에서 차단 사유 요약을 뺍니다.
> * 데이터 모델의 Deployment 상태 목록을 4개로 줄이고, 점검 스냅샷 항목을 더합니다.
> * 배포 실행 시 스냅샷 저장, 동시 처리 거부, 변경 기록 항목 확장에 대한 REQ를 새로 만듭니다.
> * 정책이 아닌 Spec에서만 다룰 항목도 있습니다: 변경 기록 필터 5종(기간·공장·앱·행위자·행위 유형)과 빈 결과, 헤더 알림함과 배너, 화면 이름 정렬(상태 확인 화면을 공장 화면으로)입니다.
>
> 개정 전에 정할 것
>
> 1. POL-031을 폐지할지, 아니면 "점검에서 막힌 공장은 사유를 표시한다"는 문장으로 4장에 옮길지 정해야 합니다.
> 2. 동시 처리 규칙(C-2)을 사용 권한 요청에도 적용할지 정해야 합니다.
> 3. 배포 실행 시 저장하는 스냅샷의 범위를 정해야 합니다. 검사 항목별 통과 여부만 남길지, 비교한 값(등록 정보 값과 공장 현재 값)까지 남길지입니다.
>
>
> 추가 검토 함께 진행

<details><summary>🔧 작업 1건</summary>

- Bash: Check wireframe interview records and PRD metrics

</details>

## 💬 Claude · 2026-09-27 09:20

**❓ Claude 질문**

- 배포 실패 후 처리가 두 결정에서 다릅니다. 어느 쪽으로 정할까요? (어느 쪽이든 실패한 공장은 이전 버전을 유지하고, 자동 재시도는 하지 않습니다)
  - *등록부터 (방금 결정)*: 실패하면 앱 팀이 새 버전을 등록해 승인부터 다시 밟는다. 같은 버전 재실행은 MVP 밖(후속 개선)이다. 환경 문제로 실패해도 새 버전이 필요하다
  - *점검부터 재실행 (A-7)*: Admin이 원인을 해결하고 같은 버전의 배포 전 점검부터 다시 거쳐 실행한다. 앱 결함이 원인이면 자연스럽게 새 버전이 등록된다
- A안대로 점검 결과를 저장하지 않으면, PRD 성공 지표 '배포 전 설정 누락 발견율'과 '충돌 배포 전 차단율'의 분자(배포 전에 찾은 건수)를 셈 수 없습니다. 어떻게 할까요?
  - *집계용 점검 로그만 남김 (Recommended)*: 배포 이력·변경 기록·알림에는 넣지 않는다(A안 유지). 대신 점검이 끝날 때마다 '언제·어느 버전×공장·어떤 사유로 막혔는지'를 지표 집계용 로그로만 남긴다. 화면에는 보이지 않는다
  - *지표 정의를 바꿈*: 점검 결과는 남기지 않고, PRD 지표를 실행 스냅샷과 배포 후 발견분만으로 잴 수 있게 다시 정의한다(PRD 개정 필요)
  - *감수*: 두 지표는 수작업 집계로 돌린다. gap으로 남긴다
- 배포 실행 때 저장하는 점검 스냅샷의 범위는?
  - *비교한 값까지 (Recommended)*: 검사 ①~⑤의 통과 여부와 함께 비교한 두 값(등록 정보 값·공장 현재 값)을 남긴다. 예: pdx 버전 지원 범위 2.1~2.3 / 공장 2.2 / 통과
  - *통과 여부만*: 검사 항목별 통과·실패만 남긴다
- 나머지 두 가지 확인입니다. 해당하는 것을 모두 골라 주세요.
  - *POL-031 폐지*: 사유 표시는 POL-022가 이미 정한다. 4장으로 옮기지 않고 폐지한다 (Recommended)
  - *C-2 사용 권한 요청에도 동시 처리 규칙*: 처리 대기 상태의 요청에만 승인·거절할 수 있고, 먼저 처리된 요청은 다시 처리할 수 없다 (Recommended)

**🙋 사용자 답변**

- 배포 실패 후 처리가 두 결정에서 다릅니다. 어느 쪽으로 정할까요? (어느 쪽이든 실패한 공장은 이전 버전을 유지하고, 자동 재시도는 하지 않습니다)  
  → **등록부터 (방금 결정)**
- A안대로 점검 결과를 저장하지 않으면, PRD 성공 지표 '배포 전 설정 누락 발견율'과 '충돌 배포 전 차단율'의 분자(배포 전에 찾은 건수)를 셈 수 없습니다. 어떻게 할까요?  
  → **집계용 점검 로그만 남김 (Recommended)**
- 배포 실행 때 저장하는 점검 스냅샷의 범위는?  
  → **비교한 값까지 (Recommended)**
- 나머지 두 가지 확인입니다. 해당하는 것을 모두 골라 주세요.  
  → **POL-031 폐지,C-2 사용 권한 요청에도 동시 처리 규칙**

<details><summary>🔧 작업 3건</summary>

- Bash: Find wireframe interview entries for Spec-only items
- Bash: Back up policy v2.3 and read items to revise
- Bash: Log decisions and apply policy v2.4 changes

</details>

정책 v2.4가 적용됐고 게이트를 통과했습니다. 새 항목의 번호와 배치를 확인하겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Verify new policy items placement

</details>

배치는 의도대로입니다. 개정되지 않은 다른 항목에 "배포 대기"나 "차단됨"이 남아 있지 않은지 확인하겠습니다.

<details><summary>🔧 작업 2건</summary>

- Bash: Search policy for stale state names
- Bash: Dump REQs and data model structure

</details>

이제 Spec 수정 스크립트를 한 번에 적용하겠습니다. 수정 전 spec.json은 백업해 둡니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Apply v2.4 and review changes to spec.json

</details>

셸 인용 문제로 명령이 실행되지 않았습니다(아무것도 바뀌지 않았습니다). 스크립트를 파일로 저장해 다시 실행하겠습니다.

<details><summary>🔧 작업 3건</summary>

- Bash: Confirm nothing was applied
- Write: C:\Users\pca02\AppData\Local\Temp\claude\C--Users-pca02-Works-projects-codex-onepredict\d5a4357b-4292-4f62-ab28-a0e5ad4a
- Bash: Check supported EARS pattern names

</details>

패턴 이름은 모두 지원되는 값입니다. 스크립트를 실행하고, 인터뷰 기록은 파이썬으로 추가하겠습니다.

<details><summary>🔧 작업 1건</summary>

- Bash: Apply Spec v2.4 changes, snapshot, render, gate

</details>

와이어프레임 인터뷰 출처 키에 공백과 대괄호가 있어 각주 파서가 읽지 못합니다. 공백 없는 키로 바꾸겠습니다.

<details><summary>🔧 작업 2건</summary>

- Bash: Fix wireframe source keys and re-gate
- SendMessage: 

</details>

이전 리뷰어는 세션이 바뀌어 다시 부를 수 없습니다. 새 리뷰어에게 변경분 검토를 맡기겠습니다.

<details><summary>🔧 작업 1건</summary>

- 🤖 서브에이전트 호출: Review Spec v2.4 delta

</details>

<details><summary>🤖 서브에이전트 보고</summary>

검토 완료. `.spec-work/review.json` 작성함 (verdict: pass, errors: 0, warnings: 0).

## 요약

신규 REQ 16개, 변경 REQ 12개(정책 ref만 v2.3→v2.4 갱신된 44개는 노이즈로 제외), 삭제 REQ 1개(REQ-BE-DEPLOY-014)를 PRD·정책 v2.4·SPEC-인터뷰(SQ17~19)·Policy-인터뷰(PQ45·46)·Wireframe-인터뷰(WG-05~10, 구조 검토)와 전수 대조했습니다.

**Hard 위반(A~C) 없음:**
- 신규 REQ의 값(등록 버전 규칙 POL-061~063, 동시 처리 거부 POL-064·068, 점검 임시결과·로그 POL-065·066, 실행 스냅샷 POL-067, 실패 후 재시도 금지 POL-033, 실패 알림 POL-034, 변경기록 항목 확장 POL-055)이 모두 정책 원문과 정확히 일치합니다.
- POL-031(폐지) 관련 REQ-BE-DEPLOY-014 삭제, "차단됨"·"배포 대기" 상태·문구가 spec.json·SPEC.md 어디에도 남아있지 않음을 grep으로 확인했습니다.
- 데이터 모델 델타(Workspace.pdx_version/mxfm_version, InstalledApp, DataAccessGrant, CheckLog, Deployment.check_snapshot, ChangeLog 필드 확장)는 전부 SQ18·POL-066·067·055에 근거가 있고 창작된 항목이 없습니다.
- policy_check.json 스냅샷이 v2.4 기준 48개 unchanged, verdict pass — 인용 정책이 모두 최신 문구와 일치.

**판단 요청 사항(REQ-FE-AUDIT-002·003 정책 인용 없음):** 규칙상 허용됩니다. `spec-section-prompts.md` §6은 "기한·한도·권한·예외" 값에만 POL id 인용을 강제하는데, 이 두 REQ의 값(필터 5종·빈 결과 표시)은 화면 정보구조 결정이라 정책 세 조건(사람이 정함/여러 행동에 적용/구현 무관)에 해당하지 않습니다. 근거는 Wireframe-인터뷰.md#구조검토-변경기록조회, SQ19이며 SPEC.md 각주([^38][^39])와도 정확히 일치합니다. A4 위반이 아닙니다.

**참고(스펙 결함 아님):** `.spec-work/policy_items.json`(리뷰어 입력용 정책 원문 캐시)에 POL-061~068 항목이 아직 없습니다. spec.json·SPEC.md 자체는 정책 원문(Policy.md)과 직접 대조해 문제없음을 확인했지만, 이 캐시 파일은 다음 리뷰 라운드 전에 policy_check 파이프라인으로 갱신해두는 게 좋습니다.

문서(spec.json, SPEC.md)는 수정하지 않았습니다.

</details>

리뷰를 통과했습니다(오류 0, 경고 0). 리뷰어가 짚은 정책 원문 캐시(`policy_items.json`)를 갱신하고, 최종 문서를 보내 드리겠습니다.

<details><summary>🔧 작업 2건</summary>

- Bash: Refresh policy items cache
- 📎 파일 전달: C:/Users/pca02/Works/projects/codex-onepredict/[Spec] pdx 앱 온보딩·배포.md, C:/Users/pca02/Works/projects/codex-onepredict/[Policy] pdx 앱 온보딩·배포.md

</details>

과제 범위 재검토와 정책 v2.4 개정 요청을 함께 반영했습니다. 정책 게이트와 Spec 게이트, 변경분 적대적 리뷰(오류 0)를 모두 통과했습니다.

**과제 필수 범위: 최종 판정**

| 필수 범위 | 판정 | 어디서 다루나 |
|---|---|---|
| ① 등록→승인→대상 선택→설정·권한 확인→배포→상태 확인 | ✅ | Spec Story와 REQ로 6단계를 모두 다룹니다 |
| ② 버전·배포 상태·변경·감사 이력 | ✅ | Spec. 변경 기록에 변경 전후 값과 실행 스냅샷을 추가했습니다 |
| ② 환경·데이터 접근 권한 | ✅ (보완함) | 데이터 모델에 공장 환경(pdx·MxFM 버전), 공장별 설치 앱 버전, 공장×앱 데이터 접근 허용을 추가했습니다. "채우기" REQ도 "필요 권한 부여·데이터 연결"로 구체화했습니다 |
| ③ 플랫폼과 앱 팀 책임 경계 | ✅ (결정대로) | PRD(원칙)와 정책(POL-011·014·028)에 둡니다. Spec에는 넣지 않는다는 결정을 gap으로 기록했습니다 |
| ④ 예외 최소 2개 | ✅ 4개 | 승인 반려, 버전 충돌, 권한 부족(설정 부족), 실패 |
| ⑤ MVP와 후속 구분 | ✅ | gap 표와 Brief. 이번에 "같은 버전 재실행은 후속"도 추가했습니다 |

**정책 v2.4에서 바뀐 것**
- **요청하신 개정 A~D:** 모두 반영했습니다. 배포 이력은 실행을 확인할 때만 생기고, 배포 상태는 4단계가 됐습니다. 이 밖에 점검 결과 임시 처리, 실행 스냅샷(비교한 값 포함), POL-031 폐지, 동시 처리 규칙(등록·사용 권한 요청 모두), 변경 기록 항목 확장이 들어갔습니다.
- **A-7만 결정에 맞춰 바꿨습니다:** 실패하면 같은 버전을 다시 실행하지 않고, 원인을 고친 새 버전을 등록부터 합니다.
- **새로 추가한 규칙**
  - 등록 버전 규칙 3개(POL-061~063): 등록 시점에 공장과 무관한 충돌을 잡습니다.
  - 지표 집계용 점검 로그(POL-066): PRD 성공 지표 두 개를 계속 잴 수 있게 하려고 넣었습니다.

**Spec에서 바뀐 것**
- REQ는 73개에서 88개가 됐습니다. 16개를 새로 만들고 12개를 고쳤으며, 1개(차단됨 사유)를 지웠습니다.
- Spec에만 해당하는 항목도 넣었습니다. 변경 기록 필터 5종과 빈 결과, 헤더 알림함과 배너, "상태 확인 화면"을 "공장 화면"으로 바꾼 이름입니다.
- **충돌을 하나 정리했습니다.** WG-06은 "실패·차단 배너"로 되어 있었지만, v2.4는 차단을 알림에서 뺍니다. 그래서 배너와 알림함은 실패만 보여 주고, 차단은 점검 결과 영역에만 표시하도록 정해 gap에 기록했습니다.

**감수하는 점과 남은 일**
- **Application Manager의 신호:** 공장별 충돌로 막혀도 Application Manager는 알림을 받지 않습니다(A-8에서 감수하기로 한 점). 등록 시점의 버전 규칙이 공장과 무관한 충돌만은 미리 잡아 줍니다.
- **환경 원인의 실패:** 데이터 연결이 끊기는 등 환경 때문에 실패해도 새 버전과 재승인이 필요합니다. 운영 부담이 커지면 "같은 버전 재실행"을 후속으로 검토하면 됩니다.
- **REQ가 많은 Story:** 게이트가 경고한 대로 DEPLOY-003-1에 REQ가 11개 몰려 있습니다. 실패 처리를 별도 Story로 떼면 읽기 쉬워지지만, Story의 이유 문장이 PRD에서 와야 한다는 규칙 때문에 이번에는 그대로 두었습니다.
- **PRD 문구:** PRD의 "핵심 객체 연결과 고객 설정의 책임은 Spec 문서에서 정한다"는 실제와 맞지 않습니다(정책 대장에서 정했습니다). 같은 PRD에 옛 역할 이름과 "사용 요청"도 남아 있습니다. 세 곳을 v0.4로 함께 고칠지 말씀해 주세요.
- **와이어프레임:** 정책이 바뀌었으므로 와이어프레임의 배포 상태 표시와 배너도 v2.4에 맞춰 다시 확인해야 합니다.

---

## 🙋 사용자 · 2026-09-27 11:17

> 이거 세션 링크 얻고싶은데 어떻게 해?

## 💬 Claude · 2026-09-27 11:17

세션 정보에 공유용 링크가 들어 있는지 먼저 확인해 보겠습니다.

<details><summary>🔧 작업 2건</summary>

- ToolSearch: 
- mcp__ccd_session_mgmt__get_session: 

</details>

이 세션의 링크는 다음과 같습니다.

```
claude://claude.ai/epitaxy/local_2e83b49d-3186-4046-b2b5-dbe5264a7aa8
```

다만 쓰임새가 제한적입니다. `claude://` 형식이라 **이 컴퓨터에 설치된 Claude 데스크톱 앱에서만** 열립니다. 다른 사람에게 보내거나 브라우저에서 여는 링크가 아닙니다. 슬랙이나 메모에 적어 두고 나중에 이 세션으로 돌아올 때 쓰시면 됩니다.

목적에 따라 다른 방법도 있습니다.
- **다른 기기(휴대폰·웹)에서 이 세션을 보고 싶을 때:** 이 세션은 이미 Remote Control이 켜져 있습니다. claude.ai/code나 Claude 모바일 앱에서 이 세션("AI Factory OS_SPEC 작성")을 바로 열 수 있습니다. 웹 주소는 앱 상단 툴바의 Remote Control 메뉴에서 확인할 수 있습니다. 저는 그 주소를 조회할 수 없습니다.
- **대화 내용을 파일로 남기거나 다른 사람에게 전달하고 싶을 때:** 세션 기록을 zip으로 내보낼 수 있습니다. 파일은 이 컴퓨터의 다운로드 폴더에 저장되고, 어디에도 업로드되지 않습니다. 필요하시면 말씀해 주세요. 바로 내보내 드리겠습니다.

---

## 🙋 사용자 · 2026-09-27 11:17

> 세션기록 zip으로 내보내줘

