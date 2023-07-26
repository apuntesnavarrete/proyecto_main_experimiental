document.addEventListener("DOMContentLoaded", function() {
    alert("este sitio ya funciona")

const btn1 = document.querySelector("#btn1")
const btn2 = document.querySelector("#btn2")
const btn3 = document.querySelector("#btn3")
const lista = document.getElementById("lista")



let contenedor_form = document.getElementById("contenedor_añadir_tareas")
//------- Manipulacion del DOM del inicio --------

//Aqui escucha principlaes de los botones
btn1.addEventListener("click" , ContenidoAll)
btn2.addEventListener("click" ,ContenidoActive)
btn3.addEventListener("click" , ContenidoCompleted)


//Agregar tareas nuevas
document.getElementById("caja_de_texto").addEventListener("submit", saveTask); 

// ------ ZONA DE FUNCIONES --------
function saveTask(e) { 
    let texto = document.getElementById("escribir_texto").value; 
    const task = {texto, checks: false}; 

    if (localStorage.getItem("tasks")===null) {
        let tasks =[]; 
        tasks.push(task); 
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else{
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    ContenidoAll();
    e.preventDefault();
}  
function ContenidoAll(){ 
contenedor_añadir_tareas.style.display="block"
lista.innerHTML = ""
let tasks = JSON.parse(localStorage.getItem("tasks"));
console.log(tasks)

for (let i = 0; i < tasks.length; i++) {
    let text = tasks[i].texto;
    let checado_index = tasks[i].checks;
    let checado 
    console.log(checado)
    if (checado_index == true) {
        checado = "checked"
    } else {
        checado = ""
    }
    lista.innerHTML+=`<div id="box"> 
    <label class="line_through">
        <input type="checkbox" ${checado} class="valores" id="paloma_checkbox">
        <span class="estiloNormal">${text}</span>
        </label>
        </div> `
 }
let checks = document.getElementsByClassName("valores");

for (let i = 0; i < checks.length; i++) {
   console.log(checks[i].checked) 
   if (checks[i].checked == false) {
    checks[i].style.textDecoration="line-through";
    
   } else {
    
   }
 }

for (let i = 0; i < checks.length; i++) {
    checks[i].addEventListener("click", ()=>{
        if (checks[i].checked == true) {

                    tasks[i].checks=true
                    localStorage.setItem("tasks", JSON.stringify(tasks))
        } else if (checks[i].checked == false){
            
            tasks[i].checks=false
                    localStorage.setItem("tasks", JSON.stringify(tasks))
        }
    })
 }
}
function ContenidoActive(){
    contenedor_añadir_tareas.style.display="block"
    lista.innerHTML = ""
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let filter_false = tasks.filter(CadaItemSiendoFiltrado => CadaItemSiendoFiltrado.checks==false);
    console.log(filter_false)

    for (let i = 0; i < filter_false.length; i++) {
        let text = filter_false[i].texto;
        lista.innerHTML+=`<div id="box"> 
        <label class="line_through">
            <input type="checkbox" class="valores" onclick="MoverElementos_active('${text}')" id="paloma_checkbox">
            <span class="estiloNormal">${text}</span>
            </label>
            </div> `
    }
    let checks = document.getElementsByClassName("valores");
    for (let i = 0; i < checks.length; i++) {
        /*
        checks[i].addEventListener("click", ()=>{
            if (checks[i].checked == true) {
                
                        tasks[i].checks=true
                        localStorage.setItem("tasks", JSON.stringify(tasks))
            } else if (checks[i].checked == false){
                
                tasks[i].checks=false
                        localStorage.setItem("tasks", JSON.stringify(tasks))
            }
            contenedor_añadir_tareas.style.display="block"
           
        })
        */
    }
}




function ContenidoCompleted(){
    // contenedor_añadir_tareas.innerHTML=""
    contenedor_añadir_tareas.style.display="none"
    lista.innerHTML = ""
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let filter_true = tasks.filter(GettingChecks => GettingChecks.checks==true);
    console.log(filter_true)
    for (let i = 0; i < filter_true.length; i++) {
        let text = filter_true[i].texto;
        let cheks = filter_true[i].checks;
        lista.innerHTML+=`<div id="box"> 
        <label class="line_through">
            <input type="checkbox" checked class="valores" onclick="MoverElementos('${text}')" id="paloma_checkbox">
            <span class="estiloNormal">${text}</span>
            </label>
            <a id="eliminar" onclick="deleteTasks('${text}')"><i class="fa-solid fa-trash" style="color: #000000;"></i></a> 
            </div> `
    }
    lista.innerHTML+=`<button id="boton_eliminar_todo">Delete All</button>`
    let boton_eliminar_todo = document.getElementById("boton_eliminar_todo")
    boton_eliminar_todo.addEventListener("click", ()=>{
        console.log("Soy un boton para borrar")
        // let tasks_true_para_borrar = JSON.parse(localStorage.getItem("tasks"));
        // tasks_true_para_borrar.splice(0,tasks_true_para_borrar.length);
        let filter_borrar = tasks.filter(GettingChecks => GettingChecks.checks==false);
        console.log(filter_borrar)
        localStorage.setItem("tasks", JSON.stringify(filter_borrar))
        ContenidoCompleted()
    
    
    })
    let checks = document.getElementsByClassName("valores");
    for (let i = 0; i < checks.length; i++) {
        /*
        checks[i].addEventListener("click", ()=>{
            if (checks[i].checked == true) {
                
                        tasks[i].checks=true
                        localStorage.setItem("tasks", JSON.stringify(tasks))
            } else if (checks[i].checked == false){
                
                tasks[i].checks=false
                        localStorage.setItem("tasks", JSON.stringify(tasks))
            }
            console.log("Aqui deberia recargar la pagina")
           
        })
        */
    }
}
function deleteTasks(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].texto == text) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    ContenidoCompleted()
}


function MoverElementos(text){

    console.log(text)

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    console.log("console para mostar tareas completas")
    console.log(tasks)
   
    const tareaEncontrada = tasks.find(task => task.texto === text);

    console.log("para mostrar la tarea encontrada")
    console.log(tareaEncontrada)

    if (tareaEncontrada) {
        tareaEncontrada.checks = false;
      }

      localStorage.setItem('tasks', JSON.stringify(tasks));
ContenidoCompleted()

   // tasks[index].checks=true

    /*
    // tasks[0].checks=true


    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].texto == text) {
            tasks[i].checks=true
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  //  ContenidoCompleted()
*/
}


function MoverElementos_active(text){

    console.log(text)

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    console.log("console para mostar tareas completas")
    console.log(tasks)
   
    const tareaEncontrada = tasks.find(task => task.texto === text);

    console.log("para mostrar la tarea encontrada")
    console.log(tareaEncontrada)

    if (tareaEncontrada) {
        tareaEncontrada.checks = true;
      }

      localStorage.setItem('tasks', JSON.stringify(tasks));
      ContenidoActive()

   // tasks[index].checks=true

    /*
    // tasks[0].checks=true


    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].texto == text) {
            tasks[i].checks=true
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  //  ContenidoCompleted()
*/
}

  });

