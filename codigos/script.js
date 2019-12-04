tela = 1
cont = 0;
cont_perg = 0;
posX = posY = 10
tamGride = 20;  //A tela (400x400) foi dividida em 20 quadrados
capacidade = 20;
pontoX = [];
pontoY = [];
veloX = veloY = 0;
trilha = [];
cauda = 1;
colisao = false;
var menu;
nivel = 1;  //Perguntas de acordo com o nível. perg1 ====> nível 1. Foi usado json para facilitar a implementação das perguntas ao código
vidas = 3;

perg1 = [{
        q: "1 + 2 = ?",
        alt: [3, 5, 4],
        r: 0
    },
    {
        q: "5 + 1 = ?",
        alt: [11, 6, 4],
        r: 1
    },
    {
        q: "4 + 3 = ?",
        alt: [12, 14, 7],
        r: 2
    },
    {
        q: "7 + 2 = ?",
        alt: [9, 12, 5],
        r: 0
    },
    {
        q: "7 + 3 = ?",
        alt: [1, 6, 10],
        r: 2
    },
    {
        q: "8 + 6 = ?",
        alt: [14, 5, 12],
        r: 0
    },
    {
        q: "7 - 2 =  ?",
        alt: [5, 9, 3],
        r: 0
    },
    {
        q: "4 - 1 = ?",
        alt: [9, 3, 5],
        r: 1
    },
    {
        q: "7 + 8 = ?",
        alt: [4, 15, 8],
        r: 1
    },
    {
        q: "15-9 = ?",
        alt: [6, 20, 16],
        r: 0
    }

]
perg2 = [{
        q: "2 x 3 = ?",
        alt: [5, 10, 6],
        r: 2
    },
    {
        q: "1 x 2 = ?",
        alt: [3, 2, 21],
        r: 1
    },
    {
        q: "2 x 1 = ?",
        alt: [12, 5, 2],
        r: 2
    },
    {
        q: "4 x 3 = ?",
        alt: [12, 43, 5],
        r: 0
    },
    {
        q: "5 x 2 = ?",
        alt: [11, 15, 10],
        r: 2
    },
    {
        q: "7 x 3 = ?",
        alt: [21, 5, 3],
        r: 0
    },
    {
        q: "9 x 4 = ?",
        alt: [36, 1, 28],
        r: 0
    },
    {
        q: "10 / 2 = ?",
        alt: [12, 5, 20],
        r: 1
    },
    {
        q: "6 / 2 = ?",
        alt: [8, 1, 3],
        r: 2
    },
    {
        q: "20 / 5 = ?",
        alt: [4, 2, 15],
        r: 0
    }

]
perg3 = [{
        q: "22 + 11 = ?",
        alt: [35, 15, 33],
        r: 2
    },
    {
        q: "78 + 12 = ?",
        alt: [11, 90, 4],
        r: 1
    },
    {
        q: "77 + 33 = ?",
        alt: [12, 140, 110],
        r: 2
    },
    {
        q: "8 x 4 = ?",
        alt: [32, 12, 54],
        r: 0
    },
    {
        q: "21 / 7 = ?",
        alt: [28, 15, 3],
        r: 2
    },
    {
        q: "36 / 9 = ?",
        alt: [4, 8, 10],
        r: 0
    },
    {
        q: "6 x 5 = ?",
        alt: [30, 11, 15],
        r: 0
    },
    {
        q: "5 x 5 = ?",
        alt: [12, 25 , 9],
        r: 1
    },
    {
        q: "25 - 20 = ?",
        alt: [23, 2, 5],
        r: 2
    },
    {
        q: "500 + 500 = ?",
        alt: [1000, 800, 750],
        r: 0
    }

]

//Imagens que estão contidas no jogo
function preload() {
    menu = loadImage('images/menu.png');
    fundo = loadImage('images/fundo.png');
    fimjogo = loadImage('images/fimjogo.png');
}
//Posições das respostas que são sorteadas randomicamente e tem um limite para cada uma ficar em uma região do gride
function setup() {
    createCanvas(400, 400);
    p = perg1[0];
	pontoX[0] = getRndInteger(1,6);
	pontoY[0] = getRndInteger(5,19);    
	pontoX[1] = getRndInteger(7,13);
	pontoY[1] = getRndInteger(5,19); 
	pontoX[2] = getRndInteger(13,19);
	pontoY[2] = getRndInteger(5,19);  		
}

