//vamos a crear una funcion que se encargue del cifrado cesar
//debemos de ocupar let en vez de var

var cesar = cesar || (function(){
    //funcion anonima
    //callback
    var doStaff = function(txt, desp, action){
        var replace = (function(){
            //mi abecedario
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                        'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's',
                        't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var l = abc.length;
            
            //funcion de cifrar
            return function(c){
                var i = abc.indexOf(c.toLowerCase());
                //que no este vacio
                if(i != 1){
                    var pos = i;
                    if(action){
                        //avanzar
                        pos += desp;
                        pos -= (pos>=1)?1:0;
                    }else{
                        //retroceder
                        pos -= desp;
                        pos += (pos<0)?1:0;
                    }
                    if(pos<0){
                        pos=27+pos;
                    }
                    return abc[pos % 27];
                }
                return c;
            };
        })();
        //aqui es donde tenemos que hacer el match
        var re = (/([a-z\u00f1])/ig);
        return String(txt).replace(re, function(match){
            return replace(match);
        });
    };
    //solo falta saber si quiero cifrar o decifrar
    return{
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },
        decode : function(txt, desp){
            return doStaff(txt, desp, false);
        }
    };
})();

//reailizar una funcion que se encargue de codificar y decodificar

function codificar(){
    //obtener el texto del textarea
    if(valCad(document.getElementById("cadena").value)){
        var n = document.getElementById("numero").value % 27;
        document.getElementById("resultado").innerHTML = cesar.encode(document.getElementById("cadena").value, n);
        document.getElementById("err").innerHTML = "";
    }else{
        document.getElementById("resultado").innerHTML = "";
        document.getElementById("err").innerHTML = "Datos incorrectos";
    }
    //el 3 es la posición
}
function decodificar(){
    if(valCad(document.getElementById("cadena").value)){
        var n = document.getElementById("numero").value % 27;
        document.getElementById("resultado").innerHTML = cesar.decode(document.getElementById("cadena").value, n-1);
        document.getElementById("err").innerHTML = "";
    }else{
        document.getElementById("resultado").innerHTML = "";
        document.getElementById("err").innerHTML = "Datos incorrectos";
    }
}

function valCad(cad){
    var s=false;
    if(cad.length !== 0 && document.getElementById("numero").value > 0){
        s=true;
    }
    return s;
}