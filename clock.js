document.addEventListener('DOMContentLoaded', () => {
    const cities = [
        { name: '서울', timeZone: 'Asia/Seoul' },
        { name: '뉴욕', timeZone: 'America/New_York' },
        { name: '런던', timeZone: 'Europe/London' },
        { name: '파리', timeZone: 'Europe/Paris' },
        { name: '도쿄', timeZone: 'Asia/Tokyo' },
        { name: '베이징', timeZone: 'Asia/Shanghai' },
        { name: '모스크바', timeZone: 'Europe/Moscow' },
        { name: '제네바', timeZone: 'Europe/Zurich' }
    ];

    function updateTime() {
        const selectedTimeContainer = document.getElementById('selectedTime');

        const selectedCity = document.getElementById('cityFilter').value;
        const city = cities.find(city => city.name === selectedCity);

        if (city) {
            const time = new Date().toLocaleTimeString('ko-KR', { 
                timeZone: city.timeZone, 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace(/:/g, ':');
            selectedTimeContainer.innerHTML = `${time}`;
        }
    }

    document.getElementById('cityFilter').addEventListener('change', updateTime);

    updateTime();
    setInterval(updateTime, 1000); // Update every second
});
