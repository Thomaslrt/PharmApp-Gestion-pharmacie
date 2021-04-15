/* fonction qui enregistre en localStorage un objet puis le met à jour dans la variable globale */
function saveLS(obj_name,obj){
	if(obj === "null" || typeof(obj) === "object"){
		var old = localStorage.getItem(obj_name);
		if(old == null) {
		  old = [];
		} else {
		  old = JSON.parse(old);
		}
		localStorage.setItem(obj_name, JSON.stringify(old.concat(obj)));
	} else {
	console.log("Erreur lors de l'enregistrement en storageLocal de l'objet '"+obj_name+"'");
	console.log("Contenu de l'objet : "+obj);
	return false;
}
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
		stock = getLS(obj_name);
		if(stock === "null" || typeof(stock) === "object"){
			stock = {};
			stock[val1]=val2;
			console.log(stock);
			saveLS(obj_name, stock);
			$('.erreurs').html('<p style="color:green;text-align:center;">L\'objet à bien été ajouté au stock.</p>');
		}
	} else {
		$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Cet élement existe déjà.</p>');
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

// Ajout de produit
	$("#btn_envoyer_med").click(function(e){
		e.preventDefault();
		var nom_med = $("#medicament_nom").val();
		var qte_med = $("#medicament_qte").val();
			if(isNaN(nom_med) && nom_med !== ""){
				if(!isNaN(qte_med) && qte_med > 0 && qte_med%1 === 0 ){
					ajouter("stock",nom_med,qte_med);
				}else{
					$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir une quantité étant un nombre entier supérieur à 0.</p>');
				}
			}else{
				$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir un nom composé de caractères uniquement.</p>');
			}
	});

	$("#btn_envoyer_clt").click(function(){
		var nom_clt = $("#ajouter_clt").val();
		var num_clt = $("#ajouter_num").val();
			if(isNaN(nom_clt) && nom_clt !== ""){
				if(!isNaN(num_clt) && num_clt > 0 && num_clt%1 === 0 ){
					
				}else{
					$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir un "numero de telephone" valide</p>')
				}
			}else{
				$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir un "nom" composé de caractères uniquement.</p>')
			}
	});
	
	
	$("#btn_envoyer_emp").click(function(){
		var nom_emp = $("#ajouter_emp").val();
		var poste_emp = $("#ajouter_poste").val();
			if(isNaN(nom_emp) && nom_emp !== ""){
				if(isNaN(poste_emp) && poste_emp !== ""){
					
				}else{
					$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir un "Poste" composé de caractères uniquement.</p>')
				}
			}else{
				$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir un "nom" composé de caractères uniquement.</p>')
			}
	});

	$("#btn_envoyer_fournisseur").click(function(){
		var nom_fournisseur = $("#ajouter_fournisseur").val();
		var ad_fournisseur = $("#ajouter_adresse").val();
			
	});


	 


// Script des divs cachés 
	var currentpage = "dashboard";

	$("li").click(function(){
		var page = $(this).data("nom");
		var method = $(this).data("method");
		if (page !== undefined) {
			console.log(page);
			if (method === "add") {
				$("."+currentpage+"").slideUp(800,function(){
					$(".add").slideDown(800);
					currentpage = "add";
					console.log(currentpage);
					$(".add h2").html("Ajouter un "+page);
					$(".add .txt1").html("Ajouter un "+page+" à la liste");
					$(".add .header h2").html("Enregistrement d'un "+page);
					if (page==="médicament") {
						$(".add .txt2").html("Merci de rentrer le nom d'un "+page+" et sa quantité disponible pour l'ajouter.");
						$(".add .champ1").html('<input type="text" class="form-control" id="medicament_nom" placeholder="Nom du médicament">');
						$(".add .champ2").html('<input type="text" class="form-control" id="medicament_qte" placeholder="Quantité en stock">');
						$(".arraytest").html("[DÉBUG] LocalStorage : "+stock);
					} else if (page==="client") {
						$(".add .txt2").html("Merci de rentrer le nom du "+page+" et son numéro de téléphone pour l'ajouter.");
						$(".add .champ1").html('<input type="text" class="form-control" id="client_nom" placeholder="Nom du client">');
						$(".add .champ2").html('<input type="text" class="form-control" id="client_numero" placeholder="Numéro de téléphone">');
					} else if (page==="fournisseur") {
						$(".add .txt2").html("Merci de rentrer le nom du "+page+" et son adresse pour l'ajouter.");
						$(".add .champ1").html('<input type="text" class="form-control" id="fournisseur_nom" placeholder="Nom du fournisseur">');
						$(".add .champ2").html('<input type="text" class="form-control" id="fournisseur_adresse" placeholder="Adresse du fournisseur">');
					} else if (page==="employé") {
						$(".add .txt2").html("Merci de rentrer le nom de l'"+page+" et son poste actuel pour l'ajouter.");
						$(".add .champ1").html('<input type="text" class="form-control" id="employe_nom" placeholder="Nom de l\'employé">');
						$(".add .champ2").html('<input type="text" class="form-control" id="employe_poste" placeholder="Poste de l\'employé">');
					}
				});
			} else if (method === "mod") {
				$("."+currentpage+"").slideUp(800,function(){
					$(".add").slideDown(800);
					currentpage = "add";
					console.log(currentpage);
					$(".add h2").html("Modifier un "+page);
					if (page==="médicament") {
						$(".add .txt2").html("Merci de faire les changements voulus pour modifier le "+page+"");
						$(".add .txt1").html("Modifications des données d'un "+page+"");
					} else if (page==="client") {
						$(".add .txt2").html("Merci de faire les changements voulus pour modifier le "+page+"");
						$(".add .txt1").html("Modifications des données d'un "+page+"");
					} else if (page==="fournisseur") {
						$(".add .txt2").html("Merci de faire les changements voulus pour modifier le "+page+"");
						$(".add .txt1").html("Modifications des données d'un "+page+"");
					} else if (page==="employé") {
						$(".add .txt2").html("Merci de faire les changements voulus pour modifier l'"+page+"");
						$(".add .txt1").html("Modifications des données d'un "+page+"");
					}
				});
			} else if (method === "list") {
			} 
		}
	});
});