// 1er element = couleur: 1 = noir, 2 = blanc
// 2eme element = piece: 1 = pion, 2 = cavalier, 3 = fou, 4 = tour, 5 = dame, 6 = roi
// [0, 0] = rien

// Creation du plateau sur la page html

var plateau, Cakidejouer, mouvRoiBlanc, mouvTourBlanc0, mouvTourBlanc7, mouvTourNoir0, mouvTourNoir7, lastMouv, cptPromotionBlanc, cptPromotionBlanc;
var table = document.getElementById("table");

for(var i = 0; i < 8; i++){
    var ligne = document.createElement("tr");
    for(var j = 0; j < 8; j++){
        var Case = document.createElement("td");
        Case.setAttribute("id", i + ";" + j);
        ligne.appendChild(Case);

        if(j % 2 == 0 && i % 2 == 0){
            Case.classList.add("blanche");
        } else if(j % 2 == 1 && i % 2 == 0){
            Case.classList.add("noire");
        } else if(j % 2 == 0 && i % 2 == 1){
            Case.classList.add("noire");
        } else {
            Case.classList.add("blanche");
        }

        Case.setAttribute("ondrop", "drop(event)");
        Case.setAttribute("ondragover", "allowDrop(event)")
    }
    table.appendChild(ligne);
}

function setup(){
    plateau = 
    [[[1, 4], [1, 2], [1, 3], [1, 5], [1, 6], [1, 3], [1, 2], [1, 4]],
    [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
    [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    [[2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1]],
    [[2, 4], [2, 2], [2, 3], [2, 5], [2, 6], [2, 3], [2, 2], [2, 4]]];

    Cakidejouer = 2;
    mouvRoiBlanc = false;
    mouvRoiNoir = false;
    mouvTourBlanc0 = false;
    mouvTourBlanc7 = false;
    mouvTourNoir0 = false;
    mouvTourNoir7 = false;
    lastMouv = "";
    cptPromotionNoir = 0;
    cptPromotionBlanc = 0;
    checkBlanc = false;
    checkNoir = false;

    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){
            var Case = document.getElementById(i+";"+j);
            if(Case.childElementCount == 1){
                Case.removeChild(Case.firstChild);
            }

            if(plateau[i][j][0] == 1){
                var image = document.createElement("img");
                switch(plateau[i][j][1]){
                    case 1:
                        image.setAttribute("src", "images/pion noir.png");
                        image.classList.add("pion");
                        image.setAttribute("id", "pionnoir" + j);
                        break;
            
                    case 2:
                        image.setAttribute("src", "images/cavalier noir.png");
                        image.setAttribute("id", "cavaliernoir" + j);
                        break;
            
                    case 3:
                        image.setAttribute("src", "images/fou noir.png");
                        image.setAttribute("id", "founoir" + j);
                        break;
            
                    case 4:
                        image.setAttribute("src", "images/tour noire.png");
                        image.setAttribute("id", "tournoir" + j);
                        break;
            
                    case 5:
                        image.setAttribute("src", "images/dame noire.png");
                        image.setAttribute("id", "damenoire1");
                        break;
            
                    case 6:
                        image.setAttribute("src", "images/roi noir.png");
                        image.setAttribute("id", "roinoir");
                        break;        
                }
                image.setAttribute("draggable", "true");
                image.setAttribute("ondragstart", "drag(event)");
                Case.appendChild(image);
    
            } else if(plateau[i][j][0] == 2){
                var image = document.createElement("img");
    
                switch(plateau[i][j][1]){
                    case 1:
                        image.setAttribute("src", "images/pion blanc.png");
                        image.classList.add("pion");
                        image.setAttribute("id", "pionblanc" + j);
                        break;
            
                    case 2:
                        image.setAttribute("src", "images/cavalier blanc.png");
                        image.setAttribute("id", "cavalierblanc" + j);
                        break;
            
                    case 3:
                        image.setAttribute("src", "images/fou blanc.png");
                        image.setAttribute("id", "foublanc" + j);
                        break;
            
                    case 4:
                        image.setAttribute("src", "images/tour blanche.png");
                        image.setAttribute("id", "tourblanche" + j);
                        break;
            
                    case 5:
                        image.setAttribute("src", "images/dame blanche.png");
                        image.setAttribute("id", "dameblanche1");
                        break;
            
                    case 6:
                        image.setAttribute("src", "images/roi blanc.png");
                        image.setAttribute("id", "roiblanc");
                        break;
                }
                image.setAttribute("draggable", "true");
                image.setAttribute("ondragstart", "drag(event)");
                Case.appendChild(image);
            }
        }
    }
}

