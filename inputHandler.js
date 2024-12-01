const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

// 유저입력 받는 함수 -> 입력대기
async function requestInput(msg){
    return new Promise((resolve)=>{
        rl.question(msg,(answer)=>resolve(answer));
    });
}

function closeInput(){
    rl.close();
}

module.exports = {requestInput, closeInput};
