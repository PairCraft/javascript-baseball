const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
const INTERRUPT = 2;
const NUMBER_LENGTH = 3;
const GAMESTATE = {
    START:1,
    EXIT:9
};
Object.freeze(GAMESTATE);

//유저입력 받는 함수 -> 입력대기
async function requestInput(msg){
    return new Promise((resolve)=>{
        rl.question(msg,(answer)=>resolve(answer))
    })
}

async function playGame(){
    let gameState = GAMESTATE.START

    while(gameState === GAMESTATE.START){
        gameState = await requestInput('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요. ')
        gameState = parseInt(gameState);

        if (gameState === GAMESTATE.EXIT){
            break;
        }
        
        gameState = await playLoop(gameState)
    }

    console.log('애플리케이션이 종료되었습니다.');
    rl.close();
}

async function playLoop(gameState) {
    if (gameState !== GAMESTATE.START){
        console.log('1 또는 9를 입력해주세요.')
        return GAMESTATE.START;
    }

    const computerNumber = getComputerNumbers();
    console.log(computerNumber)

    while(gameState === GAMESTATE.START){
        let userNumber = await requireUserNumbers();
        if(userNumber === INTERRUPT){
            return GAMESTATE.EXIT;
        }
        if(checkGameClear(computerNumber, userNumber)){
            return GAMESTATE.START;
        }
    }
}

function getComputerNumbers(){
    let numbers = [1,2,3,4,5,6,7,8,9];
    let computerNumbers = Array.from({length: NUMBER_LENGTH}, () => {
        let randomIndex = Math.floor(Math.random()* numbers.length);/*랜덤으로 뽑는다 0에서 배열 넘버의 사이즈 -1 만큼*/ 
        let selectedNumber = numbers[randomIndex];
        numbers.splice(randomIndex, 1);
        return selectedNumber;
    })

    console.log('컴퓨터가 숫자를 뽑았습니다.');
    return computerNumbers;
}

async function requireUserNumbers(){
    while(true){
        let numbers = await requestInput('숫자를 입력해주세요: ')
        if(parseInt(numbers) === INTERRUPT){
            return INTERRUPT;
        }
        numbers = checkUserNumbers(numbers);
        if(numbers !== null){
            return numbers.split('').map(Number);
        }
    }
}

//세자리 숫자인지 확인
function checkUserNumbers(userNumbers){
    if(isNaN(userNumbers)){
        console.log('숫자를 입력해주세요.')
        return null;
    }
    if(userNumbers.includes('0')){
        console.log('1에서 9까지의 숫자를 입력해주세요')
        return null;
    }
    let distinctNumbers = new Set(userNumbers);
    if (userNumbers.length !== NUMBER_LENGTH || distinctNumbers.size !== NUMBER_LENGTH){
        console.log('중복없는 세자리 숫자를 입력해주세요.')
        return null;
    }
    return userNumbers;
    
}

function checkGameClear(computerNumbers,userNumbers){
    let strikeCount = 0;
    let ballCount = 0;
    let strikes = computerNumbers.filter((element, index)=>userNumbers.indexOf(element)===index);
    let inclusion = computerNumbers.filter((element)=>userNumbers.includes(element));
    strikeCount = strikes.length;
    ballCount = inclusion.length - strikeCount;
    if (strikeCount === NUMBER_LENGTH){
        console.log(strikeCount + '스트라이크');
        console.log('3개의 숫자를 모두 맞히셨습니다.');
        console.log('-------게임 종료-------');
        return true;
    }
    if (ballCount === 0 && strikeCount === 0){
        console.log('낫싱');
    }
    else{
        console.log( ballCount + '볼 ' + strikeCount + '스트라이크');
    }
}

playGame();