var cases = document.getElementsByTagName("td");
setup();

// On cree le drag and drop

function allowDrop(ev) {
    ev.preventDefault();
}

function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){
        /* Do nothing */ 
    }
}
function drag(ev) {
    var i = parseInt(ev.target.parentElement.id[0]);
    var j = parseInt(ev.target.parentElement.id[2]);
    var mouvs = mouvement(plateau[i][j], i, j);
    plateau[i][j][0] == Cakidejouer ? casesRouges(mouvs): console.log();
    console.log(mouvs);
    ev.dataTransfer.setData("nomPiece", ev.target.id);
    ev.dataTransfer.setData("coordonnees", ev.target.parentElement.id);
}

function drop(ev) {
    ev.preventDefault();
    var coordonnees = ev.dataTransfer.getData("coordonnees");
    var iancien = parseInt(coordonnees[0]);
    var jancien = parseInt(coordonnees[2]);
    var mouvs = mouvement(plateau[iancien][jancien], iancien, jancien);
    casesClean(mouvs);
    var data = ev.dataTransfer.getData("nomPiece");
    if(ev.target.nodeName == "IMG"){ // si on drop sur une image
        var parent = ev.target.parentElement;
        var inouveau = parseInt(parent.id[0]);
        var jnouveau = parseInt(parent.id[2]);
        if(isLegal(inouveau, jnouveau, mouvs, plateau[iancien][jancien][0])){ // ev.target.id est le nom de la piece et data est aussi le nom de la piece
            if(!promotion(iancien, jancien, inouveau, jnouveau, plateau[iancien][jancien])){
                parent.removeChild(ev.target);
                parent.appendChild(document.getElementById(data));
                lastMouv = data;
                miseAJourPlateau(inouveau, jnouveau, iancien, jancien);
            }
            finTour(data);
        }
    } else { // si on drop sur une case (vide ou non)
        var inouveau = parseInt(ev.target.id[0]);
        var jnouveau = parseInt(ev.target.id[2]);
        if(isLegal(inouveau, jnouveau, mouvs, plateau[iancien][jancien][0])){ // coordonnes sont les coordonnees de la piece de base et ev.target.id sont les coordonnees de la deuxieme case
            if(!promotion(iancien, jancien, inouveau, jnouveau, plateau[iancien][jancien])){
                if(thereIsAPiece(inouveau, jnouveau)){
                    ev.target.removeChild(ev.target.lastElementChild);
                    ev.target.appendChild(document.getElementById(data));
                    miseAJourPlateau(inouveau, jnouveau, iancien, jancien);
                } else {
                    if(data.slice(0,3) == "roi" && jnouveau == jancien + 2){
                        petitRoque(iancien);
                    }
                    if(data.slice(0,3) == "roi" && jnouveau == jancien - 2){
                        grandRoque(iancien);
                    }
                    ev.target.appendChild(document.getElementById(data));
                    miseAJourPlateau(inouveau, jnouveau, iancien, jancien);
                    if(data.slice(0,9) == "pionblanc" && iancien == 3 && plateau[3][jnouveau][1] == 1 && lastMouv.slice(0,8) == "pionnoir"){ // en passant blanc
                        document.getElementById(3+";"+jnouveau).removeChild(document.getElementById("pionnoir" + (jnouveau)));
                        plateau[3][jnouveau] = [0, 0];
                    }
                    if(data.slice(0,8) == "pionnoir" && iancien == 4 && plateau[4][jnouveau][1] == 1 && lastMouv.slice(0,9) == "pionblanc"){ // en passant noir
                        document.getElementById(4+";"+jnouveau).removeChild(document.getElementById("pionblanc" + (jnouveau)));
                        plateau[4][jnouveau] = [0, 0];
                    }
                    lastMouv = data;
                }
            }
            finTour(data);
        }
    }
}

// fontions utiles

