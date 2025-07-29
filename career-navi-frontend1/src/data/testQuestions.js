const testQuestions = [
  // LS (Love Style) - 16 questions
  {
    id: 1,
    dimension: "LS",
    question: "연애를 시작할 때 나는?",
    options: [
      { text: "먼저 표현하고 다가가는 편이다", value: 2 },
      { text: "적절히 타이밍을 보며 움직인다", value: 1 },
      { text: "상대가 먼저 다가오길 기다리는 편이다", value: 0 }
    ]
  },
  {
    id: 2,
    dimension: "LS",
    question: "마음에 드는 사람이 생기면 나는?",
    options: [
      { text: "먼저 연락을 시도한다", value: 2 },
      { text: "은근히 신호를 보낸다", value: 1 },
      { text: "기다리면서 지켜본다", value: 0 }
    ]
  },
  {
    id: 3,
    dimension: "LS",
    question: "데이트 장소를 정할 때 나는?",
    options: [
      { text: "내가 먼저 제안하는 편이다", value: 2 },
      { text: "서로 조율하며 정한다", value: 1 },
      { text: "상대방의 의견을 먼저 듣는다", value: 0 }
    ]
  },
  {
    id: 4,
    dimension: "LS",
    question: "연애 초반 나의 모습은?",
    options: [
      { text: "리드하며 분위기를 주도한다", value: 2 },
      { text: "조화롭게 이끌어간다", value: 1 },
      { text: "상대에게 맞춰가는 편이다", value: 0 }
    ]
  },
  {
    id: 5,
    dimension: "LS",
    question: "사랑을 표현할 때 나는?",
    options: [
      { text: "표현이 적극적이고 과감하다", value: 2 },
      { text: "필요할 때 표현한다", value: 1 },
      { text: "표현보다 행동으로 보여준다", value: 0 }
    ]
  },
  {
    id: 6,
    dimension: "LS",
    question: "연애 중 갈등 상황에서 나는?",
    options: [
      { text: "먼저 사과하거나 화해를 시도한다", value: 2 },
      { text: "타이밍을 보고 대화한다", value: 1 },
      { text: "상대방이 먼저 말 걸어오길 기다린다", value: 0 }
    ]
  },
  {
    id: 7,
    dimension: "LS",
    question: "이별 후의 나는?",
    options: [
      { text: "직접 정리하고 연락을 끊는다", value: 2 },
      { text: "서로 조율해가며 끝맺는다", value: 1 },
      { text: "상대가 먼저 끝내주길 바란다", value: 0 }
    ]
  },
  {
    id: 8,
    dimension: "LS",
    question: "연애에서 리드를 하는 편인가요?",
    options: [
      { text: "거의 항상 그렇다", value: 2 },
      { text: "상황에 따라 다르다", value: 1 },
      { text: "거의 하지 않는 편이다", value: 0 }
    ]
  },
  {
    id: 9,
    dimension: "LS",
    question: "상대가 주도권을 쥐는 연애가 편한가요?",
    options: [
      { text: "아니다, 내가 주도하는 걸 좋아한다", value: 2 },
      { text: "상황에 따라 다르다", value: 1 },
      { text: "그렇다, 상대가 주도해주는 게 좋다", value: 0 }
    ]
  },
  {
    id: 10,
    dimension: "LS",
    question: "호감 있는 이성과의 첫 만남에서 나는?",
    options: [
      { text: "먼저 말을 걸고 리드한다", value: 2 },
      { text: "눈치 보며 적절히 반응한다", value: 1 },
      { text: "상대가 먼저 리드해주길 기다린다", value: 0 }
    ]
  },
  {
    id: 11,
    dimension: "LS",
    question: "연애 중 중요한 결정을 할 때 나는?",
    options: [
      { text: "먼저 방향을 제시한다", value: 2 },
      { text: "의견을 주고받으며 결정한다", value: 1 },
      { text: "상대방의 의견을 따라간다", value: 0 }
    ]
  },
  {
    id: 12,
    dimension: "LS",
    question: "서프라이즈 이벤트를 준비하는 편인가요?",
    options: [
      { text: "자주 한다", value: 2 },
      { text: "가끔 한다", value: 1 },
      { text: "거의 하지 않는다", value: 0 }
    ]
  },
  {
    id: 13,
    dimension: "LS",
    question: "상대를 설득하거나 이끄는 일에 익숙한가요?",
    options: [
      { text: "그렇다", value: 2 },
      { text: "보통이다", value: 1 },
      { text: "아니다", value: 0 }
    ]
  },
  {
    id: 14,
    dimension: "LS",
    question: "데이트에서 대화 주제를 주도하는 편인가요?",
    options: [
      { text: "대부분 내가 주도한다", value: 2 },
      { text: "상황에 따라 다르다", value: 1 },
      { text: "상대가 주도하는 편이다", value: 0 }
    ]
  },
  {
    id: 15,
    dimension: "LS",
    question: "처음 만난 자리에서 주도적으로 분위기를 이끄는가?",
    options: [
      { text: "그렇다", value: 2 },
      { text: "가끔 그렇다", value: 1 },
      { text: "거의 아니다", value: 0 }
    ]
  },
  {
    id: 16,
    dimension: "LS",
    question: "리드가 많은 연애를 할 때 나는?",
    options: [
      { text: "즐겁고 자연스럽다", value: 2 },
      { text: "조금 부담스럽다", value: 1 },
      { text: "편하지 않다", value: 0 }
    ]
  },

  // DL (Daily Life) - 16 questions
  {
    id: 17,
    dimension: "DL",
    question: "연애 중 데이트는 보통 어떻게 하나요?",
    options: [
      { text: "정해진 요일과 시간에 하는 걸 선호한다", value: 2 },
      { text: "그때그때 조율해서 정한다", value: 1 },
      { text: "즉흥적으로 만나는 편이다", value: 0 }
    ]
  },
  {
    id: 18,
    dimension: "DL",
    question: "하루 일과는 어떤가요?",
    options: [
      { text: "일정한 루틴이 있다", value: 2 },
      { text: "적당히 계획하고 유동적으로 움직인다", value: 1 },
      { text: "계획 없이 즉흥적으로 움직인다", value: 0 }
    ]
  },
  {
    id: 19,
    dimension: "DL",
    question: "연인과 일상을 공유할 때 나는?",
    options: [
      { text: "매일 정기적으로 연락한다", value: 2 },
      { text: "필요할 때 연락하고 공유한다", value: 1 },
      { text: "각자 시간에 집중하고 가끔 공유한다", value: 0 }
    ]
  },
  {
    id: 20,
    dimension: "DL",
    question: "주말 계획은 보통 어떻게 세우나요?",
    options: [
      { text: "미리 정해둔다", value: 2 },
      { text: "하루 전에 생각한다", value: 1 },
      { text: "그날 기분 따라 정한다", value: 0 }
    ]
  },
  {
    id: 21,
    dimension: "DL",
    question: "연애 중 일상 관리 스타일은?",
    options: [
      { text: "규칙적으로 챙기며 계획적으로 행동한다", value: 2 },
      { text: "상황에 따라 조절하며 균형을 맞춘다", value: 1 },
      { text: "내키는 대로 움직이는 편이다", value: 0 }
    ]
  },
  {
    id: 22,
    dimension: "DL",
    question: "연인과의 연락 패턴은?",
    options: [
      { text: "정해진 시간에 주기적으로 한다", value: 2 },
      { text: "필요할 때 자연스럽게 한다", value: 1 },
      { text: "그날그날 기분 따라 다르다", value: 0 }
    ]
  },
  {
    id: 23,
    dimension: "DL",
    question: "데이트 장소는 어떻게 고르나요?",
    options: [
      { text: "미리 예약하거나 정해둔다", value: 2 },
      { text: "서로 이야기해서 정한다", value: 1 },
      { text: "당일 기분 따라 정한다", value: 0 }
    ]
  },
  {
    id: 24,
    dimension: "DL",
    question: "하루 중 가장 안정감을 느끼는 시간은?",
    options: [
      { text: "예측 가능한 일정 속 시간", value: 2 },
      { text: "생각하지 않고 쉬는 시간", value: 1 },
      { text: "예상치 못한 즐거움이 생기는 순간", value: 0 }
    ]
  },
  {
    id: 25,
    dimension: "DL",
    question: "연인과의 시간 활용 방식은?",
    options: [
      { text: "일정을 계획해 정해진 활동을 한다", value: 2 },
      { text: "상황에 따라 활동을 조절한다", value: 1 },
      { text: "즉흥적인 데이트를 즐긴다", value: 0 }
    ]
  },
  {
    id: 26,
    dimension: "DL",
    question: "갑작스러운 약속 변경이 생기면 나는?",
    options: [
      { text: "혼란스럽고 당황스럽다", value: 2 },
      { text: "조금 불편하지만 조율 가능하다", value: 1 },
      { text: "상관없이 유연하게 반응한다", value: 0 }
    ]
  },
  {
    id: 27,
    dimension: "DL",
    question: "하루 루틴이 깨졌을 때 나는?",
    options: [
      { text: "스트레스를 받는다", value: 2 },
      { text: "약간 불편하지만 넘긴다", value: 1 },
      { text: "신경 쓰지 않는다", value: 0 }
    ]
  },
  {
    id: 28,
    dimension: "DL",
    question: "자기 전 하는 행동은?",
    options: [
      { text: "항상 같은 순서대로 루틴을 따른다", value: 2 },
      { text: "그날 상태에 따라 다르다", value: 1 },
      { text: "즉흥적으로 행동한다", value: 0 }
    ]
  },
  {
    id: 29,
    dimension: "DL",
    question: "연인과의 기념일은?",
    options: [
      { text: "매번 챙기고 계획한다", value: 2 },
      { text: "기억하긴 하지만 가볍게 넘어간다", value: 1 },
      { text: "기억 못 할 때도 있다", value: 0 }
    ]
  },
  {
    id: 30,
    dimension: "DL",
    question: "반복되는 일상에 대한 나의 생각은?",
    options: [
      { text: "편안하고 안정적이다", value: 2 },
      { text: "가끔 지루하지만 필요하다", value: 1 },
      { text: "지루하고 변화를 원한다", value: 0 }
    ]
  },
  {
    id: 31,
    dimension: "DL",
    question: "데이트 일정이 정해졌을 때 나는?",
    options: [
      { text: "꼼꼼히 준비하며 기대한다", value: 2 },
      { text: "적당히 준비한다", value: 1 },
      { text: "계획 없이 즉흥적으로 만난다", value: 0 }
    ]
  },
  {
    id: 32,
    dimension: "DL",
    question: "나의 생활 방식은?",
    options: [
      { text: "계획형으로 일정이 정해져 있어야 한다", value: 2 },
      { text: "상황 따라 조정 가능한 균형형이다", value: 1 },
      { text: "그날그날 느낌대로 사는 즉흥형이다", value: 0 }
    ]
  },

  // EM (Emotion) - 16 questions
  {
    id: 33,
    dimension: "EM",
    question: "기분이 좋을 때 나는?",
    options: [
      { text: "말과 행동으로 표현한다", value: 2 },
      { text: "가벼운 미소나 눈빛으로 표현한다", value: 1 },
      { text: "속으로만 느끼는 편이다", value: 0 }
    ]
  },
  {
    id: 34,
    dimension: "EM",
    question: "연인과 갈등이 생겼을 때 나는?",
    options: [
      { text: "감정을 솔직하게 말한다", value: 2 },
      { text: "돌려 말하거나 조심스럽게 표현한다", value: 1 },
      { text: "일단 감추고 혼자 삭인다", value: 0 }
    ]
  },
  {
    id: 35,
    dimension: "EM",
    question: "연인에게 감동받았을 때 나는?",
    options: [
      { text: "바로 고맙다고 말하며 표현한다", value: 2 },
      { text: "미소나 눈빛으로 표현한다", value: 1 },
      { text: "표현은 안 하지만 기억에 담는다", value: 0 }
    ]
  },
  {
    id: 36,
    dimension: "EM",
    question: "마음이 힘들 때 나는?",
    options: [
      { text: "연인에게 먼저 털어놓는다", value: 2 },
      { text: "상황을 보며 말할지 고민한다", value: 1 },
      { text: "혼자 해결하려 한다", value: 0 }
    ]
  },
  {
    id: 37,
    dimension: "EM",
    question: "데이트 중 기쁜 일이 생기면 나는?",
    options: [
      { text: "바로 리액션하며 함께 즐긴다", value: 2 },
      { text: "미소로 반응한다", value: 1 },
      { text: "속으론 기쁘지만 겉으론 담담하다", value: 0 }
    ]
  },
  {
    id: 38,
    dimension: "EM",
    question: "연애 중 감정 표현이 많은 편인가요?",
    options: [
      { text: "감정 표현이 많은 편이다", value: 2 },
      { text: "보통이다", value: 1 },
      { text: "감정을 많이 숨기는 편이다", value: 0 }
    ]
  },
  {
    id: 39,
    dimension: "EM",
    question: "연인의 감정 기복이 있을 때 나는?",
    options: [
      { text: "공감하고 함께 감정을 나눈다", value: 2 },
      { text: "조심스럽게 접근한다", value: 1 },
      { text: "거리 두며 관찰한다", value: 0 }
    ]
  },
  {
    id: 40,
    dimension: "EM",
    question: "사랑한다는 말을 얼마나 자주 하나요?",
    options: [
      { text: "매우 자주 한다", value: 2 },
      { text: "가끔은 한다", value: 1 },
      { text: "거의 하지 않는다", value: 0 }
    ]
  },
  {
    id: 41,
    dimension: "EM",
    question: "서운할 때 나는?",
    options: [
      { text: "즉시 이야기하며 풀려고 한다", value: 2 },
      { text: "기다리다 타이밍 봐서 말한다", value: 1 },
      { text: "그냥 참는 편이다", value: 0 }
    ]
  },
  {
    id: 42,
    dimension: "EM",
    question: "연인의 감정 표현이 많을 때 나는?",
    options: [
      { text: "같이 리액션하며 감정을 나눈다", value: 2 },
      { text: "편하게 받아주지만 따라가긴 어렵다", value: 1 },
      { text: "조금 부담스럽다", value: 0 }
    ]
  },
  {
    id: 43,
    dimension: "EM",
    question: "감정을 말로 풀어내는 게 편한가요?",
    options: [
      { text: "매우 편하다", value: 2 },
      { text: "노력하고 있다", value: 1 },
      { text: "불편하고 잘 하지 않는다", value: 0 }
    ]
  },
  {
    id: 44,
    dimension: "EM",
    question: "상대가 무뚝뚝하면 나는?",
    options: [
      { text: "내가 먼저 감정을 끌어올린다", value: 2 },
      { text: "적당히 맞춰간다", value: 1 },
      { text: "같이 말 수가 줄어든다", value: 0 }
    ]
  },
  {
    id: 45,
    dimension: "EM",
    question: "감정 표현 스타일은?",
    options: [
      { text: "말, 표정, 행동 모두 풍부하다", value: 2 },
      { text: "상황에 따라 달라진다", value: 1 },
      { text: "거의 표현하지 않는다", value: 0 }
    ]
  },
  {
    id: 46,
    dimension: "EM",
    question: "연인의 표정이나 기분 변화에 나는?",
    options: [
      { text: "즉시 알아채고 반응한다", value: 2 },
      { text: "느끼지만 관찰하고 지켜본다", value: 1 },
      { text: "잘 눈치 못 챈다", value: 0 }
    ]
  },
  {
    id: 47,
    dimension: "EM",
    question: "상대가 감정을 터놓을 때 나는?",
    options: [
      { text: "경청하고 내 감정도 나눈다", value: 2 },
      { text: "경청은 하지만 내 이야긴 아낀다", value: 1 },
      { text: "어색하거나 벽을 느낀다", value: 0 }
    ]
  },
  {
    id: 48,
    dimension: "EM",
    question: "감정이 격해졌을 때 나는?",
    options: [
      { text: "그때그때 바로 표현한다", value: 2 },
      { text: "조절하려 노력한다", value: 1 },
      { text: "되도록 감추거나 눌러둔다", value: 0 }
    ]
  },

  // DP (Date Preference) - 16 questions
  {
    id: 49,
    dimension: "DP",
    question: "데이트를 계획할 때 나는?",
    options: [
      { text: "사전에 꼼꼼히 계획한다", value: 2 },
      { text: "대략적인 틀만 정한다", value: 1 },
      { text: "그날의 기분대로 움직인다", value: 0 }
    ]
  },
  {
    id: 50,
    dimension: "DP",
    question: "새로운 장소를 갈 때 나는?",
    options: [
      { text: "리뷰나 정보를 미리 찾아본다", value: 2 },
      { text: "어느 정도만 확인한다", value: 1 },
      { text: "직접 가서 즉흥적으로 판단한다", value: 0 }
    ]
  },
  {
    id: 51,
    dimension: "DP",
    question: "데이트 당일 상황이 달라졌을 때 나는?",
    options: [
      { text: "미리 준비한 일정이 어긋나는 게 불편하다", value: 2 },
      { text: "조금 아쉽지만 유연하게 대응한다", value: 1 },
      { text: "즉흥적인 변화가 오히려 좋다", value: 0 }
    ]
  },
  {
    id: 52,
    dimension: "DP",
    question: "여행을 준비할 때 나는?",
    options: [
      { text: "계획표와 예산을 철저히 짠다", value: 2 },
      { text: "중요한 부분만 챙기고 나머진 자유롭게", value: 1 },
      { text: "현지 가서 즉석에서 정한다", value: 0 }
    ]
  },
  {
    id: 53,
    dimension: "DP",
    question: "연인과 함께 보내는 하루를 어떻게 계획하나요?",
    options: [
      { text: "정해진 시간표대로 움직인다", value: 2 },
      { text: "상황에 맞게 유연하게 조정한다", value: 1 },
      { text: "즉흥적으로 계획 없이 논다", value: 0 }
    ]
  },
  {
    id: 54,
    dimension: "DP",
    question: "주말 일정은 보통 언제 정하나요?",
    options: [
      { text: "일주일 전 미리 정한다", value: 2 },
      { text: "전날쯤 이야기한다", value: 1 },
      { text: "그날 아침에 정한다", value: 0 }
    ]
  },
  {
    id: 55,
    dimension: "DP",
    question: "계획에 없던 상황이 생기면 나는?",
    options: [
      { text: "불편하고 조절이 어렵다", value: 2 },
      { text: "당황스럽지만 적응한다", value: 1 },
      { text: "오히려 즐겁고 신난다", value: 0 }
    ]
  },
  {
    id: 56,
    dimension: "DP",
    question: "갑작스런 여행 제안이 들어오면 나는?",
    options: [
      { text: "준비가 안 되면 거절한다", value: 2 },
      { text: "상황을 보고 수락한다", value: 1 },
      { text: "흥미롭고 즐겁게 바로 수락한다", value: 0 }
    ]
  },
  {
    id: 57,
    dimension: "DP",
    question: "일정 없이 쉬는 날 나는?",
    options: [
      { text: "할 일을 정해두고 움직인다", value: 2 },
      { text: "그날 기분에 따라 조절한다", value: 1 },
      { text: "완전히 즉흥적으로 보낸다", value: 0 }
    ]
  },
  {
    id: 58,
    dimension: "DP",
    question: "여유 시간이 생기면 나는?",
    options: [
      { text: "계획해둔 걸 한다", value: 2 },
      { text: "기분 따라 할 일을 정한다", value: 1 },
      { text: "아무 생각 없이 논다", value: 0 }
    ]
  },
  {
    id: 59,
    dimension: "DP",
    question: "계획한 데이트가 취소되면 나는?",
    options: [
      { text: "많이 실망하고 불편하다", value: 2 },
      { text: "아쉽지만 괜찮다", value: 1 },
      { text: "오히려 자유 시간이 생겨 좋다", value: 0 }
    ]
  },
  {
    id: 60,
    dimension: "DP",
    question: "데이트 스타일은?",
    options: [
      { text: "계획형 - 철저한 준비와 예상", value: 2 },
      { text: "균형형 - 준비 + 유연함", value: 1 },
      { text: "자유형 - 즉흥적이고 감성적인", value: 0 }
    ]
  },
  {
    id: 61,
    dimension: "DP",
    question: "데이트를 준비할 때 나는?",
    options: [
      { text: "정확한 시간과 장소를 미리 정해둔다", value: 2 },
      { text: "대략만 정하고 여지를 둔다", value: 1 },
      { text: "당일 느낌대로 움직인다", value: 0 }
    ]
  },
  {
    id: 62,
    dimension: "DP",
    question: "즉흥적으로 장소를 바꾸자고 하면?",
    options: [
      { text: "계획이 틀어져서 불편하다", value: 2 },
      { text: "당황하지만 따라간다", value: 1 },
      { text: "더 재밌어진다", value: 0 }
    ]
  },
  {
    id: 63,
    dimension: "DP",
    question: "데이트 전에 옷, 코스, 시간 모두 정해두는 편인가요?",
    options: [
      { text: "꼼꼼히 준비하는 걸 좋아한다", value: 2 },
      { text: "어느 정도는 정해두고 간다", value: 1 },
      { text: "그날 감정과 기분에 따라 간다", value: 0 }
    ]
  },
  {
    id: 64,
    dimension: "DP",
    question: "데이트 중 예상치 못한 이벤트가 생기면?",
    options: [
      { text: "계획을 망쳐 불쾌하다", value: 2 },
      { text: "당황스럽지만 수용한다", value: 1 },
      { text: "색다르고 즐겁다", value: 0 }
    ]
  },
    // PI (Physical Intimacy) - 16 questions
  {
    id: 65,
    dimension: "PI",
    question: "스킨십에 대해 나는?",
    options: [
      { text: "자연스럽고 중요한 애정 표현이다", value: 2 },
      { text: "상황과 분위기에 따라 다르다", value: 1 },
      { text: "조심스럽고 신중해야 한다", value: 0 }
    ]
  },
  {
    id: 66,
    dimension: "PI",
    question: "첫 만남 이후 스킨십은?",
    options: [
      { text: "편하면 바로 가능하다", value: 2 },
      { text: "감정 교류 후 가능하다", value: 1 },
      { text: "시간이 많이 지난 뒤에야 가능하다", value: 0 }
    ]
  },
  {
    id: 67,
    dimension: "PI",
    question: "데이트 중 손잡기 같은 가벼운 스킨십은?",
    options: [
      { text: "먼저 자연스럽게 한다", value: 2 },
      { text: "상대가 하면 맞춘다", value: 1 },
      { text: "익숙해질 때까지 기다린다", value: 0 }
    ]
  },
  {
    id: 68,
    dimension: "PI",
    question: "대중 앞에서의 스킨십은?",
    options: [
      { text: "자연스럽고 개의치 않는다", value: 2 },
      { text: "상황에 따라 괜찮다", value: 1 },
      { text: "부담스럽고 피하는 편이다", value: 0 }
    ]
  },
  {
    id: 69,
    dimension: "PI",
    question: "스킨십을 통해 느끼는 감정은?",
    options: [
      { text: "상대와의 애착과 안정감", value: 2 },
      { text: "따뜻함과 편안함", value: 1 },
      { text: "긴장감 또는 어색함", value: 0 }
    ]
  },
  {
    id: 70,
    dimension: "PI",
    question: "연인과 스킨십의 빈도는?",
    options: [
      { text: "자주 하고 싶다", value: 2 },
      { text: "적당히 필요하다", value: 1 },
      { text: "많이 없어도 괜찮다", value: 0 }
    ]
  },
  {
    id: 71,
    dimension: "PI",
    question: "서로의 공간과 거리에 대해 나는?",
    options: [
      { text: "가까이 붙어 있는 게 좋다", value: 2 },
      { text: "가끔은 거리가 필요하다", value: 1 },
      { text: "개인 공간이 중요하다", value: 0 }
    ]
  },
  {
    id: 72,
    dimension: "PI",
    question: "스킨십이 연애에서 차지하는 비중은?",
    options: [
      { text: "크고 중요하다", value: 2 },
      { text: "보통이다", value: 1 },
      { text: "적은 편이다", value: 0 }
    ]
  },
  {
    id: 73,
    dimension: "PI",
    question: "연인의 스킨십 요청에 나는?",
    options: [
      { text: "편하게 받아준다", value: 2 },
      { text: "상황을 보고 반응한다", value: 1 },
      { text: "부담스러울 수 있다", value: 0 }
    ]
  },
  {
    id: 74,
    dimension: "PI",
    question: "감정이 깊어질수록 스킨십은?",
    options: [
      { text: "더 자주 자연스러워진다", value: 2 },
      { text: "상황 따라 달라진다", value: 1 },
      { text: "여전히 조심스럽다", value: 0 }
    ]
  },
  {
    id: 75,
    dimension: "PI",
    question: "스킨십의 주도권은?",
    options: [
      { text: "내가 리드하는 편이다", value: 2 },
      { text: "서로 조율한다", value: 1 },
      { text: "상대가 리드하길 바란다", value: 0 }
    ]
  },
  {
    id: 76,
    dimension: "PI",
    question: "감정 없는 스킨십은?",
    options: [
      { text: "거부감이 든다", value: 2 },
      { text: "불편하지만 가능한 경우도 있다", value: 1 },
      { text: "크게 개의치 않는다", value: 0 }
    ]
  },
  {
    id: 77,
    dimension: "PI",
    question: "스킨십이 자연스러운 순간은?",
    options: [
      { text: "감정이 깊고 분위기가 무르익을 때", value: 2 },
      { text: "가벼운 스킨십은 아무 때나 가능", value: 1 },
      { text: "상황에 따라 크게 다르다", value: 0 }
    ]
  },
  {
    id: 78,
    dimension: "PI",
    question: "스킨십으로 상대의 마음을 느낀 적이 있나요?",
    options: [
      { text: "자주 그렇다", value: 2 },
      { text: "가끔 그렇다", value: 1 },
      { text: "잘 모르겠다", value: 0 }
    ]
  },
  {
    id: 79,
    dimension: "PI",
    question: "연애에서 스킨십이 없으면?",
    options: [
      { text: "섭섭하고 거리감이 느껴진다", value: 2 },
      { text: "아쉽지만 감정이 더 중요하다", value: 1 },
      { text: "큰 상관 없다", value: 0 }
    ]
  },
  {
    id: 80,
    dimension: "PI",
    question: "스킨십을 시작하는 타이밍은?",
    options: [
      { text: "자연스러운 분위기 속에서 먼저 한다", value: 2 },
      { text: "서로 눈치 보며 시작된다", value: 1 },
      { text: "상대가 먼저 다가오길 기다린다", value: 0 }
    ]
  }

];

export default testQuestions;
