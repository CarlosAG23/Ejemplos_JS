
document.write("1. Calcular la suma de dos matrices cuadradas"+"<br>");
var matrizA = [[2,5,3],[4,8,2],[6,9,3]];
var matrizB = [[3,2,1],[1,6,2],[3,8,4]];
var total = new Array(3);

for(var i = 0; i < 3; i++){
    total[i] = new Array(3);
}

for(var x = 0; x < 3; x++){
    for(var y = 0; y < 3; y++){
        total[x][y]= matrizA[x][y]+matrizB[x][y];
    }
}    

document.write("Matriz A"+"<br>")
for(var x = 0; x < 3; x++){
    for(var y = 0; y < 3; y++){
        document.write(matrizA[x][y]+" \t ");
    }
    document.write("<br>");
}

document.write("Matriz B"+"<br>")
for(var x=0; x<3;x++){
    for(var y=0; y<3; y++){
        document.write(matrizB[x][y]+" \t ");
    }
    document.write("<br>");
}
document.write("Respuesta: "+"<br>")
for(var x = 0; x < 3; x++){
    for(var y = 0; y < 3; y++){
        document.write(total[x][y]+" \t ");
    }
    document.write("<br>");
}

document.write("2. Calcular una matriz transpuesta"+"<br>");
var matriz = [[2,1,3],[3,6,8], [5,4,1]];
var matrizC =[[8,1,6],[3,5,7],[4,9,2]];//matriz de prueba
var transpuesta = new Array(3);
var prueba = new Array(8);
var bandera;
var l= -1;

for(var i = 0; i < 3; i++){
    for(var j = 0; j < 3; j++){
        document.write(" "+matriz[i][j]);
    }
    document.write("<br>");

}
document.write("Respuesta:"+"<br>");
for(var i = 0; i < 3; i++){
    transpuesta[i] = new Array(3);
}
for(var x = 0;x <3; x++){        
    for(var y = 0;y < 3; y++){
        transpuesta[y][x] = matriz[x][y];
    }
}
for(var x = 0; x< 3; x++){
    for(var y = 0; y < 3; y++){
        document.write(transpuesta[x][y]+"\t");
    }
    document.write("<br>");
}

document.write("3. Calcular una matriz magica"+"<br>");
for(var i = 0; i < 3; i++){
    for(var j = 0; j < 3; j++){
        document.write(" "+matrizC[i][j]);
    }
    document.write("<br>");

}
for(var i= 0; i< 8; i++){
    prueba[i] =0;
} 
bandera = Boolean (true);
for(var i = 0; i < 3; i++){
     l = l +1;
     for(var j =0; j < 3; j++){
         prueba[l] = prueba[l]+matrizC[i][j];
         prueba[l+3] = prueba[l+3] + matrizC[j][i];
     }
 }
 for(var i = 0; i < 3; i++){
     prueba[6] = prueba[6] + matrizC[i][i];
     prueba[7] = prueba[7] + matrizC[i][(2-i)];
}
i = 0;
while(bandera && (i<7)){
    if(prueba[i] != prueba[i+1]){
        bandera = false;
    }
    i = i+1;
}
document.write("Resultado: "+"<br>");
if(bandera)
    document.write("La matriz es magica");
else
    document.write("La matriz no es magica");