alert("este sitio ya funciona")

const btn1 = document.querySelector("#btn1")
const btn2 = document.querySelector("#btn2")
const btn3 = document.querySelector("#btn3")
const lista = document.getElementById("lista")

ContenidoAll() // Contenido para ver al cargar la pagina por primera vez

let contenedor_form = document.getElementById("contenedor_añadir_tareas")
//------- Manipulacion del DOM del inicio --------

//Aqui escucha principlaes de los botones
btn1.addEventListener("click" , ContenidoAll)
btn2.addEventListener("click" ,ContenidoActive)
btn3.addEventListener("click" , ContenidoCompleted)


//Agregar tareas nuevas
document.getElementById("caja_de_texto").addEventListener("submit", saveTask); 

// ------ ZONA DE FUNCIONES --------
function saveTask(e) { 
    let texto = document.getElementById("escribir_texto").value; 
    const task = {texto, checks: false}; 

    if (localStorage.getItem("tasks")===null) {
        let tasks =[]; 
        tasks.push(task); 
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else{
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    ContenidoAll();
    e.preventDefault();
}  
function ContenidoAll(){ 
contenedor_añadir_tareas.style.display="block"
lista.innerHTML = ""
let tasks = JSON.parse(localStorage.getItem("tasks"));
console.log(tasks)

for (let i = 0; i < tasks.length; i++) {
    let text = tasks[i].texto;
    let checado_index = tasks[i].checks;
    let checado 
    console.log(checado)
    if (checado_index == true) {
        checado = "checked"
    } else {
        checado = ""
    }
    lista.innerHTML+=`<div id="box"> 
    <label class="line_through">
        <input type="checkbox" ${checado} class="valores" id="paloma_checkbox">
        <span class="estiloNormal">${text}</span>
        </label>
        </div> `
 }
let checks = document.getElementsByClassName("valores");

for (let i = 0; i < checks.length; i++) {
   console.log(checks[i].checked) 
   if (checks[i].checked == false) {
    checks[i].style.textDecoration="line-through";
    
   } else {
    
   }
 }

for (let i = 0; i < checks.length; i++) {
    checks[i].addEventListener("click", ()=>{
        if (checks[i].checked == true) {

                    tasks[i].checks=true
                    localStorage.setItem("tasks", JSON.stringify(tasks))
        } else if (checks[i].checked == false){
            
            tasks[i].checks=false
                    localStorage.setItem("tasks", JSON.stringify(tasks))
        }
    })
 }
}
function ContenidoActive(){
    contenedor_añadir_tareas.style.display="block"
    lista.innerHTML = ""
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let filter_false = tasks.filter(CadaItemSiendoFiltrado => CadaItemSiendoFiltrado.checks==false);
    console.log(filter_false)

    for (let i = 0; i < filter_false.length; i++) {
        let text = filter_false[i].texto;
        lista.innerHTML+=`<div id="box"> 
        <label class="line_through">
            <input type="checkbox" class="valores" onclick="MoverElementos_active('${text}')" id="paloma_checkbox">
            <span class="estiloNormal">${text}</span>
            </label>
            </div> `
    }
    let checks = document.getElementsByClassName("valores");
    for (let i = 0; i < checks.length; i++) {
        /*
        checks[i].addEventListener("click", ()=>{
            if (checks[i].checked == true) {
                
                        tasks[i].checks=true
                        localStorage.setItem("tasks", JSON.stringify(tasks))
            } else if (checks[i].checked == false){
                
                tasks[i].checks=false
                        localStorage.setItem("tasks", JSON.stringify(tasks))
            }
            contenedor_añadir_tareas.style.display="block"
           
        })
        */
    }
}




function ContenidoCompleted(){
    // contenedor_añadir_tareas.innerHTML=""
    contenedor_añadir_tareas.style.display="none"
    lista.innerHTML = ""
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let filter_true = tasks.filter(GettingChecks => GettingChecks.checks==true);
    console.log(filter_true)
    for (let i = 0; i < filter_true.length; i++) {
        let text = filter_true[i].texto;
        let cheks = filter_true[i].checks;
        lista.innerHTML+=`<div id="box"> 
        <label class="line_through">
            <input type="checkbox" checked class="valores" onclick="MoverElementos('${text}')" id="paloma_checkbox">
            <span class="estiloNormal">${text}</span>
            </label>
            <a id="eliminar" onclick="deleteTasks('${text}')"><i class="fa-solid fa-trash" style="color: #000000;"></i></a> 
            </div> `
    }
    lista.innerHTML+=`<button id="boton_eliminar_todo">Delete All</button>`
    let boton_eliminar_todo = document.getElementById("boton_eliminar_todo")
    boton_eliminar_todo.addEventListener("click", ()=>{
        console.log("Soy un boton para borrar")
        // let tasks_true_para_borrar = JSON.parse(localStorage.getItem("tasks"));
        // tasks_true_para_borrar.splice(0,tasks_true_para_borrar.length);
        let filter_borrar = tasks.filter(GettingChecks => GettingChecks.checks==false);
        console.log(filter_borrar)
        localStorage.setItem("tasks", JSON.stringify(filter_borrar))
        ContenidoCompleted()
    
    
    })
    let checks = document.getElementsByClassName("valores");
    for (let i = 0; i < checks.length; i++) {
        /*
        checks[i].addEventListener("click", ()=>{
            if (checks[i].checked == true) {
                
                        tasks[i].checks=true
                        localStorage.setItem("tasks", JSON.stringify(tasks))
            } else if (checks[i].checked == false){
                
                tasks[i].checks=false
                        localStorage.setItem("tasks", JSON.stringify(tasks))
            }
            console.log("Aqui deberia recargar la pagina")
           
        })
        */
    }
}
function deleteTasks(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].texto == text) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    ContenidoCompleted()
}


