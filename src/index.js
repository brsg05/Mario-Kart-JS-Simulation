const player1 = {

    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {

    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

const player3 = {
    
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
};

const player4 = {
        
    NOME: "Toad",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 2,
    PONTOS: 0,
};

const player5 = {
                
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
};        

const player6 = {
                        
        NOME: "Bowser",
        VELOCIDADE: 5,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
};

const player7 = {
        NOME: "Donkey Kong",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;    
    }   
    return result;
}

async function logRollResult(characterName, block, attribute, diceResult) {
    console.log(`${characterName} rolou o dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);  
}
async function playRaceEngine(character1, character2) {
        for(let round = 1; round < 6; round++) {
                console.log(`🏁 Rodada ${round} 🏁`);

                //sortear bloco
                let block = await getRandomBlock();
                console.log(`Bloco: ${block}`);
                const dice = await rollDice();

                let diceResult1 = await rollDice();
                let diceResult2 = await rollDice(); 

                //teste de habilidade
                let testSkill1 = 0;
                let testSkill2 = 0;

                if(block == "RETA"){
                    testSkill1 = player1.VELOCIDADE + diceResult1;
                    testSkill2 = player2.VELOCIDADE + diceResult2;
                    
                    await logRollResult(
                        character1.NOME, 
                        "VELOCIDADE", 
                        diceResult1, 
                        character1.VELOCIDADE
                    );

                    await logRollResult(
                        character2.NOME, 
                        "VELOCIDADE", 
                        diceResult2, 
                        character2.VELOCIDADE
                    );

                    }

                if(block == "CURVA"){
                    testSkill1 = player1.MANOBRABILIDADE + diceResult1;
                    testSkill2 = player2.MANOBRABILIDADE + diceResult2;

                    await logRollResult(
                        character1.NOME, 
                        "MANOBRABILIDADE", 
                        diceResult1, 
                        character1.MANOBRABILIDADE
                    );

                    await logRollResult(
                        character2.NOME, 
                        "MANOBRABILIDADE", 
                        diceResult2, 
                        character2.MANOBRABILIDADE
                    );

                }
                if(block == "CONFRONTO"){
                    let powerResult1 = player1.PODER + diceResult1;
                    let powerResult2 = player2.PODER + diceResult2;

                    console.log(`Poder de ${character1.NOME} confrontou ${character2.NOME} 🚨`);

                    await logRollResult(
                        character1.NOME, 
                        "PODER", 
                        diceResult1, 
                        character1.PODER
                    );

                    await logRollResult(
                        character2.NOME, 
                        "PODER", 
                        diceResult2, 
                        character2.PODER
                    );

                    if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                            character2.PONTOS--;
                            console.log(
                                `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto!`);
                    }
                    else if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                            character1.PONTOS--;
                            console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto!`);
                    }
                    else if(powerResult1 > powerResult2 && character1.PONTOS == 0){
                        console.log("Nenhum ponto perdido!");
                    }
                    else if(powerResult2 > powerResult1 && character2.PONTOS == 0){
                        console.log("Nenhum ponto perdido!");
                    }
                    else{
                        console.log("Empate!");
                    }
                }

                if(testSkill1 > testSkill2){
                    console.log(`${character1.NOME} marcou um ponto!`);
                    character1.PONTOS++;
                }
                else if(testSkill2 > testSkill1){
                    console.log(`${character2.NOME} marcou um ponto!`);
                    character2.PONTOS++;
                }
                else if(testSkill1 == testSkill2 && block != "CONFRONTO"){
                    console.log("Empate!");
                }

                console.log("------------------------")
   
        }
}

async function declareWinner(player1, player2) {
    console.log("🏁🏆 Fim da corrida! 🏁🏆\n");
    console.log(`Resultados:`);
    console.log(`${player1.NOME} com ${player1.PONTOS} pontos!`);
    console.log(`${player2.NOME} com ${player2.PONTOS} pontos!`);
    
    if(player1.PONTOS > player2.PONTOS){
        console.log(`${player1.NOME} venceu a corrida!\n`);
    }
    else if(player2.PONTOS > player1.PONTOS){
        console.log(`${player2.NOME} venceu a corrida!\n`);
    }
    else
        console.log("A corrida terminou em Empate!\n");
    
}

(async function main() {
    console.log("Início da corrida!");
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);

    await playRaceEngine(player1, player2);

    await declareWinner(player1, player2);
})();

