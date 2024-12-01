// 게임 정보 기록
function recordGameResult(gameRecords, startTime, inning, inningLimit, isClear){
    const endTime = new Date();
    gameRecords.push({
        startTime,
        endTime,
        inning,
        inningLimit,
        isClear
    });
}

// 가장 작은 라운드(이닝) 수와 그에 해당하는 gameId 배열을 반환하는 함수
function getMinInning(gameRecords){
    const minInning = gameRecords.reduce((acc, record) => {
        if (record.inning <= acc){
            return record.inning;
        } else {
            return acc;
        }
    }, Infinity);

    let minInningGameIds = gameRecords.reduce((acc, record, index) => {
        if (record.inning === minInning){
            acc.push(index + 1);
        }

        return acc;
    }, []);

    return {minInning, minInningGameIds};
}

// 가장 큰 라운드(이닝) 수와 그에 해당하는 gameId 배열을 반환하는 함수
function getMaxInning(gameRecords){
    const maxInning = gameRecords.reduce((acc, record) => {
        if (record.inning >= acc){
            return record.inning;
        } else {
            return acc;
        }
    }, 0);

    let maxInningGameIds = gameRecords.reduce((acc, record, index) => {
        if (record.inning === maxInning){
            acc.push(index + 1);
        }

        return acc;
    }, []);

    return {maxInning, maxInningGameIds};
}

// 입력제한 횟수들 중 최빈값과 그에 해당하는 gameId 배열을 반환하는 함수
function getModeInningLimit(gameRecords){
    // 입력제한 횟수의 빈도수 구하기
    const inningLimitFrequencies = gameRecords.reduce((acc, record, index) => {
        if (!acc[record.inningLimit]){
            acc[record.inningLimit] = {frequency: 0, gameIds: []};
        }

        acc[record.inningLimit].frequency += 1;
        acc[record.inningLimit].gameIds.push(index + 1);
        return acc;
    }, {});

    // 최빈값과 그에 해당하는 gameId 배열 구하기
    const modeInningLimit = Object.entries(inningLimitFrequencies).reduce((acc, [inningLimit, frequencyData]) =>{
        if (frequencyData.frequency >= acc.frequencyData.frequency){
            return {inningLimit: inningLimit, frequencyData: frequencyData};
        }

        return acc;
    }, {inningLimit: 0, frequencyData: {frequency: 0, gameIds: []}});

    const resultModeInningLimit = modeInningLimit.inningLimit;
    const resultGameIds = modeInningLimit.frequencyData.gameIds;
    return {resultModeInningLimit, resultGameIds};
}

// 가장 큰 입력제한횟수와 그에 해당하는 gameId 배열을 반환하는 함수
function getMaxInningLimit(gameRecords){
    const maxInningLimit = gameRecords.reduce((acc, record) => {
        if (record.inningLimit >= acc){
            return record.inningLimit;
        } else {
            return acc;
        }
    }, 0);

    let maxInningLimitGameIds = gameRecords.reduce((acc, record, index) => {
        if (record.inningLimit === maxInningLimit){
            return acc.push(index + 1);
        }
        
        return acc;    
    }, []);

    return {maxInningLimit, maxInningLimitGameIds};
}

// 가장 작은 입력제한횟수와 그에 해당하는 gameId 배열을 반환하는 함수
function getMinInningLimit(gameRecords){
    const minInningLimit = gameRecords.reduce((acc, record) => {
        if (record.inningLimit <= acc){
            return record.inningLimit;
        } else {
            return acc;
        }
    }, Infinity);

    let minInningLimitGameIds = gameRecords.reduce((acc, record, index) => {
        if (record.inningLimit === minInningLimit){
            return acc.push(index + 1);
        } 
        
        return acc;
    }, []);

    return {minInningLimit, minInningLimitGameIds};
}

module.exports = {
    recordGameResult,
    getMinInning,
    getMaxInning,
    getModeInningLimit,
    getMaxInningLimit,
    getMinInningLimit
};