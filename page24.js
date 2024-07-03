document.getElementById('getFortuneButton').addEventListener('click', async () => {
    const word = document.getElementById('wordInput').value;
    try {
        const response = await fetch('http://localhost:3000/get-fortune', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseText = await response.text(); // JSON 파싱 전에 텍스트로 로그 남기기
        console.log(`Raw response: ${responseText}`);
        const data = JSON.parse(responseText); // 직접 파싱

        console.log(`Received fortune: ${data.fortune}`); // ***응답 확인을 위한 로그***
        document.getElementById('fortuneOutput').innerText = data.fortune;
    } catch (error) {
        console.error('Error fetching fortune:', error);
        document.getElementById('fortuneOutput').innerText = 'Error fetching fortune. Please try again later.';
    }
});