function finTour(s){
    Cakidejouer = Cakidejouer % 2 + 1;
    if(s == "tourblanche0"){
        mouvTourBlanc0 = true;
    } else if(s == "tourblanche7"){
        mouvTourBlanc7 = true;
    } else if(s == "tournoir0"){
        mouvTourNoir0 = true;
    } else if(s == "tournoir7"){
        mouvTourBlanc7 = true;
    } else if(s == "roiblanc"){
        mouvRoiBlanc = true;
    } else if(s == "roinoir"){
        mouvRoiNoir = true;
    }

    var res = checkmateOuPat(Cakidejouer);
    if(res == "checkmate"){
        sleepFor(500);
        if(Cakidejouer == 1){
            alert("Victoire des Blancs ! (GG)");
        } else {
            alert("Victoire des Noirs ! (GG)");
        }
        setup();
    } else if(res == "pat"){
        sleepFor(500);
        alert("Egalité ! (Pat)");
        setup();
    }
}

function miseAJourPlateau(inouveau, jnouveau, iancien, jancien){
    plateau[inouveau][jnouveau] = plateau[iancien][jancien];
    plateau[iancien][jancien] = [0, 0];
}

function isLegal(i, j, mouvs, type){
    var res = false;
    var k = 0;
    while(k < mouvs.length && !res){
        if([i, j].toString() == mouvs[k].toString()){
            res = true;
        }
        k++;
    }
    return res && type == Cakidejouer
}

function thereIsAPiece(i, j){
    return plateau[i][j].toString() != [0, 0].toString();
}

function isSameColor(i, j, type){
    return type == plateau[i][j][0]
}

function coordonneesRoi(type){
    var i = 0;
    var found = false;
    while(i < 8 && !found){
        var j = 0;
        while(j < 8 && !found){
            if(plateau[i][j].toString() == [type, 6].toString()){
                found = true;
            }
            j++;
        }
        i++;
    }
    return [i-1, j-1]
}

function ischeck(type){
    var res = false;
    var menacesTotales = menaces(type%2 + 1);
    var k = 0;
    while(k < menacesTotales.length && !res){
        if(menacesTotales[k].toString() == coordonneesRoi(type).toString()){
            res = true;
        }
        k++;
    }
    return res
}

function checkmateOuPat(type){
    var res = true;
    var i = 0;
    while(i < 8 && res){
        var j = 0;
        while(j < 8 && res){
            if(plateau[i][j][0] == type){
                res = mouvement(plateau[i][j], i, j).toString() == [].toString();
            }
            j++;
        }
        i++;
    }
    if(res){
        if(ischeck(type)){
            return "checkmate"
        } else {
            return "pat"
        }
    } else {
        return false
    }
}

function abandon(type){
    if(type == 1 && Cakidejouer == 1){
        if(confirm("Êtes-vous sûr d'abandonner ?")){
            alert("Victoire des Blancs ! (GG)");
            setup();
        }
    } else if(type == 2 && Cakidejouer == 2){
        if(confirm("Êtes-vous sûr d'abandonner ?")){
            alert("Victoire des Noirs ! (GG)");
            setup();
        }
    }
}

function casesRouges(a){
    for(var k = 0; k < a.length; k++){
        var i = a[k][0];
        var j = a[k][1];
        document.getElementById(i + ";" + j).classList.add("rouge");
    }
}

function casesClean(a){
    for(var k = 0; k < a.length; k++){
        var i = a[k][0];
        var j = a[k][1];
        document.getElementById(i + ";" + j).classList.remove("rouge");
    }
}

function isValid(i, j){
    return !(i < 0 || j < 0 || i > 7 || j > 7)
}

function copyPlateau(a){
    var b = [];
    for(var k = 0; k < 8; k++){
        var ligne = [];
        for(var l = 0; l < 8; l++){
            ligne.push(a[k][l]);
        }
        b.push(ligne);
    }
    return b
}

// mouvements speciaux

function petitRoque(i){
    var tour7HTML;
    i == 7 ? tour7HTML = document.getElementById("tourblanche7") : tour7HTML = document.getElementById("tournoir7");
    var casetour = document.getElementById(i+";5");
    casetour.appendChild(tour7HTML);
    miseAJourPlateau(i, 5, i, 7);
}

