// crawl-report.mjs
import puppeteer from 'puppeteer';
import fs from 'fs';

const REPORT_URL = 'https://www.career.go.kr/cloud/w/inspect/value2/report?seq=NzYzNzE1MjA';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto(REPORT_URL, { waitUntil: 'networkidle2' });

// 약간 기다려줘야 JS 로딩 완료됨
await new Promise(resolve => setTimeout(resolve, 3000));

const result = await page.evaluate(() => {
    const data = {};

    // 👉 1. 가치지향 유형 이름
    const typeName = document.querySelector('.value3Tit .tit')?.innerText.trim();
    data.typeName = typeName || 'N/A';

    // 👉 2. 주요 가치 키워드
    const keywordEls = document.querySelectorAll('.value3Cont dl dd strong');
    data.keywords = Array.from(keywordEls).map(el => el.innerText.trim());

    // 👉 3. 유형 설명 텍스트
    const explanation = document.querySelector('.value3Cont dl dd span')?.innerText.trim();
    data.description = explanation || 'N/A';

    // 👉 4. 관련 직업 목록
    const jobEls = document.querySelectorAll('.value3Job ul li');
    data.relatedJobs = Array.from(jobEls).map(el => el.innerText.trim());

    return data;
});

// JSON 저장
fs.writeFileSync('result.json', JSON.stringify(result, null, 2));
console.log('✅ 결과가 result.json에 저장되었습니다.');

await browser.close();
