/**
 * Banco de dados estruturado com as 34 práticas do ITIL 4
 * Group 0: Gerenciamento geral
 * Group 1: Gerenciamento de serviços
 * Group 2: Gerenciamento técnico
 */
const allPractices = [
    { name: "Gerenciamento de estratégia", group: 0 },
    { name: "Gerenciamento de portfólio", group: 0 },
    { name: "Gerenciamento de relacionamento", group: 0 },
    { name: "Gerenciamento de fornecedores", group: 0 },
    { name: "Gerenciamento de mudança organizacional", group: 0 },
    { name: "Gerenciamento de projeto", group: 0 },
    { name: "Gerenciamento financeiro", group: 0 },
    { name: "Gerenciamento de risco", group: 0 },
    { name: "Gerenciamento de conhecimento", group: 0 },
    { name: "Gerenciamento de força de trabalho e talentos", group: 0 },
    { name: "Gerenciamento de arquitetura", group: 0 },
    { name: "Gerenciamento de segurança da informação", group: 0 },
    { name: "Medição e relatórios", group: 0 },
    { name: "Melhoria contínua", group: 0 },

    { name: "Análise de negócios", group: 1 },
    { name: "Projeto de serviço", group: 1 },
    { name: "Gerenciamento de catálogo de serviço", group: 1 },
    { name: "Gerenciamento de nível de serviço", group: 1 },
    { name: "Gerenciamento de capacidade e desempenho", group: 1 },
    { name: "Gerenciamento de disponibilidade", group: 1 },
    { name: "Gerenciamento de continuidade de serviço", group: 1 },
    { name: "Controle de mudanças", group: 1 },
    { name: "Gerenciamento de ativos de TI", group: 1 },
    { name: "Gerenciamento de configuração", group: 1 },
    { name: "Gerenciamento de liberações", group: 1 },
    { name: "Monitoramento e gerenciamento de eventos", group: 1 },
    { name: "Gerenciamento de incidentes", group: 1 },
    { name: "Gerenciamento de problemas", group: 1 },
    { name: "Gerenciamento de requisições de serviço", group: 1 },
    { name: "Central de serviços", group: 1 },
    { name: "Validação e testes de serviço", group: 1 },

    { name: "Desenvolvimento e gerenciamento de software", group: 2 },
    { name: "Gerenciamento de infraestrutura e plataformas", group: 2 },
    { name: "Gerenciamento de implantação", group: 2 }
];

const groupNames = [
    "Gerenciamento geral",
    "Gerenciamento de serviços",
    "Gerenciamento técnico"
];

// Estado global do jogo
let gameQuestions = [];
let currentRound = 0;
let score = 0;
let roundAnswered = false;
let userHistory = [];

// Mapeamento do DOM
const practiceText = document.getElementById('practice-text');
const progressText = document.getElementById('progress');
const nextBtn = document.getElementById('next-btn');
const optionButtons = document.querySelectorAll('.option-btn');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const finalScoreText = document.getElementById('final-score');
const scoreMessage = document.getElementById('score-message');
const reviewList = document.getElementById('review-list');

/**
 * Embaralha o array usando o algoritmo Fisher-Yates
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Inicializa ou reinicia a partida
 */
function startNewGame() {
    gameQuestions = shuffleArray([...allPractices]);
    currentRound = 0;
    score = 0;
    userHistory = [];
    
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    loadRound();
}

/**
 * Carrega a prática atual na tela e reseta os botões
 */
function loadRound() {
    roundAnswered = false;
    nextBtn.disabled = true;
    
    optionButtons.forEach(btn => {
        btn.className = "option-btn";
        btn.disabled = false;
        btn.style.cursor = "pointer";
    });
    
    progressText.innerText = `Questão ${currentRound + 1} de ${gameQuestions.length}`;
    practiceText.innerText = gameQuestions[currentRound].name;
}

/**
 * Valida a resposta clicada pelo usuário
 */
function checkAnswer(selectedGroup) {
    if (roundAnswered) return;
    roundAnswered = true;

    const currentPractice = gameQuestions[currentRound];
    const correctGroup = currentPractice.group;
    const isCorrect = selectedGroup === correctGroup;

    // Salva histórico para a revisão final
    userHistory.push({
        practiceName: currentPractice.name,
        selected: selectedGroup,
        correct: correctGroup,
        isCorrect: isCorrect
    });

    // Destaca as opções e bloqueia novos cliques
    optionButtons.forEach((btn, index) => {
        btn.disabled = true;
        btn.style.cursor = "default";
        if (index === correctGroup) {
            btn.classList.add('correct');
        }
    });

    if (isCorrect) {
        score++;
    } else {
        optionButtons[selectedGroup].classList.add('wrong');
    }

    // Libera o botão de avançar
    nextBtn.disabled = false;
}

/**
 * Evento do botão "Próxima Prática"
 */
nextBtn.addEventListener('click', () => {
    if (nextBtn.disabled) return; 

    currentRound++;
    if (currentRound < gameQuestions.length) {
        loadRound();
    } else {
        showFinalResults();
    }
});

/**
 * Calcula os resultados finais e constrói a view de revisão
 */
function showFinalResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const percentage = Math.round((score / gameQuestions.length) * 100);
    finalScoreText.innerText = `Você acertou ${score}/${gameQuestions.length} (${percentage}%)`;
    
    // Mensagem dinâmica de acordo com a pontuação
    if (score === 34) {
        scoreMessage.innerText = "Perfeito! Você dominou o ITIL 4 por completo! 🏆🚀";
    } else if (score >= 26) {
        scoreMessage.innerText = "Excelente pontuação! Um ótimo domínio da estrutura. 🎯";
    } else if (score >= 18) {
        scoreMessage.innerText = "Bom resultado! Repita o teste algumas vezes para fixar os detalhes. 📚";
    } else {
        scoreMessage.innerText = "Continue praticando! A repetição vai te dar agilidade na prova. 💪";
    }

    // Renderiza o gabarito
    reviewList.innerHTML = "";
    userHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = `review-item ${item.isCorrect ? 'item-correct' : 'item-wrong'}`;
        
        if (item.isCorrect) {
            div.innerHTML = `
                <strong>${item.practiceName}</strong>
                <div class="review-meta">Sua resposta: ${groupNames[item.correct]} ✅</div>
            `;
        } else {
            div.innerHTML = `
                <strong>${item.practiceName}</strong>
                <div class="review-meta">Sua resposta: ${groupNames[item.selected]} ❌</div>
                <div class="correction-text">➔ Correto: ${groupNames[item.correct]}</div>
            `;
        }
        reviewList.appendChild(div);
    });
}

// Inicializa a partida automaticamente ao carregar
startNewGame();
