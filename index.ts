// 커밋 테스트
// PC세 자릿 수 뽑기
const numberlength = 3;
function getPCnumber(){
    let arr_number = [1,2,3,4,5,6,7,8,9];
    let arr_PCnumber = [3];
    for(let idx = 0; idx < numberlength; idx++){
        let randomindex = /*랜덤으로 뽑는다 0에서 배열 넘버의 사이즈 -1 만큼*/;
        arr_PCnumber[idx] = arr_number[randomindex];
        arr_number.splice(randomindex,1);        
    }
}
// 유저입력 배열 변환,유저입력 받은 곳 중복 확인 사이즈가 세 자릿 수 인지 확인
function convertUsernumber(Usernum:number){
    let strUsernum = String(Usernum);
    let arr_temp = new Set(strUsernum);
    if (arr_temp.size != numberlength){
        return null;
    }

}

// 결과 {결과 실패 -> 힌트, 결과 성공 -> 처음으로 돌아감}
function comparenumber(pcnum,usernum){
    for(let idx = 0; idx < usernum.length(); idx++){
        let result_idx = pcnum.IndexOf()
    }
}