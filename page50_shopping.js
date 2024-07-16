const words = [
    // Shopping related expressions
    { korean: "쇼핑하다", english: "go shopping", pronunciation: "[ɡoʊ ˈʃɑpɪŋ]" },
    { korean: "식료품 사다", english: "buy groceries", pronunciation: "[baɪ ˈɡroʊsəriz]" },
    { korean: "가격표를 보다", english: "check the price tag", pronunciation: "[ʧɛk ðə praɪs tæɡ]" },
    { korean: "할인 받다", english: "get a discount", pronunciation: "[ɡɛt ə ˈdɪskaʊnt]" },
    { korean: "영수증을 받다", english: "get a receipt", pronunciation: "[ɡɛt ə rɪˈsit]" },
    { korean: "카트를 밀다", english: "push a cart", pronunciation: "[pʊʃ ə kɑrt]" },
    { korean: "바구니를 들다", english: "carry a basket", pronunciation: "[ˈkæri ə ˈbæskɪt]" },
    { korean: "쇼핑 목록을 만들다", english: "make a shopping list", pronunciation: "[meɪk ə ˈʃɑpɪŋ lɪst]" },
    { korean: "마트에 가다", english: "go to the supermarket", pronunciation: "[ɡoʊ tu ðə ˈsuːpərˌmɑrkɪt]" },
    { korean: "할인 코드를 사용하다", english: "use a discount code", pronunciation: "[juz ə ˈdɪskaʊnt koʊd]" },
    { korean: "가게를 둘러보다", english: "browse the store", pronunciation: "[braʊz ðə stɔr]" },
    { korean: "옷을 시도해보다", english: "try on clothes", pronunciation: "[traɪ ɒn kloʊðz]" },
    { korean: "구매 결정을 하다", english: "make a purchase decision", pronunciation: "[meɪk ə ˈpɜrʧəs dɪˈsɪʒən]" },
    { korean: "계산대에 가다", english: "go to the checkout", pronunciation: "[ɡoʊ tu ðə ˈʧɛkˌaʊt]" },
    { korean: "카드를 사용하다", english: "use a card", pronunciation: "[juz ə kɑrd]" },
    { korean: "현금을 사용하다", english: "use cash", pronunciation: "[juz kæʃ]" },
    { korean: "교환하다", english: "exchange an item", pronunciation: "[ɪksˈʧeɪndʒ ən ˈaɪtəm]" },
    { korean: "반품하다", english: "return an item", pronunciation: "[rɪˈtɜrn ən ˈaɪtəm]" },
    { korean: "포장을 받다", english: "get gift wrapping", pronunciation: "[ɡɛt ɡɪft ˈræpɪŋ]" },
    { korean: "온라인으로 주문하다", english: "order online", pronunciation: "[ˈɔrdər ˌɒnˈlaɪn]" },
    { korean: "배달을 받다", english: "receive a delivery", pronunciation: "[rɪˈsiv ə dɪˈlɪvəri]" },
    { korean: "배송 상태를 추적하다", english: "track the shipping status", pronunciation: "[træk ðə ˈʃɪpɪŋ ˈstætəs]" },
    { korean: "상품 리뷰를 읽다", english: "read product reviews", pronunciation: "[rid ˈprɒdʌkt rɪˈvjuːz]" },
    { korean: "고객 서비스를 이용하다", english: "use customer service", pronunciation: "[juz ˈkʌstəmər ˈsɜrvɪs]" },
    { korean: "상품을 추천하다", english: "recommend a product", pronunciation: "[ˌrɛkəˈmɛnd ə ˈprɒdʌkt]" },
    { korean: "가격 비교를 하다", english: "compare prices", pronunciation: "[kəmˈpɛr ˈpraɪsɪz]" },
    { korean: "카페에 가다", english: "go to a cafe", pronunciation: "[ɡoʊ tu ə kæˈfeɪ]" },
    { korean: "음식을 시키다", english: "order food", pronunciation: "[ˈɔrdər fud]" },
    { korean: "영수증을 확인하다", english: "check the receipt", pronunciation: "[ʧɛk ðə rɪˈsit]" },
    { korean: "쇼핑백을 들다", english: "carry a shopping bag", pronunciation: "[ˈkæri ə ˈʃɑpɪŋ bæg]" },
    { korean: "매장에서 물건을 받다", english: "pick up in-store", pronunciation: "[pɪk ʌp ɪn stɔr]" },
    { korean: "편리한 매장을 찾다", english: "find a convenient store", pronunciation: "[faɪnd ə kənˈvinjənt stɔr]" },
    { korean: "할인 상품을 찾다", english: "find discounted items", pronunciation: "[faɪnd ˈdɪskaʊntɪd ˈaɪtəmz]" },
    { korean: "쇼핑몰에 가다", english: "go to the mall", pronunciation: "[ɡoʊ tu ðə mɔl]" },
    { korean: "고객 만족도를 평가하다", english: "rate customer satisfaction", pronunciation: "[reɪt ˈkʌstəmər ˌsætɪsˈfækʃən]" },
    { korean: "포인트를 적립하다", english: "earn points", pronunciation: "[ɜrn pɔɪnts]" },
    { korean: "할인 쿠폰을 사용하다", english: "use a coupon", pronunciation: "[juz ə ˈkuˌpɑn]" },
    { korean: "매장에 문의하다", english: "inquire in-store", pronunciation: "[ɪnˈkwaɪər ɪn stɔr]" },
    { korean: "신상품을 찾다", english: "look for new arrivals", pronunciation: "[lʊk fɔr nu əˈraɪvəlz]" },
    { korean: "매장을 구경하다", english: "explore the store", pronunciation: "[ɪkˈsplɔr ðə stɔr]" },
    { korean: "상품을 결제하다", english: "pay for items", pronunciation: "[peɪ fɔr ˈaɪtəmz]" },
    { korean: "가게에서 찾아보다", english: "search in the store", pronunciation: "[sɜrʧ ɪn ðə stɔr]" },
    { korean: "시즌 세일을 이용하다", english: "take advantage of seasonal sales", pronunciation: "[teɪk ædˈvæntɪʤ ʌv ˈsizənəl seɪlz]" },
    { korean: "쇼핑 경험을 공유하다", english: "share shopping experiences", pronunciation: "[ʃɛr ˈʃɑpɪŋ ɪkˈspɪriənsɪz]" },
    { korean: "온라인 리뷰를 남기다", english: "leave an online review", pronunciation: "[liv ən ˈɒnˌlaɪn rɪˈvju]" },
    { korean: "지불 옵션을 선택하다", english: "choose payment options", pronunciation: "[ʧuz ˈpeɪmənt ˈɑpʃənz]" },
    { korean: "친절한 직원과 대화하다", english: "talk to friendly staff", pronunciation: "[tɔk tu ˈfrɛndli stæf]" },
    { korean: "바코드를 스캔하다", english: "scan a barcode", pronunciation: "[skæn ə ˈbɑrˌkoʊd]" },
    { korean: "결제 금액을 확인하다", english: "confirm the total amount", pronunciation: "[kənˈfɜrm ðə ˈtoʊtəl əˈmaʊnt]" },
    { korean: "상품을 추천받다", english: "get product recommendations", pronunciation: "[ɡɛt ˈprɒdʌkt ˌrɛkəˌmɛnˈdeɪʃənz]" },
    { korean: "신용카드를 등록하다", english: "register a credit card", pronunciation: "[ˈrɛʤɪstər ə ˈkrɛdɪt kɑrd]" },
    { korean: "구매 알림을 받다", english: "receive purchase notifications", pronunciation: "[rɪˈsiv ˈpɜrʧəs ˌnoʊtɪfɪˈkeɪʃənz]" },
    { korean: "연말 세일을 기다리다", english: "wait for year-end sales", pronunciation: "[weɪt fɔr jɪr ɛnd seɪlz]" },
    { korean: "쇼핑몰 지도를 보다", english: "look at the mall map", pronunciation: "[lʊk æt ðə mɔl mæp]" },
    { korean: "브랜드를 고르다", english: "choose a brand", pronunciation: "[ʧuz ə brænd]" },
    { korean: "신상품을 구경하다", english: "check out new products", pronunciation: "[ʧɛk aʊt nu ˈprɒdʌkts]" },
    { korean: "선물을 포장하다", english: "wrap a gift", pronunciation: "[ræp ə ɡɪft]" },
    { korean: "상품권을 사다", english: "buy a gift card", pronunciation: "[baɪ ə ɡɪft kɑrd]" },
    { korean: "반값 세일을 기다리다", english: "wait for a half-price sale", pronunciation: "[weɪt fɔr ə hæf praɪs seɪl]" },
    { korean: "바겐 세일을 찾다", english: "find a bargain sale", pronunciation: "[faɪnd ə ˈbɑrɡɪn seɪl]" },
    { korean: "크리스마스 쇼핑을 하다", english: "do Christmas shopping", pronunciation: "[du ˈkrɪsməs ˈʃɑpɪŋ]" },
    { korean: "환불 정책을 확인하다", english: "check the return policy", pronunciation: "[ʧɛk ðə rɪˈtɜrn ˈpɑləsi]" },
    { korean: "무료 배송을 이용하다", english: "use free shipping", pronunciation: "[juz fri ˈʃɪpɪŋ]" },
    { korean: "가격을 비교하다", english: "compare prices", pronunciation: "[kəmˈpɛr ˈpraɪsɪz]" },
    { korean: "다양한 상품을 고르다", english: "choose from a variety of products", pronunciation: "[ʧuz frʌm ə vəˈraɪəti əv ˈprɒdʌkts]" },
    { korean: "장바구니를 비우다", english: "empty the shopping cart", pronunciation: "[ˈɛmpti ðə ˈʃɑpɪŋ kɑrt]" },
    { korean: "카드 결제를 하다", english: "make a card payment", pronunciation: "[meɪk ə kɑrd ˈpeɪmənt]" },
    { korean: "현금으로 결제하다", english: "pay with cash", pronunciation: "[peɪ wɪð kæʃ]" },
    { korean: "가격을 흥정하다", english: "haggle over the price", pronunciation: "[ˈhæɡəl ˈoʊvər ðə praɪs]" },
    { korean: "할인 쿠폰을 사용하다", english: "use discount coupons", pronunciation: "[juz ˈdɪskaʊnt ˈkuˌpɑnz]" },
    { korean: "선물 교환하다", english: "exchange gifts", pronunciation: "[ɪksˈʧeɪndʒ ɡɪfts]" },
    { korean: "쇼핑 예산을 짜다", english: "set a shopping budget", pronunciation: "[sɛt ə ˈʃɑpɪŋ ˈbʌʤɪt]" },
    { korean: "선물 목록을 만들다", english: "make a gift list", pronunciation: "[meɪk ə ɡɪft lɪst]" },
    { korean: "가게를 구경하다", english: "browse the store", pronunciation: "[braʊz ðə stɔr]" },
    { korean: "제품 설명서를 읽다", english: "read the product manual", pronunciation: "[rid ðə ˈprɒdʌkt ˈmænjuəl]" },
    { korean: "할인 매장을 찾다", english: "find a discount store", pronunciation: "[faɪnd ə ˈdɪskaʊnt stɔr]" },
    { korean: "재고를 확인하다", english: "check the stock", pronunciation: "[ʧɛk ðə stɑk]" },
    { korean: "구매 기록을 확인하다", english: "check purchase history", pronunciation: "[ʧɛk ˈpɜrʧəs ˈhɪstəri]" },
    { korean: "가격 변동을 추적하다", english: "track price changes", pronunciation: "[træk praɪs ˈʧeɪndʒɪz]" },
    { korean: "계산대에서 결제하다", english: "pay at the counter", pronunciation: "[peɪ æt ðə ˈkaʊntər]" },
    { korean: "온라인 바겐을 찾다", english: "find online bargains", pronunciation: "[faɪnd ˈɒnˌlaɪn ˈbɑrɡɪnz]" },
    { korean: "택배를 받다", english: "receive a parcel", pronunciation: "[rɪˈsiv ə ˈpɑrsəl]" },
    { korean: "상품 사용 후기를 남기다", english: "leave a product review", pronunciation: "[liv ə ˈprɒdʌkt rɪˈvju]" },
    { korean: "상품 사용법을 배우다", english: "learn how to use the product", pronunciation: "[lɜrn haʊ tu juz ðə ˈprɒdʌkt]" },
    { korean: "배송 옵션을 선택하다", english: "select shipping options", pronunciation: "[səˈlɛkt ˈʃɪpɪŋ ˈɑpʃənz]" },
    { korean: "할인 이벤트에 참여하다", english: "participate in discount events", pronunciation: "[pɑrˈtɪsɪˌpeɪt ɪn ˈdɪskaʊnt ɪˈvɛnts]" },
    { korean: "제품 품질을 확인하다", english: "check product quality", pronunciation: "[ʧɛk ˈprɒdʌkt ˈkwɑləti]" },
    { korean: "대량 구매를 하다", english: "make bulk purchases", pronunciation: "[meɪk bʌlk ˈpɜrʧəsɪz]" },
    { korean: "가격표를 확인하다", english: "check the price tag", pronunciation: "[ʧɛk ðə praɪs tæɡ]" },
    { korean: "시즌별 세일을 찾다", english: "find seasonal sales", pronunciation: "[faɪnd ˈsizənəl seɪlz]" },
    { korean: "무료 반품을 이용하다", english: "use free returns", pronunciation: "[juz fri rɪˈtɜrnz]" },
    { korean: "상품을 포장하다", english: "package items", pronunciation: "[ˈpækɪʤ ˈaɪtəmz]" },
    { korean: "전단지를 보다", english: "look at flyers", pronunciation: "[lʊk æt ˈflaɪərz]" },
    { korean: "새로운 프로모션을 찾다", english: "find new promotions", pronunciation: "[faɪnd nu prəˈmoʊʃənz]" },
    { korean: "고객 리뷰를 읽다", english: "read customer reviews", pronunciation: "[rid ˈkʌstəmər rɪˈvjuːz]" },
    { korean: "신제품을 시도하다", english: "try new products", pronunciation: "[traɪ nu ˈprɒdʌkts]" },
    { korean: "선물 포장지 고르다", english: "choose gift wrapping paper", pronunciation: "[ʧuz ɡɪft ˈræpɪŋ ˈpeɪpər]" },
// Shopping related expressions - 새로운 것들
    { korean: "매장 위치를 찾다", english: "find the store location", pronunciation: "[faɪnd ðə stɔr loʊˈkeɪʃən]" },
    { korean: "비용을 계산하다", english: "calculate the cost", pronunciation: "[ˈkælkjʊˌleɪt ðə kɔst]" },
    { korean: "할인 이벤트에 등록하다", english: "sign up for discount events", pronunciation: "[saɪn ʌp fɔr ˈdɪskaʊnt ɪˈvɛnts]" },
    { korean: "가격 변동 알림을 받다", english: "get price drop alerts", pronunciation: "[ɡɛt praɪs drɑp əˈlɜrts]" },
    { korean: "결제 수단을 업데이트하다", english: "update payment methods", pronunciation: "[ʌpˈdeɪt ˈpeɪmənt ˈmɛθədz]" },
    { korean: "상품을 즐겨찾기에 추가하다", english: "add items to favorites", pronunciation: "[æd ˈaɪtəmz tu ˈfeɪvərɪts]" },
    { korean: "배송 일정을 확인하다", english: "check delivery schedule", pronunciation: "[ʧɛk dɪˈlɪvəri ˈskɛʤʊl]" },
    { korean: "상품을 찜하다", english: "add to wishlist", pronunciation: "[æd tu ˈwɪʃˌlɪst]" },
    { korean: "사은품을 받다", english: "receive a free gift", pronunciation: "[rɪˈsiv ə fri ɡɪft]" },
    { korean: "구매 한도를 설정하다", english: "set a spending limit", pronunciation: "[sɛt ə ˈspɛndɪŋ ˈlɪmɪt]" },
    { korean: "배송 추적 번호를 확인하다", english: "check tracking number", pronunciation: "[ʧɛk ˈtrækɪŋ ˈnʌmbər]" },
    { korean: "구매를 검토하다", english: "review purchase", pronunciation: "[rɪˈvju ˈpɜrʧəs]" },
    { korean: "할부 결제를 이용하다", english: "use installment payment", pronunciation: "[juz ɪnˈstɔlmənt ˈpeɪmənt]" },
    { korean: "상품을 다시 확인하다", english: "double-check the item", pronunciation: "[ˈdʌbəl-ʧɛk ði ˈaɪtəm]" },
    { korean: "구매 이력을 저장하다", english: "save purchase history", pronunciation: "[seɪv ˈpɜrʧəs ˈhɪstəri]" },
    { korean: "이벤트에 참여하다", english: "participate in events", pronunciation: "[pɑrˈtɪsɪˌpeɪt ɪn ɪˈvɛnts]" },
    { korean: "배송 옵션을 선택하다", english: "choose shipping options", pronunciation: "[ʧuz ˈʃɪpɪŋ ˈɑpʃənz]" },
    { korean: "가격 변동을 추적하다", english: "track price changes", pronunciation: "[træk praɪs ˈʧeɪndʒɪz]" },
    { korean: "할인 코드를 적용하다", english: "apply a discount code", pronunciation: "[əˈplaɪ ə ˈdɪskaʊnt koʊd]" },
    { korean: "바코드를 스캔하다", english: "scan a barcode", pronunciation: "[skæn ə ˈbɑrˌkoʊd]" },
    { korean: "신용카드를 등록하다", english: "register a credit card", pronunciation: "[ˈrɛʤɪstər ə ˈkrɛdɪt kɑrd]" },
    { korean: "쇼핑 알림을 설정하다", english: "set up shopping alerts", pronunciation: "[sɛt ʌp ˈʃɑpɪŋ əˈlɜrts]" },
    { korean: "비용을 예산에 맞추다", english: "budget the cost", pronunciation: "[ˈbʌʤɪt ðə kɔst]" },
    { korean: "할인 이벤트를 이용하다", english: "take advantage of discount events", pronunciation: "[teɪk ædˈvæntɪʤ ʌv ˈdɪskaʊnt ɪˈvɛnts]" },
    { korean: "계산서를 확인하다", english: "check the bill", pronunciation: "[ʧɛk ðə bɪl]" },
    { korean: "쿠폰을 다운로드하다", english: "download coupons", pronunciation: "[ˈdaʊnˌloʊd ˈkuˌpɑnz]" },
    { korean: "상품 정보를 찾다", english: "find product information", pronunciation: "[faɪnd ˈprɒdʌkt ˌɪnfərˈmeɪʃən]" },
    { korean: "할인 상품을 찾다", english: "find discounted items", pronunciation: "[faɪnd ˈdɪskaʊntɪd ˈaɪtəmz]" },
    { korean: "가격 비교를 하다", english: "compare prices", pronunciation: "[kəmˈpɛr ˈpraɪsɪz]" },
    { korean: "배송비를 확인하다", english: "check shipping cost", pronunciation: "[ʧɛk ˈʃɪpɪŋ kɔst]" },
    { korean: "상품을 추천받다", english: "get product recommendations", pronunciation: "[ɡɛt ˈprɒdʌkt ˌrɛkəˌmɛnˈdeɪʃənz]" },
    { korean: "특가 상품을 찾다", english: "find special offers", pronunciation: "[faɪnd ˈspɛʃəl ˈɔfərz]" },
    { korean: "결제 방법을 선택하다", english: "choose a payment method", pronunciation: "[ʧuz ə ˈpeɪmənt ˈmɛθəd]" },
    { korean: "가격을 흥정하다", english: "negotiate the price", pronunciation: "[nɪˈɡoʊʃiˌeɪt ðə praɪs]" },
    { korean: "매장 운영 시간을 확인하다", english: "check store hours", pronunciation: "[ʧɛk stɔr aʊərz]" },
    { korean: "재고를 확보하다", english: "secure inventory", pronunciation: "[sɪˈkjʊr ˈɪnvəntɔri]" },
    { korean: "새 상품을 찾다", english: "look for new items", pronunciation: "[lʊk fɔr nu ˈaɪtəmz]" },
    { korean: "판매량을 확인하다", english: "check sales volume", pronunciation: "[ʧɛk seɪlz ˈvɑljum]" },
    { korean: "상품을 예약하다", english: "reserve a product", pronunciation: "[rɪˈzɜrv ə ˈprɒdʌkt]" },
    { korean: "주문을 검토하다", english: "review an order", pronunciation: "[rɪˈvju ən ˈɔrdər]" },
    { korean: "배송 시간을 확인하다", english: "check delivery time", pronunciation: "[ʧɛk dɪˈlɪvəri taɪm]" },
    { korean: "주문 내역을 저장하다", english: "save order history", pronunciation: "[seɪv ˈɔrdər ˈhɪstəri]" },
    { korean: "상품에 대한 리뷰를 남기다", english: "leave a product review", pronunciation: "[liv ə ˈprɒdʌkt rɪˈvju]" },
    { korean: "신제품을 시도하다", english: "try new products", pronunciation: "[traɪ nu ˈprɒdʌkts]" },
    { korean: "가격 변동을 추적하다", english: "track price changes", pronunciation: "[træk praɪs ˈʧeɪndʒɪz]" },
    { korean: "이벤트에 참여하다", english: "participate in events", pronunciation: "[pɑrˈtɪsɪˌpeɪt ɪn ɪˈvɛnts]" },
    { korean: "신용카드를 등록하다", english: "register a credit card", pronunciation: "[ˈrɛʤɪstər ə ˈkrɛdɪt kɑrd]" },
    { korean: "구매 알림을 받다", english: "receive purchase notifications", pronunciation: "[rɪˈsiv ˈpɜrʧəs ˌnoʊtɪfɪˈkeɪʃənz]" },
    { korean: "연말 세일을 기다리다", english: "wait for year-end sales", pronunciation: "[weɪt fɔr jɪr ɛnd seɪlz]" },
    { korean: "쇼핑몰 지도를 보다", english: "look at the mall map", pronunciation: "[lʊk æt ðə mɔl mæp]" },
    { korean: "브랜드를 고르다", english: "choose a brand", pronunciation: "[ʧuz ə brænd]" },
    { korean: "신상품을 구경하다", english: "check out new products", pronunciation: "[ʧɛk aʊt nu ˈprɒdʌkts]" },
    { korean: "선물을 포장하다", english: "wrap a gift", pronunciation: "[ræp ə ɡɪft]" },
    { korean: "상품권을 사다", english: "buy a gift card", pronunciation: "[baɪ ə ɡɪft kɑrd]" },
    { korean: "반값 세일을 기다리다", english: "wait for a half-price sale", pronunciation: "[weɪt fɔr ə hæf praɪs seɪl]" },
    { korean: "바겐 세일을 찾다", english: "find a bargain sale", pronunciation: "[faɪnd ə ˈbɑrɡɪn seɪl]" },
    { korean: "크리스마스 쇼핑을 하다", english: "do Christmas shopping", pronunciation: "[du ˈkrɪsməs ˈʃɑpɪŋ]" },
    { korean: "환불 정책을 확인하다", english: "check the return policy", pronunciation: "[ʧɛk ðə rɪˈtɜrn ˈpɑləsi]" },
    { korean: "무료 배송을 이용하다", english: "use free shipping", pronunciation: "[juz fri ˈʃɪpɪŋ]" },
    { korean: "가격을 비교하다", english: "compare prices", pronunciation: "[kəmˈpɛr ˈpraɪsɪz]" },
    { korean: "다양한 상품을 고르다", english: "choose from a variety of products", pronunciation: "[ʧuz frʌm ə vəˈraɪəti əv ˈprɒdʌkts]" },
    { korean: "장바구니를 비우다", english: "empty the shopping cart", pronunciation: "[ˈɛmpti ðə ˈʃɑpɪŋ kɑrt]" },
    { korean: "카드 결제를 하다", english: "make a card payment", pronunciation: "[meɪk ə kɑrd ˈpeɪmənt]" },
    { korean: "현금으로 결제하다", english: "pay with cash", pronunciation: "[peɪ wɪð kæʃ]" },
    { korean: "가격을 흥정하다", english: "haggle over the price", pronunciation: "[ˈhæɡəl ˈoʊvər ðə praɪs]" },
    { korean: "할인 쿠폰을 사용하다", english: "use discount coupons", pronunciation: "[juz ˈdɪskaʊnt ˈkuˌpɑnz]" },
    { korean: "선물 교환하다", english: "exchange gifts", pronunciation: "[ɪksˈʧeɪndʒ ɡɪfts]" },
    { korean: "쇼핑 예산을 짜다", english: "set a shopping budget", pronunciation: "[sɛt ə ˈʃɑpɪŋ ˈbʌʤɪt]" },
    { korean: "선물 목록을 만들다", english: "make a gift list", pronunciation: "[meɪk ə ɡɪft lɪst]" },
    { korean: "가게를 구경하다", english: "browse the store", pronunciation: "[braʊz ðə stɔr]" },
    { korean: "제품 설명서를 읽다", english: "read the product manual", pronunciation: "[rid ðə ˈprɒdʌkt ˈmænjuəl]" },
    { korean: "할인 매장을 찾다", english: "find a discount store", pronunciation: "[faɪnd ə ˈdɪskaʊnt stɔr]" },
    { korean: "재고를 확인하다", english: "check the stock", pronunciation: "[ʧɛk ðə stɑk]" },
    { korean: "구매 기록을 확인하다", english: "check purchase history", pronunciation: "[ʧɛk ˈpɜrʧəs ˈhɪstəri]" },
    { korean: "가격 변동을 추적하다", english: "track price changes", pronunciation: "[træk praɪs ˈʧeɪndʒɪz]" },
    { korean: "계산대에서 결제하다", english: "pay at the counter", pronunciation: "[peɪ æt ðə ˈkaʊntər]" },
    { korean: "온라인 바겐을 찾다", english: "find online bargains", pronunciation: "[faɪnd ˈɒnˌlaɪn ˈbɑrɡɪnz]" },
    { korean: "택배를 받다", english: "receive a parcel", pronunciation: "[rɪˈsiv ə ˈpɑrsəl]" },
    { korean: "상품 사용 후기를 남기다", english: "leave a product review", pronunciation: "[liv ə ˈprɒdʌkt rɪˈvju]" },
    { korean: "상품 사용법을 배우다", english: "learn how to use the product", pronunciation: "[lɜrn haʊ tu juz ðə ˈprɒdʌkt]" },
    { korean: "배송 옵션을 선택하다", english: "select shipping options", pronunciation: "[səˈlɛkt ˈʃɪpɪŋ ˈɑpʃənz]" },
    { korean: "할인 이벤트에 참여하다", english: "participate in discount events", pronunciation: "[pɑrˈtɪsɪˌpeɪt ɪn ˈdɪskaʊnt ɪˈvɛnts]" },
    { korean: "제품 품질을 확인하다", english: "check product quality", pronunciation: "[ʧɛk ˈprɒdʌkt ˈkwɑləti]" },
    { korean: "대량 구매를 하다", english: "make bulk purchases", pronunciation: "[meɪk bʌlk ˈpɜrʧəsɪz]" },
    { korean: "가격표를 확인하다", english: "check the price tag", pronunciation: "[ʧɛk ðə praɪs tæɡ]" },
    { korean: "시즌별 세일을 찾다", english: "find seasonal sales", pronunciation: "[faɪnd ˈsizənəl seɪlz]" },
    { korean: "무료 반품을 이용하다", english: "use free returns", pronunciation: "[juz fri rɪˈtɜrnz]" },
    { korean: "상품을 포장하다", english: "package items", pronunciation: "[ˈpækɪʤ ˈaɪtəmz]" },
    { korean: "전단지를 보다", english: "look at flyers", pronunciation: "[lʊk æt ˈflaɪərz]" },
    { korean: "새로운 프로모션을 찾다", english: "find new promotions", pronunciation: "[faɪnd nu prəˈmoʊʃənz]" },
    { korean: "고객 리뷰를 읽다", english: "read customer reviews", pronunciation: "[rid ˈkʌstəmər rɪˈvjuːz]" },
    { korean: "신제품을 시도하다", english: "try new products", pronunciation: "[traɪ nu ˈprɒdʌkts]" },
    { korean: "선물 포장지 고르다", english: "choose gift wrapping paper", pronunciation: "[ʧuz ɡɪft ˈræpɪŋ ˈpeɪpər]" }

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
        listItem.innerHTML = `<strong>${word.korean}</strong><br>${word.english}<em><br>${word.pronunciation}</em><br><br>`;
        wordList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateWord();
    showWordList(); // 페이지 로드 시 단어 목록 표시
});