function MoverElementos(text){

    console.log(text)

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    console.log("console para mostar tareas completas")
    console.log(tasks)
   
    const tareaEncontrada = tasks.find(task => task.texto === text);

    console.log("para mostrar la tarea encontrada")
    console.log(tareaEncontrada)

    if (tareaEncontrada) {
        tareaEncontrada.checks = false;
      }

      localStorage.setItem('tasks', JSON.stringify(tasks));
ContenidoCompleted()

   // tasks[index].checks=true

    /*
    // tasks[0].checks=true


    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].texto == text) {
            tasks[i].checks=true
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  //  ContenidoCompleted()
*/
}


function MoverElementos_active(text){

    console.log(text)

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    console.log("console para mostar tareas completas")
    console.log(tasks)
   
    const tareaEncontrada = tasks.find(task => task.texto === text);

    console.log("para mostrar la tarea encontrada")
    console.log(tareaEncontrada)

    if (tareaEncontrada) {
        tareaEncontrada.checks = true;
      }

      localStorage.setItem('tasks', JSON.stringify(tasks));
      ContenidoActive()

   // tasks[index].checks=true

    /*
    // tasks[0].checks=true


    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].texto == text) {
            tasks[i].checks=true
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  //  ContenidoCompleted()
*/
}


ContenidoAll() // Contenido para ver al cargar la pagina por primera vez


