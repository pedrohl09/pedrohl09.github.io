var x, y, z, xc, yc
x = 100
y = 100
z = 4
xc = x - 20
yc = y

tela = 1

cont = 0;

cont_perg = 0;

posX = posY = 10
tamGride = 20;
capacidade = 20;
pontoX = [];
pontoY = [];
veloX = veloY = 0;
trilha = [];
cauda = 1;
colisao = false;
var menu;
nivel = 1;

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
        r: 2
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
        alt: [12, , 37, 9],
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


function preload() {
    menu = loadImage('images/menu.png');
    fundo = loadImage('images/fundo.png');
}

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


    if (tela == 1) {
        image(menu, 0, 0, 400, 400);

        if (keyIsDown(13)) {

            tela = 2;
        }

    }


    if (tela == 2) {

        image(fundo, 0, 0, 400, 400);

        fill(255);
        
        textSize(25);
        textAlign(CENTER)
        text(p.q, 200, 30);

        cont++;

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

            for (i = 0; i < trilha.length - 1; i++) {
                if (trilha[i].x == posX && trilha[i].y == posY) {
                    cauda = cauda - 2;
                }
            }
	
        }
        
            
        if (posX < 0)
            posX = capacidade - 1;
        if (posX > capacidade - 1)
            posX = 0;
        if (posY < 0)
            posY = capacidade - 1;
        if (posY > capacidade - 1)
            posY = 0;

        for (var i = 0; i < trilha.length; i++) {
            rect(trilha[i].x * tamGride, trilha[i].y * tamGride, tamGride-2, tamGride-2);
        }


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
                
		for (i=0; i<3; i++) {
			if (pontoX[i] == posX && pontoY[i] == posY) {
				if (i == p.r ) {
					cauda += 1;
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
        
        for (i=0; i<3; i++) {
			fill(255);
			rect(pontoX[i] * tamGride, pontoY[i] * tamGride, tamGride, tamGride);
			textAlign(CENTER, CENTER);
			textSize(15);
			fill(0);
			text(p.alt[i], pontoX[i] * tamGride+10, pontoY[i] * tamGride+10);
        }       
       

    }

}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}