function grandRoque(i){
    var tour0HTML;
    i == 7 ? tour0HTML = document.getElementById("tourblanche0") : tour0HTML = document.getElementById("tournoir0");
    var casetour = document.getElementById(i+";3");
    casetour.appendChild(tour0HTML);
    miseAJourPlateau(i, 3, i, 0);
}

function promotion(iancien, jancien, inouveau, jnouveau, piece){
    if(piece[1] == 1 && inouveau == 7){ // pion noir (pion ne peuvent pas reculer donc c'est forcemenet un noir)
        var choix = prompt("Promotion en:\n1 - Cavalier\n2 - Fou\n3 - Tour\n4 - Dame");
        while(!(1 <= choix && choix <= 4)){
            var choix = prompt("Erreur ! Promotion en:\n1 - Cavalier\n2 - Fou\n3 - Tour\n4 - Dame");
        }
        console.log("promotion noire !");
        var image = document.createElement("img");
        switch(parseInt(choix)){
            case 4:
                image.setAttribute("src", "images/dame noire.png");
                image.setAttribute("id", "damenoire" + (cptPromotionNoir+2));
                break;
            case 3:
                image.setAttribute("src", "images/tour noire.png");
                image.setAttribute("id", "tournoire" + (cptPromotionNoir+2) + "promo");
                break;
            case 2:
                image.setAttribute("src", "images/fou noir.png");
                image.setAttribute("id", "founoir" + (cptPromotionNoir+2) + "promo");
                break;
            case 1:
                image.setAttribute("src", "images/cavalier noir.png");
                image.setAttribute("id", "cavaliernoir" + (cptPromotionNoir+2) + "promo");
                break;
        }
        image.setAttribute("draggable", "true");
        image.setAttribute("ondragstart", "drag(event)");
        var Case = document.getElementById(inouveau+";"+jnouveau);
        if(Case.hasChildNodes()){
            Case.removeChild(Case.childNodes[0]);
        }
        Case.appendChild(image);
        plateau[inouveau][jnouveau] = [1, parseInt(choix)+1];
        document.getElementById(iancien+";"+jancien).removeChild(document.getElementById(iancien+";"+jancien).childNodes[0]);
        plateau[iancien][jancien] = [0, 0];
        cptPromotionNoir++;
        return true
    } else if(piece[1] == 1 && inouveau == 0){ // pion blanc
        var choix = prompt("Promotion en:\n1 - Cavalier\n2 - Fou\n3 - Tour\n4 - Dame");
        while(!(1 <= choix && choix <= 4)){
            var choix = prompt("Erreur ! Promotion en:\n1 - Cavalier\n2 - Fou\n3 - Tour\n4 - Dame");
        }
        console.log(choix);
        console.log("promotion blanche !")
        var image = document.createElement("img");
        switch(parseInt(choix)){
            case 4:
                image.setAttribute("src", "images/dame blanche.png");
                image.setAttribute("id", "dameblanche" + (cptPromotionBlanc+2));
                console.log("dame blanche");
                break;
            case 3:
                image.setAttribute("src", "images/tour blanche.png");
                image.setAttribute("id", "tourblanche" + (cptPromotionBlanc+2) + "promo");
                console.log("tour blanche");
                break;
            case 2:
                image.setAttribute("src", "images/fou blanc.png");
                image.setAttribute("id", "foublanc" + (cptPromotionBlanc+2) + "promo");
                console.log("fou blanc");
                break;
            case 1:
                image.setAttribute("src", "images/cavalier blanc.png");
                image.setAttribute("id", "cavalierblanc" + (cptPromotionBlanc+2) + "promo");
                console.log("cavalier blanc");
                break;
        }
        image.setAttribute("draggable", "true");
        image.setAttribute("ondragstart", "drag(event)");
        var Case = document.getElementById(inouveau+";"+jnouveau);
        if(Case.hasChildNodes()){
            Case.removeChild(Case.childNodes[0]);
        }
        Case.appendChild(image);
        plateau[inouveau][jnouveau] = [2, parseInt(choix)+1];
        document.getElementById(iancien+";"+jancien).removeChild(document.getElementById(iancien+";"+jancien).childNodes[0]);
        plateau[iancien][jancien] = [0, 0];
        cptPromotionBlanc++;
        return true
    }
    return false
}

