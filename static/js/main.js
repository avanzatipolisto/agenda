ruta_base = "http://127.0.0.1:3000/";
//ruta_base = "https://agenda-yk23.onrender.com:3000/";
//ruta_base = "https://agenda-alpha-gold.vercel.app:3000/";
window.onload = function () {
    // Ocultamos los checkbox pagados si no está marcado el activado
    // Enl marcado de los checkbox asistenca es lo 1 que se ha hecho en php
    marcar_checkbox_deportes_asignados_usuario();
}


function checkbox_deporte_click(checkbox) {
    var id_checkbox=checkbox.id;
    var nombre_usuario=document.getElementById("nombre_usuario").value;
    console.log("Checkbox activado: " + id_checkbox);
    const deporte_usuario = {
        nombre_deporte: id_checkbox,
        nombre_usuario: nombre_usuario
    };
    if (checkbox.checked) {  
        //Se añade en la tabla deporte_usuario el deporte
        enviar_peticion_post(ruta_base + "api/add_deporte_usuario", deporte_usuario);
    }else{
        //Se elimina en la tabla deporte_usuario el deporte
        enviar_peticion_post(ruta_base + "api/delete_deporte_usuario", deporte_usuario); 
    }
}

async function enviar_peticion_post(url, data) {


    try {
        const response = await fetch(url, {
            method: "POST", // Cambia a "PUT" si tu API lo requiere
            headers:  {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data), // Convierte el objeto a una cadena JSON
        });
        // Verifica si la respuesta fue exitosa
        if (response.ok) {
            const result = await response.json(); // Convierte la respuesta a JSON            
            console.log("Actualizado con éxito:", result);
            document.location.reload();
        } else {
            console.error("Error al actualizar:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Hubo un error con la solicitud:", error);
    }
}


async function marcar_checkbox_deportes_asignados_usuario () {
    var nombre_usuario=document.getElementById("nombre_usuario").value;
    const deportes_usuario = {
        nombre_usuario: nombre_usuario
    };

    //Obtenemos todos los deportes de un usuario
    try {
        const response = await fetch(ruta_base + "api/obtener_deportes_usuario", {
            method: "POST", // Cambia a "PUT" si tu API lo requiere
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(deportes_usuario), // Convierte el objeto a una cadena JSON
        });
        // Verifica si la respuesta fue exitosa
        if (response.ok) {
            const results = await response.json(); // Convierte la respuesta a JSON            
            console.log("obtenidos los deportes de un usuario:", results);
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            for(let i=0; i<results.length; i++){
                var result=results[i];
                checkboxes.forEach(checkbox => {
                    if (checkbox.id==result[0]){
                        checkbox.checked = true;
                    }
                });
            }
        } else {
            console.error("Error al actualizar:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Hubo un error con la solicitud:", error);
    }

}