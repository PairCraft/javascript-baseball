const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const NUMBER_LENGTH = 3;
const GAMESTATE = {
    START:1,
    HISTORY:2,
    STATS:3,
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
    let gameState
    let gameRecords = []
    while(gameState !== GAMESTATE.EXIT){
        gameState = await requestInput('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요. ')
        gameState = parseInt(gameState)
        
        gameState = await handleGameState(gameState, gameRecords)
    }
}
async function handleGameState(gameState, gameRecords) {
    switch(gameState){
        case GAMESTATE.START : 
            await playLoop(gameRecords)
            console.log('-------게임 종료-------')
            break
        case GAMESTATE.HISTORY : 
            showHistory(gameRecords)
            break
        case GAMESTATE.STATS :
            showStats(gameRecords)
            break
        case GAMESTATE.EXIT :
            console.log('애플리케이션이 종료되었습니다.')
            rl.close();
            break
        default :
            console.log('1,2,3,9중에 입력해주세요.')
            break
    }
    return gameState
}
function convertTime(time){
    minutes = ('0' + time.getMinutes()).slice(-2)
    return `${time.getFullYear()}. ${time.getMonth()}. ${time.getDate()} ${time.getHours()}:${minutes}`
}

function showHistory(gameRecords){ // 기록
    history = gameRecords.reduce((acc, record, index) => {
        return acc + `- [${index+1}] / 시작시간: ${convertTime(record.startTime)} / 종료시간: ${record.endTime} / 횟수: ${record.inningLimit} / 승리자: ${record.isClear}\n`;
    }, '');
    console.log(history)
}

function showStats(gameRecords){ // 통계

}

function recordGameResult(gameRecords,startTime,inningLimit,isClear){
    const endTime = new Date()
    gameRecords.push({
        startTime,
        endTime,
        inningLimit,
        isClear
    })
}

async function playLoop(gameRecords) {
    console.log('컴퓨터에게 승리하기 위해 몇번만에 성공해야 하나요?')
    const inningLimit = await requestInput("")
    const computerNumber = getComputerNumbers()
    console.log(computerNumber) // 난중에 지울것 답지임
    const startTime = new Date()
    
    let inning = 0
    while(inning < inningLimit){
        let userNumber = await requireUserNumbers();
        if(checkGameClear(computerNumber, userNumber)){
            recordGameResult(gameRecords,startTime,inningLimit,true)
            console.log("사용자가 승리하였습니다") 
            return // 승리 경우 리턴
        }
        inning++
    }
    recordGameResult(gameRecords,startTime,inningLimit,false)
    console.log("컴퓨터가 승리하였습니다")
    return // 패패 경우 리턴
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

function compareNumber(computerNumbers,userNumbers){
    const strikes = computerNumbers.filter((element, index)=>userNumbers.indexOf(element)===index);
    const inclusion = computerNumbers.filter((element)=>userNumbers.includes(element));
    const strikeCount = strikes.length;
    const ballCount = inclusion.length - strikeCount;
    return {strikeCount, ballCount}
}

function checkGameClear(computerNumbers,userNumbers){

    const {strikeCount, ballCount} = compareNumber(computerNumbers,userNumbers)
    if (strikeCount === NUMBER_LENGTH){
        console.log(strikeCount + '스트라이크');
        console.log('3개의 숫자를 모두 맞히셨습니다.');
        return true;
    }
    if (ballCount === 0 && strikeCount === 0){
        console.log('낫싱');
    }
    else{
        console.log( ballCount + '볼 ' + strikeCount + '스트라이크');
    }
    return false
}

playGame();