function enpassantBlanc(i, j){
    if(i == 3){
        if(isValid(i, j-1) && lastMouv == "pionnoir" + (j-1)){
            return -1
        }
        if(isValid(i, j+1) && lastMouv == "pionnoir" + (j+1)){
            return 1
        }
    }
    return false
}

function enpassantNoir(i, j){
    if(i == 4){
        if(isValid(i, j-1) && lastMouv == "pionblanc" + (j-1)){
            return -1
        }
        if(isValid(i, j+1) && lastMouv == "pionblanc" + (j+1)){
            return 1
        }
    }
    return false
}

function checkPetitRoque(i, j, type){
    if(isValid(i, j+1) && isValid(i, j+2) && !thereIsAPiece(i, j+1) && !thereIsAPiece(i, j+2) ){ // check si les cases sont valides + si il n'y a pas de pieces
        var menacesTotales = menaces(type%2 + 1);
        var case1 = false;
        var case2 = false;
        var k = 0;
        while(k < menacesTotales.length && (!case1 || !case2)){
            if([i, j+1].toString() == menacesTotales[k].toString()){
                case1 = true;
            }
            if([i, j+2].toString() == menacesTotales[k].toString()){
                case2 = true;
            }
            k++;
        }
        if(i == 0 && type == 1 && !mouvRoiNoir && !mouvTourNoir7 && !case1 && !case2){ // check si le roi et la tour n'ont pas bougees et si il y a des menaces
            return true
        }

        if(i == 7 && type == 2 && !mouvRoiBlanc && !mouvTourBlanc7 && !case1 && !case2){ // pareil
            return true
        }
    }
    return false
}

function checkGrandRoque(i, j, type){
    if(isValid(i, j-1) && isValid(i, j-2) && !thereIsAPiece(i, j-1) && !thereIsAPiece(i, j-2) ){ // check si les cases sont valides + si il n'y a pas de pieces
        var menacesTotales = menaces(type%2 + 1);
        var case1 = false;
        var case2 = false;
        var k = 0;
        while(k < menacesTotales.length && (!case1 || !case2)){
            if([i, j-1].toString() == menacesTotales[k].toString()){
                case1 = true;
            }
            if([i, j-2].toString() == menacesTotales[k].toString()){
                case2 = true;
            }
            k++;
        }
        if(type == 1 && !mouvRoiNoir && !mouvTourNoir0 && !case1 && !case2){ // check si le roi et la tour n'ont pas bougees et si il y a des menaces
            return true
        }

        if(type == 2 && !mouvRoiBlanc && !mouvTourBlanc0 && !case1 && !case2){ // pareil
            return true
        }
    }
    return false
}

// mouvements des differentes pieces:

function pionBlanc(i, j){
    var res = [];
    if(isValid(i-1, j) && !thereIsAPiece(i-1, j)){
        res.push([i-1, j]);
    }
    if(isValid(i-1, j-1) && (thereIsAPiece(i-1, j-1) && !isSameColor(i-1, j-1, 2))){
        res.push([i-1, j-1]);
    }
    if(isValid(i-1, j+1) && (thereIsAPiece(i-1, j+1) && !isSameColor(i-1, j+1, 2))){
        res.push([i-1, j+1]);
    }
    if(i == 6){
        if(!thereIsAPiece(i-2, j)){
            res.push([i-2, j]);
        }
    }
    if(enpassantBlanc(i, j)){
        res.push([i-1, j+enpassantBlanc(i, j)]);
    }
    return res
}

function pionNoir(i, j){
    var res = [];
    if(isValid(i+1, j) && !thereIsAPiece(i+1, j)){
        res.push([i+1, j]);
    }
    if(isValid(i+1, j-1) && (thereIsAPiece(i+1, j-1) && !isSameColor(i+1, j-1, 1))){
        res.push([i+1, j-1]);
    }
    if(isValid(i+1, j+1) && (thereIsAPiece(i+1, j+1) && !isSameColor(i+1, j+1, 1))){
        res.push([i+1, j+1]);
    }
    if(i == 1){
        if(!thereIsAPiece(i+2, j)){
            res.push([i+2, j]);
        }
    }
    if(enpassantNoir(i, j)){
        res.push([i+1, j+enpassantNoir(i, j)]);
    }
    return res
}