// ------------- ZONA DE CONTENIDO Y ELEMENTOS EXPERIMENTALES FALLIDOS -------------





// function deleteTasks(text) {
//     let tasks = JSON.parse(localStorage.getItem("tasks"));
//     for (let i = 0; i < tasks.length; i++) {
//         if (tasks[i].texto == text) {
//             tasks.splice(i, 1);
//         }
//     }
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }


// PRIMERO I ---------- CREAR Y GUARDAR UNA LISTA
// document.getElementById("caja_de_texto").addEventListener("submit", saveTask); //"document" da instruccion de acceder a todo lo que esta escrito en el html los div, head, ul etc ".getElementById("caja_de_texto")" da entender que se acceda al div, el head o al ul que tenga por id "caja_de_texto". addEventListener da instruccion que cada que se de un click en el boton tipo "submit" dentro de "caja_de_texto", se ejecute una funcion llamada "saveTask" mas abajo se escribe que hara esa funcion. El boton es de tipo submit pero tiene escrita la palabra add adentro de el asi se ve en la pagina web sin embargo solo es algo estetico para poder manipularlo o darle instrucciones al boton no se usa la palabra add.
// let completed = document.getElementById("CO");
// let lista = document.getElementById("tasks_completed");
// let checks = document.getElementsByClassName("valores");
// let line_through = document.getElementsByClassName("line_through");


