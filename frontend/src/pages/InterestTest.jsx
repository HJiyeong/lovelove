import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function InterestTest() {
    const [sessionId, setSessionId] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.post('/api/test/start', {
            userId: 'testuser123',
            testType: '흥미 검사'
        }).then(res => {
            const id = res.data.sessionId;
            setSessionId(id);
            return axios.get(`/api/test/questions/${id}`);
        }).then(res => {
            setQuestions(res.data.RESULT);
        });
    }, []);

    const handleAnswer = async (answerScore) => {
        if (!sessionId || isLoading) return;
        setIsLoading(true);

        const qNo = current + 1;
        const updatedAnswers = [...answers, { questionNo: qNo, answerValue: answerScore }];
        setAnswers(updatedAnswers);

        try {
            await axios.post('/api/test/answer', {
                sessionId,
                questionNo: qNo,
                answerValue: answerScore
            });

            if (current < questions.length - 1) {
                setCurrent(current + 1);
                setIsLoading(false);
            } else {
                const answerString = updatedAnswers.map(ans => `${ans.questionNo}=${ans.answerValue}`).join(' ');
                const result = await axios.post('/api/test/submit', {
                    sessionId,
                    userInfo: {
                        name: '황지영',
                        gender: '100324',
                        grade: '3',
                        school: 'DGIST',
                        email: '',
                        startDtm: Date.now(),
                        answers: answerString
                    }
                });
                navigate('/test/result_personality', { state: { result: result.data } });
            }
        } catch (err) {
            console.error('❌ 제출 실패:', err.response?.data || err.message);
            alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    if (questions.length === 0) return <div className="p-10">⏳ 질문을 불러오는 중...</div>;

    const currentQuestion = questions[current];

    return (
        <div className="flex min-h-screen font-sans">
            {/* 사이드바 */}
            <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#ffeded] to-white text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl">
                <div>
                    <div className="p-3 mb-10 pl-0">
                        <img src="/img_5.png" alt="CareerNavi Logo" className="h-15 object-contain" />
                    </div>
                    <nav className="flex flex-col gap-3">
                        {["메인", "전공 검색", "진로 백과사전", "진로 캘린더", "설정", "로그아웃"].map((label, idx) => (
                            <Link
                                key={idx}
                                to={["/", "/search", "/dateplace", "/calendar", "/settings", "/logout"][idx]}
                                className="rounded-xl px-4 py-2 text-left hover:bg-black/10 transition cursor-pointer flex items-center gap-3 font-medium text-black text-lg"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* 본문 */}
            <div className="flex-1 relative bg-gradient-to-br from-indigo-50 to-purple-100 pt-24 px-6 pb-20">
                {/* 상단바 */}
                <header className="fixed top-0 left-64 right-0 h-20 px-8 bg-white/60 backdrop-blur-lg border-b border-white/20 shadow z-50 grid grid-cols-[auto_1fr_auto] items-center">
                    <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">흥미 검사</h1>
                    <div className="justify-self-center">
                        <Link to="/" className="block">
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                                CareerNavi
                            </span>
                        </Link>
                    </div>
                    <nav className="flex items-center gap-6 text-sm font-medium justify-self-end">
                        <Link to="/test" className="text-gray-600 hover:text-purple-600">검사 선택</Link>
                        <Link to="/dateplace" className="text-gray-600 hover:text-purple-600">커리어 백과사전</Link>
                        <Link to="/chat" className="px-4 py-2 rounded-full bg-purple-600 text-black hover:bg-purple-700">
                            💬 AI커비와 상담하기
                        </Link>
                    </nav>
                </header>

                {/* 질문 영역 */}
                <div className="mt-10 w-full max-w-2xl bg-white rounded-xl shadow p-8 mx-auto text-center">
                    <h2 className="text-xl font-semibold mb-6">
                        {`Q${current + 1}. ${currentQuestion.question}`}
                    </h2>
                    <p className="text-sm text-red-500 mb-4">⚠️ 빠르게 누르면 오류가 발생할 수 있으니 천천히 눌러주세요!</p>
                    <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 7 }).map((_, idx) => {
                            const answerText = currentQuestion[`answer0${idx + 1}`];
                            const answerScore = currentQuestion[`answerScore0${idx + 1}`];
                            return (
                                answerText && (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(answerScore)}
                                        disabled={isLoading}
                                        className={`${
                                            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'
                                        } bg-purple-500 text-black px-4 py-2 rounded-xl transition`}
                                    >
                                        {answerText}
                                    </button>
                                )
                            );
                        })}
                    </div>
                    <p className="mt-6 text-sm text-gray-500">{`(${current + 1} / ${questions.length})`}</p>
                    <div className="mt-4">
                        <Link to="/test" className="text-sm text-blue-500 underline">
                            ← 검사 선택 화면으로 돌아가기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InterestTest;