function cavalier(i, j, type){
    var res = [];
    if(isValid(i-2, j-1) && (!thereIsAPiece(i-2, j-1) || !isSameColor(i-2, j-1, type))){ // Nord-Ouest
        res.push([i-2, j-1]);
    }
    if(isValid(i-2, j+1) && (!thereIsAPiece(i-2, j+1) || !isSameColor(i-2, j+1, type))){ // Nord-Est
        res.push([i-2, j+1]);
    }
    if(isValid(i-1, j+2) && (!thereIsAPiece(i-1, j+2) || !isSameColor(i-1, j+2, type))){ // Est-Nord
        res.push([i-1, j+2]);
    }
    if(isValid(i+1, j+2) && (!thereIsAPiece(i+1, j+2) || !isSameColor(i+1, j+2, type))){ // Est-Sud
        res.push([i+1, j+2]);
    }
    if(isValid(i+2, j+1) && (!thereIsAPiece(i+2, j+1) || !isSameColor(i+2, j+1, type))){ // Sud-Est
        res.push([i+2, j+1]);
    }
    if(isValid(i+2, j-1) && (!thereIsAPiece(i+2, j-1) || !isSameColor(i+2, j-1, type))){ // Sud-Ouest
        res.push([i+2, j-1]);
    }
    if(isValid(i+1, j-2) && (!thereIsAPiece(i+1, j-2) || !isSameColor(i+1, j-2, type))){ // Ouest-Sud
        res.push([i+1, j-2]);
    }
    if(isValid(i-1, j-2) && (!thereIsAPiece(i-1, j-2) || !isSameColor(i-1, j-2, type))){ // Ouest-Nord
        res.push([i-1, j-2]);
    }
    return res
}

function fou(i, j, type){
    var res = [];
    for(var k = 0; k <= 1; k++){
        for(var l = 0; l <= 1; l++){
            var m = 1;
            var STOP = false;
            while(isValid(i+(-1)**(k)*m, j+(-1)**(l)*m) && !STOP){
                // (-1)**(k), (-1)**(l) cree les couples 1,1; 1,-1; -1,1; -1,-1
                if(thereIsAPiece(i+(-1)**(k)*m, j+(-1)**(l)*m)){
                    if(isSameColor(i+(-1)**(k)*m, j+(-1)**(l)*m, type)){
                        STOP = true;
                    } else {
                        res.push([i+(-1)**(k)*m, j+(-1)**(l)*m]);
                        STOP = true;
                    }
                } else {
                    res.push([i+(-1)**(k)*m, j+(-1)**(l)*m]);
                }
                m++;
            }
        }
    }
    return res
}

function tour(i, j, type){
    var res = [];
    for(var k = 0; k < 4; k++){
        var l = 1;
        var STOP = false;
        while(isValid(i+(k%2)*((-1)**(1+(k<2)))*l, j+((k+1)%2)*((-1)**(1+(k<2)))*l) && !STOP){ // trop de bordel a expliquer
            if(thereIsAPiece(i+(k%2)*((-1)**(1+(k<2)))*l, j+((k+1)%2)*((-1)**(1+(k<2)))*l)){
                if(isSameColor(i+(k%2)*((-1)**(1+(k<2)))*l, j+((k+1)%2)*((-1)**(1+(k<2)))*l, type)){
                    STOP = true;
                } else {
                    res.push([i+(k%2)*((-1)**(1+(k<2)))*l, j+((k+1)%2)*((-1)**(1+(k<2)))*l]);
                    STOP = true;
                }
            } else {
                res.push([i+(k%2)*((-1)**(1+(k<2)))*l, j+((k+1)%2)*((-1)**(1+(k<2)))*l]);
            }
            l++;
        }
    }
    return res
}

function dame(i, j, type){
    var res = fou(i, j, type);
    var tourMouvs = tour(i, j, type);
    for(var k = 0; k < tourMouvs.length; k++){
        res.push(tourMouvs[k]);
    }
    return res
}

