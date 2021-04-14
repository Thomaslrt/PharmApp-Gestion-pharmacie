/* fonction qui enregistre en localStorage un objet puis le met à jour dans la variable globale */
function saveLS(obj_name,obj){
	if(obj === "null" || typeof(obj) === "object"){
		obj_to_json = JSON.stringify(obj); /* transforme un objet en chaîne de caractères JSON */
		window.localStorage.setItem(obj_name,obj_to_json);
		updateObj(obj,obj_name);
		console.log("Mise à jour localStorage de l'objet '"+obj_name+"' :");
		console.log(obj);
		return true;
	}
	console.log("Erreur lors de l'enregistrement en storageLocal de l'objet '"+obj_name+"'");
	console.log("Contenu de l'objet : "+obj);
	return false;
}

/* fonction qui récupère un élément du localStorage puis qui retourne son objet */
function getLS(nom){
	var val = window.localStorage.getItem(nom);
	if(val !== "null"){
		json_to_obj = JSON.parse(val); /* transforme une chaîne de caractères JSON en objet */
		if(typeof(json_to_obj) === "object"){
			console.log("Récupération en localStorage de l'objet '"+nom+"' :");
			console.log(json_to_obj);
			return json_to_obj;
		}
	}
	return {}; /* retourne un objet vide */
}

/* déclaration de mes variables globales */
var stock = {};
var clients = {};
var employes = {};
var fournisseurs = {};

/* initialisation des données enregistrées en localStorage sur mes variables globales */
stock = getLS("stock");
clients = getLS("clients");
employes = getLS("employes");
fournisseurs = getLS("fournisseurs");


/* fonction de suppression d'un élément dans un objet */
function deleteItem(item_name,obj_name,obj){
	delete obj[item_name];
	if(saveLS(obj_name,obj)){
		return true;
	}
	return false;
}

/* fonction de recherche d'un élément dans un objet */
function searchItem(name_item,obj_name){
	let obj = getLS(obj_name);
	if(obj && typeof(obj) === "object" && obj[name_item]){
		return obj[name_item];
	}
	console.log("L'élément '"+name_item+"' dans l'objet '"+obj_name+"' n'existe pas.");
	return false;
}

/* fonction d'affichage de tous les éléments d'un objet dans un tableau html */
function listItems(obj_name){
	let obj = getObj(obj_name);
	if(obj && obj !== "null" && typeof(obj) === "object"){
		//à compléter
	}
}

/* fonction d'ajout d'un élément */
function ajouter(obj_name,val1,val2){
	if(!searchItem(val1,obj_name)){
		//à compléter
	} else {
		alert("Cet élément existe déjà.");
	}
	return false;
}

/* fonction de modification d'un élément */
function modifier(obj_name,val1,val2){
	if(searchItem(val1,obj_name)){
		//à compléter
	} else {
		alert("Modification impossible. Voir la console.");
	}
	return false;
}


$(document).ready(function(){
	
	//ici mon code principal
	
});