const words = [
    { korean: "시장경제", english: "Market Economy", pronunciation: "[ˈmɑːrkɪt ɪˈkɒnəmi]" },
    { korean: "신재생에너지", english: "Renewable Energy", pronunciation: "[rɪˈnjuːəbəl ˈɛnərdʒi]" },
    { korean: "실업급여", english: "Unemployment Benefit", pronunciation: "[ˌʌnɪmˈplɔɪmənt ˈbɛnɪfɪt]" },
    { korean: "에너지효율", english: "Energy Efficiency", pronunciation: "[ˈɛnərdʒi ɪˈfɪʃənsi]" },
    { korean: "외국인투자", english: "Foreign Investment", pronunciation: "[ˈfɒrɪn ɪnˈvɛstmənt]" },
    { korean: "외환", english: "Foreign Exchange", pronunciation: "[ˈfɒrɪn ɪksˈtʃeɪndʒ]" },
    { korean: "원가", english: "Cost", pronunciation: "[kɒst]" },
    { korean: "유동자산", english: "Current Assets", pronunciation: "[ˈkɜːrənt ˈæsɛts]" },
    { korean: "유동부채", english: "Current Liabilities", pronunciation: "[ˈkɜːrənt ˌlaɪəˈbɪlɪtiz]" },
    { korean: "이윤", english: "Profit", pronunciation: "[ˈprɒfɪt]" },
    { korean: "임대료", english: "Rent", pronunciation: "[rɛnt]" },
    { korean: "임금", english: "Wage", pronunciation: "[weɪdʒ]" },
    { korean: "자산운용", english: "Asset Management", pronunciation: "[ˈæsɛt ˈmænɪdʒmənt]" },
    { korean: "자본이득세", english: "Capital Gains Tax", pronunciation: "[ˈkæpɪtl ɡeɪnz tæks]" },
    { korean: "작업장", english: "Workshop", pronunciation: "[ˈwɜːrkʃɒp]" },
    { korean: "적정기술", english: "Appropriate Technology", pronunciation: "[əˈprəʊpriət tɛkˈnɒlədʒi]" },
    { korean: "적자", english: "Deficit", pronunciation: "[ˈdɛfɪsɪt]" },
    { korean: "전략적동맹", english: "Strategic Alliance", pronunciation: "[strəˈtiːdʒɪk əˈlaɪəns]" },
    { korean: "정부기관", english: "Government Agency", pronunciation: "[ˈɡʌvərnmənt ˈeɪdʒənsi]" },
    { korean: "제조업", english: "Manufacturing Industry", pronunciation: "[ˌmænjuˈfæktʃərɪŋ ˈɪndəstri]" },
    { korean: "조세정책", english: "Tax Policy", pronunciation: "[tæks ˈpɒləsi]" },
    { korean: "주택시장", english: "Housing Market", pronunciation: "[ˈhaʊzɪŋ ˈmɑːrkɪt]" },
    { korean: "증권시장", english: "Securities Market", pronunciation: "[sɪˈkjʊərɪtiz ˈmɑːrkɪt]" },
    { korean: "채무", english: "Debt", pronunciation: "[dɛt]" },
    { korean: "채무불이행", english: "Default", pronunciation: "[dɪˈfɔːlt]" },
    { korean: "철도운송", english: "Railway Transportation", pronunciation: "[ˈreɪlweɪ ˌtrænspɔːrˈteɪʃən]" },
    { korean: "청년실업", english: "Youth Unemployment", pronunciation: "[juːθ ˌʌnɪmˈplɔɪmənt]" },
    { korean: "최저임금", english: "Minimum Wage", pronunciation: "[ˈmɪnɪməm weɪdʒ]" },
    { korean: "카르텔", english: "Cartel", pronunciation: "[kɑːrˈtɛl]" },
    { korean: "통계청", english: "Statistics Office", pronunciation: "[stəˈtɪstɪks ˈɒfɪs]" },
    { korean: "투자자", english: "Investor", pronunciation: "[ɪnˈvɛstər]" },
    { korean: "투자포트폴리오", english: "Investment Portfolio", pronunciation: "[ɪnˈvɛstmənt pɔːrtˈfəʊlioʊ]" },
    { korean: "파산", english: "Bankruptcy", pronunciation: "[ˈbæŋkrʌptsi]" },
    { korean: "팜플릿", english: "Pamphlet", pronunciation: "[ˈpæmflɪt]" },
    { korean: "평가액", english: "Appraisal Value", pronunciation: "[əˈpreɪzl ˈvæljuː]" },
    { korean: "평균임금", english: "Average Wage", pronunciation: "[ˈævərɪdʒ weɪdʒ]" },
    { korean: "폐업", english: "Business Closure", pronunciation: "[ˈbɪznɪs ˈkləʊʒər]" },
    { korean: "표준화", english: "Standardization", pronunciation: "[ˌstændədaɪˈzeɪʃən]" },
    { korean: "포괄적", english: "Comprehensive", pronunciation: "[ˌkɒmprɪˈhɛnsɪv]" },
    { korean: "표준편차", english: "Standard Deviation", pronunciation: "[ˈstændəd ˌdiːvɪˈeɪʃən]" },
    { korean: "품질보증", english: "Quality Assurance", pronunciation: "[ˈkwɒlɪti əˈʃʊərəns]" },
    { korean: "품질관리", english: "Quality Control", pronunciation: "[ˈkwɒlɪti kənˈtrəʊl]" },
    { korean: "품질인증", english: "Quality Certification", pronunciation: "[ˈkwɒlɪti ˌsɜːrtɪfɪˈkeɪʃən]" },
    { korean: "합병", english: "Merger", pronunciation: "[ˈmɜːrdʒər]" },
    { korean: "환율조작", english: "Currency Manipulation", pronunciation: "[ˈkɜːrənsi məˌnɪpjʊˈleɪʃən]" },
    { korean: "회계사", english: "Accountant", pronunciation: "[əˈkaʊntənt]" },
    { korean: "후생경제학", english: "Welfare Economics", pronunciation: "[ˈwɛlfeə ˌiːkəˈnɒmɪks]" },
    { korean: "흑자", english: "Surplus", pronunciation: "[ˈsɜːrpləs]" },
    { korean: "가계부채", english: "Household Debt", pronunciation: "[ˈhaʊshoʊld dɛt]" },
    { korean: "가치사슬", english: "Value Chain", pronunciation: "[ˈvæljuː ʧeɪn]" },
    { korean: "간접세", english: "Indirect Tax", pronunciation: "[ˌɪndəˈrɛkt tæks]" },
    { korean: "경기변동", english: "Business Cycle", pronunciation: "[ˈbɪznɪs ˈsaɪkl]" },
    { korean: "경상계정", english: "Current Account", pronunciation: "[ˈkɜːrənt əˈkaʊnt]" },
    { korean: "경쟁사", english: "Competitor", pronunciation: "[kəmˈpɛtɪtər]" },
    { korean: "공공부채", english: "Public Debt", pronunciation: "[ˈpʌblɪk dɛt]" },
    { korean: "공급망", english: "Supply Chain", pronunciation: "[səˈplaɪ ʧeɪn]" },
    { korean: "공적연금", english: "Public Pension", pronunciation: "[ˈpʌblɪk ˈpɛnʃən]" },
    { korean: "관세장벽", english: "Tariff Barrier", pronunciation: "[ˈtærɪf ˈbæriər]" },
    { korean: "구매력", english: "Purchasing Power", pronunciation: "[ˈpɜːʧəsɪŋ ˈpaʊər]" },
    { korean: "국가경쟁력", english: "National Competitiveness", pronunciation: "[ˈnæʃənəl kəmˈpɛtɪtɪvnɪs]" },
    { korean: "국제경쟁력", english: "International Competitiveness", pronunciation: "[ˌɪntəˈnæʃənl kəmˈpɛtɪtɪvnɪs]" },
    { korean: "국제금융시장", english: "International Financial Market", pronunciation: "[ˌɪntəˈnæʃənl faɪˈnænʃl ˈmɑːrkɪt]" },
    { korean: "국제통화기금", english: "International Monetary Fund (IMF)", pronunciation: "[ˌɪntəˈnæʃənl ˈmɒnɪtəri fʌnd]" },
    { korean: "국제협력", english: "International Cooperation", pronunciation: "[ˌɪntəˈnæʃənl ˌkəʊəˈpɜːreɪʃən]" },
    { korean: "금리상한제", english: "Interest Rate Cap", pronunciation: "[ˈɪntərɪst reɪt kæp]" },
    { korean: "금리인상", english: "Interest Rate Hike", pronunciation: "[ˈɪntərɪst reɪt haɪk]" },
    { korean: "기술경쟁력", english: "Technological Competitiveness", pronunciation: "[ˌtɛknəˈlɒdʒɪkəl kəmˈpɛtɪtɪvnɪs]" },
    { korean: "기술혁신", english: "Technological Innovation", pronunciation: "[ˌtɛknəˈlɒdʒɪkəl ˌɪnəˈveɪʃən]" },
    { korean: "기업경영", english: "Business Management", pronunciation: "[ˈbɪznɪs ˈmænɪdʒmənt]" },
    { korean: "기업가치", english: "Corporate Value", pronunciation: "[ˈkɔːrpərət ˈvæljuː]" },
    { korean: "기업문화", english: "Corporate Culture", pronunciation: "[ˈkɔːrpərət ˈkʌltʃər]" },
    { korean: "노사관계", english: "Labor Relations", pronunciation: "[ˈleɪbər rɪˈleɪʃənz]" },
    { korean: "단기채권", english: "Short-term Bonds", pronunciation: "[ʃɔːrt tɜːrm bɒndz]" },
    { korean: "대외경제", english: "External Economy", pronunciation: "[ɪkˈstɜːrnəl ɪˈkɒnəmi]" },
    { korean: "대외부문", english: "External Sector", pronunciation: "[ɪkˈstɜːrnəl ˈsɛktər]" },
    { korean: "대체재", english: "Substitute Goods", pronunciation: "[ˈsʌbstɪˌtjuːt ɡʊdz]" },
    { korean: "도시경쟁력", english: "Urban Competitiveness", pronunciation: "[ˈɜːrbən kəmˈpɛtɪtɪvnɪs]" },
    { korean: "독점적경쟁", english: "Monopolistic Competition", pronunciation: "[məˌnɒpəˈlɪstɪk ˌkɒmpɪˈtɪʃən]" },
    { korean: "동종업종", english: "Same Industry", pronunciation: "[seɪm ˈɪndəstri]" },
    { korean: "명목임금", english: "Nominal Wage", pronunciation: "[ˈnɒmɪnl weɪdʒ]" },
    { korean: "무역금융", english: "Trade Finance", pronunciation: "[treɪd faɪˈnæns]" },
    { korean: "무역수지", english: "Trade Balance", pronunciation: "[treɪd ˈbæləns]" },
    { korean: "무역적자", english: "Trade Deficit", pronunciation: "[treɪd ˈdɛfɪsɪt]" },
    { korean: "민간투자", english: "Private Investment", pronunciation: "[ˈpraɪvɪt ɪnˈvɛstmənt]" },
    { korean: "반도체산업", english: "Semiconductor Industry", pronunciation: "[ˌsɛmɪkənˈdʌktər ˈɪndəstri]" },
    { korean: "반입금지", english: "Import Ban", pronunciation: "[ˈɪmpɔːrt bæn]" },
    { korean: "방카슈랑스", english: "Bancassurance", pronunciation: "[ˌbæŋkəˈʃʊrəns]" },
    { korean: "법정관리", english: "Court Receivership", pronunciation: "[kɔːrt rɪˈsiːvərˌʃɪp]" },
    { korean: "부가세", english: "Value Added Tax (VAT)", pronunciation: "[ˈvæljuː ˈædɪd tæks]" },
    { korean: "부도율", english: "Default Rate", pronunciation: "[dɪˈfɔːlt reɪt]" },
    { korean: "부실채권", english: "Non-performing Loan (NPL)", pronunciation: "[ˌnɒn pərˈfɔːrmɪŋ loʊn]" },
    { korean: "부채관리", english: "Debt Management", pronunciation: "[dɛt ˈmænɪdʒmənt]" },
    { korean: "분식회계", english: "Window Dressing", pronunciation: "[ˈwɪndoʊ ˈdrɛsɪŋ]" },
    { korean: "분양시장", english: "Housing Market", pronunciation: "[ˈhaʊzɪŋ ˈmɑːrkɪt]" },
    { korean: "산업기반", english: "Industrial Base", pronunciation: "[ɪnˈdʌstrɪəl beɪs]" },
    { korean: "산업단지", english: "Industrial Complex", pronunciation: "[ɪnˈdʌstrɪəl ˈkɒmplɛks]" },
    { korean: "산업재산권", english: "Industrial Property Rights", pronunciation: "[ɪnˈdʌstrɪəl ˈprɒpərti raɪts]" },
    { korean: "상장폐지", english: "Delisting", pronunciation: "[diːˈlɪstɪŋ]" },
    { korean: "상품수지", english: "Goods Balance", pronunciation: "[ɡʊdz ˈbæləns]" },
    { korean: "상환능력", english: "Repayment Ability", pronunciation: "[rɪˈpeɪmənt əˈbɪlɪti]" },
    { korean: "생활비", english: "Living Expenses", pronunciation: "[ˈlɪvɪŋ ɪkˈspɛnsɪz]" },
    { korean: "석유산업", english: "Oil Industry", pronunciation: "[ɔɪl ˈɪndəstri]" },
    { korean: "선진국", english: "Developed Country", pronunciation: "[dɪˈvɛləpt ˈkʌntri]" },
    { korean: "성장잠재력", english: "Growth Potential", pronunciation: "[ɡroʊθ pəˈtɛnʃəl]" },
    { korean: "소득수준", english: "Income Level", pronunciation: "[ˈɪnkʌm ˈlɛvl]" },
    { korean: "소비세", english: "Consumption Tax", pronunciation: "[kənˈsʌmpʃən tæks]" },
    { korean: "소비지출", english: "Consumer Spending", pronunciation: "[kənˈsjuːmər ˈspɛndɪŋ]" },
    { korean: "소상공인", english: "Small Business Owner", pronunciation: "[smɔːl ˈbɪznɪs ˈoʊnər]" },
    { korean: "송금", english: "Remittance", pronunciation: "[rɪˈmɪtəns]" },
    { korean: "수입규제", english: "Import Regulation", pronunciation: "[ˈɪmpɔːrt ˌrɛɡjʊˈleɪʃən]" },
    { korean: "수출규제", english: "Export Regulation", pronunciation: "[ˈɛkspɔːrt ˌrɛɡjʊˈleɪʃən]" },
    { korean: "신용등급", english: "Credit Rating", pronunciation: "[ˈkrɛdɪt ˈreɪtɪŋ]" },
    { korean: "실질임금", english: "Real Wage", pronunciation: "[rɪəl weɪdʒ]" },
    { korean: "양도소득세", english: "Capital Gains Tax", pronunciation: "[ˈkæpɪtl ɡeɪnz tæks]" },
    { korean: "어음", english: "Bill of Exchange", pronunciation: "[bɪl əv ɪksˈtʃeɪndʒ]" },
    { korean: "업무자동화", english: "Office Automation", pronunciation: "[ˈɒfɪs ˌɔːtəˈmeɪʃən]" },
    { korean: "업종별", english: "By Industry", pronunciation: "[baɪ ˈɪndəstri]" },
    { korean: "영업활동", english: "Business Activity", pronunciation: "[ˈbɪznɪs ækˈtɪvɪti]" },
    { korean: "위험관리", english: "Risk Management", pronunciation: "[rɪsk ˈmænɪdʒmənt]" },
    { korean: "유가증권", english: "Securities", pronunciation: "[sɪˈkjʊərɪtiz]" },
    { korean: "유동성위기", english: "Liquidity Crisis", pronunciation: "[lɪˈkwɪdɪti ˈkraɪsɪs]" },
    { korean: "유통망", english: "Distribution Network", pronunciation: "[ˌdɪstrɪˈbjuːʃən ˈnɛtwɜːrk]" },
    { korean: "이익잉여금", english: "Retained Earnings", pronunciation: "[rɪˈteɪnd ˈɜrnɪŋz]" },
    { korean: "인건비", english: "Labor Cost", pronunciation: "[ˈleɪbər kɒst]" },
    { korean: "자금조달", english: "Fund Raising", pronunciation: "[fʌnd ˈreɪzɪŋ]" },
    { korean: "자산가치", english: "Asset Value", pronunciation: "[ˈæsɛt ˈvæljuː]" },
    { korean: "자산운용사", english: "Asset Management Company", pronunciation: "[ˈæsɛt ˈmænɪdʒmənt ˈkʌmpəni]" },
    { korean: "장기채권", english: "Long-term Bonds", pronunciation: "[lɔːŋ tɜːrm bɒndz]" },
    { korean: "재고자산", english: "Inventory Assets", pronunciation: "[ˈɪnvəntəri ˈæsɛts]" },
    { korean: "재산권", english: "Property Rights", pronunciation: "[ˈprɒpərti raɪts]" },
    { korean: "재정건전성", english: "Fiscal Soundness", pronunciation: "[ˈfɪskl ˈsaʊndnɪs]" },
    { korean: "전문직", english: "Professional Job", pronunciation: "[prəˈfɛʃənl dʒɒb]" },
    { korean: "정부부채", english: "Government Debt", pronunciation: "[ˈɡʌvərnmənt dɛt]" },
    { korean: "정보비대칭", english: "Information Asymmetry", pronunciation: "[ˌɪnfərˈmeɪʃən əˈsɪmɪtri]" },
    { korean: "종합지수", english: "Composite Index", pronunciation: "[ˈkɒmpəzɪt ˈɪndɛks]" },
    { korean: "중간재", english: "Intermediate Goods", pronunciation: "[ˌɪntərˈmiːdiət ɡʊdz]" },
    { korean: "증권사", english: "Securities Firm", pronunciation: "[sɪˈkjʊərɪtiz fɜːrm]" },
    { korean: "지급준비금", english: "Reserve Requirement", pronunciation: "[rɪˈzɜːrv rɪˈkwaɪərmənt]" },
    { korean: "지속가능경영", english: "Sustainable Management", pronunciation: "[səˈsteɪnəbl ˈmænɪdʒmənt]" },
    { korean: "지수조정", english: "Index Adjustment", pronunciation: "[ˈɪndɛks əˈʤʌstmənt]" },
    { korean: "차입금", english: "Borrowed Funds", pronunciation: "[ˈbɒrəʊd fʌndz]" },
    { korean: "차환", english: "Refinancing", pronunciation: "[ˌriːˈfaɪnænsɪŋ]" },
    { korean: "창업", english: "Startup", pronunciation: "[ˈstɑːrtˌʌp]" },
    { korean: "초과수익", english: "Excess Returns", pronunciation: "[ɪkˈsɛs rɪˈtɜːrnz]" },
    { korean: "최대주주", english: "Major Shareholder", pronunciation: "[ˈmeɪdʒər ˈʃɛəhəʊldər]" },
    { korean: "출자", english: "Equity Investment", pronunciation: "[ˈɛkwɪti ɪnˈvɛstmənt]" },
    { korean: "출자금", english: "Equity Funds", pronunciation: "[ˈɛkwɪti fʌndz]" },
    { korean: "캐시카우", english: "Cash Cow", pronunciation: "[kæʃ kaʊ]" },
    { korean: "테크노크라트", english: "Technocrat", pronunciation: "[ˈtɛknəˌkræt]" },
    { korean: "투자유치", english: "Attract Investment", pronunciation: "[əˈtrækt ɪnˈvɛstmənt]" },
    { korean: "투자지분", english: "Investment Stake", pronunciation: "[ɪnˈvɛstmənt steɪk]" },
    { korean: "파레토법칙", english: "Pareto Principle", pronunciation: "[pəˈreɪtoʊ ˈprɪnsəpəl]" },
    { korean: "판로개척", english: "Market Development", pronunciation: "[ˈmɑːrkɪt dɪˈvɛləpmənt]" },
    { korean: "포트폴리오다각화", english: "Portfolio Diversification", pronunciation: "[pɔːrtˈfoʊlioʊ daɪˌvɜːrsɪfɪˈkeɪʃən]" },
    { korean: "프랜차이즈", english: "Franchise", pronunciation: "[ˈfrænʧaɪz]" },
    { korean: "한계수익", english: "Marginal Revenue", pronunciation: "[ˈmɑːrdʒɪnl ˈrɛvənjuː]" },
    { korean: "합병계약", english: "Merger Agreement", pronunciation: "[ˈmɜːrdʒər əˈɡriːmənt]" },
    { korean: "해외부동산", english: "Overseas Real Estate", pronunciation: "[ˌoʊvərˈsiːz ˈriːəl ɪˈsteɪt]" },
    { korean: "현금성자산", english: "Cash Equivalent Assets", pronunciation: "[kæʃ ɪˈkwɪvələnt ˈæsɛts]" },
    { korean: "환율보호", english: "Currency Protection", pronunciation: "[ˈkɜːrənsi prəˈtɛkʃən]" },
    { korean: "효율성", english: "Efficiency", pronunciation: "[ɪˈfɪʃənsi]" },
    { korean: "희소성", english: "Scarcity", pronunciation: "[ˈskɛrsɪti]" },
    { korean: "경제성장", english: "Economic Growth", pronunciation: "[ɪˌkɑːnəmɪk ɡroʊθ]" },
    { korean: "물가상승률", english: "Inflation Rate", pronunciation: "[ɪnˈfleɪʃən reɪt]" },
    { korean: "실업률", english: "Unemployment Rate", pronunciation: "[ˌʌnɪmˈplɔɪmənt reɪt]" },
    { korean: "국내총생산", english: "Gross Domestic Product (GDP)", pronunciation: "[ɡroʊs dəˈmɛstɪk ˈprɒdʌkt]" },
    { korean: "수요와 공급", english: "Supply and Demand", pronunciation: "[səˈplaɪ ənd dɪˈmænd]" },
    { korean: "이자율", english: "Interest Rate", pronunciation: "[ˈɪntərɪst reɪt]" },
    { korean: "국제무역", english: "International Trade", pronunciation: "[ˌɪntərˈnæʃənl treɪd]" },
    { korean: "통화정책", english: "Monetary Policy", pronunciation: "[ˈmɑːnɪteri ˈpɑːləsi]" },
    { korean: "재정정책", english: "Fiscal Policy", pronunciation: "[ˈfɪskl ˈpɑːləsi]" },
    { korean: "통화량", english: "Money Supply", pronunciation: "[ˈmʌni səˈplaɪ]" },
    { korean: "인플레이션", english: "Inflation", pronunciation: "[ɪnˈfleɪʃən]" },
    { korean: "디플레이션", english: "Deflation", pronunciation: "[dɪˈfleɪʃən]" },
    { korean: "스태그플레이션", english: "Stagflation", pronunciation: "[stæɡˈfleɪʃən]" },
    { korean: "자산", english: "Assets", pronunciation: "[ˈæsɛts]" },
    { korean: "부채", english: "Liabilities", pronunciation: "[ˌlaɪəˈbɪlɪtiz]" },
    { korean: "자본", english: "Capital", pronunciation: "[ˈkæpɪtl]" },
    { korean: "주식", english: "Stocks", pronunciation: "[stɒks]" },
    { korean: "채권", english: "Bonds", pronunciation: "[bɒndz]" },
    { korean: "재정적자", english: "Budget Deficit", pronunciation: "[ˈbʌdʒɪt ˈdɛfɪsɪt]" },
    { korean: "재정흑자", english: "Budget Surplus", pronunciation: "[ˈbʌdʒɪt ˈsɜːrpləs]" },
    { korean: "국채", english: "Government Bonds", pronunciation: "[ˈɡʌvərnmənt bɒndz]" },
    { korean: "무역수지", english: "Trade Balance", pronunciation: "[treɪd ˈbæləns]" },
    { korean: "경상수지", english: "Current Account Balance", pronunciation: "[ˈkɜːrənt əˈkaʊnt ˈbæləns]" },
    { korean: "금리", english: "Interest Rate", pronunciation: "[ˈɪntərɪst reɪt]" },
    { korean: "환율", english: "Exchange Rate", pronunciation: "[ɪksˈtʃeɪndʒ reɪt]" },
    { korean: "외환보유고", english: "Foreign Exchange Reserves", pronunciation: "[ˈfɔːrən ɪksˈtʃeɪndʒ rɪˈzɜːrvz]" },
    { korean: "환율변동", english: "Exchange Rate Fluctuation", pronunciation: "[ɪksˈtʃeɪndʒ reɪt ˌflʌktʃuˈeɪʃən]" },
    { korean: "금융시장", english: "Financial Market", pronunciation: "[faɪˈnænʃl ˈmɑːrkɪt]" },
    { korean: "자본시장", english: "Capital Market", pronunciation: "[ˈkæpɪtl ˈmɑːrkɪt]" },
    { korean: "주식시장", english: "Stock Market", pronunciation: "[stɒk ˈmɑːrkɪt]" },
    { korean: "채권시장", english: "Bond Market", pronunciation: "[bɒnd ˈmɑːrkɪt]" },
    { korean: "부동산시장", english: "Real Estate Market", pronunciation: "[ˈriːəl ɪˈsteɪt ˈmɑːrkɪt]" },
    { korean: "소비자물가지수", english: "Consumer Price Index (CPI)", pronunciation: "[kənˈsjuːmər praɪs ˈɪndɛks]" },
    { korean: "생산자물가지수", english: "Producer Price Index (PPI)", pronunciation: "[prəˈdjuːsər praɪs ˈɪndɛks]" },
    { korean: "경제지표", english: "Economic Indicators", pronunciation: "[ɪˌkɑːnəmɪk ˈɪndɪkeɪtərz]" },
    { korean: "경기침체", english: "Recession", pronunciation: "[rɪˈsɛʃən]" },
    { korean: "경기회복", english: "Economic Recovery", pronunciation: "[ɪˌkɑːnəmɪk rɪˈkʌvəri]" },
    { korean: "자본이득", english: "Capital Gains", pronunciation: "[ˈkæpɪtl ɡeɪnz]" },
    { korean: "배당", english: "Dividends", pronunciation: "[ˈdɪvɪdɛndz]" },
    { korean: "기업인수합병", english: "Mergers and Acquisitions (M&A)", pronunciation: "[ˈmɜːrdʒərz ənd ˌækwɪˈzɪʃənz]" },
    { korean: "독점", english: "Monopoly", pronunciation: "[məˈnɒpəli]" },
    { korean: "과점", english: "Oligopoly", pronunciation: "[ˌɒlɪˈɡɒpəli]" },
    { korean: "경쟁", english: "Competition", pronunciation: "[ˌkɒmpɪˈtɪʃən]" },
    { korean: "시장경제", english: "Market Economy", pronunciation: "[ˈmɑːrkɪt ɪˈkɑːnəmi]" },
    { korean: "혼합경제", english: "Mixed Economy", pronunciation: "[mɪkst ɪˈkɑːnəmi]" },
    { korean: "계획경제", english: "Planned Economy", pronunciation: "[plænd ɪˈkɑːnəmi]" },
    { korean: "소비", english: "Consumption", pronunciation: "[kənˈsʌmpʃən]" },
    { korean: "저축", english: "Savings", pronunciation: "[ˈseɪvɪŋz]" },
    { korean: "투자", english: "Investment", pronunciation: "[ɪnˈvɛstmənt]" },
    { korean: "외국인직접투자", english: "Foreign Direct Investment (FDI)", pronunciation: "[ˈfɔːrən dəˈrɛkt ɪnˈvɛstmənt]" },
    { korean: "정부지출", english: "Government Spending", pronunciation: "[ˈɡʌvərnmənt ˈspɛndɪŋ]" },
    { korean: "민간지출", english: "Private Spending", pronunciation: "[ˈpraɪvət ˈspɛndɪŋ]" },
    { korean: "공공재", english: "Public Goods", pronunciation: "[ˈpʌblɪk ɡʊdz]" },
    { korean: "민간재", english: "Private Goods", pronunciation: "[ˈpraɪvət ɡʊdz]" },
    { korean: "소득재분배", english: "Income Redistribution", pronunciation: "[ˈɪnkʌm ˌriːdɪstrɪˈbjuːʃən]" },
    { korean: "세금", english: "Taxes", pronunciation: "[ˈtæksɪz]" },
    { korean: "법인세", english: "Corporate Tax", pronunciation: "[ˈkɔːrpərət tæks]" },
    { korean: "소득세", english: "Income Tax", pronunciation: "[ˈɪnkʌm tæks]" },
    { korean: "부가가치세", english: "Value Added Tax (VAT)", pronunciation: "[ˈvælju ˈædɪd tæks]" },
    { korean: "관세", english: "Tariffs", pronunciation: "[ˈtærɪfs]" },
    { korean: "무역장벽", english: "Trade Barriers", pronunciation: "[treɪd ˈbæriərz]" },
    { korean: "자유무역", english: "Free Trade", pronunciation: "[friː treɪd]" },
    { korean: "보호무역", english: "Protectionism", pronunciation: "[prəˈtɛkʃənɪzəm]" },
    { korean: "자유시장", english: "Free Market", pronunciation: "[friː ˈmɑːrkɪt]" },
    { korean: "경쟁우위", english: "Competitive Advantage", pronunciation: "[kəmˈpɛtɪtɪv ədˈvæntɪdʒ]" },
    { korean: "비교우위", english: "Comparative Advantage", pronunciation: "[kəmˈpærətɪv ədˈvæntɪdʒ]" },
    { korean: "무역적자", english: "Trade Deficit", pronunciation: "[treɪd ˈdɛfɪsɪt]" },
    { korean: "무역흑자", english: "Trade Surplus", pronunciation: "[treɪd ˈsɜːrpləs]" },
    { korean: "수출", english: "Exports", pronunciation: "[ˈɛkspɔːrts]" },
    { korean: "수입", english: "Imports", pronunciation: "[ˈɪmpɔːrts]" },
    { korean: "경상수지", english: "Current Account Balance", pronunciation: "[ˈkɜːrənt əˈkaʊnt ˈbæləns]" },
    { korean: "자본수지", english: "Capital Account Balance", pronunciation: "[ˈkæpɪtl əˈkaʊnt ˈbæləns]" },
    { korean: "통화스왑", english: "Currency Swap", pronunciation: "[ˈkɜːrənsi swɑːp]" },
    { korean: "외환시장", english: "Foreign Exchange Market", pronunciation: "[ˈfɔːrən ɪksˈtʃeɪndʒ ˈmɑːrkɪt]" },
    { korean: "기준금리", english: "Base Interest Rate", pronunciation: "[beɪs ˈɪntərɪst reɪt]" },
    { korean: "중앙은행", english: "Central Bank", pronunciation: "[ˈsɛntrəl bæŋk]" },
    { korean: "화폐정책", english: "Currency Policy", pronunciation: "[ˈkɜːrənsi ˈpɑːləsi]" },
    { korean: "금융자산", english: "Financial Assets", pronunciation: "[faɪˈnænʃl ˈæsɛts]" },
    { korean: "부동산자산", english: "Real Estate Assets", pronunciation: "[ˈriːəl ɪˈsteɪt ˈæsɛts]" },
    { korean: "주택담보대출", english: "Mortgage Loan", pronunciation: "[ˈmɔːrɡɪdʒ loʊn]" },
    { korean: "기업대출", english: "Corporate Loan", pronunciation: "[ˈkɔːrpərət loʊn]" },
    { korean: "소비자대출", english: "Consumer Loan", pronunciation: "[kənˈsjuːmər loʊn]" },
    { korean: "국제금융", english: "International Finance", pronunciation: "[ˌɪntərˈnæʃənl faɪˈnæns]" },
    { korean: "주식거래", english: "Stock Trading", pronunciation: "[stɒk ˈtreɪdɪŋ]" },
    { korean: "파생상품", english: "Derivatives", pronunciation: "[dɪˈrɪvətɪvz]" },
    { korean: "헤지펀드", english: "Hedge Fund", pronunciation: "[hɛdʒ fʌnd]" },
    { korean: "투자은행", english: "Investment Bank", pronunciation: "[ɪnˈvɛstmənt bæŋk]" },
    { korean: "상업은행", english: "Commercial Bank", pronunciation: "[kəˈmɜːrʃl bæŋk]" },
    { korean: "신용평가", english: "Credit Rating", pronunciation: "[ˈkrɛdɪt ˈreɪtɪŋ]" },
    { korean: "리스크관리", english: "Risk Management", pronunciation: "[rɪsk ˈmænɪdʒmənt]" },
    { korean: "재무제표", english: "Financial Statements", pronunciation: "[faɪˈnænʃl ˈsteɪtmənts]" },
    { korean: "손익계산서", english: "Income Statement", pronunciation: "[ˈɪnkʌm ˈsteɪtmənt]" },
    { korean: "대차대조표", english: "Balance Sheet", pronunciation: "[ˈbæləns ʃiːt]" },
    { korean: "현금흐름표", english: "Cash Flow Statement", pronunciation: "[kæʃ floʊ ˈsteɪtmənt]" },
    { korean: "경제활동인구", english: "Economically Active Population", pronunciation: "[ˌiːkəˈnɒmɪkli ˈæktɪv pɒpjʊˌleɪʃən]" },
    { korean: "국내수요", english: "Domestic Demand", pronunciation: "[dəˈmɛstɪk dɪˈmænd]" },
    { korean: "국제수지", english: "Balance of Payments", pronunciation: "[ˈbæləns əv ˈpeɪmənts]" },
    { korean: "경제성장률", english: "Economic Growth Rate", pronunciation: "[ˌiːkəˈnɒmɪk ɡroʊθ reɪt]" },
    { korean: "경제주체", english: "Economic Agent", pronunciation: "[ˌiːkəˈnɒmɪk ˈeɪdʒənt]" },
    { korean: "금융기관", english: "Financial Institution", pronunciation: "[faɪˈnænʃl ˌɪnstɪˈtjuːʃən]" },
    { korean: "부가가치", english: "Value Added", pronunciation: "[ˈvæljuː ˈædɪd]" },
    { korean: "생산요소", english: "Factors of Production", pronunciation: "[ˈfæktərz əv prəˈdʌkʃən]" },
    { korean: "서비스산업", english: "Service Industry", pronunciation: "[ˈsɜːrvɪs ˈɪndəstri]" },
    { korean: "경제협력", english: "Economic Cooperation", pronunciation: "[ˌiːkəˈnɒmɪk ˌkəʊəˈpɜːreɪʃən]" },
    { korean: "경제자유화", english: "Economic Liberalization", pronunciation: "[ˌiːkəˈnɒmɪk ˌlɪbrəlaɪˈzeɪʃən]" },
    { korean: "경제지구", english: "Economic Zone", pronunciation: "[ˌiːkəˈnɒmɪk zəʊn]" },
    { korean: "경쟁력", english: "Competitiveness", pronunciation: "[kəmˈpɛtɪtɪvnɪs]" },
    { korean: "고정자산", english: "Fixed Assets", pronunciation: "[fɪkst ˈæsɛts]" },
    { korean: "국제경제기구", english: "International Economic Organization", pronunciation: "[ˌɪntərˈnæʃənl ˌiːkəˈnɒmɪk ˌɔːɡənaɪˈzeɪʃən]" },
    { korean: "기술이전", english: "Technology Transfer", pronunciation: "[tɛkˈnɒlədʒi ˈtrænsfɜːr]" },
    { korean: "노동시장", english: "Labor Market", pronunciation: "[ˈleɪbə ˈmɑːrkɪt]" },
    { korean: "농업", english: "Agriculture", pronunciation: "[ˈæɡrɪˌkʌltʃər]" },
    { korean: "대외무역", english: "Foreign Trade", pronunciation: "[ˈfɒrɪn treɪd]" },
    { korean: "대출", english: "Loan", pronunciation: "[loʊn]" },
    { korean: "도매시장", english: "Wholesale Market", pronunciation: "[ˈhoʊlseɪl ˈmɑːrkɪt]" },
    { korean: "도시화", english: "Urbanization", pronunciation: "[ˌɜːrbənɪˈzeɪʃən]" },
    { korean: "물적자산", english: "Physical Assets", pronunciation: "[ˈfɪzɪkəl ˈæsɛts]" },
    { korean: "민간부문", english: "Private Sector", pronunciation: "[ˈpraɪvɪt ˈsɛktər]" },
    { korean: "법적제도", english: "Legal System", pronunciation: "[ˈliːɡəl ˈsɪstɪm]" },
    { korean: "부가가치세", english: "Value Added Tax (VAT)", pronunciation: "[ˈvæljuː ˈædɪd tæks]" },
    { korean: "부동산", english: "Real Estate", pronunciation: "[ˈriːəl ɪˈsteɪt]" },
    { korean: "분배정책", english: "Distribution Policy", pronunciation: "[ˌdɪstrɪˈbjuːʃən ˈpɒləsi]" },
    { korean: "산업구조", english: "Industrial Structure", pronunciation: "[ɪnˈdʌstrɪəl ˈstrʌktʃər]" },
    { korean: "상업", english: "Commerce", pronunciation: "[ˈkɒmɜːrs]" },
    { korean: "생산비용", english: "Production Cost", pronunciation: "[prəˈdʌkʃən kɒst]" },
    { korean: "생산성", english: "Productivity", pronunciation: "[ˌprɒdʌkˈtɪvɪti]" },
    { korean: "서비스무역", english: "Service Trade", pronunciation: "[ˈsɜːrvɪs treɪd]" }
   
];
    
    