function roi(i, j, type){
    var menacesTotales = menaces(type%2 + 1); // 1%2 + 1 = 2 et 2%2 + 1 = 1 (transforme 1 en 2 et 2 en 1)
    var res = [[i-1, j-1], [i-1, j], [i-1, j+1], [i, j+1], [i+1, j+1], [i+1, j], [i+1, j-1], [i, j-1]];
    var cpt = 0;
    var longueur = res.length;
    for(var k = 0; k < longueur; k++){
        var i2 = res[k-cpt][0];
        var j2 = res[k-cpt][1];
        if(!isValid(i2, j2)){
            res.splice(k-cpt, 1);
            cpt++;
        } else if(thereIsAPiece(i2, j2) && isSameColor(i2, j2, type)){
            res.splice(k-cpt, 1);
            cpt++;
        }
    }

    longueur = res.length;
    cpt = 0;
    for(var k = 0; k < longueur; k++){
        var l = 0;
        var estTrouve = false;
        while(!estTrouve && l < menacesTotales.length){
            if(res[k-cpt].toString() == menacesTotales[l].toString()){
                res.splice(k-cpt, 1);
                cpt++;
                estTrouve = true;
            }
            l++;
        }
    }

    if(checkPetitRoque(i, j, type)){
        res.push([i, j+2]);
    }
    if(checkGrandRoque(i, j, type)){
        res.push([i, j-2]);
    }
    return res
}

function mouvement(piece, i, j){
    var res = [];
    if(piece[0] == 1 && piece[1] == 1){ // pion noir
        res = pionNoir(i, j);
    } else if(piece[0] == 2 && piece[1] == 1){ // pion blanc
        res = pionBlanc(i, j);
    } else if(piece[1] == 2){ // CABALLERO !!!!
        res = cavalier(i, j, piece[0]);
    } else if(piece[1] == 3){ // fou
        res = fou(i, j, piece[0]);
    } else if(piece[1] == 4){ // tour
        res = tour(i, j, piece[0]);
    } else if(piece[1] == 5){ // dame (= tour + fou)
        res = dame(i, j, piece[0]);
    } else if(piece[1] == 6){ // roi
        res = roi(i, j, piece[0]);
    } else {
        res = [];
    }
    var plateau2 = copyPlateau(plateau);
    var cpt = 0;
    var longueur = res.length
    for(var k = 0; k < longueur; k++){
        miseAJourPlateau(res[k-cpt][0], res[k-cpt][1], i, j);
        if(ischeck(piece[0])){
            res.splice(k-cpt,1);
            cpt++;
        }
        plateau = copyPlateau(plateau2);
    }
    return res
}

// menaces des différentes pieces

function menacePionBlanc(i, j){
    var res = [];
    if(isValid(i-1, j-1)){
        res.push([i-1, j-1])
    }
    if(isValid(i-1, j+1)){
        res.push([i-1, j+1])
    }
    return res
}

function menacePionNoir(i, j){
    var res = [];
    if(i <= 6 && j >= 1){
        res.push([i+1, j-1])
    }
    if(i <= 6 && j <= 6){
        res.push([i+1, j+1])
    }
    return res
}

function menaceCavalier(i, j){
    var res = [];
    if(isValid(i-2, j-1)){ // Nord-Ouest
        res.push([i-2, j-1]);
    }
    if(isValid(i-2, j+1)){ // Nord-Est
        res.push([i-2, j+1]);
    }
    if(isValid(i-1, j+2)){ // Est-Nord
        res.push([i-1, j+2]);
    }
    if(isValid(i+1, j+2)){ // Est-Sud
        res.push([i+1, j+2]);
    }
    if(isValid(i+2, j+1)){ // Sud-Est
        res.push([i+2, j+1]);
    }
    if(isValid(i+2, j-1)){ // Sud-Ouest
        res.push([i+2, j-1]);
    }
    if(isValid(i+1, j-2)){ // Ouest-Sud
        res.push([i+1, j-2]);
    }
    if(isValid(i-1, j-2)){ // Ouest-Nord
        res.push([i-1, j-2]);
    }
    return res
}

