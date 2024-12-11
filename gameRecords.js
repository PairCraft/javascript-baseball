// 게임 정보 기록
function recordGameResult(gameRecords, startTime, inning, inningLimit, isClear) {
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
function getMinInning(gameRecords) {
    const minInning = gameRecords.reduce((acc, record) => {
        if (record.inning <= acc) {
            return record.inning;
        } else {
            return acc;
        }
    }, Infinity);

    const minInningGameIds = gameRecords.reduce((acc, record, index) => {
        if (record.inning === minInning) {
            acc.push(index + 1);
        }

        return acc;
    }, []);

    return { minInning, minInningGameIds };
}

// 가장 큰 라운드(이닝) 수와 그에 해당하는 gameId 배열을 반환하는 함수
function getMaxInning(gameRecords) {
    const maxInning = gameRecords.reduce((acc, record) => {
        if (record.inning >= acc) {
            return record.inning;
        } else {
            return acc;
        }
    }, 0);

    const maxInningGameIds = gameRecords.reduce((acc, record, index) => {
        if (record.inning === maxInning) {
            acc.push(index + 1);
        }

        return acc;
    }, []);

    return { maxInning, maxInningGameIds };
}

// 입력제한 횟수들 중 최빈값과 그에 해당하는 gameId 배열을 반환하는 함수
function getModeInningLimit(gameRecords) {
    // 입력제한 횟수의 빈도수 구하기
    const inningLimitFrequencies = gameRecords.reduce((acc, record, index) => {
        if (!acc[record.inningLimit]) {
            acc[record.inningLimit] = { frequency: 0, gameIds: [] };
        }
        acc[record.inningLimit].frequency += 1;
        acc[record.inningLimit].gameIds.push(index + 1);
        return acc;
    }, {});
    // 가장큰 최빈값의 값
    const maxInningLimitFrequency = Math.max(...Object.values(inningLimitFrequencies).map(data => data.frequency));
    // 최빈값과 그에 해당하는 gameId 배열 구하기
    const modeInningLimit = Object.entries(inningLimitFrequencies).reduce((acc, [inningLimit, frequencyData]) => {
        if (frequencyData.frequency === maxInningLimitFrequency) {
            acc.inningLimit.push(inningLimit);
            acc.frequencyData.gameIds.push(frequencyData.gameIds);
        }
        return acc;
    }, { inningLimit: [], frequencyData: { frequency: 0, gameIds: [] } });
    const resultModeInningLimit = modeInningLimit.inningLimit;
    const resultGameIds = modeInningLimit.frequencyData.gameIds;
    return { resultModeInningLimit, resultGameIds };
}

// 가장 큰 입력제한횟수와 그에 해당하는 gameId 배열을 반환하는 함수
function getMaxInningLimit(gameRecords) {
    const maxInningLimit = Math.max(...gameRecords.map(record => record.inningLimit));
    const maxInningLimitGameIds = gameRecords
        .map((record, index) => (record.inningLimit === maxInningLimit ? index + 1 : null))
        .filter(id => id !== null);

    return { maxInningLimit, maxInningLimitGameIds };
}


// 가장 작은 입력제한횟수와 그에 해당하는 gameId 배열을 반환하는 함수
function getMinInningLimit(gameRecords) {
    const minInningLimit = Math.min(...gameRecords.map(record => record.inningLimit));
    const minInningLimitGameIds = gameRecords
        .map((record, index) => (record.inningLimit === minInningLimit ? index + 1 : null))
        .filter(id => id !== null);

    return { minInningLimit, minInningLimitGameIds };
}


function getAverageInningLimit(gameRecords) {
    let sumOfInningLimit = 0;
    let count = 0;

    gameRecords.forEach(record => {
        sumOfInningLimit += record.inningLimit;
        count++;
    });

    const averageOfInningLimit = sumOfInningLimit / count;
    return averageOfInningLimit;
}


function getModeComputerWinInningLimit(gameRecords) {

    const computerWinRecords = gameRecords.filter(element => element.isClear === false);

    const inningLimitFrequencies = {};
    computerWinRecords.forEach(record => {
        const inningLimit = record.inningLimit;
        inningLimitFrequencies[inningLimit] = (inningLimitFrequencies[inningLimit] || 0) + 1;
    });

    const frequencies = Object.values(inningLimitFrequencies);
    const maxInningLimitFrequency = Math.max(...frequencies);

    const modeInningLimit = Object.keys(inningLimitFrequencies).filter(
        inningLimit => inningLimitFrequencies[inningLimit] === maxInningLimitFrequency
    ).map(Number); 

    if (modeInningLimit.length === 0) {
        modeInningLimit.push(0);
    }

    return modeInningLimit;
}

function getModeUserWinInning(gameRecords) {
    const userWinRecords = gameRecords.filter(element => element.isClear === true);

    const inningFrequencies = {};
    userWinRecords.forEach(record => {
        const inning = record.inning;
        inningFrequencies[inning] = (inningFrequencies[inning] || 0) + 1;
    });

    const frequencies = Object.values(inningFrequencies);
    const maxInningFrequency = Math.max(...frequencies);

    const modeInning = Object.keys(inningFrequencies)
        .filter(inning => inningFrequencies[inning] === maxInningFrequency)
        .map(Number);

    if (modeInning.length === 0) {
        modeInning.push(0);
    }

    return modeInning;
}



module.exports = {
    recordGameResult,
    getMinInning,
    getMaxInning,
    getModeInningLimit,
    getMaxInningLimit,
    getMinInningLimit,
    getAverageInningLimit,
    getModeComputerWinInningLimit,
    getModeUserWinInning
};