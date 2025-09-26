// Dados do quiz
const quizData = [
    {
        question: "Qual é a capital do Brasil?",
        answers: {
            a: "São Paulo",
            b: "Rio de Janeiro", 
            c: "Brasília",
            d: "Salvador"
        },
        correct: "c"
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        answers: {
            a: "Terra",
            b: "Júpiter",
            c: "Saturno", 
            d: "Marte"
        },
        correct: "b"
    },
    {
        question: "Em que ano o Brasil foi descoberto?",
        answers: {
            a: "1500",
            b: "1492",
            c: "1501",
            d: "1498"
        },
        correct: "a"
    },
    {
        question: "Qual é o oceano que banha a costa brasileira?",
        answers: {
            a: "Oceano Pacífico",
            b: "Oceano Índico",
            c: "Oceano Atlântico",
            d: "Oceano Ártico"
        },
        correct: "c"
    },
    {
        question: "Quantos continentes existem no mundo?",
        answers: {
            a: "5",
            b: "6",
            c: "7",
            d: "8"
        },
        correct: "c"
    },
    {
        question: "Qual é a fórmula química da água?",
        answers: {
            a: "CO2",
            b: "H2O",
            c: "O2",
            d: "NaCl"
        },
        correct: "b"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        answers: {
            a: "Pablo Picasso",
            b: "Vincent van Gogh",
            c: "Leonardo da Vinci",
            d: "Michelangelo"
        },
        correct: "c"
    },
    {
        question: "Qual é o menor país do mundo?",
        answers: {
            a: "Mônaco",
            b: "Vaticano",
            c: "San Marino",
            d: "Liechtenstein"
        },
        correct: "b"
    },
    {
        question: "Em que ano terminou a Segunda Guerra Mundial?",
        answers: {
            a: "1944",
            b: "1945",
            c: "1946",
            d: "1947"
        },
        correct: "b"
    },
    {
        question: "Qual é a montanha mais alta do mundo?",
        answers: {
            a: "K2",
            b: "Kangchenjunga",
            c: "Monte Everest",
            d: "Lhotse"
        },
        correct: "c"
    }
];

// Variáveis do jogo
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let isAnswered = false;

// Elementos DOM
const questionText = document.getElementById('question-text');
const answerA = document.getElementById('answer-a');
const answerB = document.getElementById('answer-b');
const answerC = document.getElementById('answer-c');
const answerD = document.getElementById('answer-d');
const nextBtn = document.getElementById('next-btn');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progress = document.getElementById('progress');
const quizContent = document.querySelector('.quiz-content');
const resultSection = document.getElementById('result-section');
const finalScore = document.getElementById('final-score');
const scorePercentage = document.getElementById('score-percentage');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

// Inicializar quiz
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    isAnswered = false;
    
    // Mostrar seção do quiz e esconder resultado
    quizContent.style.display = 'block';
    resultSection.style.display = 'none';
    
    // Atualizar total de questões
    totalQuestionsSpan.textContent = quizData.length;
    
    // Carregar primeira questão
    loadQuestion();
}

// Carregar questão atual
function loadQuestion() {
    const current = quizData[currentQuestion];
    
    // Atualizar texto da questão
    questionText.textContent = current.question;
    
    // Atualizar respostas
    answerA.textContent = current.answers.a;
    answerB.textContent = current.answers.b;
    answerC.textContent = current.answers.c;
    answerD.textContent = current.answers.d;
    
    // Atualizar contador de questões
    currentQuestionSpan.textContent = currentQuestion + 1;
    
    // Atualizar barra de progresso
    const progressPercent = ((currentQuestion + 1) / quizData.length) * 100;
    progress.style.width = progressPercent + '%';
    
    // Resetar estado das opções
    resetAnswerOptions();
    
    // Resetar variáveis
    selectedAnswer = null;
    isAnswered = false;
    nextBtn.disabled = true;
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finalizar' : 'Próxima';
}

// Resetar opções de resposta
function resetAnswerOptions() {
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
}

// Selecionar resposta
function selectAnswer(answer) {
    if (isAnswered) return;
    
    selectedAnswer = answer;
    
    // Remover seleção anterior
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Adicionar seleção atual
    const selectedOption = document.querySelector(`[data-answer="${answer}"]`);
    selectedOption.classList.add('selected');
    
    // Habilitar botão próxima
    nextBtn.disabled = false;
}

// Mostrar resposta correta
function showCorrectAnswer() {
    isAnswered = true;
    const correctAnswer = quizData[currentQuestion].correct;
    
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => {
        const answer = option.getAttribute('data-answer');
        
        if (answer === correctAnswer) {
            option.classList.add('correct');
        } else if (answer === selectedAnswer && answer !== correctAnswer) {
            option.classList.add('incorrect');
        }
    });
    
    // Verificar se a resposta está correta
    if (selectedAnswer === correctAnswer) {
        score++;
    }
}

// Próxima questão
function nextQuestion() {
    if (!isAnswered) {
        showCorrectAnswer();
        return;
    }
    
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Mostrar resultados
function showResults() {
    quizContent.style.display = 'none';
    resultSection.style.display = 'block';
    
    // Calcular porcentagem
    const percentage = Math.round((score / quizData.length) * 100);
    
    // Atualizar elementos de resultado
    finalScore.textContent = score;
    scorePercentage.textContent = percentage + '%';
    
    // Mensagem baseada na pontuação
    let message = '';
    if (percentage >= 90) {
        message = 'Excelente! Você é um verdadeiro expert!';
    } else if (percentage >= 70) {
        message = 'Muito bem! Você tem um bom conhecimento!';
    } else if (percentage >= 50) {
        message = 'Bom trabalho! Continue estudando!';
    } else {
        message = 'Não desista! Pratique mais e tente novamente!';
    }
    
    resultMessage.textContent = message;
}

// Reiniciar quiz
function restartQuiz() {
    initQuiz();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar quiz
    initQuiz();
    
    // Event listeners para opções de resposta
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach(option => {
        option.addEventListener('click', function() {
            const answer = this.getAttribute('data-answer');
            selectAnswer(answer);
        });
    });
    
    // Event listener para botão próxima
    nextBtn.addEventListener('click', nextQuestion);
    
    // Event listener para botão reiniciar
    restartBtn.addEventListener('click', restartQuiz);
});