function menaceFou(i, j, type){
    var res = [];
    for(var k = 0; k <= 1; k++){
        for(var l = 0; l <= 1; l++){
            var m = 1;
            var STOP = false;
            while(isValid(i+(-1)**(k)*m, j+(-1)**(l)*m) && !STOP){
                // (-1)**(k), (-1)**(l) cree les couples 1,1; 1,-1; -1,1; -1,-1
                if(thereIsAPiece(i+(-1)**(k)*m, j+(-1)**(l)*m)){
                    res.push([i+(-1)**(k)*m, j+(-1)**(l)*m]);
                    if(plateau[i+(-1)**(k)*m][j+(-1)**(l)*m][1] == 6 && !isSameColor(i+(-1)**(k)*m, j+(-1)**(l)*m, type) && isValid(i+(-1)**(k)*(m+1), j+(-1)**(l)*(m+1))){
                        m++;
                        res.push([i+(-1)**(k)*m, j+(-1)**(l)*m]);
                    }
                    STOP  = true;
                } else {
                    res.push([i+(-1)**(k)*m, j+(-1)**(l)*m]);
                }
                m++;
            }
        }
    }
    return res
}

function menaceTour(i, j, type){
    var res = [];
    for(var k = 0; k < 4; k++){
        var l = 1;
        var STOP = false;
        while(isValid(i+(k%2)*((-1)**(1+(k<2)))*l, j+((k+1)%2)*((-1)**(1+(k<2)))*l) && !STOP){ // trop de bordel a expliquer
            if(thereIsAPiece(i+(k%2)*((-1)**(1+(k<2)))*l, j+((k+1)%2)*((-1)**(1+(k<2)))*l)){
                res.push([i+(k%2)*((-1)**(1+(k<2)))*l, j+((k+1)%2)*((-1)**(1+(k<2)))*l]);
                if(plateau[i+(k%2)*((-1)**(1+(k<2)))*l][j+((k+1)%2)*((-1)**(1+(k<2)))*l][1] == 6 && !isSameColor(i+(k%2)*((-1)**(1+(k<2)))*l, j+((k+1)%2)*((-1)**(1+(k<2)))*l, type) && isValid(i+(k%2)*((-1)**(1+(k<2)))*(l+1), j+((k+1)%2)*((-1)**(1+(k<2)))*(l+1))){
                    l++;
                    res.push([i+(k%2)*((-1)**(1+(k<2)))*l, j+((k+1)%2)*((-1)**(1+(k<2)))*l]);
                }
                STOP = true;
            } else {
                res.push([i+(k%2)*((-1)**(1+(k<2)))*l, j+((k+1)%2)*((-1)**(1+(k<2)))*l]);
            }
            l++;
        }
    }
    return res
}

function menaceDame(i, j, type){
    var res = menaceFou(i, j, type);
    var tourMenace = menaceTour(i, j, type);
    for(var k = 0; k < tourMenace.length; k++){
        res.push(tourMenace[k]);
    }
    return res
}

function menaceRoi(i, j){
    var res = [[i-1, j-1], [i-1, j], [i-1, j+1], [i, j+1], [i+1, j+1], [i+1, j], [i+1, j-1], [i, j-1]];
    var cpt = 0;
    var longueur = res.length;
    for(var k = 0; k < longueur; k++){
        if(!isValid(res[k-cpt][0], res[k-cpt][1])){
            res.splice(k-cpt, 1);
            cpt++;
        }
    }
    return res
}

function menaces(type){
    var res = [];
    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){
            if(thereIsAPiece(i, j) && plateau[i][j][0] == type){
                if(plateau[i][j][1] == 1){ // si pion
                    if(plateau[i][j][0] == 1){ // si noir
                        var mouvs = menacePionNoir(i, j);
                    } else { // si blanc
                        var mouvs = menacePionBlanc(i, j);
                    }
                } else if(plateau[i][j][1] == 6){ // si roi
                    var mouvs = menaceRoi(i, j);
                } else if(plateau[i][j][1] == 2){
                    var mouvs = menaceCavalier(i, j);
                } else if(plateau[i][j][1] == 3){
                    var mouvs = menaceFou(i, j, plateau[i][j][0]);
                } else if(plateau[i][j][1] == 4){
                    var mouvs = menaceTour(i, j, plateau[i][j][0]);
                } else if(plateau[i][j][1] == 5){
                    var mouvs = menaceDame(i, j, plateau[i][j][0]);
                } else {
                    var mouvs = [];
                }
                for(var k = 0; k < mouvs.length; k++){
                    res.push(mouvs[k]);
                }
            }
        }
    }
    return res
}