function draw() {

    //A tela inicial do jogo aparece até o jogador apertar enter
    if (tela == 1) {
        image(menu, 0, 0, 400, 400);

        if (keyIsDown(13)) {

            tela = 2;
        }

    }

    //Tela do jogo
    if (tela == 2) {

        image(fundo, 0, 0, 400, 400);

        fill(255);
        
        textSize(25);
        textAlign(CENTER)
        text(p.q, 200, 30);

        cont++;
        /* foi usando um contador para diminuir a velocidade da cobra, como é cont%10 e o jogo roda 30x 
               por segundo, a velocidade da cobra possui 1/3 de sua velocidade normal */

        if (cont % 10 == 0) {
            posX = posX + veloX;
            posY = posY + veloY;
            trilha.push({
                x: posX,
                y: posY
            });
            while (trilha.length > cauda) {
                trilha.shift();
            }
                /*  A cobra funciona como um desenho que são quadrados sendo desenhados em cada gride,
                    porém teria o problema de ficar desenhado no gride equanto o jogador percorria. Para
                    isso foi usado métodos de remoção e adição de elementos de arrays. trilha.push adiciona
                    elemento no final do array, e trilha.shift retira elementos do início do array. Assim, 
                    o movimento criado é de quadrados que são adicionados e retirados enquanto a 'cobra' se 
                    movimenta no gride. 

                */
            for (i = 0; i < trilha.length - 1; i++) {
                if (trilha[i].x == posX && trilha[i].y == posY) {
                    cauda = cauda - 2;
                }
            }
	
        }
        
            //Esses if´s foram criados para quando a cobra ultrapassar a 'parede'
        if (posX < 0)
            posX = capacidade - 1;
        if (posX > capacidade - 1)
            posX = 0;
        if (posY < 0)
            posY = capacidade - 1;
        if (posY > capacidade - 1)
            posY = 0;
            //Aqui basicamente é o formato da 'cobra'
        for (var i = 0; i < trilha.length; i++) {
            rect(trilha[i].x * tamGride, trilha[i].y * tamGride, tamGride-2, tamGride-2);
        }

            //Comandos do teclado
        if (keyIsDown(LEFT_ARROW)) {
            veloX = -1;
            veloY = 0;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            veloX = 1;
            veloY = 0;
        }
        if (keyIsDown(UP_ARROW)) {
            veloX = 0;
            veloY = -1;
        }
        if (keyIsDown(DOWN_ARROW)) {
            veloX = 0;
            veloY = 1;
        }
             /*
            Aqui são as alternativas imprimidas na tela do jogo, foi usado um contador para o número total de alternativas,
            e também a condição para a 'cobra' aumentar de tamanho, ou seja, se a 'cobra' passar pelos mesmos pontos da
            alternativa corretta, ela aumenta de tamanho. Também está a condição de colisão, se colidir com a alternativa errada
            perde 1 vida.
            */   
		for (i=0; i<3; i++) {
			if (pontoX[i] == posX && pontoY[i] == posY) {
				if (i == p.r ) {
					cauda += 1;
				} else {
					vidas--;
					}
				colisao = true;
				cont_perg++;
				
				if (nivel == 1){ 
					if (cont_perg < perg1.length) {
						p = perg1[cont_perg];
					}
					else {
						nivel++;
						cont_perg = 0;
					}	
				}
				
				if (nivel == 2){ 
					if (cont_perg < perg2.length) {
						p = perg2[cont_perg];
					}
					else {
						nivel++;
						cont_perg = 0;
					}	
				}		
				
				if (nivel == 3){ 
					if (cont_perg < perg3.length) {
						p = perg3[cont_perg];
					}
					else {
						nivel++;
						cont_perg = 0;
					}	
				}						
					
				break;
			} 
		}       


        if (colisao) {
			 colisao = false;
			 pontoX[0] = getRndInteger(1,6);
			 pontoY[0] = getRndInteger(5,19);    
			 pontoX[1] = getRndInteger(7,13);
			 pontoY[1] = getRndInteger(5,19); 
			 pontoX[2] = getRndInteger(13,19);
			 pontoY[2] = getRndInteger(5,19);  
			 
        }
         //Formato das alternativas
        for (i=0; i<3; i++) {
			fill(255);
			rect(pontoX[i] * tamGride, pontoY[i] * tamGride, tamGride, tamGride);
			textAlign(CENTER, CENTER);
			textSize(10);
			fill(0);
			text(p.alt[i], pontoX[i] * tamGride+10, pontoY[i] * tamGride+10);
        }
        //Onde a quantidade de vidas é imprimida na tela
        textAlign(CENTER, CENTER);
        textSize(15);
        text( "Vidas: " + vidas,40,15);       

    }
     //Condição para vidas for 0 ir para a tela de fim de jogo
    if (vidas == 0){
			tela = 3;
        }
       //Tela de fim de jogo 
    if (tela == 3) {
		image(fimjogo, 0, 0, 400, 400);

        if (keyIsDown(27)) {
			vidas = 3;
			cauda = 1;
			nivel = 1;
            tela = 1;
        }
		}

}
    //Essa função é para sair do random apenas números reais 
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}