let currentWordIndex = 0;
let pronounceInterval;
let synth = window.speechSynthesis;
let autoPlayInterval;

function updateWord() {
    document.getElementById('word-korean').innerText = words[currentWordIndex].korean;
    document.getElementById('word-english').innerText = words[currentWordIndex].english;
    document.getElementById('word-pronunciation').innerText = words[currentWordIndex].pronunciation;
}

function pronounceWord(times, callback) {
    let count = 0;

    function speak() {
        if (count < times) {
            let koreanUtterance = new SpeechSynthesisUtterance(words[currentWordIndex].korean);
            koreanUtterance.lang = 'ko-KR'; // 한국어 발음 설정
            koreanUtterance.rate = 1; // 발음 속도 설정 (1배 빠르게)

            let englishUtterance = new SpeechSynthesisUtterance(words[currentWordIndex].english);
            englishUtterance.lang = 'en-US'; // 영어 발음 설정
            englishUtterance.rate = 1; // 발음 속도 설정 (1배 빠르게)

            koreanUtterance.onend = () => {
                synth.speak(englishUtterance);
            };

            englishUtterance.onend = () => {
                count++;
                if (count < times) {
                    speak();
                } else if (callback) {
                    callback();
                }
            };

            synth.speak(koreanUtterance);
        }
    }

    speak();
}

function stopPronouncing() {
    clearInterval(pronounceInterval);
    clearInterval(autoPlayInterval);
    synth.cancel();
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    updateWord();
    pronounceWord(1);
}

function autoPlay() {
    stopPronouncing();
    currentWordIndex = 0; // 처음부터 시작
    autoPlayInterval = setInterval(() => {
        updateWord();
        pronounceWord(1, () => {
            currentWordIndex++;
            if (currentWordIndex >= words.length) {
                currentWordIndex = 0; // 끝에 도달하면 처음으로 돌아가기
            }
        });
    }, 6000); // 6초마다 다음 단어로 넘어가고 발음 (발음 시간 3초 + 대기 시간 3초)
}

updateWord();

// 단어 목록을 화면에 표시하는 함수
function showWordList() {
    const wordList = document.getElementById('word-list');
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `<strong>${word.korean}</strong> - ${word.english} <em>${word.pronunciation}</em>`;
        wordList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateWord();
    showWordList(); // 페이지 로드 시 단어 목록 표시
});