// const targets = document.querySelectorAll('[data-target]')
// const content = document.querySelectorAll('[data-content]')



// for (let i = 0; i < checks.length; i++) {
//     console.log("hola")
    
// }

// targets.forEach(target => {
//     console.log("este es un click para recargar la paginma")
//     target.addEventListener('click', ()=>{
//         content.forEach(c =>{
//             c.classList.remove('active')
            
//         })

//         const t = document.querySelector(target.dataset.target)
//         t.classList.add('active')
//     })

// })

// PRIMERO II
// function saveTask(e) { //Se crea la funcion llamada "saveTask()".Hay un detalle la paginas web no guardan el texto que escribe el usuario simplemente se borra al dar click en el boton tipo "submit" es una accion que hace ya preprogramada. Refresca la pagina y borra lo que se escriba a esa accion se le asigna por defecto la letra "e" asi que la ponemos en medio de los parentesis para darle instrucciones en este caso de que no borre lo que se escriba, aqui mas abajo en esta funcion se escribe la instruccion llamada "e.preventDefault();" para asi evitar esa accion ya predeterminada de borrar todo. Se usa tanto la "e" entre parentesis como la instruccion al final para que funcione.

    // let texto = document.getElementById("escribir_texto").value; // Aqui con la palabra document se da la instruccion de que se acceda al html, se usa getElementById("escribir_texto") para indicar que se acceda al elemento que tiene por id "escribir_texto" osea la caja en donde el usuario escribio el texto despues usamos el ".value" para indicar que solo se acceda a lo que esta escrito dentro de esa caja de lo contrario si no lo ponemos accedemos a todo lo que esta escrito en el html osea <input id="escribir_texto" type="text" placeholder="add details"> en vez de acceder a lo que ingreso el usuario. A todo este proceso o orden de activades donde obtenemos solo el texto escrito se va a guardar en la variable llamada texto osea "let texto". De esta forma ya tenemos el valor que escriba el usuario dentro de la caja de texto en la palabra "texto".

    // const task = {texto, checks: false}; // Se crea un objeto como constante "const" llamado "task" en otras palabras task va a agarrar lo que tenga almacenado la palabra "texto" por eso se escribe la palabra en medio de los corchetes {texto} para indicar que se agarre y que se tome solamente el valor que tenga adentro la variable "texto" y lo convierta en un objeto llamado "task". Necesitamos convertirlo en un objeto para guardarlo en una lista mas abajo. Concertilro en objeto nos permite manipularlo de muchas mas formas.

    // if (localStorage.getItem("tasks")===null) {
        //LISTA 
        // let tasks =[]; // Let es una variable y "tasks" es el nombre que tiene. Al usar los siguientes signos =[] creamos una lista entonces la variable "tasks" es el nombre de esa lista vacia.

        // tasks.push(task); //Nuestra lista "tasks" esta vacia entonces usamos tasks.push es una instruccion que dice, a la lista llamada "tasks" se le va agregar un nuevo elemento el acto de agregar un nuevo elemento se declara con ".push" y el nuevo elemento a agregar esta en medio de los parentesis (task) mas arriba declaramos que esa palabra almacena el texto que escribe el usario en forma de objeto. Asi empezamos a crear nuestra lista. Al presionar el boton se va agregando una nuevo elemento a la lista.

        
    // } else{
    //     let tasks = JSON.parse(localStorage.getItem("tasks"));
    //     tasks.push(task);
    //     localStorage.setItem("tasks", JSON.stringify(tasks));
    // }
    // getTasks();
    // e.preventDefault(); //Instruccion para evitar que borre todo, en realidad solo se refresca la pagina sinembargo tambien causa por defecto que se de esta accion de "borrar" el contenido ya escrito, se refresca para mandar informacion a alguna base de datos que le asignemos.
