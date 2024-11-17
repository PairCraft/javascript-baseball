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
    gamestate = await requestInput('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요. ')
        switch(parseInt(gamestate)){
            case GAMESTATE.START:{
                pc_num = getPCNumber();
                while(gamestate == GAMESTATE.START){
                    user_num = await requireUserNumber();
                    if(user_num == INTERRUPT){
                        console.log('애플리케이션이 종료되었습니다.');
                        rl.close();
                        return;
                    }
                    compareNumber(pc_num, user_num);
                }
                await playGame();
                break;
            }
            case GAMESTATE.EXIT:{
                console.log('애플리케이션이 종료되었습니다.');
                rl.close();
                break;
            }
        }
    }
function getPCNumber(){
    let arr_number = [1,2,3,4,5,6,7,8,9];
    let arr_PCnumber = [NUMBER_LENGTH];
    for(let idx = 0; idx < NUMBER_LENGTH; idx++){
        let randomindex = Math.floor(Math.random()* arr_number.length);/*랜덤으로 뽑는다 0에서 배열 넘버의 사이즈 -1 만큼*/
        arr_PCnumber[idx] = arr_number[randomindex];
        arr_number.splice(randomindex,1);
    }
    console.log('컴퓨터가 숫자를 뽑았습니다.');
    return arr_PCnumber;
}
async function requireUserNumber(){
    while(true){
    num = await requestInput('숫자를 입력해주세요: ')
    if(num == INTERRUPT){
        return INTERRUPT;
    }
    num = checkUserNumber(num);
        if(num != null){
            return num.split('').map(Number);
        }
    }
}
//세자리 숫자인지 확인
function checkUserNumber(Usernum){
    if (Usernum.length != NUMBER_LENGTH){
        console.log('세자리 숫자를 입력해주세요.')
        return null;
    }
    return Usernum;
}
function compareNumber(pcNum,userNum){
    let strike_count = 0;
    let ball_count = 0;
    let arr_strike = pcNum.filter((element, index)=>userNum.indexOf(element)==index);
    let arr_include = pcNum.filter((element)=>userNum.includes(element));
    strike_count = arr_strike.length;
    ball_count = arr_include.length - strike_count;
    if (strike_count == NUMBER_LENGTH){
        console.log(strike_count + '스트라이크');
        console.log('3개의 숫자를 모두 맞히셨습니다.');
        console.log('-------게임 종료-------');
        gamestate = GAMESTATE.EXIT;
        return;
    }
    if (ball_count == 0 && strike_count == 0){
        console.log('낫싱');
    }
    else{
        console.log( ball_count + '볼 ' + strike_count + '스트라이크');
    }
}

playGame();