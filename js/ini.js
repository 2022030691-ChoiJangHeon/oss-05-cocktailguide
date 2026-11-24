
// ini

// ========================================
// 1. 임시 칵테일 데이터
// ========================================

const cocktails = [

    {
        name: "Mojito",
        description: "A refreshing cocktail with mint and lime.",
        ingredients: "Rum, Mint, Lime, Soda",
        tags: ["Refreshing", "Sweet"],
        emoji: "🍃"
    },

    {
        name: "Margarita",
        description: "A classic cocktail with a sour taste.",
        ingredients: "Tequila, Lime, Triple Sec",
        tags: ["Sour", "Strong"],
        emoji: "🍋"
    },

    {
        name: "Cosmopolitan",
        description: "A fruity cocktail with cranberry flavor.",
        ingredients: "Vodka, Cranberry, Lime",
        tags: ["Fruity", "Sweet"],
        emoji: "🍸"
    },

    {
        name: "Gin Tonic",
        description: "A simple and refreshing gin cocktail.",
        ingredients: "Gin, Tonic Water, Lime",
        tags: ["Refreshing", "Bitter"],
        emoji: "🍈"
    },

    {
        name: "Pina Colada",
        description: "A tropical cocktail with coconut and pineapple.",
        ingredients: "Rum, Coconut, Pineapple",
        tags: ["Sweet", "Fruity"],
        emoji: "🍍"
    },

    {
        name: "Old Fashioned",
        description: "A traditional whiskey-based cocktail.",
        ingredients: "Whiskey, Sugar, Bitters",
        tags: ["Strong", "Bitter"],
        emoji: "🥃"
    },

    {
        name: "Daiquiri",
        description: "A balanced cocktail with rum and lime.",
        ingredients: "Rum, Lime, Sugar",
        tags: ["Sour", "Refreshing"],
        emoji: "🍹"
    },

    {
        name: "Blue Lagoon",
        description: "A bright blue and fruity cocktail.",
        ingredients: "Vodka, Blue Curacao, Lemonade",
        tags: ["Fruity", "Sweet"],
        emoji: "🩵"
    }

];


// ========================================
// 2. HTML 요소 선택
// ========================================

const searchInput = document.getElementById("searchInput");

const clearButton = document.getElementById("clearButton");

const resetButton = document.getElementById("resetButton");

const tagList = document.getElementById("tagList");

const cocktailList = document.getElementById("cocktailList");

const resultCount = document.getElementById("resultCount");

const noResult = document.getElementById("noResult");


// ========================================
// 3. 태그 데이터
// ========================================

const allTags = [
    "Refreshing",
    "Sweet",
    "Sour",
    "Fruity",
    "Strong",
    "Bitter"
];


// 현재 선택된 태그 저장
const selectedTags = new Set();


// ========================================
// 4. 태그 버튼 생성
// ========================================

function renderTags() {

    // 기존 태그 버튼 초기화
    tagList.innerHTML = "";

    allTags.forEach(tag => {

        const button = document.createElement("button");

        button.type = "button";

        button.className = "tag-button";

        button.textContent = tag;

        // 선택된 태그 표시
        if (selectedTags.has(tag)) {

            button.classList.add("active");

        }

        // 접근성: 선택 상태 전달
        button.setAttribute(
            "aria-pressed",
            selectedTags.has(tag)
        );

        // 태그 버튼 클릭 이벤트
        button.addEventListener("click", () => {

            if (selectedTags.has(tag)) {

                selectedTags.delete(tag);

            } else {

                selectedTags.add(tag);

            }

            renderTags();

            filterCocktails();

        });

        tagList.appendChild(button);

    });

}


// ========================================
// 5. 칵테일 카드 생성
// ========================================

function renderCocktails(items) {

    // 기존 카드 초기화
    cocktailList.innerHTML = "";

    items.forEach(cocktail => {

        const card = document.createElement("article");

        card.className = "cocktail-card";


        // 이미지 영역
        const image = document.createElement("div");

        image.className = "cocktail-image";

        image.textContent = cocktail.emoji;

        image.setAttribute("aria-hidden", "true");


        // 정보 영역
        const info = document.createElement("div");

        info.className = "cocktail-info";


        // 칵테일 이름
        const name = document.createElement("h4");

        name.textContent = cocktail.name;


        // 설명
        const description = document.createElement("p");

        description.className = "cocktail-description";

        description.textContent = cocktail.description;


        // 재료
        const ingredients = document.createElement("p");

        ingredients.className = "ingredients";

        ingredients.textContent = cocktail.ingredients;


        // 태그 영역
        const cardTags = document.createElement("div");

        cardTags.className = "card-tags";


        cocktail.tags.forEach(tag => {

            const tagElement = document.createElement("span");

            tagElement.textContent = tag;

            cardTags.appendChild(tagElement);

        });


        // 카드 요소 결합
        info.appendChild(name);

        info.appendChild(description);

        info.appendChild(ingredients);

        info.appendChild(cardTags);

        card.appendChild(image);

        card.appendChild(info);

        cocktailList.appendChild(card);

    });

}


// ========================================
// 6. 이름 검색 및 태그 필터링
// ========================================

function filterCocktails() {

    // 검색어 가져오기
    const keyword = searchInput.value
        .trim()
        .toLowerCase();


    // 검색 조건에 맞는 칵테일 추출
    const filteredCocktails = cocktails.filter(cocktail => {


        // 이름 검색 조건
        const matchesName = cocktail.name
            .toLowerCase()
            .includes(keyword);


        // 태그 검색 조건
        const matchesTags = [...selectedTags].every(tag =>

            cocktail.tags.includes(tag)

        );


        // 두 조건을 모두 만족해야 표시
        return matchesName && matchesTags;

    });


    // 결과 카드 출력
    renderCocktails(filteredCocktails);


    // 검색 결과 개수 표시
    resultCount.textContent =
        `${filteredCocktails.length} cocktails`;


    // 검색 결과가 없으면 안내문 표시
    noResult.hidden = filteredCocktails.length !== 0;

}


// ========================================
// 7. 이벤트 연결
// ========================================


// 검색창 입력 감지
searchInput.addEventListener("input", filterCocktails);


// 검색어 지우기
clearButton.addEventListener("click", () => {

    searchInput.value = "";

    filterCocktails();

});


// 검색 및 태그 초기화
resetButton.addEventListener("click", () => {

    // 검색어 초기화
    searchInput.value = "";


    // 선택 태그 초기화
    selectedTags.clear();


    // 태그 버튼 다시 생성
    renderTags();


    // 전체 칵테일 출력
    filterCocktails();

});


// ========================================
// 8. 초기 화면 출력
// ========================================

renderTags();

filterCocktails();
