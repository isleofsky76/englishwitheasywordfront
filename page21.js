document.addEventListener('DOMContentLoaded', () => {
    const forbiddenWords = [
        "sex", "sexual", "rape", "molest", "violence", "murder", "gore", "drugs", "narcotics", 
        "prostitute", "prostitution", "pedophile", "pedophilia", "incest", "self-harm", "bully", 
        "bullying", "harassment",  "slavery", "enslave", "exploitation", "trafficking", 
        "slaughter", "genocide","homophobia", "transphobia", "homophobic", "transphobic","suicide"
    ];

    const words = [
        'Supply', 'Demand', 'Market', 'Price', 'Goods', 'Services', 'Consumer', 'Producer',
        'Economy', 'Trade', 'Money', 'Income', 'Spending', 'Savings', 'Investment', 'Profit',
        'Loss', 'Revenue', 'Cost', 'Budget', 'Taxes', 'Wages', 'Employment', 'Unemployment',
        'Inflation', 'Deflation', 'Interest', 'Credit', 'Debt', 'Bank', 'Loan', 'Capital',
        'Resources', 'Imports', 'Exports', 'Tariff', 'Subsidy', 'Competition', 'Monopoly',
        'Entrepreneur', 'Business', 'Corporation', 'Stock', 'Bond', 'Share', 'Dividend',
        'Economist', 'Policy', 'Recession', 'Depression', 'Growth', 'Development',
        'Globalization', 'Exchange Rate', 'Currency', 'Labor', 'Trade Deficit', 'Trade Surplus',
        'Economic Indicator', 'Fiscal Policy', 'Monetary Policy', 'Public Sector', 'Private Sector',
        'Gross Domestic Product (GDP)', 'Consumer Price Index (CPI)', 'Balance of Trade',
        'Economic System', 'Market Economy', 'Planned Economy', 'Mixed Economy', 'Free Market',
        'Regulation', 'Deregulation', 'Productivity', 'Standard of Living', 'Quality of Life',
        'Opportunity Cost', 'Scarcity', 'Supply Chain', 'Demand Curve', 'Supply Curve',
        'Elasticity', 'Inelastic', 'Equilibrium Price', 'Shortage', 'Surplus', 'Fixed Costs',
        'Variable Costs', 'Marginal Cost', 'Average Cost', 'Total Cost', 'Marginal Revenue',
        'Average Revenue', 'Total Revenue', 'Break-even Point', 'Economies of Scale',
        'Diseconomies of Scale', 'Internal Growth', 'External Growth', 'Merger', 'Acquisition',
        'Takeover', 'Synergy', 'Horizontal Integration', 'Vertical Integration', 'Conglomerate',
        'Franchise', 'Joint Venture', 'Partnership', 'Sole Proprietorship', 'Limited Liability',
        'Unlimited Liability', 'Non-profit Organization', 'For-profit Organization',
        'Corporate Social Responsibility', 'Ethical Business', 'Business Ethics', 'Corporate Governance',
        'Stakeholder', 'Shareholder', 'Board of Directors', 'Chief Executive Officer (CEO)',
        'Chief Financial Officer (CFO)', 'Chief Operating Officer (COO)', 'Human Resources (HR)',
        'Marketing', 'Sales', 'Operations', 'Production', 'Research and Development (R&D)',
        'Information Technology (IT)', 'Customer Service', 'Supply Chain Management',
        'Inventory', 'Logistics', 'Distribution', 'Warehousing', 'Procurement', 'Purchasing',
        'Supplier', 'Vendor', 'Contract', 'Agreement', 'Negotiation', 'Bargaining', 'Trade Union',
        'Collective Bargaining', 'Strike', 'Lockout', 'Labor Market', 'Job Market', 'Recruitment',
        'Hiring', 'Training', 'Development', 'Employee Benefits', 'Compensation', 'Salary',
        'Hourly Wage', 'Overtime', 'Bonus', 'Commission', 'Incentive', 'Performance Appraisal',
        'Promotion', 'Demotion', 'Retirement', 'Pension', 'Social Security', 'Healthcare',
        'Insurance', 'Life Insurance', 'Health Insurance', 'Property Insurance', 'Auto Insurance',
        'Home Insurance', 'Claim', 'Premium', 'Deductible', 'Policyholder', 'Underwriter',
        'Actuary', 'Risk', 'Risk Management', 'Hedge', 'Hedging', 'Diversification', 'Portfolio',
        'Asset', 'Liability', 'Equity', 'Net Worth', 'Balance Sheet', 'Income Statement',
        'Cash Flow Statement', 'Financial Statement', 'Auditor', 'Audit', 'Internal Audit',
        'External Audit', 'Tax Audit', 'Compliance', 'Regulation', 'Financial Regulation',
        'Central Bank', 'Federal Reserve', 'Monetary Policy', 'Interest Rate', 'Inflation Rate',
        'Exchange Rate', 'Foreign Exchange Market', 'Forex', 'Currency Exchange', 'Currency Pair',
        'Appreciation', 'Depreciation', 'Devaluation', 'Revaluation', 'Speculation', 'Hedging',
        'Arbitrage', 'Leverage', 'Margin', 'Derivative', 'Option', 'Future', 'Swap', 'Forward Contract',
        'Commodity', 'Commodity Market', 'Agricultural Product', 'Mineral', 'Energy', 'Oil', 'Gas',
        'Renewable Energy', 'Non-renewable Energy', 'Sustainable Development', 'Green Economy',
        'Circular Economy', 'Carbon Footprint', 'Carbon Trading', 'Carbon Tax', 'Environmental Policy',
        'Corporate Social Responsibility', 'Social Enterprise', 'Fair Trade', 'Microfinance',
        'Financial Inclusion', 'Economic Development', 'Emerging Markets', 'Developed Markets',
        'Gross National Income (GNI)', 'Human Development Index (HDI)', 'Poverty Line', 'Living Standards',
        'Income Distribution', 'Wealth Distribution', 'Income Inequality', 'Wealth Inequality',
        'Universal Basic Income', 'Welfare State', 'Social Security', 'Healthcare System',
        'Education System', 'Public Goods', 'Private Goods', 'Common Resources', 'Public Sector',
        'Private Sector', 'Government', 'Public Administration', 'Policy Making', 'Fiscal Policy',
        'Monetary Policy', 'Economic Policy', 'Regulatory Policy', 'Trade Policy', 'Industrial Policy',
        'Competition Policy', 'Consumer Protection', 'Data Protection', 'Intellectual Property',
        'Patent', 'Trademark', 'Copyright', 'Licensing', 'Royalties', 'Innovation', 'Research and Development',
        'Technology Transfer', 'Start-up', 'Entrepreneurship', 'Venture Capital', 'Angel Investor',
        'Business Incubator', 'Accelerator', 'Business Plan', 'Market Research', 'Feasibility Study',
        'Competitive Advantage', 'Business Model', 'Revenue Model', 'Cost Structure', 'Value Proposition',
        'Customer Segmentation', 'Market Segmentation', 'Target Market', 'Positioning', 'Branding',
        'Marketing Strategy', 'Sales Strategy', 'Distribution Strategy', 'Digital Marketing', 'Social Media Marketing',
        'Content Marketing', 'Email Marketing', 'Search Engine Optimization (SEO)', 'Pay-per-click (PPC)',
        'Conversion Rate', 'Customer Relationship Management (CRM)', 'Sales Funnel', 'Customer Retention',
        'Customer Acquisition', 'Customer Lifetime Value (CLV)', 'Net Promoter Score (NPS)', 'Market Share',
        'Growth Rate', 'Churn Rate', 'Sales Forecast', 'Budgeting', 'Financial Planning', 'Capital Budgeting',
        'Operational Planning', 'Strategic Planning', 'Business Strategy', 'Competitive Strategy', 'Corporate Strategy',
        'Global Strategy', 'Exit Strategy', 'Contingency Planning', 'Scenario Planning', 'Risk Management',
        'Crisis Management', 'Change Management', 'Project Management', 'Process Improvement', 'Lean Management',
        'Six Sigma', 'Total Quality Management (TQM)', 'Supply Chain Management (SCM)', 'Logistics Management',
        'Inventory Management', 'Procurement Management', 'Production Management', 'Operations Management',
        'Service Management', 'Customer Service Management', 'Human Resource Management (HRM)', 'Talent Management',
        'Performance Management', 'Compensation Management', 'Benefits Management', 'Employee Relations',
        'Labor Relations', 'Industrial Relations', 'Organizational Behavior', 'Organizational Development',
        'Corporate Culture', 'Workplace Culture', 'Employee Engagement', 'Employee Satisfaction', 'Diversity and Inclusion',
        'Work-life Balance', 'Remote Work', 'Telecommuting', 'Flexible Work Arrangements', 'Gig Economy',
        'Freelancing', 'Outsourcing', 'Insourcing', 'Shared Services', 'Business Process Outsourcing (BPO)',
        'Knowledge Process Outsourcing (KPO)', 'IT Outsourcing (ITO)', 'Offshoring', 'Nearshoring', 'Reshoring',
        'Onshoring', 'Co-sourcing', 'Managed Services', 'Cloud Computing', 'Big Data', 'Analytics', 'Business Intelligence',
        'Data Science', 'Artificial Intelligence (AI)', 'Machine Learning', 'Internet of Things (IoT)',
        'Blockchain', 'Cryptocurrency', 'Bitcoin', 'Ethereum', 'Smart Contracts', 'Initial Coin Offering (ICO)',
        'Tokenization', 'Decentralized Finance (DeFi)', 'Fintech', 'Regtech', 'Insurtech', 'Wealthtech',
        'Proptech', 'Healthtech', 'Edtech', 'Agritech', 'Foodtech', 'Retailtech', 'Cleantech', 'Greentech',
        'Medtech', 'Biotech', 'Pharma', 'Life Sciences', 'Healthcare', 'Medical Devices', 'Diagnostics',
        'Telemedicine', 'E-health', 'Health Information Technology (HIT)', 'Electronic Health Records (EHR)',
        'Personal Health Records (PHR)', 'Health Information Exchange (HIE)', 'Clinical Decision Support (CDS)',
        'Population Health Management (PHM)', 'Care Management', 'Chronic Disease Management', 'Patient Engagement',
        'Patient Experience', 'Patient Satisfaction', 'Healthcare Quality', 'Healthcare Outcomes', 'Healthcare Costs',
        'Health Economics', 'Health Policy', 'Health Services Research', 'Public Health', 'Global Health',
        'Health Disparities', 'Social Determinants of Health', 'Health Equity', 'Mental Health', 'Behavioral Health',
        'Substance Abuse', 'Addiction', 'Wellness', 'Fitness', 'Nutrition', 'Healthy Eating', 'Exercise',
        'Physical Activity', 'Stress Management', 'Sleep', 'Mindfulness', 'Meditation', 'Yoga', 'Alternative Medicine',
        'Complementary Medicine', 'Integrative Medicine', 'Preventive Medicine', 'Primary Care', 'Specialty Care',
        'Tertiary Care', 'Quaternary Care', 'Urgent Care', 'Emergency Care', 'Critical Care', 'Surgery',
        'Anesthesia', 'Radiology', 'Pathology', 'Laboratory Medicine', 'Internal Medicine', 'Family Medicine',
        'Pediatrics', 'Obstetrics and Gynecology', 'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology',
        'Hematology', 'Infectious Disease', 'Nephrology', 'Neurology', 'Oncology', 'Ophthalmology', 'Orthopedics',
        'Otolaryngology', 'Palliative Care', 'Pulmonology', 'Rheumatology', 'Urology', 'Veterinary Medicine'
    ];
    

    const generateTextButton = document.getElementById('generateTextButton');
    const randomTextButton = document.getElementById('randomTextButton');
    const getTranslationButton = document.getElementById('getTranslationButton');
    const inputTopic = document.getElementById('inputTopic');
    const shortTextSection = document.getElementById('shortTextSection');
    const shortTextElement = document.getElementById('shortText');
    const readShortTextButton = document.getElementById('readShortTextButton');
    const stopShortTextButton = document.getElementById('stopShortTextButton');
    const translationSection = document.getElementById('translationSection');
    const translationExplanationElement = document.getElementById('translationExplanation');
    const wordsContainer = document.getElementById('wordsContainer');

    let currentUtterance = null;

    // Populate the word list with clickable items
    words.forEach(word => {
        const wordItem = document.createElement('button');
        wordItem.className = 'btn btn-outline-primary m-1';
        wordItem.textContent = word;
        wordItem.addEventListener('click', () => {
        inputTopic.value = word;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        generateShortText(); // Automatically generate text on word click
        highlightSelectedWord(wordItem); // Highlight the selected word
        });
        wordsContainer.appendChild(wordItem);
    });

    // Function to highlight the selected word
    function highlightSelectedWord(selectedItem) {
        const wordButtons = document.querySelectorAll('#wordsContainer button');
        wordButtons.forEach(button => button.classList.remove('btn-primary'));
        selectedItem.classList.add('btn-primary');
    }

    // Function to show the short text section
    function showShortTextSection() {
        shortTextSection.style.display = 'block';
    }

    // Function to show the translation section
    function showTranslationSection() {
        translationSection.style.display = 'block';
    }

    // Function to toggle loading spinner on button
    function toggleButtonLoading(button, isLoading) {
        if (isLoading) {
        button.classList.add('loading');
        button.innerHTML = 'Loading... <div class="spinner-border spinner-border-sm text-light" role="status"></div>';
        } else {
        button.classList.remove('loading');
        button.innerHTML = button.getAttribute('data-original-text');
        }
    }

    // Function to check for forbidden words
    function containsForbiddenWords(text) {
        const lowerText = text.toLowerCase();
        return forbiddenWords.some(word => lowerText.includes(word));
    }

    // Function to fetch and display short text
    async function generateShortText() {
        const topic = inputTopic.value.trim();

        if (!topic) {
        alert("Please enter a topic.");
        return;
        }

        // Check for forbidden words in the topic
        if (containsForbiddenWords(topic)) {
        alert("The input contains forbidden words. Please remove them and try again.");
        return;
        }

        toggleButtonLoading(generateTextButton, true);

        try {
        const response = await fetch('http://localhost:3000/generate-short-text', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        shortTextElement.textContent = responseData.shortText;
        showShortTextSection();
        } catch (error) {
        console.error('Error generating short text:', error.message);
        } finally {
        toggleButtonLoading(generateTextButton, false);
        }
    }

    // Function to generate and display random text
    async function generateRandomText() {
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];
        inputTopic.value = randomWord;

        await generateShortText();
    }

    // Function to fetch and display translation and explanation
    async function getTranslationAndExplanation() {
        const shortText = shortTextElement.textContent.trim();

        if (!shortText) {
        alert("No short text to translate. Please generate a short text first.");
        return;
        }

        toggleButtonLoading(getTranslationButton, true);

        try {
        const response = await fetch('http://localhost:3000/get-translation-explanation', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ shortText })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        translationExplanationElement.innerHTML = responseData.translationExplanation.replace(/\n/g, "<br>");
        showTranslationSection();
        } catch (error) {
        console.error('Error getting translation and explanation:', error.message);
        } finally {
        toggleButtonLoading(getTranslationButton, false);
        }
    }

    // Function to read only English text aloud
    function readEnglishText(text) {
        const englishText = text.match(/[A-Za-z0-9 .,!?']+/g).join(' ');
        if (currentUtterance) {
            speechSynthesis.cancel();
        }
        currentUtterance = new SpeechSynthesisUtterance(englishText);
        currentUtterance.lang = 'en-US';

        currentUtterance.onstart = function() {
            console.log('Speech started');
        };

        currentUtterance.onend = function() {
            console.log('Speech ended');
        };

        currentUtterance.onerror = function(event) {
            console.error('Speech error', event.error);
        };

        speechSynthesis.speak(currentUtterance);
    }

    // Function to stop reading
    function stopReading() {
        speechSynthesis.cancel();
        if (currentUtterance) {
            currentUtterance.onend = null; // Clear the onend event
            currentUtterance = null;
        }
    }

    // Save original button text for restoring later
    generateTextButton.setAttribute('data-original-text', generateTextButton.innerHTML);
    getTranslationButton.setAttribute('data-original-text', getTranslationButton.innerHTML);
    generateTextButton.addEventListener('click', generateShortText);
    randomTextButton.addEventListener('click', generateRandomText);
    getTranslationButton.addEventListener('click', getTranslationAndExplanation);
    readShortTextButton.addEventListener('click', () => readEnglishText(shortTextElement.textContent));
    stopShortTextButton.addEventListener('click', stopReading);
    });