// }  
/*
function getTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let tasksView = document.getElementById("tasks");

    tasksView.innerHTML = "";
    
    for(let i = 0; i < tasks.length; i++) {
        let text = tasks[i].texto;
        let checked = tasks[i].checks
        // alert(checked)

        if (checked == true){

            tasksView.innerHTML +=`
            <div id="box"> 
            <label class="line_through">
                <input type="checkbox" checked class="valores" id="paloma_checkbox">
                <span class="estiloNormal">${text}</span>
            </label>
        </div> 
        `
        } else{
            tasksView.innerHTML += `
        <div id="box"> 
            <label class="line_through">
                <input type="checkbox" class="valores" id="paloma_checkbox">
                <span class="estiloNormal">${text}</span>
            </label>
        </div> 
        `
        }

        
    }
}

function deleteTasks(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].texto == text) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks_completed()
}




// getTasks();

// console.log(checks[0])
// checks[0].addEventListener("click", ()=>{
//     console.log("hola")
// })

let tasks = JSON.parse(localStorage.getItem("tasks"));
console.log(tasks[0].checks)


// let tasks1 = JSON.parse(localStorage.getItem("tasks"));
// console.log(tasks1[0].checks)


// getTasks_active()


function getTasks_active() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let filter_false = tasks.filter(task=>task.checks==false);
    console.log(filter_false)
    let tasksView = document.getElementById("tasks_active");

    tasksView.innerHTML = "";
    
    for(let i = 0; i < filter_false.length; i++) {
        let text = filter_false[i].texto;
        let checked = filter_false[i].checks
        // alert(checked)

        if (checked == true){

            tasksView.innerHTML +=`
            <div id="box"> 
            <label class="line_through">
                <input type="checkbox" checked class="valores" id="paloma_checkbox">
                <span class="estiloNormal">${text}</span>
            </label>
        </div> 
        `
        } else{
            tasksView.innerHTML += `
        <div id="box"> 
            <label class="line_through">
                <input type="checkbox" class="valores" id="paloma_checkbox">
                <span class="estiloNormal">${text}</span>
            </label>
        </div> 
        `
        }

        
    }
}




// getTasks_completed()

function getTasks_completed() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let filter_false = tasks.filter(task=>task.checks==true);
    console.log(filter_false)
    let tasksView = document.getElementById("tasks_completed");

    tasksView.innerHTML = "";
    
    for(let i = 0; i < filter_false.length; i++) {
        let text = filter_false[i].texto;
        let checked = filter_false[i].checks
        // alert(checked)

        if (checked == true){

            tasksView.innerHTML +=`
            <div id="box"> 
            <label class="line_through">
                <input type="checkbox" checked class="valores" id="paloma_checkbox">
                <span class="estiloNormal">${text}</span>
            </label class="line_through">
            <a id="eliminar" onclick="deleteTasks('${text}')"><i class="fa-solid fa-trash" style="color: #000000;"></i></a> 
        </div> 
        `
        } else{
            tasksView.innerHTML += `
        <div id="box"> 
            <label>
                <input type="checkbox" class="valores" id="paloma_checkbox">
                <span class="estiloNormal">${text}</span>
            </label>
            <a id="eliminar" onclick="deleteTasks('${text}')"><i class="fa-solid fa-trash" style="color: #000000;"></i></a> 
        </div> 
        `
        }

        
    }
}


for (let i = 0; i < checks.length; i++) {
    

    checks[i].addEventListener("click", ()=>{
        // line_through[i].style.textDecoration="line-through"

        // tasks[i].checks=false
        // localStorage.setItem("tasks", JSON.stringify(tasks))
        if (checks[i].checked == true) {
            
                    tasks[i].checks=true
                    localStorage.setItem("tasks", JSON.stringify(tasks))
        } else if (checks[i].checked == false){
            
            tasks[i].checks=false
                    localStorage.setItem("tasks", JSON.stringify(tasks))
                    // line_through[i].style.textDecoration="none"
        }
            
    })

}
*/


