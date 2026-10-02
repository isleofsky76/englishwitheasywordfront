#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   뉴스 어휘 글 추가 도구 (News Voca Publisher)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env 파일이 없습니다.${NC}"
    echo ""
    echo "MongoDB URI를 입력해주세요:"
    echo "예시: mongodb://localhost:27017/englisheasystudy"
    echo "또는: mongodb+srv://username:password@cluster.mongodb.net/englisheasystudy"
    echo ""
    read -p "MongoDB URI: " mongo_uri
    echo "MONGO_URI=$mongo_uri" > .env
    echo -e "${GREEN}✅ .env 파일이 생성되었습니다.${NC}"
    echo ""
fi

# Check if packages are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 패키지를 설치합니다...${NC}"
    npm install
    echo -e "${GREEN}✅ 패키지 설치 완료${NC}"
    echo ""
fi

# Load .env
export $(cat .env | xargs)

# Menu
echo "어떤 작업을 하시겠습니까?"
echo ""
echo "1) 예제 글 추가 (테스트용)"
echo "2) 템플릿으로 새 글 추가 (article-template.json 사용)"
echo "3) 커스텀 JSON 파일로 글 추가"
echo "4) Lindsay Clancy 예제 글 추가"
echo "5) 종료"
echo ""
read -p "선택 (1-5): " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}📝 예제 글을 추가합니다...${NC}"
        node add-news-voca-article.js
        ;;
    2)
        echo ""
        if [ ! -f "article-template.json" ]; then
            echo -e "${RED}❌ article-template.json 파일이 없습니다.${NC}"
            exit 1
        fi
        echo -e "${BLUE}📝 템플릿 파일을 사용하여 글을 추가합니다...${NC}"
        node add-news-voca-article.js "$(cat article-template.json)"
        ;;
    3)
        echo ""
        read -p "JSON 파일 경로를 입력하세요: " json_file
        if [ ! -f "$json_file" ]; then
            echo -e "${RED}❌ 파일을 찾을 수 없습니다: $json_file${NC}"
            exit 1
        fi
        echo -e "${BLUE}📝 $json_file 파일을 사용하여 글을 추가합니다...${NC}"
        node add-news-voca-article.js "$(cat $json_file)"
        ;;
    4)
        echo ""
        echo -e "${BLUE}📝 Lindsay Clancy 예제 글을 추가합니다...${NC}"
        node add-news-voca-article.js "$(cat article-example-lindsay-clancy.json)"
        ;;
    5)
        echo ""
        echo -e "${GREEN}👋 종료합니다.${NC}"
        exit 0
        ;;
    *)
        echo ""
        echo -e "${RED}❌ 잘못된 선택입니다.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}   작업이 완료되었습니다! ✅${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
